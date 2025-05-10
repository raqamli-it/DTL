import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { DataService } from '../config/Dataservice';
import { endpoints } from '../config/endpoints';
import { BiSolidQuoteAltRight, BiSolidQuoteAltLeft } from "react-icons/bi";
import DataContext from '../config/DataContext';


export default function DictonaryDetail() {
  const { dataCt } = useContext(DataContext);
  const route = useParams()
  const data = localStorage.getItem('Detail')
  const [apiData, setApiData] = useState(data);
  const fetchData = async () => {
    try {
      // const response = await DataService.get(endpoints.topSozlarById(route?.id));
      const response = await fetch(
        `https://dictionary.uzfati.uz/api/text/search/?prefix=${dataCt?.word}&search_type=${dataCt?.type}&text_id=${route?.id}`
      );
      const result = await response?.json();
      setApiData(result);
      // console.log("malumotlarekanda", dataCt);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }

    // Store search word in session
  };
  useEffect(() => {
    fetchData();


  }, []);
  // Using React Router v6
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='p-5 sm:px-10 md:px-20 lg:px-24 lg:mt-20'>
      <button onClick={handleGoBack} className=" text-[crimson] font-medium  rounded h-10 flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className='pb-1'>ortga qaytish</span>
      </button>


      <div className='h-[max-content] flex flex-col gap-5 sm:shadow-lg rounded-lg p-4 sm:p-6 md:p-8 lg:p-10'>
        <h1 className='lg:text-4xl text-2xl sm:text-3xl text-center flex justify-center gap-2 text-gray-600 font-bold'> <BiSolidQuoteAltLeft className='text-sm' />{apiData?.word_details?.name}<BiSolidQuoteAltRight className='text-sm mt-6' /></h1>
        <div className='flex flex-col items-start justify-center w-full gap-[3px] mt-5  '>
          <div className='text-gray-400 text-md lg:text-lg font-medium'><span className='text-gray-600 text-lg lg:text-xl font-medium'>Gramatik tavsif:</span> {apiData?.word_details?.grammatical_description} </div>
          <div className='text-gray-400 text-md lg:text-lg font-medium'><span className='text-gray-600 text-lg lg:text-xl font-medium'>Lug'aviy shakl:</span> {apiData?.word_details?.lexical_form} </div>
          <div className='text-gray-400 text-md lg:text-lg font-medium'><span className='text-gray-600 text-lg lg:text-xl font-medium'>Izoh:</span> {apiData?.word_details?.comment} </div>
        </div>
        <p className='text-gray-500  sm:text-lg'>{apiData?.content}</p>
      </div>


    </div>
  )
}

