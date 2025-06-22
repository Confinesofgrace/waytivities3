import { Link } from 'react-router-dom';
import './SignUp.css'

function SignUp () {
    return (
        <div id='page-layout'>

            <div id='signup-modal'>
                <div id='signup-content'>

                    <div id='signup-header' >

                        <h3>Waytivities</h3>
                        <p>Create your waytivities account</p>

                        <hr/>

                    </div>
                    

                    
                    <div id='signup-options'>
                        
                        <div id='signup-email' >
                            Sign up with Email
                            
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
                        </div>

                        <div id='or-divider'> 
                            <p>or</p> 
                        </div>
                        
                        

                        <div id='signup-alternative' >
                            
                            <div id='signup-with'>Sign up with Google</div>
                            <div id='signup-with'>Sign up with Facebook</div>
                        </div>
                        
                        
                    </div>
                                       
                    
                </div>

                <div id='have-account' >
                    <p>Already have an account? <span><Link to= '/login' style={{fontWeight:'600', color: 'purple', cursor:'pointer',}}>Log In</Link></span></p>
                </div>
                
                
            </div>
            
        </div>
    );
}

export default SignUp;