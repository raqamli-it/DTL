import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import dateFormat from "dateformat";
import { endpoints } from '../../config/endpoints';
import { DataService } from '../../config/Dataservice';
import { useNavigate } from 'react-router-dom';

export default function NewsHm() {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await DataService.get(endpoints.yangiliklar_boshsahifa);
      setApiData(response);

    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  useEffect(() => {
    fetchData();


  }, []);
  var settings = {

    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,

        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow !hidden md:!flex right-[0px] lg:right-[-20px] z-2" onClick={onClick}>
      <IoIosArrowForward />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow !hidden md:!flex left-[0px] lg:left-[-20px] z-2" onClick={onClick}>
      <IoIosArrowBack />
    </div>
  );

  return (
    <>
      <div className="mx-2 lg:mx-24 items-center">
        <Slider
          key={1}
          watchSlidesProgress={true}
          {...settings}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >

          {apiData?.map((e) => (
            <div className="news_card lg:mx-5 w-full my-10  shadow-[#cccccc] shadow-xl" key={e?.id}>
              <div className="news_heading line-clamp-4 ">
                <h3>{e?.title} </h3>
              </div>
              <div className="news_flex">
                <div className="news_text">
                  <p>Yangiliklar </p>
                  <span style={{ color: "#6b1324" }}>
                    {dateFormat(e?.created_at, "dd.mm.yyyy")}
                  </span>
                </div>

                <div className="news_button">
                  <button className="button" onClick={() => navigate(`/news/${e?.id}`)}>
                    batafsil
                  </button>
                </div>
              </div>
              <div className="news_img h-[200px]">
                <img src={e?.image} alt="bu news surati " className='flex justify-center items-center h-full bg-gray-200' />
              </div>
            </div>

          ))}
        </Slider>
      </div>


    </>
  )
}
