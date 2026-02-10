import Contact from '../../Components/Contact';
import './About.css'

function About () {
    return (
        <div id='aboutus-page'>
            <div id='aboutus-layout'>
                <div id ='aboutus-title'>
                        <p>ABOUT US</p>
                </div> 
                <div id='aboutus-left'>
                    <div style={{
                        backgroundColor:'white',
                        width:'100%',
                        }}> <Contact/> </div>
                    
                </div>
                <div id='aboutus-right'>
                    
                    <div id='aboutus'>
                        
                        <p>
                            Terra incognito is a community of people with one pulsating desire- To please the lord!
                            We believe that God (the creator) has one purpose- To be seen! <br/>
                            He has called us (over the years) from different kindred, race, tribe and family to be a platform in achieving this purpose. 
                            We believe that His speakings and dealings can be seen in our lifestyle. <br/>
                            God desires to be seen, and our vision is to be the canvas that makes it possible.

                        </p>
                    
                    </div> 

                    <div id='aboutus-visualInterest'></div>

                </div>
                
            </div>
            
        </div>
    );
}

export default About;