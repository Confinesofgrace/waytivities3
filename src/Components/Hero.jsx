import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // adjust path if needed


function Hero () {

  const { user } = useAuth();


    return(
        <section id="hero">
            <div id="hero-overlay">
                <div id="hero-content">
                    <h3 >His Footprints, <br/> are clearly seen!</h3>

                    <p id="bible-verse">Psalm 103 v 7, Psalm 95 v 10, Hebrews 3 v 10, Romans 1 v 20</p>
                

                    <p>It is a myth to think God obfuscates himself. In 'truth' his invisible attributes <br/>are clearly painted by creation.</p>
                    <p>
                    If only we'd dared to listen, we'd hear him sing, and if we dare to follow, <br/>we'd see his footprints in uncharted territories. <br/>
                    But it is a journey- a Journey of Faith... Are you ready?</p>
                    

                    {!user ? (
                        <Link to="signup">
                            <button id="signUp">Get Started</button>
                        </Link>
                        ) : (
                        <Link to="books">
                            <button id="signUp">Get Resources</button>
                        </Link>
                    )}


                </div>
            </div>
            

        </section>
        
    );
}

export default Hero;