import BookPreview from "../../Components/BookPreview";
import Footer from "../../Components/Footer";
import Hero from "../../Components/Hero";


function LandingPage () {
    return (
        <div>
            
            <Hero/>
            <div id="section-B">
                <BookPreview/>
                <Footer/>
            </div>
            
            
        </div>
    )
}

export default LandingPage;