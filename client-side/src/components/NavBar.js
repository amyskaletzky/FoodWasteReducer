import React from 'react'
import { Transition } from "@headlessui/react";
import { Link } from 'react-router-dom';
import { useState } from "react";
const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <nav className=" mb-5">
                <div className="max-w-7xl mx-auto pr-4 sm:pr-6 lg:pr-8">
                    <div className="flex items-center justify-center h-16">

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to='/' className="duration-300 bg-orange-200 hover:bg-orange-400 hover:text-slate-100 text-zinc-900 px-3 py-2 rounded-md text-xl m-4">Home</Link>
                                <Link to='/login' className="duration-300  bg-orange-200 hover:bg-orange-400 hover:text-slate-100 text-zinc-900 px-3 py-2 rounded-md text-xl  m-4">Login</Link>
                                <Link to='/discover' className="duration-300 bg-orange-200 hover:bg-orange-400 hover:text-slate-100 text-zinc-900 px-3 py-2 rounded-md text-xl  m-4">Discover</Link>
                                {/* <Link to='/discover' className="duration-300 bg-orange-200 hover:bg-orange-400 hover:text-slate-100 text-zinc-900 px-3 py-2 rounded-md text-xl  m-4">Discover</Link> */}
                                {/* <button type='button' className='text-lg' onClick={()=>logOut()}>Log Out</button> */}
                            </div>
                        </div>
                        {/* </div> */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-orange-200 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link to='/' className="bg-orange-200  hover:bg-orange-400 text-slate-800 hover:text-slate-100 px-3 py-2 rounded-md text-lg m-1 "> Home</Link>
                                <Link to='/login' className="bg-orange-200  hover:bg-orange-400 text-slate-800 hover:text-slate-100 px-3 py-2 rounded-md text-lg m-1 ">Login</Link>
                                <Link to='/discover' className="bg-orange-200 hover:bg-orange-400 text-slate-800 hover:text-slate-100 px-3 py-2 rounded-md text-lg  m-1">Discover</Link>

                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    )
}


export default NavBar


// return (
//     <nav className="flex items-center justify-between flex-wrap bg-violet-600 p-3">
//         <div className="flex items-center flex-shrink-0 text-white mr-6">
//             <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
//             <span className="font-semibold text-xl tracking-tight">No Food Left Behind</span>
//         </div>
//         <div className="block lg:hidden">
//             <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
//                 <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
//             </button>
//         </div>
//         <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//             <div className="text-sm lg:flex-grow">
//                 <Link to='/' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Home</Link>
//                 <Link to='/favourites' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Favourites</Link>
//                 <Link to='/discover' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Discover</Link>

//             </div>
//             <div>
//                 <Link to='/details' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Personal Details</Link>
//             </div>
//         </div>
//     </nav >
// )
// }