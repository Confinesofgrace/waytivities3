import { Link } from 'react-router-dom';
import './LogIn.css'

function LogIn () {
    return (
        <div id='page-layout'>

            <div id='login-modal'>
                <div id='login-content'>

                    <div id='login-header'>
                        <h3>Waytivities</h3>
                        <p>Continue to your waytivities account</p>

                        <hr/>

                    </div>
                    

                    
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

                            <p style={{fontSize:'10px'}}>Forgot password?</p>
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

                <div id='new-user' >
                    <p>Don't have an account? <span><Link to= 'signup' 
                    style={{
                        fontWeight:'600', 
                        color: 'purple', 
                        cursor:'pointer',

                    }}>Sign Up</Link></span></p>
                </div>

                
                
            </div>
        
        </div>
    );
}

export default LogIn;