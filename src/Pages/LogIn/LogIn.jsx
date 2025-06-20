import { Link } from 'react-router-dom';
import './LogIn.css'

function LogIn () {
    return (
        <div id='page-layout'>

            <div id='login-modal'>
                <div id='login-content'>
                    <h3>Waytivities</h3>
                    <p>Continue to your waytivities account</p>

                    <hr style={{width:'100%', border:'1px solid', borderColor:'black', margin:'16px 0px'}}/>

                    
                    <div id='login-options'>
                    
                    <div id='login-email'>
                        Log In with Email
                        
                        <input id='login-input' placeholder='Email'/>
                        <input id='login-input' placeholder='Password'/>
                        <input id='login-input' placeholder='Confirm Password'/>
                        <button
                        style={{padding:'8px 16px',
                            margin:'8px 0px',
                            borderStyle:'none',
                            border:'1px solid',
                            borderRadius:'4px',
                            backgroundColor:'black',
                            
                        }}
                        ><Link style={{color:'white'}}>Log In</Link></button>

                        <p style={{fontSize:'12px'}}>Forgot password?</p>
                    </div>

                    <div id='or-divider'>
                        <p>or</p>
                    </div>


                    <div id='login-alternative'>
                        
                        <div id='login-with'>Log In with Google</div>
                        <div id='login-with'>Log In with Facebook</div>
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