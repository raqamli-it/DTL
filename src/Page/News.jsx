// import React, { useEffect, useState } from 'react'
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
// import { DataService } from '../config/Dataservice';
// import { endpoints } from '../config/endpoints';
// import dateFormat from "dateformat";
// import { useNavigate } from 'react-router-dom';
// export default function News() {
//   const navigate = useNavigate()
//   const [apiData, setApiData] = useState([]);
//   const fetchData = async () => {
//     try {
//       const response = await DataService.get(endpoints.yangiliklar);
//       setApiData(response);

//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();


//   }, []);

//   return (

//     <>
//       <main>
//         <section>
//           <div
//             className=" grid w-full bg-[crimson] h-96 lg:h-[32rem] place-items-center"
//           >
//             <div className="flex flex-col items-center mx-auto text-center">
//               <h1 className="text-4xl font-semibold text-white uppercase md:text-6xl">
//                 Yangiliklar
//               </h1>

//               <p className="mt-6 text-lg leading-5 text-white">Til Va Madaniyat Haqida Eng Yangi Ma'lumotlar</p>

//               <a href="#news" className="mt-8 cursor-pointer animate-bounce">
//                 <svg
//                   width="53"
//                   height="53"
//                   viewBox="0 0 53 53"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle cx="27" cy="26" r="18" stroke="white" strokeWidth="2" />
//                   <path
//                     d="M22.41 23.2875L27 27.8675L31.59 23.2875L33 24.6975L27 30.6975L21 24.6975L22.41 23.2875Z"
//                     fill="white"
//                   />
//                 </svg>
//               </a>
//             </div>
//           </div>
//           <svg
//             className="fill-[crimson]"
//             viewBox="0 0 1440 57"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M1440 0H0V57C720 0 1440 57 1440 57V0Z" />
//           </svg>
//         </section>
//       </main>
//       <div className='lg:px-24 mt-28 mb-10' id="news">
//         {apiData?.results?.length > 0 ? ( // Ma'lumot mavjudligini tekshirish
//           <ResponsiveMasonry
//             columnsCountBreakPoints={{ 350: 1, 640: 1, 750: 2, 900: 2, 1024: 3, 1439: 4 }}
//             className="p-[10px]"
//           >
//             <Masonry gutter="20px">


//               {
//                 apiData?.results?.map((e) => {
//                   return (
//                     <div className="news_card mx-10 sm:mx-32 md:mx-5 xl:mx-0    shadow-[#cccccc] shadow-xl" key={e?.id} >
//                       <div >
//                         <img className='h-[200px] w-full' src={e?.image} alt="bu surat" />
//                       </div>
//                       <div className="news_heading line-clamp-4 ">
//                         <h3>{e?.title}</h3>
//                       </div>
//                       <div className="news_flex">
//                         <div className="news_text">
//                           <p>Yangiliklar </p>
//                           <span style={{ color: "#6b1324" }}>
//                             {/* {e?.created_at} */}
//                             {dateFormat(e?.created_at, "dd.mm.yyyy")}
//                           </span>
//                         </div>
//                         <div className="news_button">
//                           <button className="button" onClick={() => navigate(`/news/${e?.id}`)}>
//                             batafsil
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })
//               }

//             </Masonry>
//           </ResponsiveMasonry>
//         ) : (
//           <div className="text-center text-gray-500">
//             No data available.
//           </div>
//         )}
//       </div>
//     </>
//   )
// }
// /////////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { DataService } from '../config/Dataservice';
// import { endpoints } from '../config/endpoints';
// import dateFormat from "dateformat";
// import { useNavigate } from 'react-router-dom';
// import Loader from '../components/Loader';

// export default function News() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]); // API ma'lumotlari
//   const [currentPage, setCurrentPage] = useState(1); // Joriy sahifa
//   const [totalPages, setTotalPages] = useState(1); // Jami sahifalar
//   const [loading, setLoading] = useState(false); // Yuklanayotgan holat
//   const [itemsPerPage] = useState(6); // Har sahifada nechta element

//   // Ma'lumotlarni olish
//   const fetchData = async (page = 1) => {
//     setLoading(true);
//     try {
//       const response = await DataService.get(`${endpoints.yangiliklar}?page=${page}&limit=${itemsPerPage}`);
//       setApiData(response.results); // Backenddan kelgan natijalar
//       setTotalPages(response.totalPages);
//       console.log("bu son pagi natsiya", response.totalPages);
//       // Backenddan jami sahifalar soni
//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UseEffect - sahifa ochilganda ma'lumotlarni olish
//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   // Sahifalash
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <main>
//         <section>
//           <div className="grid w-full bg-[crimson] h-96 lg:h-[32rem] place-items-center">
//             <div className="flex flex-col items-center mx-auto text-center">
//               <h1 className="text-4xl font-semibold text-white uppercase md:text-6xl">
//                 Yangiliklar
//               </h1>
//               <p className="mt-6 text-lg leading-5 text-white">Til Va Madaniyat Haqida Eng Yangi Ma'lumotlar</p>
//               <a href="#news" className="mt-8 cursor-pointer animate-bounce">
//                 <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="27" cy="26" r="18" stroke="white" strokeWidth="2" />
//                   <path d="M22.41 23.2875L27 27.8675L31.59 23.2875L33 24.6975L27 30.6975L21 24.6975L22.41 23.2875Z" fill="white" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//           <svg className="fill-[crimson]" viewBox="0 0 1440 57" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M1440 0H0V57C720 0 1440 57 1440 57V0Z" />
//           </svg>
//         </section>
//       </main>

//       {!loading ? (
//         <div className='lg:px-24 mt-28 mb-10' id="news">
//           {apiData?.length > 0 ? (
//             <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 1, 750: 2, 900: 2, 1024: 3, 1439: 4 }} className="p-[10px]">
//               <Masonry gutter="20px">
//                 {apiData.map((e) => (
//                   <div className="news_card mx-10 sm:mx-32 md:mx-5 xl:mx-0 shadow-[#cccccc] shadow-xl" key={e?.id}>
//                     <div>
//                       <img className='h-[200px] w-full' src={e?.image} alt="bu surat" />
//                     </div>
//                     <div className="news_heading line-clamp-4">
//                       <h3>{e?.title}</h3>
//                     </div>
//                     <div className="news_flex">
//                       <div className="news_text">
//                         <p>Yangiliklar </p>
//                         <span style={{ color: "#6b1324" }}>
//                           {dateFormat(e?.created_at, "dd.mm.yyyy")}
//                         </span>
//                       </div>
//                       <div className="news_button">
//                         <button className="button" onClick={() => navigate(`/news/${e?.id}`)}> batafsil </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </Masonry>
//             </ResponsiveMasonry>
//           ) : (
//             <div className="text-center text-gray-500">
//               No data available.
//             </div>
//           )}

//           {/* Paginatsiya tugmalari */}
//           <div className="pagination mt-4 lg:mt-20 text-center bg-black h-10">
//             {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
//               <button
//                 key={number}
//                 onClick={() => paginate(number)}
//                 className={`px-4 py-2 mx-1 rounded-md ${currentPage === number
//                   ? "bg-[crimson] text-white font-bold"
//                   : "bg-[crimson] text-black hover:bg-gray-400"
//                   }`}
//               >
//                 {number}
//               </button>
//             ))}
//           </div>

//         </div>
//       ) : (
//         <p className='flex h-full w-full items-center justify-center text-2xl min-h-[39vh]: lg:min-h-[50vh]'><Loader /></p>
//       )}
//     </>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { DataService } from '../config/Dataservice';
// import { endpoints } from '../config/endpoints';
// import dateFormat from "dateformat";
// import { useNavigate } from 'react-router-dom';
// import Loader from '../components/Loader';

// export default function News() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]); // API ma'lumotlari
//   const [currentPage, setCurrentPage] = useState(1); // Joriy sahifa
//   const [totalPages, setTotalPages] = useState(1); // Jami sahifalar
//   const [loading, setLoading] = useState(false); // Yuklanayotgan holat
//   const [itemsPerPage] = useState(6); // Har sahifada nechta element

//   // Ma'lumotlarni olish
//   const fetchData = async (page = 1) => {
//     setLoading(true);
//     try {
//       const response = await DataService.get(`${endpoints.yangiliklar}?page=${page}&limit=${itemsPerPage}`);
//       setApiData(response.results); // Backenddan kelgan natijalar
//       setTotalPages(Math.ceil(response.count / itemsPerPage)); // Backenddan jami sahifalar soni
//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UseEffect - sahifa ochilganda ma'lumotlarni olish
//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   // Sahifalash
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <main>
//         <section>
//           <div className="grid w-full bg-[crimson] h-96 lg:h-[32rem] place-items-center">
//             <div className="flex flex-col items-center mx-auto text-center">
//               <h1 className="text-4xl font-semibold text-white uppercase md:text-6xl">
//                 Yangiliklar
//               </h1>
//               <p className="mt-6 text-lg leading-5 text-white">Til Va Madaniyat Haqida Eng Yangi Ma'lumotlar</p>
//               <a href="#news" className="mt-8 cursor-pointer animate-bounce">
//                 <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="27" cy="26" r="18" stroke="white" strokeWidth="2" />
//                   <path d="M22.41 23.2875L27 27.8675L31.59 23.2875L33 24.6975L27 30.6975L21 24.6975L22.41 23.2875Z" fill="white" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//           <svg className="fill-[crimson]" viewBox="0 0 1440 57" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M1440 0H0V57C720 0 1440 57 1440 57V0Z" />
//           </svg>
//         </section>
//       </main>

//       {!loading ? (
//         <div className='lg:px-24 mt-28 mb-10' id="news">
//           {apiData?.length > 0 ? (
//             <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 1, 750: 2, 900: 2, 1024: 3, 1439: 4 }} className="p-[10px]">
//               <Masonry gutter="20px">
//                 {apiData.map((e) => (
//                   <div className="news_card mx-10 sm:mx-32 md:mx-5 xl:mx-0 shadow-[#cccccc] shadow-xl" key={e?.id}>
//                     <div>
//                       <img className='h-[200px] w-full' src={e?.image} alt="bu surat" />
//                     </div>
//                     <div className="news_heading line-clamp-4">
//                       <h3>{e?.title}</h3>
//                     </div>
//                     <div className="news_flex">
//                       <div className="news_text">
//                         <p>Yangiliklar </p>
//                         <span style={{ color: "#6b1324" }}>
//                           {dateFormat(e?.created_at, "dd.mm.yyyy")}
//                         </span>
//                       </div>
//                       <div className="news_button">
//                         <button className="button" onClick={() => navigate(`/news/${e?.id}`)}> batafsil </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </Masonry>
//             </ResponsiveMasonry>
//           ) : (
//             <div className="text-center text-gray-500">
//               No data available.
//             </div>
//           )}

//           {/* Paginatsiya tugmalari */}
//           <div className="pagination mt-4 lg:mt-20 text-center bg-black h-10">
//             <button
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 mx-1 rounded-md ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[crimson] text-white hover:bg-gray-400"}`}
//             >
//               Previous
//             </button>

//             {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
//               <button
//                 key={number}
//                 onClick={() => paginate(number)}
//                 className={`px-4 py-2 mx-1 rounded-md ${currentPage === number
//                   ? "bg-[crimson] text-white font-bold"
//                   : "bg-[crimson] text-black hover:bg-gray-400"
//                   }`}
//               >
//                 {number}
//               </button>
//             ))}

//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 mx-1 rounded-md ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[crimson] text-white hover:bg-gray-400"}`}
//             >
//               Next
//             </button>
//           </div>

//         </div>
//       ) : (
//         <p className='flex h-full w-full items-center justify-center text-2xl min-h-[39vh]: lg:min-h-[50vh]'><Loader /></p>
//       )}
//     </>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { DataService } from '../config/Dataservice';
// import { endpoints } from '../config/endpoints';
// import dateFormat from "dateformat";
// import { useNavigate } from 'react-router-dom';
// import Loader from '../components/Loader';

// export default function News() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]); // API ma'lumotlari
//   const [currentPage, setCurrentPage] = useState(1); // Joriy sahifa
//   const [totalPages, setTotalPages] = useState(1); // Jami sahifalar
//   const [loading, setLoading] = useState(false); // Yuklanayotgan holat
//   const [itemsPerPage] = useState(10); // Har sahifada nechta element (backendda limit=10)

//   // Ma'lumotlarni olish
//   const fetchData = async (page = 1) => {
//     setLoading(true);
//     try {
//       const response = await DataService.get(`${endpoints.yangiliklar}?page=${page}&limit=${itemsPerPage}`);
//       setApiData(response.results); // Backenddan kelgan natijalar
//       setTotalPages(Math.ceil(response.count / itemsPerPage)); // Backenddan jami sahifalar soni
//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UseEffect - sahifa ochilganda ma'lumotlarni olish
//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   // Sahifalash
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <main>
//         <section>
//           <div className="grid w-full bg-[crimson] h-96 lg:h-[32rem] place-items-center">
//             <div className="flex flex-col items-center mx-auto text-center">
//               <h1 className="text-4xl font-semibold text-white uppercase md:text-6xl">
//                 Yangiliklar
//               </h1>
//               <p className="mt-6 text-lg leading-5 text-white">Til Va Madaniyat Haqida Eng Yangi Ma'lumotlar</p>
//               <a href="#news" className="mt-8 cursor-pointer animate-bounce">
//                 <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="27" cy="26" r="18" stroke="white" strokeWidth="2" />
//                   <path d="M22.41 23.2875L27 27.8675L31.59 23.2875L33 24.6975L27 30.6975L21 24.6975L22.41 23.2875Z" fill="white" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//           <svg className="fill-[crimson]" viewBox="0 0 1440 57" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M1440 0H0V57C720 0 1440 57 1440 57V0Z" />
//           </svg>
//         </section>
//       </main>

//       {!loading ? (
//         <div className='lg:px-24 mt-28 mb-10' id="news">
//           {apiData?.length > 0 ? (
//             <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 1, 750: 2, 900: 2, 1024: 3, 1439: 4 }} className="p-[10px]">
//               <Masonry gutter="20px">
//                 {apiData.map((e) => (
//                   <div className="news_card mx-10 sm:mx-32 md:mx-5 xl:mx-0 shadow-[#cccccc] shadow-xl" key={e?.id}>
//                     <div>
//                       <img className='h-[200px] w-full' src={e?.image} alt="bu surat" />
//                     </div>
//                     <div className="news_heading line-clamp-4">
//                       <h3>{e?.title}</h3>
//                     </div>
//                     <div className="news_flex">
//                       <div className="news_text">
//                         <p>Yangiliklar </p>
//                         <span style={{ color: "#6b1324" }}>
//                           {dateFormat(e?.created_at, "dd.mm.yyyy")}
//                         </span>
//                       </div>
//                       <div className="news_button">
//                         <button className="button" onClick={() => navigate(`/news/${e?.id}`)}> batafsil </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </Masonry>
//             </ResponsiveMasonry>
//           ) : (
//             <div className="text-center text-gray-500">
//               No data available.
//             </div>
//           )}

//           {/* Paginatsiya tugmalari */}
//           <div className="pagination mt-4 lg:mt-20 text-center bg-black h-10">
//             <button
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 mx-1 rounded-md ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[crimson] text-white hover:bg-gray-400"}`}
//             >
//               Previous
//             </button>

//             {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
//               <button
//                 key={number}
//                 onClick={() => paginate(number)}
//                 className={`px-4 py-2 mx-1 rounded-md ${currentPage === number
//                   ? "bg-[crimson] text-white font-bold"
//                   : "bg-[crimson] text-black hover:bg-gray-400"
//                   }`}
//               >
//                 {number}
//               </button>
//             ))}

//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 mx-1 rounded-md ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[crimson] text-white hover:bg-gray-400"}`}
//             >
//               Next
//             </button>
//           </div>

//         </div>
//       ) : (
//         <p className='flex h-full w-full items-center justify-center text-2xl min-h-[39vh]: lg:min-h-[50vh]'><Loader /></p>
//       )}
//     </>
//   );
// }


import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { DataService } from '../config/Dataservice';
import { endpoints } from '../config/endpoints';
import dateFormat from "dateformat";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function News() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]); // API ma'lumotlari
  const [currentPage, setCurrentPage] = useState(1); // Joriy sahifa
  const [totalPages, setTotalPages] = useState(1); // Jami sahifalar
  const [loading, setLoading] = useState(false); // Yuklanayotgan holat
  const [itemsPerPage] = useState(10); // Har sahifada nechta element (backendda limit=10)

  // Ma'lumotlarni olish
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await DataService.get(`${endpoints.yangiliklar}?page=${page}&limit=${itemsPerPage}`);
      setApiData(response.results); // Backenddan kelgan natijalar
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
    sessionStorage.clear();

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
    <>
      <main>
        <section>
          <div className="grid w-full bg-[crimson] h-96 lg:h-[32rem] place-items-center">
            <div className="flex flex-col items-center mx-auto text-center">
              <h1 className="text-4xl font-semibold text-white uppercase md:text-6xl">
                Yangiliklar
              </h1>
              <p className="mt-6 text-lg leading-5 text-white">Til va madaniyat haqida eng yangi ma'lumotlar</p>
              <a href="#news" className="mt-8 cursor-pointer animate-bounce">
                <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="27" cy="26" r="18" stroke="white" strokeWidth="2" />
                  <path d="M22.41 23.2875L27 27.8675L31.59 23.2875L33 24.6975L27 30.6975L21 24.6975L22.41 23.2875Z" fill="white" />
                </svg>
              </a>
            </div>
          </div>
          <svg className="fill-[crimson]" viewBox="0 0 1440 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1440 0H0V57C720 0 1440 57 1440 57V0Z" />
          </svg>
        </section>
      </main>

      {!loading ? (
        <div className='lg:px-24 mt-28 mb-10' id="news">
          {apiData?.length > 0 ? (
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 1, 750: 2, 900: 2, 1024: 3, 1439: 4 }} className="p-[10px]">
              <Masonry gutter="20px">
                {apiData.map((e) => (
                  <div className="news_card mx-10 sm:mx-32 md:mx-5 xl:mx-0 shadow-[#cccccc] shadow-xl" key={e?.id}>
                    <div>
                      <img className='h-[200px] w-full' src={e?.image} alt="bu surat" />
                    </div>
                    <div className="news_heading line-clamp-4">
                      <h3>{e?.title}</h3>
                    </div>
                    <div className="news_flex">
                      <div className="news_text">
                        <p>Yangiliklar </p>
                        <span style={{ color: "#6b1324" }}>
                          {dateFormat(e?.created_at, "dd.mm.yyyy")}
                        </span>
                      </div>
                      <div className="news_button">
                        <button className="button" onClick={() => navigate(`/news/${e?.id}`)}> batafsil </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          ) : (
            <div className="text-center text-gray-500">
              No data available.
            </div>
          )}



        </div>
      ) : (
        <div className='flex h-full w-full items-center justify-center text-2xl min-h-[39vh]: lg:min-h-[50vh]'><Loader /></div>
      )}
      {/* Paginatsiya tugmalari */}
      <div className="pagination my-10 lg:my-20 flex justify-center h-10">
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
    </>
  );
}
