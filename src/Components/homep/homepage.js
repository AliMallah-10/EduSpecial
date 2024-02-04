import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMusic, faPalette, faHeadphones, faBasketball } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';






function Homepage() {
    useEffect(() => {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        showSlide(currentSlide);

        function showSlide(index) {
            if (index >= 0 && index < slides.length) {
                slides.forEach(slide => slide.classList.remove('active'));
                slides[index].classList.add('active');
                currentSlide = index;
                animateText(slides[index].querySelector('.text'));
            }
        }

        function animateText(textElement) {
            const text = textElement.textContent;
            textElement.textContent = '';
            let charIndex = 0;
            const textInterval = setInterval(() => {
                if (charIndex < text.length) {
                    textElement.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(textInterval);
                }
            }, 100); // Adjust the interval duration as needed
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        const slideInterval = setInterval(nextSlide, 5000);

        return () => clearInterval(slideInterval);
    }, []);

    // Function to render the news card
    function NewsCard({ date, title, comments }) {
        return (
            <div className="updates-card p-5 bg-gray-200 rounded-lg text-center text-white hover:scale-110 hover:blur-none transition duration-400 cursor-pointer">
                <p className="text-yellow-500 text-lg font-bold">{date}</p>
                <p className="text-blue-800 text-base">{title}</p>
                <p className="text-gray-500 text-sm">{comments}</p>
            </div>
        );
    }





    return (
        <div className="homepage w-[95%] m-auto bg-white">

            {/* slider is done */}
            <div className="slider h-1000">
                <div className="slide">
                    <img src={require("../../Assets/images/slide1.jpg")} alt="" className="image" />
                    <div className="text mixed-color">Promoting inclusivity worldwide for everyone's benefit.</div>
                </div>
                <div className="slide">
                    <img src={require("../../Assets/images/slide2.jpg")} alt="" className="image" />
                    <div className="text mixed-color">Advancing accessibility initiatives for a better future.</div>
                </div>
                <div className="slide">
                    <img src={require("../../Assets/images/slide3.jpg")} alt="" className="image" />
                    <div className="text mixed-color">Championing equal opportunities for all, regardless of ability.</div>
                </div>
                <div className="slide">
                    <img src={require("../../Assets/images/slide4.png")} alt="" className="image" />
                    <div className="text mixed-color">Empowering global accessibility for those in need</div>
                </div>
            </div>

            {/* donation is done */}
            <div class="donation flex flex-col lg:flex-row justify-center items-center mx-4 lg:mx-20 my-8">
                {/* <!-- Left Side --> */}
                <div class="leftSide lg:mr-4 flex flex-col items-center lg:items-start lg:w-1/2">
                    <h2 class="text-4xl lg:text-6xl text-center lg:text-center text-aqua lg:mx-auto">Say Hello!</h2>
                    <h6 class="text-xl lg:text-3xl text-center lg:text-center text-blue-700 my-4 lg:mx-auto">Make a difference in the life of a child with special needs, create an inclusive community and improve yourself!</h6>
                    <p class="text-sm lg:text-base text-center lg:text-center text-gray-600 leading-relaxed lg:w-3/4 lg:mx-auto">Types of special needs vary in severity. People with autism, Down syndrome, dyslexia, blindness, ADHD, or cystic fibrosis, for example, may be considered to have special needs. However, special needs can also include cleft lips, or missing limbs.</p>
                    <Link to=""
                        class="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-yellow-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 lg:mx-auto mt-20"
                    >
                        MORE ABOUT US
                    </Link>

                </div>

                {/* <!-- Right Side --> */}
                <div class="rightSide lg:ml-4 flex flex-col items-center lg:items-start lg:w-1/2 bg-gray-200 p-4 rounded-lg">
                    <img src={require("../../Assets/images/logo.png")} alt="" class="w-48 h-48 lg:w-auto lg:h-auto mb-4 lg:mx-auto" />
                    <div class="amount bg-white p-4 rounded-lg text-center lg:mx-auto">
                        <h1 class="text-3xl lg:text-5xl text-aqua lg:mx-auto px-4 py-4">$345,599</h1>
                        <p class="text-sm lg:text-base text-gray-600 lg:mx-auto">DONATED FOR KIDS WITH SPECIAL NEEDS IN 2016</p>
                    </div>
                    <h6 class="text-xl lg:text-3xl text-blue-700 my-4 text-center lg:mx-auto">Building meaningful, respectful relationships is the foundation for learning.</h6>
                    <p class="text-sm lg:text-base text-gray-600 font-bold text-center lg:mx-auto">Ali Fakih, co-founder</p>
                </div>
            </div>

            {/* help is done */}
            <div class="flex bg-aqua p-4">
                <div class="m-auto">
                    <h1 class="text-white text-center text-3xl font-bold mb-8">How We Help</h1>
                    <h3 class="text-blue-800 text-2xl  font-semibold text-center mb-8">We work individually with each family to understand their specific needs</h3>

                    <div class="flex flex-row justify-between">
                        {/* <!-- card 1 --> */}
                        <div class="bg-white rounded-lg overflow-hidden w-72 mr-8">
                            <img src={require("../../Assets/images/help1.jpg")} alt="Logo" class="w-full" />
                            <div class="p-4">
                                <div class="relative mb-4 mt-8">
                                    <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500 text-6xl font-bold z-5">1</span>
                                    <h2 class="text-blue-900 text-3xl font-semibold text-center relative z-15">Educate</h2>
                                </div>

                                <p class="text-gray-600 text-center text-lg">We strive to improve the lives of our students through education of Academic, Behavioral, Cognitive, and Social Skills.</p>
                            </div>
                        </div>
                        {/* <!-- card 2 --> */}
                        <div class="bg-white rounded-lg overflow-hidden w-72 mr-8">
                            <img src={require("../../Assets/images/help4.jpg")} alt="Logo" class="w-full" />
                            <div class="p-4">
                                <div class="relative mb-4 mt-8">
                                    <span class="absolute top-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500 text-6xl font-bold z-10">2</span>
                                    <h2 class="text-blue-900 text-3xl font-semibold text-center relative z-20">Engage</h2>
                                </div>

                                <p class="text-gray-600 text-center text-lg">It is important to have teachers & therapists engaging students to learn and parents involved in both student programs and school activities</p>
                            </div>
                        </div>
                        {/* <!-- card 3 --> */}
                        <div class="bg-white rounded-lg overflow-hidden w-72">
                            <img src={require("../../Assets/images/help3.jpg")} alt="Logo" class="w-full" />
                            <div class="p-4">
                                <div class="relative mb-4 mt-8">
                                    <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500 text-6xl font-bold z-5">3</span>
                                    <h2 class="text-blue-900 text-3xl font-semibold text-center relative z-10">Inspire</h2>
                                </div>
                                <p class="text-gray-600 text-center text-lg">We strive to improve the lives of our students through education of Academic, Behavioral, Cognitive, and Social Skills.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* facilitiy is done */}
            <div class="facility flex flex-col bg-gray-200 mx-4 my-8 md:my-20">

                <div class="intro text-center">
                    <h1 class="text-aqua text-4xl uppercase my-8">Our Facilities</h1>
                    <h3 class="text-blue-900 text-2xl leading-relaxed mb-8">Form real friendships within a non-judgmental environment</h3>
                </div>

                <div class="environments flex flex-wrap justify-center mb-8">

                    {/* <!-- Icon 1 --> */}
                    <div class="icon1 mb-6 md:mb-0 md:mr-6 flex-shrink-0 w-full md:w-auto mr-7">
                        <div class="icon flex flex-col items-center">
                            <h4 class="text-blue-900 text-2xl md:text-5xl p-3 rounded-full bg-yellow-500 mb-3 transition duration-300 hover:bg-teal-500 hover:text-white"><i><FontAwesomeIcon icon={faSmile} /></i></h4>
                            <Link to="" class="text-black hover:text-yellow-500">
                                <h3 class="text-center text-lg w-[80px] font-bold">Sensory Room</h3>
                            </Link>
                        </div>
                    </div>

                    {/* <!-- Icon 2 --> */}
                    <div class="icon2 mb-6 md:mb-0 md:mr-6 flex-shrink-0 w-full md:w-auto mr-7">
                        <div class="icon flex flex-col items-center">
                            <h4 class="text-blue-900 text-2xl md:text-5xl p-3 rounded-full bg-yellow-500 mb-3 transition duration-300 hover:bg-teal-500 hover:text-white"><i><FontAwesomeIcon icon={faMusic} /></i></h4>
                            <Link to="" class="text-black hover:text-yellow-500">
                                <h3 class="text-center text-lg w-[80px] font-bold">Dance Studio</h3>
                            </Link>
                        </div>
                    </div>

                    {/* <!-- Icon 3 --> */}
                    <div class="icon3 mb-6 md:mb-0 md:mr-6 flex-shrink-0 w-full md:w-auto mr-7">
                        <div class="icon flex flex-col items-center">
                            <h4 class="text-blue-900 text-2xl md:text-5xl p-3 rounded-full bg-yellow-500 mb-3 transition duration-300 hover:bg-teal-500 hover:text-white"><i><FontAwesomeIcon icon={faPalette} /></i></h4>
                            <Link to="" class="text-black hover:text-yellow-500">
                                <h3 class="text-center text-lg w-[50px] font-bold">Art Studio</h3>
                            </Link>
                        </div>
                    </div>

                    {/* <!-- Icon 4 --> */}
                    <div class="icon4 mb-6 md:mb-0 md:mr-6 flex-shrink-0 w-full md:w-auto mr-7">
                        <div class="icon flex flex-col items-center">
                            <h4 class="text-blue-900 text-2xl md:text-5xl p-3 rounded-full bg-yellow-500 mb-3 transition duration-300 hover:bg-teal-500 hover:text-white"><i><FontAwesomeIcon icon={faSmile} /></i></h4>
                            <Link to="" class="text-black hover:text-yellow-500">
                                <h3 class="text-center text-lg w-[80px] font-bold">Dramatic Playroom</h3>
                            </Link>
                        </div>
                    </div>

                    {/* <!-- Icon 5 --> */}
                    <div class="icon5 mb-6 md:mb-0 md:mr-6 flex-shrink-0 w-full md:w-auto mr-7">
                        <div class="icon flex flex-col items-center">
                            <h4 class="text-blue-900 text-2xl md:text-5xl p-3 rounded-full bg-yellow-500 mb-3 transition duration-300 hover:bg-teal-500 hover:text-white"><i><FontAwesomeIcon icon={faHeadphones} /></i></h4>
                            <Link to="" class="text-black hover:text-yellow-500">
                                <h3 class="text-center text-lg w-[80px] font-bold">Music Room</h3>
                            </Link>
                        </div>
                    </div>

                    {/* <!-- Icon 6 --> */}
                    <div class="icon6 mb-6 md:mb-0 md:mr-6 flex-shrink-0 w-full md:w-auto mr-7">
                        <div class="icon flex flex-col items-center">
                            <h4 class="text-blue-900 text-2xl md:text-5xl p-3 rounded-full bg-yellow-500 mb-3 transition duration-300 hover:bg-teal-500 hover:text-white"><i><FontAwesomeIcon icon={faBasketball} /></i></h4>
                            <Link to="" class="text-black hover:text-yellow-500">
                                <h3 class="text-center text-lg w-[80px] font-bold">Activity Hub</h3>

                            </Link>
                        </div>
                    </div>

                </div>

            </div>

            {/* volunterr is done */}
            <div class="volunteer relative mx-4 my-40 md:my-0">
                <div class="image-container inline-block w-full relative">
                    <img src={require("../../Assets/images/volunteer.jpg")} alt="" class="block w-11/12 md:w-5/6 m-4 mx-auto" />
                    <div class="text-container absolute top-40 left-1/2 transform -translate-x-1/2 z-10 text-center w-full">
                        <h2 class="custom-heading text-white text-4xl md:text-5xl font-bold mt-20 mb-6 w-[460px] m-auto">
                            <span class="word1 italic">Everyone </span>
                            <span class="wave-container">
                                <span class="word2 inline-block text-yellow-500 text-5xl md:text-6xl animate-vibrate-up-down" style={{ fontFamily: 'Brush Script MT', fontSize: '70px' }}>can</span>
                            </span>
                            <span class="word3 italic"> make</span>
                            <span class="wave-container">
                                <span class="word4 inline-block text-blue-900"><span class="word5 italic">a </span><span class="word6 text-5xl md:text-6xl animate-vibrate-up-down" style={{ fontFamily: 'Brush Script MT', fontSize: '70px' }}>difference</span></span>
                            </span>
                        </h2>
                        <Link to=""
                            class="relative py-2 px-8 text-black text-xl md:text-2xl text-base font-bold nded-full overflow-hidden bg-yellow-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                            Become a volunteer
                        </Link>

                    </div>
                </div>
            </div>

            {/* mission is done */}
            <div class="mission flex justify-between items-stretch mx-4 md:mx-20">

                <div class="mission-left flex-1 p-4">
                    <h2 class="text-center text-aqua text-5xl mb-6 uppercase">Mission</h2>
                    <h6 class="text-center text-blue-800 text-3xl mb-6 font-supermercado">We are a non-profit organization. Our goal is to provide every individual with special needs the support, friendship and inclusion that they deserve</h6>
                    <p class="text-center text-yellow-500 text-lg font-nunito font-semibold leading-normal mb-6 mx-auto md:w-1/2">The term Special Needs is a short form of Special Education Needs and is a way to refer to students with disabilities. The term Special Needs in the education setting comes into play whenever a child’s education program is officially altered from what would normally be provided.</p>
                    <div class="mission-buttons flex justify-center mx-auto border border-transparent rounded-lg w-1/2 bg-transparent text-gray-600 py-8">
                        <Link to="" class="active inline-block bg-gray-200 text-blue-800 uppercase text-lg font-semibold tracking-wide px-8 py-2.5 mr-3 rounded-full hover:bg-yellow-500 hover:text-white">mission</Link>
                        <Link to="" class="inline-block bg-gray-200 text-blue-800 uppercase text-lg font-semibold tracking-wide px-8 py-2.5 mr-3 rounded-full hover:bg-yellow-500 hover:text-white">goals</Link>
                        <Link to="" class="inline-block bg-gray-200 text-blue-800 uppercase text-lg font-semibold tracking-wide px-8 py-2.5 rounded-full hover:bg-yellow-500 hover:text-white">beliefs</Link>
                    </div>
                </div>

                <div class="mission-right flex-1 flex flex-col p-4 bg-gray-200">
                    <h2 class="text-center text-aqua text-5xl mb-10 uppercase">NEXT Events</h2>
                    <div class="mission-event-container flex flex-col items-center">
                        {/* <!-- first event card --> */}
                        <div class="mission-event flex items-center border-2 border-black mb-4 max-h-72 bg-white">
                            <img src={require("../../Assets/images/help2.jpg")} alt="Logo" class="w-56 h-full" />
                            <div class="mission-text-container flex-1 w-48 text-left justify-start p-4">
                                <h3 class="text-blue-800 text-lg mb-3 w-[50px]"><span>MOTHER/</span>DONATE</h3>
                                <h6 class="text-yellow-500 text-lg text-center">coming soon</h6>
                            </div>
                        </div>
                        {/* <!-- second event card --> */}
                        <div class="mission-event flex items-center border-2 border-black mb-4 max-h-72 bg-white">
                            <img src={require("../../Assets/images/event2.jpg")} alt="Logo" class="w-56 h-full" />
                            <div class="mission-text-container flex-1 w-48 text-left justify-start p-4">
                                <h3 class="text-blue-800 text-lg mb-3 w-[130px]"><span>Dad’s Day at </span>the School</h3>
                                <h6 class="text-yellow-500 text-lg text-center">coming soon</h6>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* steps is done */}
            <div className="steps bg-aqua ml-5 mr-5 lg:mx-auto flex flex-col">
                <div className="steps-intro text-center">
                    <h1 className="text-white uppercase text-4xl text-center mb-4">Get started</h1>
                    <h3 className="text-yellow-500 text-3xl font-display w-82 mx-auto mb-10 text-center">There is a 3 step process to get started at our program.</h3>
                </div>

                <div className="steps-icons-container flex flex-row justify-between lg:mx-auto">

                    {/* first step  */}
                    <div className="steps-icons flex justify-around flex-col items-center mb-16 mr-8">
                        <img src={require("../../Assets/icons/one.png")} className="w-40 h-40 " alt=".." />
                        <a href="/" className="text-blue-800">
                            <h3 className="text-lg text-center mb-4  font-bold">
                                <span className="block">Register for an</span>
                                intake meeting
                            </h3>
                        </a>
                        <Link to=""
                            class="flex items-center bg-yellow-500 text-white gap-1 px-4 py-2 cursor-pointer text-white-800 font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                        >
                            NEXT
                            <svg
                                class="w-5 h-5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                ></path>
                            </svg>
                        </Link>


                    </div>

                    {/* second step  */}
                    <div className="steps-icons flex justify-around flex-col items-center mb-16 mr-8">
                        <img src={require("../../Assets/icons/two.png")} className="w-40 h-40 " alt=".." />
                        <a href="/" className="text-blue-800">
                            <h3 className="text-lg text-center mb-4 font-bold">
                                <span className="block">Register for a </span>
                                program
                            </h3>
                        </a>
                        <Link to=""
                            class="flex items-center bg-yellow-500 text-white gap-1 px-4 py-2 cursor-pointer text-white-800 font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                        >
                            NEXT
                            <svg
                                class="w-5 h-5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                ></path>
                            </svg>
                        </Link>

                    </div>

                    {/* third step */}
                    <div className="steps-icons flex justify-around flex-col items-center mb-16 mr-8">
                        <img src={require("../../Assets/icons/three.png")} className="w-40 h-40 " alt=".." />
                        <a href="/" className="text-blue-800">
                            <h3 className="text-lg text-center mb-4 font-bold">
                                <span className="block">Pairing of </span>
                                volunteers
                            </h3>
                        </a>
                        <Link to=""
                            class="flex items-center bg-yellow-500 text-white gap-1 px-4 py-2 cursor-pointer text-white-800 font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                        >
                            NEXT
                            <svg
                                class="w-5 h-5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                ></path>
                            </svg>
                        </Link>

                    </div>

                </div>
            </div>

            {/* program is done */}
            <div class="program">

                <div class="program-head text-center">
                    <h1 class="text-5xl text-aqua uppercase mt-6">Our programs</h1>
                    <h3 class="text-3xl text-blue-800 font-display mt-4">Make a difference in the life of a child with a need</h3>
                </div>

                <div class="program-cards flex flex-wrap justify-center gap-5 mb-10">

                    <div class="program-icon">
                        {/* first card  */}
                        <div class="program-icons relative flex flex-col items-center p-5 bg-white rounded-full">
                            <img src={require("../../Assets/images/program1.jpg")} alt="" class="rounded-full w-80 h-80 transition duration-500 hover:rotate-180" />
                            <h3 class="text-2xl font-bold text-center text-white absolute top-1/2 left-0 right-0 -translate-y-1/2 transition duration-300 hover:text-yellow-500">
                                <span class="block">Knockout</span>
                            </h3>
                        </div>
                    </div>

                    <div class="program-icon">
                        {/* second card  */}
                        <div class="program-icons relative flex flex-col items-center p-5 bg-white rounded-full">
                            <img src={require("../../Assets/images/program2.jpg")} alt="" class="rounded-full w-80 h-80 transition duration-500 hover:rotate-180" />
                            <h3 class="text-2xl font-bold text-center text-white absolute top-1/2 left-0 right-0 -translate-y-1/2 transition duration-300 hover:text-yellow-500">
                                <span class="block">Ascend</span>
                            </h3>
                        </div>
                    </div>




                    <div class="program-icon">
                        {/* third card  */}
                        <div class="program-icons relative flex flex-col items-center p-5 bg-white rounded-full">
                            <img src={require("../../Assets/images/program3.jpg")} alt="" class="rounded-full w-80 h-80 transition duration-500 hover:rotate-180" />
                            <h3 class="text-2xl font-bold text-center text-white absolute top-1/2 left-0 right-0 -translate-y-1/2 transition duration-300 hover:text-yellow-500">
                                <span class="block">Football</span>
                            </h3>
                        </div>
                    </div>

                    <div class="program-icon">
                        {/* 4th card  */}
                        <div class="program-icons relative flex flex-col items-center p-5 bg-white rounded-full">
                            <img src={require("../../Assets/images/program4.jpg")} alt="" class="rounded-full w-80 h-80 transition duration-500 hover:rotate-180" />
                            <h3 class="text-2xl font-bold text-center text-white absolute top-1/2 left-0 right-0 -translate-y-1/2 transition duration-300 hover:text-yellow-500">
                                <span class="block">Arts</span>
                            </h3>
                        </div>
                    </div>

                    <div class="program-icon">
                        {/* 5th card  */}
                        <div class="program-icons relative flex flex-col items-center p-5 bg-white rounded-full">
                            <img src={require("../../Assets/images/program5.jpg")} alt="" class="rounded-full w-80 h-80 transition duration-500 hover:rotate-180" />
                            <h3 class="text-2xl font-bold text-center text-white absolute top-1/2 left-0 right-0 -translate-y-1/2 transition duration-300 hover:text-yellow-500">
                                <span class="block">Dance</span>
                            </h3>
                        </div>
                    </div>

                    <div class="program-icon">
                        {/* 6th card  */}
                        <div class="program-icons relative flex flex-col items-center p-5 bg-white rounded-full">
                            <img src={require("../../Assets/images/program6.jpg")} alt="" class="rounded-full w-80 h-80 transition duration-500 hover:rotate-180" />
                            <h3 class="text-2xl font-bold text-center text-white absolute top-1/2 left-0 right-0 -translate-y-1/2 transition duration-300 hover:text-yellow-500">
                                <span class="block">Basketball</span>
                            </h3>
                        </div>
                    </div>

                </div>

                <div class="program-button flex justify-center mr-12 mb-60">
                    <Link to="" class="relative overflow-hidden bg-yellow-500 uppercase tracking-widest text-lg text-blue-800 font-normal rounded-lg px-5 py-2 transition duration-500 hover:bg-blue-800">
                        <a href="/about" class="relative z-10 transition duration-500 hover:text-white hover:font-bold">More about us</a>
                        <div class="absolute top-0 left-0 w-0 h-full bg-blue-800 transition-all duration-500 hover:w-full z-0"></div>
                    </Link>
                </div>

            </div>

            {/*  testimonials is done */}
            <div className="testimonials bg-gray-500 mx-auto py-20">
                <h1 className="text-center text-aqua uppercase text-4xl mb-20">Testimonials</h1>

                <div className="testimonial-slider flex mr-10 ml-10">

                    {/* first card */}
                    <div className="testimonial-card flex-none w-90 h-90 p-5 border-2 border-aqua mr-3 ml-3 bg-white rounded-2xl sm:snap-start">
                        <div className="testimonial-top relative mb-12 mt-5">
                            <span className="quote absolute top-0 left-1/2 -translate-x-1/2">
                                <img src={require("../../Assets/icons/quote2.png")} alt="" className="w-20 h-20 text-8xl font-bold text-gray-500" />
                            </span>
                            <h4 className="text-blue-800 text-lg relative z-10 w-80 mx-auto text-center leading-snug">
                                It was nice to finally find the professional staff that know how to work with our kids and how to handle issues.
                            </h4>
                        </div>
                        <div className="testimonial-pic flex flex-col items-center mt-8">
                            <img src={require("../../Assets/images/test1.jpg")} alt="" className="w-24 h-24 rounded-full" />
                            <p className="text-yellow-500 mt-2 text-lg">Alena Darmel</p>
                        </div>
                    </div>
                    {/* secondcard */}
                    <div className="testimonial-card flex-none w-90 h-90 p-5 border-2 border-aqua mr-3 ml-3 bg-white rounded-2xl sm:snap-start">
                        <div className="testimonial-top relative mb-12 mt-5">
                            <span className="quote absolute top-0 left-1/2 -translate-x-1/2">
                                <img src={require("../../Assets/icons/quote2.png")} alt="" className="w-20 h-20 text-8xl font-bold text-gray-500" />
                            </span>
                            <h4 className="text-blue-800 text-lg relative z-10 w-80 mx-auto text-center leading-snug">
                                It was nice to finally find the professional staff that know how to work with our kids and how to handle issues.
                            </h4>
                        </div>
                        <div className="testimonial-pic flex flex-col items-center mt-8">
                            <img src={require("../../Assets/images/test2.jpg")} alt="" className="w-24 h-24 rounded-full" />
                            <p className="text-yellow-500 mt-2 text-lg">Christina Morillo </p>
                        </div>
                    </div>
                    {/* third card */}
                    <div className="testimonial-card flex-none w-90 h-90 p-5 border-2 border-aqua mr-3 ml-3 bg-white rounded-2xl sm:snap-start">
                        <div className="testimonial-top relative mb-12 mt-5">
                            <span className="quote absolute top-0 left-1/2 -translate-x-1/2">
                                <img src={require("../../Assets/icons/quote2.png")} alt="" className="w-20 h-20 text-8xl font-bold text-gray-500" />
                            </span>
                            <h4 className="text-blue-800 text-lg relative z-10 w-80 mx-auto text-center leading-snug">
                                It was nice to finally find the professional staff that know how to work with our kids and how to handle issues.
                            </h4>
                        </div>
                        <div className="testimonial-pic flex flex-col items-center mt-8">
                            <img src={require("../../Assets/images/test3.jpg")} alt="" className="w-24 h-24 rounded-full" />
                            <p className="text-yellow-500 mt-2 text-lg">John Doe</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* news section */}
            <div className="news-updates bg-aqua p-5 relative">
                <div className="news-intro text-center mb-10">
                    <h1 className="uppercase text-yellow-500 text-4xl">News & Updates</h1>
                    <h3 className="text-blue-800 text-3xl font-display mt-4">Stay tuned for updates</h3>
                </div>

                <div className="news-content flex flex-wrap justify-between">
                    <div className="news-container flex-1 mr-5">
                        <div className="news-card w-full rounded-lg border-2 border-white">
                            <img src={require("../../Assets/images/help2.jpg")} alt="News" className="w-full rounded-t-lg" />
                            <div className="news-text bg-white p-4 text-center h-76">
                                <h2 className="text-blue-800 text-xl mt-5 mb-0">
                                    5 Ways Inclusive Classrooms are Different
                                </h2>
                                <div className="news-meta flex items-center mt-2 mb-2">
                                    <h6 className="text-yellow-500 text-lg mr-10">06.22.17</h6>
                                    <p className="text-gray-500 text-base font-bold">
                                        0 Comments by Cindy Jefferson
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="news-cards flex flex-col gap-4 ml-72 mb-5">
                        <NewsCard
                            date="18.02.24"
                            title="The Challenge of Children with Special Needs"
                            comments="2 Comments by Cindy Jefferson"
                        />
                        <NewsCard
                            date="24.02.24"
                            title="Complex Disorder Diagnosis Labels"
                            comments="0 Comments by Cindy Jefferson"
                        />
                        <NewsCard
                            date="28.02.24"
                            title="Complex Disorder Diagnosis Labels"
                            comments="0 Comments by Cindy Jefferson"
                        />
                    </div>

                    <div className="button absolute bottom-0 right-0 mr-14 mb-5">
                        <Link to="/events" className="relative group cursor-pointer text-sky-50 overflow-hidden h-16 w-64 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold">
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
                            <p className="z-10">See more</p>
                        </Link>
                    </div>

                </div>
            </div>

            {/* email is done */}
            <div className="email flex flex-row items-center justify-center h-120  ml-5 mt-20 mr-20 mb-20 m-auto">

                <h2 className="text-4xl text-blue-800 flex-1 text-center leading-tight">
                    <span className="font-bold text-yellow-500" style={{ fontFamily: 'Brush Script MT', fontSize: '70px' }}>Newsletter</span> Stay tuned for Updates
                </h2>

                <div className="input-container flex relative h-12 min-w-80 max-w-120 bg-white rounded-3xl border-2 border-gray-300 shadow-xl">

                    <input
                        className="flex-1 border-0 border-r-0 bg-transparent p-2.5 text-base font-normal text-gray-700 outline-none transition-all"
                        type="email"
                        placeholder="Email Address"
                        required
                    />

                    <button className="email-btn flex cursor-pointer p-2 text-lg font-semibold text-black rounded-full bg-amber-300 border-2 border-amber-300 overflow-hidden transition-all hover:text-white hover:scale-110 active:scale-100">
                        <FontAwesomeIcon icon={faArrowRight} />

                        <div className="absolute inset-0 m-auto w-20 h-20 bg-blue-800 rounded-full scale-0 transition-all hover:scale-300 z-[-1]" />

                    </button>

                </div>

            </div>



            {/* staff is done */}
            <div className="staff bg-white ml-5 mr-5 mb-20">

                <div className="staff-head text-center">
                    <h1 className="text-aqua uppercase font-bold text-4xl mb-6">Our Staff</h1>
                    <h3 className="text-blue-800 text-3xl font-display w-90 mx-auto mb-10 leading-1.28">Meet our best and executive
                        <span className="block"> management team</span>
                    </h3>
                </div>

                <div className="staff-cards flex flex-wrap justify-center gap-10 mb-20">
                    {/* first card */}
                    <div className="staff-icon relative">
                        <div className="staff-card relative flex flex-col items-center">
                            <img className="rounded-full w-60 h-60 transition duration-500 hover:scale-110" src={require("../../Assets/images/staff1.jpg")} alt="" />
                            <div className="icon-container absolute inset-0 flex justify-around items-center opacity-0 transition-all duration-300 hover:opacity-100 mb-16">
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faFacebook} /></i>
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faTwitter} /></i>
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faLinkedin} /></i>
                            </div>
                            <div className="staff-details text-center mt-5">
                                <h3 className="text-blue-800 font-bold text-xl hover:text-yellow-500 hover:font-semibold">Janet Green</h3>
                                <h6 className="text-gray-500 text-base">Executive Director</h6>
                            </div>

                        </div>
                    </div>





                    {/* second card */}
                    <div className="staff-icon relative">
                        <div className="staff-card relative flex flex-col items-center">
                            <img className="rounded-full w-60 h-60 transition duration-500 hover:scale-110" src={require("../../Assets/images/staff2.jpg")} alt="" />
                            <div className="icon-container absolute inset-0 flex justify-around items-center opacity-0 transition-all duration-300 hover:opacity-100 mb-16">
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faFacebook} /></i>
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faTwitter} /></i>
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faLinkedin} /></i>
                            </div>
                            <div className="staff-details text-center mt-5">
                                <h3 className="text-blue-800 font-bold text-xl hover:text-yellow-500 hover:font-semibold">Janet Green</h3>
                                <h6 className="text-gray-500 text-base">Executive Director</h6>
                            </div>
                        </div>
                    </div>


                    {/* third card */}
                    <div className="staff-icon relative">
                        <div className="staff-card relative flex flex-col items-center">
                            <img className="rounded-full w-60 h-60 transition duration-500 hover:scale-110" src={require("../../Assets/images/staff3.jpg")} alt="" />
                            <div className="icon-container absolute inset-0 flex justify-around items-center opacity-0 transition-all duration-300 hover:opacity-100 mb-16">
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faFacebook} /></i>
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faTwitter} /></i>
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faLinkedin} /></i>
                            </div>
                            <div className="staff-details text-center mt-5">
                                <h3 className="text-blue-800 font-bold text-xl hover:text-yellow-500 hover:font-semibold">Janet Green</h3>
                                <h6 className="text-gray-500 text-base">Executive Director</h6>
                            </div>
                        </div>
                    </div>

                    {/* 4th card */}
                    <div className="staff-icon relative">
                        <div className="staff-card relative flex flex-col items-center">
                            <img className="rounded-full w-60 h-60 transition duration-500 hover:scale-110" src={require("../../Assets/images/staff4.jpg")} alt="" />
                            <div className="icon-container absolute inset-0 flex justify-around items-center opacity-0 transition-all duration-300 hover:opacity-100 mb-16">
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faFacebook} /></i>
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faTwitter} /></i>
                                <i className="text-yellow-500 text-4xl font-bold"><FontAwesomeIcon icon={faLinkedin} /></i>
                            </div>
                            <div className="staff-details text-center mt-5">
                                <h3 className="text-blue-800 font-bold text-xl hover:text-yellow-500 hover:font-semibold">Janet Green</h3>
                                <h6 className="text-gray-500 text-base">Executive Director</h6>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="staff-btn flex justify-center mt-50 mb-20">
                    <button className="relative overflow-hidden bg-yellow-500 uppercase tracking-widest text-2xl text-blue-800 font-normal rounded-lg px-5 py-2 transition duration-500 hover:bg-blue-800">
                        <a href="/about" className="relative z-10 transition duration-500 hover:text-white hover:font-bold">More Members</a>
                        <div className="absolute top-0 left-0 w-0 h-full bg-blue-800 transition-all duration-500 hover:w-full z-0"></div>
                    </button>
                </div>

            </div>

        </div >
    );
}



export default Homepage;
