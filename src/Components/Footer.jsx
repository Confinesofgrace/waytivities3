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
                    
                    <p>
                        <h4>
                            Waytivities
                        </h4>
                        His Footprints are Clearly Seen
                    </p>
                    
                    
                </div>

                <div  id='footer-nav'>
                    
                    <p>
                        Books
                    </p>
                    <p>
                        About Us
                    </p>
                    <p>
                        Terms of Use
                    </p>
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

            <div style={{width:'100%',display:'flex', color:'white', alignItems:'center', gap:'5px', justifyContent:'center'}}>
                
                <PiCopyright/>

                <p>Waytivities 2024. All rights reserved.</p>                

            </div>
                

                
            
            
            
        </div>
    );
}

export default Footer;