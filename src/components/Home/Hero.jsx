import React, { useEffect, useState } from 'react'
import { endpoints } from '../../config/endpoints';
import { DataService } from '../../config/Dataservice';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from '../Loader';

export default function Hero() {
  // const [apiData, setApiData] = useState([]);
  // const fetchData = async () => {
  //   try {
  //     const response = await DataService.get(endpoints.foydalisaytlar);
  //     setApiData(response);
  //     console.log("bu herodan", response);

  //   } catch (error) {
  //     console.error("Error fetching category data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();

  // }, []);
  const [apiData, setApiData] = useState([]); // API ma'lumotlari
  const [currentPage, setCurrentPage] = useState(1); // Joriy sahifa
  const [totalPages, setTotalPages] = useState(1); // Jami sahifalar
  const [loading, setLoading] = useState(false); // Yuklanayotgan holat
  const [itemsPerPage] = useState(10); // Har sahifada nechta element (backendda limit=10)

  // Ma'lumotlarni olish
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await DataService.get(`${endpoints.foydalisaytlar}?page=${page}&limit=${itemsPerPage}`);
      setApiData(response); // Backenddan kelgan natijalar
      setTotalPages(Math.ceil(response.count / itemsPerPage)); // Backenddan jami sahifalar soni
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect - sahifa ochilganda ma'lumotlarni olish
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Sahifalash
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination logic
  const getPaginationPages = () => {
    let pages = [];
    if (totalPages <= 5) {
      // 1 dan 5 gacha bo'lsa, barcha sahifalar ko'rsatiladi
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sahifalar soni 5 dan ko'proq bo'lsa
      if (currentPage <= 3) {
        // Agar biz birinchi 3 sahifalardamiz
        pages = [1, 2, 3, 4, 5];
      } else if (currentPage >= totalPages - 2) {
        // Agar oxirgi 3 sahifalardamiz
        pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        // O'rtadagi sahifalarda
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
    return pages;
  };
  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto lg:min-h-[50vh] sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Foydali havolalar</h2>
        </div>

        {!loading ? (
          <div className="grid grid-cols-1 gap-6 mt-12 lg:mt-16 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {
              apiData?.results?.map((e) =>

                <a className="overflow-hidden bg-white rounded shadow cursor-pointer" href={e?.link} key={e?.id} target='_blank'>
                  <div className="p-8">
                    <div className="flex items-center">
                      <img className="flex-shrink-0 w-12 h-12 rounded-md" src={e?.image} alt="bu surat" />
                      <div className="ml-5 mr-auto">
                        <p className="text-xl font-semibold text-black">{e?.title}</p>
                        <p className="mt-px text-sm text-gray-600">{e?.last_title} </p>
                      </div>
                      <svg className="hidden w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <p className="text-base leading-relaxed text-gray-600 mt-7">{e?.text}</p>
                  </div>
                </a>
              )}

          </div>
        ) : (
          <div className='flex h-full w-full items-center justify-center text-2xl min-h-[50vh] lg:min-h-[50vh]'><Loader /></div>

        )
        }


      </div>
      {/* Paginatsiya tugmalari */}
      <div className="pagination my-10 lg:my-20 lg:mb-0 flex justify-center h-10">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-2 py-2 mx-1 rounded-md ${currentPage === 1 ? "bg-[#c5566c] cursor-not-allowed text-white" : "bg-[crimson] text-white hover:bg-[#b83c55]"}`}
        >
          <IoIosArrowBack className='text-2xl' />
        </button>

        {getPaginationPages().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== '...' && paginate(page)}
            className={`px-4 py-2 mx-1 rounded-md ${page === currentPage
              ? "bg-[crimson] text-white font-bold "
              : "bg-[crimson] text-white hover:bg-[#b83c55]"}"
                }`}
          >

            <span
              className={`${page === currentPage
                ? " font-extrabold"
                : "font-normal"}"
                }`}
            >{page}</span>
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-2 py-2 mx-1 rounded-md ${currentPage === totalPages ? "bg-[#c5566c] cursor-not-allowed text-white" : "bg-[crimson] text-white hover:bg-[#b83c55]"}`}
        >
          <IoIosArrowForward className="text-2xl" />
        </button>
      </div>
    </section>


  )
}
