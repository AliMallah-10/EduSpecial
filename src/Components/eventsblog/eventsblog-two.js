import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faChevronDown, faChevronUp, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function EventsBlogTwo() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="eventspage w-full md:w-11/12 lg:w-11/12 xl:w-11/12 mx-auto bg-white">

            {/* Background image section */}
            <div className="background h-96 md:h-80 lg:h-96 xl:h-96 mt-20 mb-20 relative">
                <img src={require("../../Assets/images/dad.jpg")} alt="" className="image object-cover w-full h-full" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                    <h1 className="text-5xl md:text-4xl xl:text-5xl font-bold whitespace-nowrap">Mother/Daughter Home Class</h1>
                    <h3 className="flex flex-row m-auto mt-10 uppercase">
                        <span className="mr-10 text-4xl md:text-3xl xl:text-4xl text-blue-500 font-bold">Home</span>
                        <span className="mr-10 text-4xl md:text-3xl xl:text-4xl text-white font-bold">Events</span>
                        <span className="mr-10 text-4xl md:text-3xl xl:text-4xl text-white font-bold">...</span>
                        <span className="text-yellow-700 text-2xl md:text-xl xl:text-2xl font-bold whitespace-nowrap">Mother/Daughter Home Class</span>
                    </h3>
                </div>
            </div>

          
            {/* Upcoming events section */}
            <div className="upcoming-events mt-20 mb-20 mx-auto bg-white flex flex-col items-center">
                <img src={require("../../Assets/images/dad2.jpg")} alt="Logo" className="w-full md:w-11/12 lg:w-10/12 xl:w-9/12 h-auto mb-5" />
                <p className="text-gray-500 text-justify font-bold leading-[1.8em] md:w-11/12 lg:w-10/12 xl:w-9/12 mb-10">
                    Also keep track of your life and your kids' backyard. But eleifend ultricies smile, or makeup was a good thing. It's the end of homework.
                    Don't invest in mass chocolate or advertising, you just want it from time to time.
                    Curabitur places the borders of the lake. Everyone has great vehicles, someone is ecologically wise.
                    As has been said many times. Some of the easy ones are pure chocolate, but we drink the yeast of laughter.
                    For it needs to be made a trigger. However, the concern was that it was a free cartoon, but it was made with limits.
                    Now, it is not important to put the element of that asset as a burden. Some ugly, soft football quiver and, placerat and bow.
                    The protein of the diet, the protein in the author and, the element of justice.
                    A football club is now being targeted by the author.
                </p>

                <p className="text-gray-500 text-justify font-bold leading-[1.8em] md:w-11/12 lg:w-10/12 xl:w-9/12 mb-10">
                    The earth and the environment are important for living. Maecenas ut diam nibh The poison and the pain should be expected.
                    Tomorrow from the players in the pure vestibule. Aenean flatters, bed in protein sometimes, great mauris fermentum laughter, not shot from what ultricies tellus.
                    But not from the valley, nor sad except. Aeneas is always a vehicle.
                    This is my sadness, I don't have a pillow, I don't have a pillow.
                </p>
                {/* Dropdown */}
                <div className="relative inline-block">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="py-2 px-8 text-black text-base font-bold rounded-full overflow-hidden bg-yellow-500 transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 uppercase mb-20 relative left-0"
                    >
                        <i className="mr-3">
                            <FontAwesomeIcon icon={faCalendarPlus} />
                        </i>
                        Add to Calendar
                        <FontAwesomeIcon icon={dropdownOpen ? faChevronUp : faChevronDown} className="ml-2" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border rounded-lg shadow-lg">
                            <ul>
                                <li className="py-2 px-4 hover:bg-gray-100">
                                    <a href="/" className="block text-aqua text-center">Google Calendar</a>
                                </li>
                                <li className="py-2 px-4 hover:bg-gray-100">
                                    <a href="/" className="block text-aqua text-center">iCalendar</a>
                                </li>
                                <li className="py-2 px-4 hover:bg-gray-100">
                                    <a href="/" className="block text-aqua text-center">Outlook 365</a>
                                </li>
                                <li className="py-2 px-4 hover:bg-gray-100">
                                    <a href="/" className="block text-aqua text-center">Outlook Live</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Calendar form */}
            <div className="flex flex-col md:flex-row justify-between calender-form md:mx-8">
                {/* Calendar details form */}
                <div className="flex-1 calender-details ml-8 mr-2">
                    <h2 className="text-xl text-blue-500 font-bold mb-2">Details</h2>
                    <div>
                        <p className="text-yellow-500 font-serif italic">Start:</p>
                        <p className="text-gray-500 mb-2">December 3 @ 10:00 am</p>
                        <p className="text-yellow-500 font-serif italic">End:</p>
                        <p className="text-gray-500 mb-2">January 4 @ 12:30 pm</p>
                        <p className="text-yellow-500 font-serif italic">Event Category:</p>
                        <p className="text-gray-500 mb-2">
                            <a href="/" className="text-aqua hover:underline ">events</a>
                        </p>
                    </div>
                </div>

                {/* Calendar organizer form */}
                <div className="flex-1 calender-organizer mr-2">
                    <h2 className="organizer-title text-xl text-blue-500 font-bold mb-2">Organizer</h2>
                    <div>
                        <p className="organizer-name mb-2 text-aqua">Cindy Jefferson</p>
                        <p className="organizer-tel-label text-yellow-500 font-serif italic">Phone</p>
                        <p className="organizer-tel text-gray-500 mb-2">+1 (800)-123-4567</p>
                        <p className="organizer-email-label text-yellow-500 font-serif italic">Email</p>
                        <p className="organizer-email text-gray-500">info@yoursite.com</p>
                    </div>
                </div>

                {/* Contact details: address, phone number */}
                <div className="flex-1 contact-details">
                    <h2 className="text-xl text-blue-500 font-bold">Venue</h2>
                    <div>
                        <p className=" text-yellow-500 font-serif italic">Venue:</p>
                        <p className="text-gray-500 mb-2">Lighthouse School</p>
                        <p className=" text-yellow-500 font-serif italic">Address:</p>
                        <p className="text-gray-500 mb-2">
                            <address className="events-address">
                                <span className="tribe-address">
                                    <span className="tribe-locality">Chicago</span>
                                    <span className="tribe-delimiter">, </span>
                                    <abbr className="tribe-region tribe-events-abbr" title="Illinois">IL</abbr>
                                    <span className="tribe-postal-code">60623 </span>
                                    <span className="tribe-country-name">United States</span>
                                </span>
                            </address>
                        </p>
                        <p className=" text-yellow-500 font-serif italic">Phone:</p>
                        <p className="text-gray-500">800-123-4567</p>
                    </div>
                </div>

                {/* Map */}
                <div className="flex-1 map-events mr-4 mb-4 ml-4">
                    <div className="map">
                        <div className="map-pic">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3331.8937058749625!2d35.48592567568773!3d33.3738409734201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDIyJzI1LjgiTiAzNcKwMjknMTguNiJF!5e0!3m2!1sen!2slb!4v1700036253916!5m2!1sen!2slb"
                                height="300"
                                width="300"
                                style={{ border: "0" }}
                                title="Google Maps"
                                allowFullScreen
                            ></iframe>
                            <div className="map-hover">
                                <i className="fa fa-map-marker"></i>
                                <div className="map-hover-inner">
                                    <h5 className="mt-2 text-center text-aqua font-serif italic">
                                        Chicago, IL60623 United States
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Events buttons */}
            <div className="events-buttons flex justify-between mt-10 mx-4">
                {/* Back button */}
                <Link to="/eventsblog" className="back-button py-2 px-8 text-black text-base font-bold rounded-full overflow-hidden bg-yellow-500 transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 uppercase mb-20 flex items-center ml-10">
                    <i className="mr-3"><FontAwesomeIcon icon={faArrowLeft} /></i>
                    <span> Mother/Daughter Home Class</span>
                </Link>
                {/* Next button */}
                <Link to="/eventsblogthree" className="next-button py-2 px-8 text-black text-base font-bold rounded-full overflow-hidden bg-yellow-500 transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 uppercase mb-20 flex items-center mr-10">
                    <span className="mr-3">Creative Skills Development </span>
                    <i><FontAwesomeIcon icon={faArrowRight} /></i>
                </Link>
            </div>
        </div>
    );
}


export default EventsBlogTwo;
