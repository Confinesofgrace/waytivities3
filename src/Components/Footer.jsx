import { TiSocialFacebook } from 'react-icons/ti';
import './Footer.css'
import { SiInstagram, SiWhatsapp } from 'react-icons/si';
import { PiCopyright } from 'react-icons/pi';

import { Link } from 'react-router-dom';

function Footer () {
    return (
        <div id='body-footer'>

            <div id='footer-line'>

                <div id='footer-header' >
                    <Link to='/'>
                        <h4 id='footer-logo'>
                            Waytivities
                        </h4>
                    </Link>

                    <Link to='/'>
                        <p id='footer-tagline'>
                            His Footprints are Clearly Seen
                        </p>
                    </Link> 
                    
                      
                </div>

                <div  id='footer-nav'>

                    <Link to='/books'>
                        <p id='footer-nav-books'>
                            Books
                        </p>
                    </Link> 
                    <Link to='/about'>
                        <p id='footer-nav-about'>
                            About Us
                        </p>
                    </Link> 
                    <Link to='/terms'>
                        <p id='footer-nav-terms'>
                            Terms of Use
                        </p>
                    </Link> 
                    
                    
                    
                    
                </div>

            </div>
            
            <div id='footer-divider'></div>

            <div id='socials'>

                <div id='social-media'>
                    <TiSocialFacebook/>
                </div>
                <div id='social-media'>
                    <SiInstagram/>
                </div>
                <div id='social-media'>
                    <SiWhatsapp/>
                </div>

            </div>

            <div style={{width:'100%',display:'flex', color:'white', alignItems:'center', gap:'5px', justifyContent:'center',
            fontSize:'14px',
            }}>
                
                <PiCopyright/>

                <p>Waytivities 2024. All rights reserved.</p>                

            </div>
                

                
            
            
            
        </div>
    );
}

export default Footer;