import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import NewsHm from '../components/Home/NewsHm'
import WebSites from '../components/WebSites'
import Mansory from '../components/Home/Mansory'

export default function Home() {
  useEffect(() => {
    sessionStorage.clear();

  }, [])
  return (
    <>
      <div className="lg:px-20 m-14 lg:mt-5">
        <div className="bg-white pb-6 sm:pb-8 lg:pb-12" >
          <div className="mx-auto max-w-screen-2xl sm:px-4 md:px-8">


            <section className="flex flex-col justify-between  gap-10 sm:gap-10 md:gap-16 lg:flex-row">
              <div className="flex flex-col items-center justify-center text-center lg:items-start lg:py-12 lg:text-left xl:w-8/12 xl:pt-24">
                <h1 className="mb-8 text-2xl font-bold text-black sm:text-3xl md:mb-10 md:text-5xl lg:text-4xl xl:text-5xl">O'zbek Tili: so'zlar, qoidalar, va ularning tushunchalari</h1>

                <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:mb-10 lg:w-4/5  xl:text-lg">O'zbek tilining boy tarixi, grammatika qoidalari va so'zlarning mohiyatini chuqurroq tushunib, uning o'ziga xos xususiyatlari bilan tanishing. Tilni yanada yaxshiroq bilish uchun bizning resurslardan foydalaning.</p>

                <Link to="/example" className="inline-block rounded bg-[crimson] px-6 py-3 text-center text-sm font-semibold text-white outline-none  transition duration-100 hover:bg-[#ee3459] focus-visible:ring  md:text-base">Loyiha haqida</Link>

              </div>

              <div className=" overflow-hidden rounded-lg  hidden  lg:flex items-center  xl:w-5/12 pt-20" >
                {/* <img src="https://demo.gethugothemes.com/godocs/site/style-1/images/banner_hu5a797fae0707814d8a70dee3017d6ae3_113805_346x352_resize_q90_h2_box.webp" loading="lazy" alt="Photo by Fakurian Design" className=" h-96 w-full object-contain object-center" /> */}
                <img src="../image1.png" loading="lazy" alt="Photo by Fakurian Design" className=" h-96 w-full object-contain object-center" />
              </div>
            </section>
          </div>
        </div>
      </div>
      <NewsHm />
      <div className='lg:mx-10 lg:px-10  md:mb-9 flex flex-col my-10 md:gap-6 lg:my-20' >
        <h2 className='text-2xl sm:text-3xl md:text-5xl lg:text-4xl xl:text-5xl text-center lg:text-start font-bold pl-2'>Eng ko'p qidirilgan so'zlar</h2>
        <Mansory /></div>

      {/* <Hero /> */}
      <WebSites />
    </>
  )
}
