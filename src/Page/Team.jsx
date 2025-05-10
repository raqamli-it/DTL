import React, { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { DataService } from '../config/Dataservice';
import { endpoints } from '../config/endpoints';
// import Seo from '../components/Seo';



export default function Team() {
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await DataService.get(endpoints.xodimlar);
      setApiData(response);

    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    sessionStorage.clear();


  }, []);
  return (
    <div>
      {/* <Seo
        title="Ilmiy xodimlar bo'limi"
        image="./image.png"
        discription="ilmiy xodimlar haqida to'liq malumot olishingiz mumkin "
      /> */}
      <h2 className='text-2xl sm:text-3xl md:text-4xl  lg:text-5xl xl:text-6xl 2xl:text-7xl  mt-20 font-normal text-center mb-20 '> Ilmiy Xodimlar Va  Loyha <br />  Qatnashchilari
      </h2>
      <div className='relative mb-20'
      >

        <div className='h-[150px] bg-[crimson] top-28 lg:top-36 absolute w-full z-0'></div>
        <div className="relative sm:px-14 md:px-24 lg:px-24  xl:px-32 z-2">
          {apiData?.results?.length > 0 ? ( // Ma'lumot mavjudligini tekshirish
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 640: 2, 1023: 3, 1280: 4 }}
              className="lg:p-[10px] px-0"
            >
              <Masonry gutter="50px" className='team'>

                {
                  apiData?.results?.map((e) => {

                    return (
                      <div className="space-y-4 text-center" key={e?.id} >
                        <img className="w-64 h-80 sm:h-96 mx-auto object-cover rounded-[30px] md:w-64 md:h-80 lg:w-72 lg:h-80"
                          src={e?.image} alt="man" loading="lazy" width="1000" height="667" />
                        <div className='flex flex-col gap-5'>
                          <h4 className="text-2xl ">{e?.full_name}</h4>
                          <span className="block text-xl font-light">{e?.position}</span>
                        </div>
                      </div>)
                  })
                }

              </Masonry>
            </ResponsiveMasonry >
          ) : (
            <div className="text-center text-gray-500">
              No data available.
            </div>
          )}
        </div>

      </div ></div>
  )
}
