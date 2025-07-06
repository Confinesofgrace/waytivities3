import './AdminPage.css';


function AdminPage() {
    return(
        <div id="page-layout">

            <div id='adminPage-layout'>

                <div id='book-upload'>
                    <div className="admin-section" id='for-title'>

                        <label htmlFor="book-title">Book Title</label>
                        
                        <input id='for-admin-input' type='text' name='title' placeholder='Book Title'  />

                        <label htmlFor="author">Author</label>
                        <input id='for-admin-input' type='text' name='author' placeholder='Author'  />                    

                    </div>
            
                    <div className="admin-section" id='for-cover'>
                        <label htmlFor="cover">Front Cover</label>
                        <input id='for-admin-input2' type='text' name='cover' placeholder='Upload image (jpg/png)'  />
                    </div>

                    <div className="admin-section" id='for-aboutBook'>
                        <label htmlFor="about">About Book</label>
                        <input id='for-admin-input2' type='text' name='about' placeholder='Upload text file(doc/pdf)'  />
                    </div>

                    <div className="admin-section" id='for-intro'>
                        <label htmlFor="trailer">Book Trailer</label>
                        <input id='for-admin-input2' type='text' name='trailer' placeholder='Upload text file(doc/pdf)'  />
                    </div>
                </div>

            </div>

            

            
        </div>
    );
}

export default AdminPage;