import './AdminPage.css';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import ImageUpload from './ImageUpload';



function AdminPage() {

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

    const onAboutBookDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setAboutBookFile(file); // We store the whole file so we can show the name, type, etc.
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
        
        const onTrailerDrop = useCallback((acceptedFiles) => {
            const file = acceptedFiles[0];
            setTrailerFile(file); 
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

        const onBookDrop = useCallback((acceptedFiles) => {
            const file =acceptedFiles[0];
            setBookFile(file); 
        }, [] );

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
        




    return(
        <div id="page-layout">

            <div id='adminPage-layout'>

                <div id='book-upload'>
                    <div className="admin-section" id='for-title'>
                        <div className='for-input1' >
                            <label htmlFor="book-title" className='admin-label' >Book Title</label>
                        
                            <input id='for-admin-input' type='text' name='title' placeholder='Book Title'  />
                        </div>
                        
                        <div className='for-input1' >
                            <label htmlFor="author" className='admin-label' >Author</label>
                            
                            <input id='for-admin-input' type='text' name='author' placeholder='Author'  />  
                        </div>
                                          

                    </div>
            
                    {
                    /*<div className="for-input1" id='for-cover'>
                        <label htmlFor="cover" className='admin-label'>Front Cover</label>
  
                        <div {...getRootProps()} id='dropzone-area'>
                            <input {...getInputProps()} />
                            {
                            isDragActive ?
                            <p>Drop the image here ...</p> :
                            <p>Drag & drop front cover image here, or click to select</p>
                            }
                            {coverPreview && <img src={coverPreview} alt="Preview" style={{ marginTop: '10px', width: '100%', borderRadius: '8px' }} />}
                        </div>
                    </div>
                    */
                    }
                    
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
           
        </div>
    );
}

export default AdminPage;