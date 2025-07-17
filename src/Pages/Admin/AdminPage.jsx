import './AdminPage.css';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import ImageUpload from './ImageUpload';

// To extract text from file
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Firebase storage
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

import Library from '../../Components/Library';





function AdminPage() {

    const [title, setTitle] = useState('');
    
    const [author, setAuthor] = useState('');

    const [coverPreview, setCoverPreview] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setCoverPreview(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'image/jpeg': [],
        'image/png': []
    },
    multiple: false
    });


    const [aboutBookFile, setAboutBookFile] = useState(null);

    const [aboutBookContent, setAboutBookContent] = useState('');

    const onAboutBookDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setAboutBookFile(file);

        try {
            const content = await extractTextFromFile(file); 
            setAboutBookContent(content);
            console.log("Extracted About Book content:", content);
        } catch (err) {
            console.error("Failed to extract About Book text:", err);
        }
        }, []);


    const {
        getRootProps: getAboutBookRootProps,
        getInputProps: getAboutBookInputProps,
        isDragActive: isAboutBookDragActive
        } = useDropzone({
        onDrop: onAboutBookDrop,
        accept: {
            'application/pdf': [],
            'application/msword': [], // .doc
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [], // .docx
            'text/plain': [] // .txt
        },
        multiple: false
        });

        const [trailerFile, setTrailerFile] = useState(null);

        const [trailerContent, setTrailerContent] = useState('');

        
        const onTrailerDrop = useCallback((acceptedFiles) => {
            const file = acceptedFiles[0];
            setTrailerFile(file);

            const processFile = async () => {
                try {
                const content = await extractTextFromFile(file);
                setTrailerContent(content);
                console.log("Extracted Trailer content:", content);
                } catch (err) {
                console.error("Failed to extract trailer text:", err);
                }
            };

            processFile();
        }, []);


        const {
            getRootProps: getTrailerRootProps,
            getInputProps: getTrailerInputProps,
            isDragActive: isTrailerDragActive
            } = useDropzone({
            onDrop: onTrailerDrop,
            accept: {
                'application/pdf': [],
                'application/msword': [],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
                'text/plain': []
            },
            multiple: false
        });


        const [bookFile, setBookFile] = useState(null);

        const [bookContent, setBookContent] = useState('');

        const onBookDrop = useCallback((acceptedFiles) => {
            const file = acceptedFiles[0];
            setBookFile(file);

            const processFile = async () => {
                try {
                const content = await extractTextFromFile(file);
                setBookContent(content);
                console.log("Extracted Book content:", content);
                } catch (err) {
                console.error("Failed to extract book text:", err);
                }
            };

            processFile();
        }, []);


        const {
            getRootProps: getBookRootProps,
            getInputProps: getBookInputProps,
            isDragActive: isBookDragActive
            } = useDropzone({
            onDrop: onBookDrop,
            accept: {
                'application/pdf': [],
                'application/msword': [],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
                'text/plain': []
            },
            multiple: false
        });

    const [coverUrl, setCoverUrl] = useState('');

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
                const text = textContent.items.map(item => item.str).join(' ');
                fullText += text + '\n';
                }
                resolve(fullText);
            };
            reader.onerror = () => reject('Failed to read PDF file');
            reader.readAsArrayBuffer(file);
            });

        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
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
            frontCover: coverUrl,
            aboutBook: aboutBookContent || '',
            trailer: trailerContent || '',
            book: bookContent || '',
            createdAt: new Date()
        };

        try {
            if (editingBookId){
                const bookRef = doc(db, 'books', editingBookId);
                await updateDoc (bookRef, bookData);
                alert("Book updated successfully!");
            } else {
                    await addDoc(collection(db, 'books'), bookData);
                    alert("Book uploaded successfully!");
            }

            

            await fetchBooks(); // Refresh the library list
            
            setEditingBookId(null);
            setTitle('');
            setAuthor('');
            setCoverUrl('');
            setCoverPreview(null);
            setAboutBookFile(null);
            setTrailerFile(null);
            setBookFile(null);
            setAboutBookContent('');
            setTrailerContent('');
            setBookContent('');
        } catch (err) {
            console.error("Error saving book:", err);
            alert("Failed to save book.");
        }
    };

    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'books'));
        const booksData = snapshot.docs.map(doc => ({
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

    const handleDeleteBook = async (bookId) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
        await deleteDoc(doc(db, 'books', bookId));
        setBooks(prev => prev.filter(book => book.id !== bookId));
    } catch (err) {
        console.error("Failed to delete book:", err);
        alert("Error deleting book.");
    }
    };

    const handleEditBook = (book) => {
    setEditingBookId(book.id);
    setTitle(book.title || '');
    setFrontCover(book.frontCover || '');
    setCoverPreview(book.frontCover || '');
    setBookFile(book.bookFile || '');
    setTrailer(book.trailer || '');
    setAboutBook(book.aboutBook || '');
    };

    const [editingBookId, setEditingBookId] = useState(null);



        




    return(
        <div id="page-layout">

            <div id='adminPage-layout'>

                <div id='book-upload'>
                    <div className="admin-section" id='for-title'>
                        <div className='for-input1' >
                            <label htmlFor="book-title" className='admin-label' >Book Title</label>
                        
                            <input
                                id='for-admin-input'
                                type='text'
                                name='title'
                                placeholder='Book Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </div>
                        
                        <div className='for-input1' >
                            <label htmlFor="author" className='admin-label' >Author</label>
                            
                            <input
                                id='for-admin-input'
                                type='text'
                                name='author'
                                placeholder='Author'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
 
                        </div>
                                          

                    </div>
            
                    
                    <div className="for-input1" id='for-cover'>
                        <ImageUpload label="Front Cover" onUpload={(url) => setCoverUrl(url)} />
                    </div>



                    <div className="for-input1" id='for-aboutBook'>
                        <label htmlFor="about" className='admin-label' >About Book</label>
                        
                        {/*<input id='for-admin-input2' type='text' name='about' placeholder='Upload text file(doc/pdf)'  /> */}
                        

                        <div {...getAboutBookRootProps()}       id='dropzone-area'>
                            <input {...getAboutBookInputProps()} />
                            {
                                isAboutBookDragActive ?
                                <p>Drop the 'About Book' file here...</p> :
                                <p>Drag & drop 'About Book' file here, or click to select</p>
                            }
                            {aboutBookFile && (
                                <div style={{ marginTop: '10px' }}>
                                <strong>Uploaded:</strong> {aboutBookFile.name}
                                </div>
                            )}
                        </div>


                    </div>

                    <div className="for-input1" id='for-intro'>
                        <label htmlFor="trailer" className='admin-label'>Book Trailer</label>

                        <div {...getTrailerRootProps()} id='dropzone-area'>
                            <input {...getTrailerInputProps()} />
                            {
                            isTrailerDragActive ?
                            <p>Drop the 'Trailer' file here...</p> :
                            <p>Drag & drop 'Trailer' file here, or click to select</p>
                            }
                            {trailerFile && (
                            <div style={{ marginTop: '10px' }}>
                                <strong>Uploaded:</strong> {trailerFile.name}
                            </div>
                            )}
                        </div>
                    </div>


                    <div className="for-input1" id='for-book'>
                        <label htmlFor="trailer" className='admin-label' >Book</label>
                        <div {...getBookRootProps()} id='dropzone-area'>
                            <input {...getBookInputProps()} />
                            {
                            isBookDragActive ?
                            <p>Drop the 'Book' file here...</p> :
                            <p>Drag & drop 'Book' file here, or click to select</p>
                            }
                            {bookFile && (
                            <div style={{ marginTop: '10px' }}>
                                <strong>Uploaded:</strong> {bookFile.name}
                            </div>
                            )}
                        </div>
                    </div>
                </div>

                
            </div>
            
            <div>
                <button onClick={handleSubmit}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: 'purple',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }} >
                        {editingBookId ? "Update Book" : "Upload Book"}
                </button>
            </div>

            <Library books={books} onDelete={handleDeleteBook} onEdit={handleEditBook}/>

            
        </div>
    );
}

export default AdminPage;