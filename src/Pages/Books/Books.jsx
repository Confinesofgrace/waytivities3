import './Books.css'
import BookListsPreview from "../../Components/BookListsPreview";
import { useState } from 'react';

function Books () {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <div id='page-layout'>

            <div style={{position:'relative'}}>
                <div id='books-layout'>

                    <div id='preview-box' style={{display:'flex'}}>
                        <div id='book-preview'>

                            <div id='book-cover'> </div>

                            <div id='description-overlay' 
                                className={isExpanded ? 'expanded' : ''}
                                onClick={toggleExpand}
                                >

                                    <p>
                                        <span style={{fontSize:'30px'}}>Relationship Matters</span>
                                        <br></br>
                                        Like a rose flower, this book opens up, layer by layer, into discovering the hidden content of your identity until you come to full bloom.
                                        This book looks deep into basic questions and provides answers to them.
                                        <br></br>
                                        As Peter's identity was revealed when he found by revelation, the identity of Christ in his days; and Paul was able to shape the perception of himself based on his knowledge of Christ.
                                        So also, we must come to know ourselves as we know Christ. Our identity must be the product of revelation.
                                        <br></br>
                                        When it comes to the matter of identity, the different strands of what has been written of you in the volumes of books must be combined in a sequential and interdependent manner.
                                        <br></br>
                                        With this book, you will be able to see beyond a line, a phrase, a paragraph, a book of your life.
                                        You will see your identity as a whole story waitin to be discovered. You hold in your hand a treasure book to lead you on a journey to finding who you are and what you have been created to be.
                                    </p>

                                <div id='fade' className={isExpanded ? 'hidden' : ''}> </div>
                                
                            </div>

                        </div>

                        <div id='book-trailer'>
                            <p>
                                Introduction
                                <br></br>
                                God is never ambiguous. We always know where he stands. The scripturesportray a God who is both detailed and specific about what he wants and how he wants his will to be done.

                                <br></br>
                                God is purposeful in thought and action, but he also gave the privilege of choice so that each individual will decide how they will spend their lives.
                                <br></br>
                                This explains why there are different interpretations about His will. Every private interpretation is the result of personal choice attempting to decipher His will.
                                <br></br>
                                The biggest threat to the advancement of the Kingdom of God in our days is relativism and subjectivism. We were not created to be a law to ourselves.
                                <br></br>
                                We have the choice to either follow the revealed will of God or not. But we can be rest assured there will be consequences. There is an objective truth and the Kingdom of God only advances on this track. Only this truth will ultimately matter in this life and not what we personally or subjectively approve as truth.
                                <br></br>
                                It is almost impossible to find the right ourse through the labyrinth of existence without the right standard. Jeremiah shared a powerful principle: "I know, GOD, that mere mortals can't run their own lives, that men and women don't have what it takes to take charge of life". (Jeremiah 10:23 MSG).
                                <br></br>
                                The context of personal discovery hinges on the fact that our begining is not in time. Eph 1:4-5 "just as he chose us in him before the foundation of the world, that we would be holy and blameless before him". Life was founded on the principle of alignment and we must align personal choices with natural principles that run the universe. These principles are not subjective but sovereignly determined. For example, we don't decide sunrise or sunset.
                                <br></br>
                                It is by aligning to his principles that we become competent in handling the issues of our lives. We are created to be guided by principles. Disorder arises when these principles are replaced or ignored. This should reiterate to us that God is a God of order.
                                <br></br>

                            </p>    

                        </div>

                    </div>
                </div>

                <div id='booklists'>
                    <BookListsPreview/>
                </div>

            </div>
            
           
        </div>
    );
}

export default Books;