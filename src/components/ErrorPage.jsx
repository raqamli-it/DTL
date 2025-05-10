import { HiHome } from "react-icons/hi";
import { BiSolidMessage } from "react-icons/bi";
import React from 'react'
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center lg:px-24">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          {/* <div className="text-7xl text-[crimson] font-dark font-extrabold mb-8"> 404</div> */}
          <p className="text-xl sm:text-2xl md:text-3xl font-light leading-normal mb-8">
            Kechirasiz, siz qidirayotgan sahifani topa olmadik.
          </p>

          <div className="flex gap-4">
            <div className='text-[crimson] flex flex-col justify-between gap-3 shadow px-2 py-2 rounded-md items-center '><HiHome className=" text-3xl" />
              <Link to="/" className="text-center inline py-2 text-sm font-medium leading-5 text-white bg-[crimson] rounded-md w-20">Home</Link>
            </div>
            <div className='text-[crimson] flex flex-col justify-between gap-3 shadow px-2 py-2 rounded-md items-center'>
              <BiSolidMessage className="text-3xl" />
              <Link to="/contact" className="text-center inline py-2 text-sm font-medium leading-5 text-white bg-[crimson] rounded-md w-20">Contact</Link>

            </div>

          </div>
          {/* <a href="#" className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-md focus:outline-none bg-[crimson] active:bg-[crimson] hover:bg-red-700">back to homepage</a> */}
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img src="../NotFound.svg" className="" alt="Page not found" />
        </div>

      </div>
    </div>
  )
}
