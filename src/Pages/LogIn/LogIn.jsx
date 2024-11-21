import { Link } from 'react-router-dom';
//import './LogIn.css'

function LogIn () {
    return (
        <div id='page-layout'>

        <div id='signup-modal'>
            <div id='signup-content'>
                <h3>Waytivities</h3>
                <p>Continue to your Waytivities account</p>

                <hr style={{width:'100%', border:'1px solid', borderColor:'black', margin:'16px 0px'}}/>

                
                <div style={{
                    display:'flex',
                    alignItems:'center',
                    }}>
                    
                    <div style={{width:'45%',marginRight:'auto', display:'flex', flexDirection:'column'}}>
                        Log In with Email
                        
                        <input id='signup-input' placeholder='Email'/>
                        <input id='signup-input' placeholder='Password'/>
                        <input id='signup-input' placeholder='Confirm Password'/>
                        <button
                        style={{padding:'8px 16px',
                            margin:'8px 0px',
                            borderStyle:'none',
                            border:'1px solid',
                            borderRadius:'4px',
                            backgroundColor:'black',
                            
                        }}
                        ><Link style={{color:'white'}}>Create account</Link></button>

                        <p style={{fontSize:'12px'}}>Forgot password?</p>
                    </div>

                    <p>or</p>
                    

                    <div 
                    style={{
                        width:'45%', 
                        marginLeft:'auto'
                        }}>
                        
                        <div id='signup-with'>Log In with Google</div>
                        <div id='signup-with'>Log In with Facebook</div>
                    </div>
                    

                    
                </div>
                                   
                
            </div>
            <p>Don't have an account? <span><Link to= 'signup' 
                style={{
                    fontWeight:'600', 
                    color: 'purple', 
                    cursor:'pointer',

                }}>Sign Up</Link></span></p>
            
        </div>
        
    </div>
    );
}

export default LogIn;