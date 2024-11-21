import './Admin.css'

function Admin () {
    return(
        <div id="page-layout">

            <div id="admin-section" style={{display:'flex'}}>

                <div id='Admin-dashboard'>
                    Admin Dashboard
                </div>
                <div id='work-pane'>

                    <div id='banner'>
                        Banner to represent each task
                    </div>

                    <div id='task-section'>

                        <div style={{marginBottom:'8px'}} >

                            <p className='subsection-header'>Choose Category</p>

                            <div style={{display:'flex' , gap:'20px', alignItems:'center'}} >
                                
                                <input id='admin-input'  type='text' placeholder='Add New Category'/>

                                <p>or</p>

                                <button style={{padding:'16px', borderRadius:'16px', color:'white', backgroundColor:'black'}}>Select Category</button>
                            </div>

                        </div>

                        
                        <div>

                            <p className='subsection-header'>Add Book</p>
                            <div>
                                <p className='addbook-header'>Book Title</p>
                                <input id='admin-input' type='text' placeholder='Add Book Title'/>
                            </div>
                            
                            <div id='book-covers'>
                                <p className='addbook-header'>Add Book Cover</p>

                                <div id='book-covers' style={{display:'flex', gap:'20px'}}>
                                    <input id='admin-input' className='bookCover-input' type='text' placeholder='Add Front Cover'/>
                                    <input id='admin-input' className='bookCover-input' type='text' placeholder='Add Spine'/>
                                    <input id='admin-input' className='bookCover-input' type='text' placeholder='Add Back Cover'/>
                                    <input id='admin-input' className='bookCover-input' type='text' placeholder='Add Mockup'/>
                                </div>
                            </div>
                            

                            <div id='book-dscription'>
                                <p className='addbook-header'>Add Book Description</p>
                                <div style={{display:'flex', gap:'20px'}}>
                                    <div>

                                        <input className='book-description' id='admin-input' type='text' placeholder='Add About Book'/>
                                        </div>

                                        <div>
                                        <input className='book-description' id='admin-input' type='text' placeholder='Add About Author'/>
                                    </div>
                                </div>
                                
                                
                                
                                <div>
                                    <input className='book-trailer' id='admin-input' type='text' placeholder='Add Book Trailer'/>
                                </div>    
                            </div>    

                        </div>
                        
                        

                    </div>


                </div>
                <div id='user-preview'>
                    What the site looks like for a user
                </div>



            </div>

        </div>
    );
}

export default Admin;