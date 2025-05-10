import React, { useEffect, useState } from 'react'
import { DataService } from '../config/Dataservice';
import { endpoints } from '../config/endpoints';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTelegram } from 'react-icons/fa';
import dateFormat from "dateformat";



export default function NewsDetail() {
  const route = useParams()

  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await DataService.get(endpoints.newsById(route?.id));
      setApiData(response);
      console.log("BU TEAM", response);

    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    sessionStorage.clear();


  }, []);



  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = apiData?.title ? `**${apiData.title.toUpperCase()}**` : "**MAQOLA NOMI**";
  const shareText = encodeURIComponent(
    `${shareTitle}\n\n${apiData?.text?.substring(0, 200)}... \n\n 🔗 Rasm: ${apiData?.image}`
  );


  return (

    <div className="w-full min-h-screen flex flex-col items-center justify-start p-6 sm:p-8 md:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-5xl  rounded-lg overflow-hidden"
      >
        {/* News Header */}
        <div className="relative w-full h-[400px] sm:h-128 bg-cover bg-center"
          style={{ backgroundImage: `url(${apiData?.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
          <div className="absolute inset-x-0 bottom-6 sm:bottom-12 text-center text-white">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold tracking-wide"
            >
              {apiData?.title}
            </motion.h1>
          </div>
        </div>

        {/* News Content */}
        <div className="p-6 sm:p-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 mb-6"
          >
            <span className="font-semibold text-gray-800">Chop etilgan: </span>
            {dateFormat(apiData?.created_at, "dd.mm.yyyy")}

          </motion.p>
          <div className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
            <p>{apiData?.text}</p>
          </div>

          {/* Share Section */}
          <div className="mt-6 flex justify-start items-center space-x-4">
            <motion.a
              href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
              // href={telegramShareLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[crimson] text-white px-5 py-3 rounded-lg hover:bg-[#dc143c] transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              <FaTelegram className="lg:mr-2 text-lg" /> <span className='hidden lg:block'>Share on Telegram</span>
            </motion.a>
          </div>
        </div>
      </motion.div>


    </div>
  )
}




// import React, { useState } from "react";

// function NewsDetail() {
//   const [query, setQuery] = useState(""); // Foydalanuvchi kiritgan matn
//   const [data, setData] = useState(null); // API dan kelgan ma'lumot
//   const [error, setError] = useState(null); // Xatolikni ushlab turadi
//   const [loading, setLoading] = useState(false); // Yuklanish holati

//   const handleSearch = () => {
//     if (!query.trim()) {
//       setError("Qidiruv uchun biror narsa kiriting."); // Bo'sh qidiruv matni
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setData(null);

//     fetch(`https://dictionary.uzfati.uz/api/text/search/?q=${query}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.status === 204 || response.headers.get("content-length") === "0") {
//           throw new Error("Natijalar topilmadi."); // Bo'sh javobni ushlash
//         }

//         const contentType = response.headers.get("content-type");
//         if (!contentType || !contentType.includes("application/json")) {
//           throw new Error("Serverdan noto‘g‘ri formatdagi javob keldi.");
//         }

//         return response.json();
//       })
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Matn Qidiruvi</h1>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Qidiruv matnini kiriting"
//         style={{
//           padding: "10px",
//           marginRight: "10px",
//           width: "300px",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//         }}
//       />
//       <button
//         onClick={handleSearch}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         Qidirish
//       </button>

//       {loading && <p>Yuklanmoqda...</p>}
//       {error && <p style={{ color: "red" }}>Xato: {error}</p>}
//       {data && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Natijalar:</h2>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NewsDetail;
