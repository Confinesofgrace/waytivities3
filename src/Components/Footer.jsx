import { TiSocialFacebook } from 'react-icons/ti';
import { FaXTwitter, FaYoutube } from 'react-icons/fa6';

import { SiInstagram, SiWhatsapp } from 'react-icons/si';
import { PiCopyright } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import './Footer.css';

function Footer() {
    const [socials, setSocials] = useState({
        facebook: '',
        instagram: '',
        whatsapp: '',
        twitter: '',
        youtube: '',
    });

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const ref = doc(db, 'settings', 'socials');
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    setSocials({
                        facebook: snap.data().facebook || '',
                        instagram: snap.data().instagram || '',
                        whatsapp: snap.data().whatsapp || '',
                        twitter: snap.data().twitter || '',
                        youtube: snap.data().youtube || '',
                    });
                }
            } catch (err) {
                console.error('Failed to fetch socials:', err);
            }
        };

        fetchSocials();
    }, []);

    return (
        <div id='body-footer'>

            <div id='footer-line'>
                <div id='footer-header'>
                    <Link to='/'>
                        <h4 id='footer-logo'>Waytivities</h4>
                    </Link>

                    <Link to='/'>
                        <p id='footer-tagline'>
                            His Footprints are Clearly Seen
                        </p>
                    </Link> 
                </div>

                <div id='footer-nav'>
                    <Link to='/books'><p>Books</p></Link> 
                    <Link to='/about'><p>About Us</p></Link> 
                    <Link to='/terms'><p>Terms of Use</p></Link> 
                </div>
            </div>
            
            <div id='footer-divider'></div>

            {/* SOCIAL LINKS */}
            <div id='socials'>

                {socials.facebook && (
                    <a
                        href={socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        id='social-media'
                        aria-label="Facebook"
                    >
                        <TiSocialFacebook />
                    </a>
                )}

                {socials.instagram && (
                    <a
                        href={socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        id='social-media'
                        aria-label="Instagram"
                    >
                        <SiInstagram />
                    </a>
                )}

                {socials.whatsapp && (
                    <a
                        href={socials.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        id='social-media'
                        aria-label="WhatsApp"
                    >
                        <SiWhatsapp />
                    </a>
                )}

                {socials.twitter && (
                    <a
                        href={socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="social-media"
                        aria-label="X (Twitter)"
                    >
                        <FaXTwitter />
                    </a>
                )}

                {socials.youtube && (
                    <a
                        href={socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="social-media"
                        aria-label="YouTube"
                    >
                        <FaYoutube />
                    </a>
                )}


            </div>

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    color: 'white',
                    alignItems: 'center',
                    gap: '5px',
                    justifyContent: 'center',
                    fontSize: '14px',
                }}
            >
                <PiCopyright />
                <p>Waytivities 2024. All rights reserved.</p>
            </div>

        </div>
    );
}

export default Footer;
