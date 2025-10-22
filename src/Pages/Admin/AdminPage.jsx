import './AdminPage.css';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import Library from '../../Components/Library';
import Category from '../../Components/Category';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');
  const [resetImageField, setResetImageField] = useState(0);
  const [aboutBookFile, setAboutBookFile] = useState(null);
  const [aboutBookContent, setAboutBookContent] = useState('');
  const [trailerContent, setTrailerContent] = useState('');
  const [bookFile, setBookFile] = useState(null);
  const [bookContent, setBookContent] = useState('');
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [availableFormats, setAvailableFormats] = useState({
    pdf: true,
    paperback: false,
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setCoverPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    multiple: false,
  });

  const onAboutBookDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setAboutBookFile(file);
    try {
      const content = await extractTextFromFile(file);
      setAboutBookContent(content);
    } catch (err) {
      console.error("Failed to extract About Book text:", err);
    }
  }, []);

  const {
    getRootProps: getAboutBookRootProps,
    getInputProps: getAboutBookInputProps,
    isDragActive: isAboutBookDragActive,
  } = useDropzone({
    onDrop: onAboutBookDrop,
    accept: {
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'text/plain': [],
    },
    multiple: false,
  });

  const onBookDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setBookFile(file);

    if (!file) return;

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Book covers"); 

      const response = await fetch("https://api.cloudinary.com/v1_1/dfbqs0zcm/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        setBookContent(data.secure_url); // Store book file URL
        console.log("Book uploaded to Cloudinary:", data.secure_url);
      } else {
        throw new Error("Failed to upload to Cloudinary");
      }
    } catch (err) {
      console.error("Error uploading book PDF:", err);
      alert("Failed to upload book file.");
    }
  }, []);


  const {
    getRootProps: getBookRootProps,
    getInputProps: getBookInputProps,
    isDragActive: isBookDragActive,
  } = useDropzone({
    onDrop: onBookDrop,
    accept: {
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'text/plain': [],
    },
    multiple: false,
  });

  const extractTextFromFile = async (file) => {
    const fileType = file.type;

    if (fileType === 'application/pdf') {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          const typedarray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const text = textContent.items.map((item) => item.str).join(' ');
            fullText += text + '\n';
          }
          resolve(fullText);
        };
        reader.onerror = () => reject('Failed to read PDF file');
        reader.readAsArrayBuffer(file);
      });
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } else if (fileType === 'text/plain') {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject('Failed to read text file');
        reader.readAsText(file);
      });
    }

    throw new Error('Unsupported file type');
  };

  const handleSubmit = async () => {
    if (!title || !author || !coverUrl) {
      alert("Title, author, and front cover are required.");
      return;
    }

    const bookData = {
      title,
      author,
      price: parseFloat(price) || 0,
      frontCover: coverUrl,
      aboutBook: aboutBookContent || '',
      trailer: trailerContent || '',
      bookFileUrl: bookContent || '',
      availableFormats,
      createdAt: new Date(),
    };

    try {
      if (editingBookId) {
        const bookRef = doc(db, 'books', editingBookId);
        await updateDoc(bookRef, bookData);
        alert("Book updated successfully!");
      } else {
        await addDoc(collection(db, 'books'), bookData);
        alert("Book uploaded successfully!");
      }

      await fetchBooks();
      setResetImageField((prev) => prev + 1);
      setEditingBookId(null);
      setTitle('');
      setAuthor('');
      setCoverUrl('');
      setCoverPreview(null);
      setAboutBookFile(null);
      setBookFile(null);
      setAboutBookContent('');
      setTrailerContent('');
      setBookContent('');
      setPrice('');
    } catch (err) {
      console.error("Error saving book:", err);
      alert("Failed to save book.");
    }
  };

  const fetchBooks = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'books'));
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEditBook = (book) => {
    setEditingBookId(book.id);
    setTitle(book.title || "");
    setAuthor(book.author || "");
    setPrice(book.price || "");
    setCoverUrl(book.frontCover || "");
    setCoverPreview(book.frontCover || "");
    setAboutBookContent(book.aboutBook || "");
    setTrailerContent(book.trailer || "");
    setBookContent(book.bookFileUrl || "");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  return (
    <div id="page-layout">
      <div id="adminPage-layout">
        <div id="book-upload">

          {/* --- Top Row: Book Info + Cover Upload --- */}
          <div className="book-info-section">
            <div className="input-group">
              <label className="admin-label">Book Title</label>
              <input
                id="for-admin-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book Title"
              />
            </div>

            <div className="input-group">
              <label className="admin-label">Author</label>
              <input
                id="for-admin-input"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>

            <div className="input-group">
              <label className="admin-label">Price (₦)</label>
              <input
                id="for-admin-input"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="cover-upload-section">
            <ImageUpload
              label="Front Cover"
              onUpload={(url) => setCoverUrl(url)}
              existingImage={coverUrl}
              resetTrigger={resetImageField}
            />
          </div>

          {/* --- About Book --- */}
          <div className="text-editor-section">
            <label className="admin-label">About Book</label>
            <ReactQuill
              theme="snow"
              value={aboutBookContent}
              onChange={setAboutBookContent}
              modules={modules}
              placeholder="Write about the book..."
              style={{ backgroundColor: "#fff", borderRadius: "8px", minHeight: "180px" }}
            />
          </div>

          {/* --- Trailer --- */}
          <div className="text-editor-section">
            <label className="admin-label">Book Trailer</label>
            <ReactQuill
              theme="snow"
              value={trailerContent}
              onChange={setTrailerContent}
              modules={modules}
              placeholder="Enter trailer text or link here..."
              style={{ backgroundColor: "#fff", borderRadius: "8px", minHeight: "120px" }}
            />
          </div>

          {/* --- Book Upload --- */}
          <div className="file-upload-section">
            <label className="admin-label">Book File</label>
            <div {...getBookRootProps()} id="dropzone-area">
              <input {...getBookInputProps()} />
              {isBookDragActive ? (
                <p>Drop the 'Book' file here...</p>
              ) : (
                <p>Drag & drop book file here, or click to select</p>
              )}
              {bookFile && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Uploaded:</strong> {bookFile.name}
                </div>
              )}
            </div>
          </div>

          {bookContent && (
            <div style={{ marginTop: "10px", color: "green" }}>
              ✅ Book uploaded successfully!
              <br />
              <a href={bookContent} target="_blank" rel="noopener noreferrer">
                View PDF
              </a>
            </div>
          )}

        </div>

      </div>

      <div>
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: 'purple',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {editingBookId ? "Update Book" : "Upload Book"}
        </button>
      </div>

      <Library books={books} onEditBook={handleEditBook} />

      <div style={{ marginTop: '24px' }}>
        <Category />
      </div>
    </div>
  );
}

export default AdminPage;
