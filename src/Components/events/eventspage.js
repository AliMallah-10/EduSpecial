import React from 'react';
import { Link } from 'react-router-dom';
import "./eventspage";


function Eventspage() {


    return (
        <div className="eventspage w-full md:w-[95%] mx-auto bg-white">
            {/* Background image section */}
            <div className="background h-[300px] md:h-[200px] lg:h-[300px] xl:h-[300px] mt-20 mb-20 relative">
                <img src={require("../../Assets/images/eventsbackground.jpg")} alt="" className="image object-cover w-full h-full" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                    <h1 className="text-7xl md:text-5xl xl:text-7xl">News & Events</h1>
                    <h3 className="flex flex-row m-auto mt-10 uppercase">
                        <span className="mr-10 text-4xl md:text-3xl lg:text-4xl text-blue-500 m-auto">Home</span>
                        <span className="text-yellow-700 text-4xl md:text-3xl lg:text-4xl m-auto">News & Events</span>
                    </h3>
                </div>
            </div>

            {/* Newsletter section */}
            <div className="email flex flex-col md:flex-row items-center justify-center md:justify-between h-[120px] md:h-[100px] ml-5 mt-20 md:mt-10 mr-5 md:mr-20 mb-10 md:mb-30 mx-auto">
                <h2 className="text-blue-800 md:flex-1 text-center md:text-left leading-tight">
                    <span className="font-bold text-yellow-500 text-3xl md:text-2xl" style={{ fontFamily: 'Brush Script MT', fontSize: '70px', marginRight: '20px' }}>Next Event</span>
                    <span className="text-blue-500 text-xl md:text-lg lg:text-xl mr-4">Calendar: Spring Camp in the Forest</span>
                    <span className="text-yellow-500 text-lg md:text-base mr-4 font-bold">10.02</span>
                    <span className="text-gray-500 font-bold">10:00AM – 3:00PM</span>
                </h2>
                <button className="relative py-2 px-8 text-black text-base md:text-lg font-bold rounded-full overflow-hidden bg-yellow-500 transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 mt-5 md:mt-0">
                    Get Involved
                </button>
            </div>



            {/* Upcoming events section */}
            <div className="upcoming-events mt-20 mb-20 mv-40 mx-5 md:mx-auto bg-gray-200 flex flex-col items-center">
                <h1 className="text-aqua font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-20 mt-20">Upcoming Events</h1>
                <div className="mission-event-container flex flex-col md:flex-row flex-wrap justify-center items-center mb-20 gap-10">
                    {/* First event card */}
                    <div className="mission-event flex items-center border-2 border-black mb-4 max-h-72 md:w-[450px] lg:w-[510px] bg-white mx-2">
                        <img src={require("../../Assets/images/comingevent2.jpg")} alt="Logo" className="w-56 h-56" />
                        <div className="mission-text-container flex-1 w-full md:w-48 text-left justify-start p-4 overflow-hidden">
                            <Link to="/eventsblog">
                                <h3 className="text-aqua text-lg md:text-xl font-bold mb-3 text-center mb-4 m-auto">MOTHER/ DONATE</h3>
                            </Link>
                            <h6 className="text-yellow-500 text-lg md:text-base text-center whitespace-nowrap">
                                <span className="text-yellow-500 text-xl md:text-2xl mr-4 font-bold">10.02</span>
                                <span className="text-gray-500 font-bold">10:00AM – 3:00PM</span>
                            </h6>
                        </div>
                    </div>
                    {/* Second event card */}
                    <div className="mission-event flex items-center border-2 border-black mb-4 max-h-72 md:w-[450px] lg:w-[510px] bg-white mx-2">
                        <img src={require("../../Assets/images/comingevent3.jpg")} alt="Logo" className="w-56 h-56" />
                        <div className="mission-text-container flex-1 w-full md:w-48 text-left justify-start p-4 overflow-hidden">
                            <Link to="/eventsblogtwo">
                                <h3 className="text-aqua text-lg md:text-xl font-bold mb-3 text-center mb-4 m-auto">Dad’s Day at the School</h3>
                            </Link>
                            <h6 className="text-yellow-500 text-lg md:text-base text-center whitespace-nowrap">
                                <span className="text-yellow-500 text-xl md:text-2xl mr-4 font-bold">14.02</span>
                                <span className="text-gray-500 font-bold">11:00AM – 12:00PM</span>
                            </h6>
                        </div>
                    </div>
                    {/* Third event card */}
                    <div className="mission-event flex items-center border-2 border-black mb-4 max-h-72 md:w-[450px] lg:w-[510px] bg-white mx-2">
                        <img src={require("../../Assets/images/comingevent1.jpg")} alt="Logo" className="w-56 h-56" />
                        <div className="mission-text-container flex-1 w-full md:w-48 text-left justify-start p-4 overflow-hidden">
                            <Link to="/eventsblogthree">
                                <h3 className="text-aqua text-lg md:text-xl font-bold mb-3 text-center mb-4 m-auto">Creative Skills Development</h3>
                            </Link>
                            <h6 className="text-yellow-500 text-lg md:text-base text-center whitespace-nowrap">
                                <span className="text-yellow-500 text-xl md:text-2xl mr-4 font-bold">18.02</span>
                                <span className="text-gray-500 font-bold">11:00AM – 2:00PM</span>
                            </h6>
                        </div>
                    </div>
                    {/* Fourth event card */}
                    <div className="mission-event flex items-center border-2 border-black mb-4 max-h-72 md:w-[450px] lg:w-[510px] bg-white mx-2">
                        <img src={require("../../Assets/images/comingevent4.jpg")} alt="Logo" className="w-56 h-56" />
                        <div className="mission-text-container flex-1 w-full md:w-48 text-left justify-start p-4 overflow-hidden">
                            <Link to="/eventsblogfour">
                                <h3 className="text-aqua text-lg md:text-xl font-bold mb-3 text-center mb-4 m-auto">Spring Camp in the Forest</h3>
                            </Link>
                            <h6 className="text-yellow-500 text-lg md:text-base text-center whitespace-nowrap">
                                <span className="text-yellow-500 text-xl md:text-2xl mr-4 font-bold">22.02</span>
                                <span className="text-gray-500 font-bold">10:00AM – 3:00PM</span>
                            </h6>
                        </div>
                    </div>
                </div>
                <button className="relative py-2 px-8 text-black text-xl md:text-2xl text-base font-bold rounded-full overflow-hidden bg-yellow-500 transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 mb-20">
                    More Events
                </button>
            </div>
        </div>
    );
}

export default Eventspage;
