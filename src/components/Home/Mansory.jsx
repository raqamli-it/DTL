import React, { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { DataService } from '../../config/Dataservice';
import { endpoints } from '../../config/endpoints';
import { Link } from 'react-router-dom';

export default function Mansory() {
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await DataService.get(endpoints.topSozlar);
      setApiData(response);

    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  useEffect(() => {
    fetchData();


  }, []);
  return (
    <>
      {apiData?.top_search_histories?.length > 0 ? ( // Ma'lumot mavjudligini tekshirish

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 2, }}
          className="p-[10px]">
          <Masonry gutter="20px"
            className='team'
          >
            {
              apiData?.top_search_histories?.map((e) => {
                return (
                  <div key={e?.id} className='flex flex-col gap-[10px]  p-10  shadow-[#cccccc] shadow-xl bg-white rounded-md' style={{ marginTop: '50px' }}>
                    <h3 className='text-left text-[20px] md:text-[24px] font-bold flex flex-col gap-0 md:flex-row md:gap-3'> <span className='capitalize'>{e?.word}</span> <span className='text-[#1302056a] '>qidiruvlar soni ({e?.count})</span></h3>
                    <p className='text-left text-[18px] text-gray-500 text-medium'>{e?.text} <Link to="/" className="text-blue-500 hover:cursor-pointer hover:underline pl-2">ko'proq...</Link></p>
                  </div>)
              })
            }

          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className="text-center text-gray-500">
          No data available.
        </div>
      )}
    </>
  )
}
