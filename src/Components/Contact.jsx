import { TiSocialFacebook } from 'react-icons/ti';
import { FaXTwitter, FaYoutube } from 'react-icons/fa6';

import { SiInstagram, SiWhatsapp } from 'react-icons/si';
import { PiCopyright } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import './Contact.css';

function Contact() {
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
        <div >
            

            {/* SOCIAL LINKS */}
            <div id='socials-contact'>

                {socials.facebook && (
                    <a
                        href={socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        id='social-media-contact'
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
                        id='social-media-contact'
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
                        id='social-media-contact'
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
                        id="social-media-contact"
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
                        id="social-media-contact"
                        aria-label="YouTube"
                    >
                        <FaYoutube />
                    </a>
                )}


            </div>

            

        </div>
    );
}

export default Contact;
