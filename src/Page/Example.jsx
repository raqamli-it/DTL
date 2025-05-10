import React, { useEffect, useState } from 'react'
import { DataService } from '../config/Dataservice';
import { endpoints } from '../config/endpoints';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Example() {
  const [apiData, setApiData] = useState([]);
  const [apiDataid, setApiDataid] = useState([]);
  const [danger, setDanger] = useState("");
  const fetchData = async () => {
    try {
      const response = await DataService.get(endpoints.projectCategories);
      setApiData(response || []);
      setApiDataid(response[0].id);
      console.log("Loyha ma'lumotlari idididididididididid: ", response[0].id);
      fetchDataid(response[0].id);
    } catch (error) {
      console.error("Kategoriya ma'lumotlarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    fetchData();
    sessionStorage.clear();

  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000); // 10 sekund

      return () => clearTimeout(timer); // Komponentdan chiqishda tozalash
    }
  }, [isOpen]);

  const fetchDataid = async (id) => {
    try {
      const response = await DataService.get(endpoints.projectCategoriesById(id));
      setApiDataid(response);
      console.log("BU TEAM", response);

    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  return (
    <div className='flex lg:flex-row flex-col gap-2 relative mt-10  px-5 md:px-10 lg:px-24'>
      <div className='w-full relative flex mb-4 justify-between items-center text-end pb-2 lg:hidden   h-12 border-b '>
        <span className="text-lg font-medium">Bo'lim: {apiDataid?.name}</span>
        <button
          onClick={toggleDropdown}
          className="font-medium  flex items-center justify-center p-4 h-10 rounded-md text-white  gap-2  bg-[crimson]  focus:outline-none"
        >
          Bo'limlar {isOpen ? <IoIosArrowUp className='text-[13px]  ' /> : <IoIosArrowDown className='text-[13px] mt-1' />}
        </button>
        {isOpen && (
          <ul className="absolute right-0 bottom-[-60px]  mt-2 w-48 bg-white text-black shadow-md rounded z-50">
            {apiData?.map((e) =>
              <li className="block px-4 py-2 rounded-sm hover:bg-gray-100 border-b hover:border-b-0" key={e?.id}
                onClick={() => fetchDataid(e?.id)}
              >
                <a rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                  <span className=' font-medium'>{e?.name}</span>
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
      <div className='relative lg:w-44 xl:w-60 min-h-[70vh] border-r hidden lg:block'>
        <div className="flex sticky flex-col h-full p-3 lg:w-40 xl:w-60 ">
          <div className="space-y-3">

            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                {apiData?.map((e) =>
                  <li className="rounded-sm hover:bg-gray-100 border-b hover:border-b-0" key={e?.id}
                    onClick={() => fetchDataid(e?.id)}
                  >
                    <a rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                      <span className='lg:text-lg font-medium text-gray-700'>{e?.name}</span>
                    </a>
                  </li>
                )}

              </ul>
            </div>
          </div>

        </div>
      </div>

      <div className='!h-full w-full max-h-[100vh] mt-5 overflow-auto scroll-auto'

      >
        {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore minima suscipit vel assumenda dolor nostrum repudiandae culpa maiores, eius reiciendis. */}
        {apiDataid?.loyhalar?.map((e) =>
          <p dangerouslySetInnerHTML={{ __html: e?.tasnif }} key={e?.id}>

          </p>
        )

        }
        {apiDataid ? "" : (<img src="../../public/imagess.svg" alt="" />)}
      </div>
    </div>
  )
}
// import React, { useEffect, useState } from "react";

// export default function Example() {
//   const [apiData, setApiData] = useState([]); // Kategoriyalar uchun state
//   const [apiDataid, setApiDataid] = useState(null); // Tanlangan kategoriya ma'lumotlari
//   const [loading, setLoading] = useState(false); // Yuklanish holati

//   // Kategoriyalarni olish
//   const fetchData = async () => {
//     try {
//       const response = await DataService.get(endpoints.projectCategories);
//       setApiData(response);

//       // Default ma'lumotlar
//       if (response.length > 0) {
//         const defaultCategoryId = response[0].id;
//         fetchDataid(defaultCategoryId);
//       }
//     } catch (error) {
//       console.error("Kategoriya ma'lumotlarini olishda xatolik:", error);
//     }
//   };

//   // ID bo'yicha ma'lumotlarni olish
//   const fetchDataid = async (id) => {
//     try {
//       setLoading(true); // Yuklanish jarayonini boshlash
//       const response = await DataService.get(endpoints.projectCategoriesById(id));
//       setApiDataid(response); // Ma'lumotni saqlash
//       setLoading(false); // Yuklanish tugadi
//     } catch (error) {
//       setLoading(false);
//       console.error("Kategoriya ma'lumotlarini olishda xatolik:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Komponent yuklanganida kategoriyalarni olish
//   }, []);

//   return (
//     <div className="flex relative lg:px-24">
//       {/* Sidebar */}
//       <div className="relative lg:w-72">
//         <div className="flex sticky flex-col h-full p-3 w-60">
//           <div className="space-y-3">
//             <div className="flex-1">
//               <ul className="pt-2 pb-4 space-y-1 text-sm">
//                 {apiData?.map((category) => (
//                   <li
//                     className="rounded-sm hover:bg-gray-100"
//                     key={category?.id}
//                     onClick={() => fetchDataid(category?.id)} // ID ni fetch funksiyaga berish
//                   >
//                     <a
//                       rel="noopener noreferrer"
//                       className="flex items-center p-2 space-x-3 rounded-md"
//                     >
//                       <span className="lg:text-lg font-medium text-gray-700">
//                         {category?.name}
//                       </span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Ma'lumotlar bo'limi */}
//       <div className="!h-full w-full flex items-center justify-center text-black">
//         {loading ? (
//           <p>Yuklanmoqda...</p> // Yuklanish jarayonida bildirishnoma
//         ) : apiDataid ? (
//           <div>
//             <h2 className="text-2xl font-bold">{apiDataid?.name}</h2>
//             <p className="mt-2">{apiDataid?.description || "Tavsif mavjud emas"}</p>
//           </div>
//         ) : (
//           <p>Ma'lumot mavjud emas. Kategoriya tanlang.</p>
//         )}
//       </div>
//     </div>
//   );
// }
