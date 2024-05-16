import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow"; // 3D effect
import { Navigation, Pagination } from "swiper/modules";
import Card from "./../../../BasicStyles/Card";
import { Typography } from "@mui/material";
import { Flex } from "../../../BasicStyles/Flex";
import { H1 } from "../../../BasicStyles/Text";
import { AboutUs } from "./contacts";

const AboutusComponent = ({ slides = AboutUs }) => {
  const swiperRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesCount = () => {
      const availableWidth = window.innerWidth;
      const slideWidth = availableWidth / 1; // Adjust as needed
      const updatedSlidesCount = Math.floor(availableWidth / slideWidth);
      setSlidesPerView(Math.max(updatedSlidesCount, 1));
    };

    updateSlidesCount();
    window.addEventListener("resize", updateSlidesCount);

    return () => window.removeEventListener("resize", updateSlidesCount);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (swiperRef.current) {
        // swiperRef.current.slideNext();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSlideChange = (swiper: {
    realIndex: React.SetStateAction<number>;
  }) => {
    setActiveSlideIndex(swiper.realIndex);
  };

  const handleIndicatorClick = (_index: number) => {
    if (swiperRef.current) {
      // swiperRef.current.slideTo(index);
    }
  };

  return (
    <Flex flexDirection="column" style={{ padding: "20px" }}>
      <H1 color="green" textAlign="center">
        Why AgriAI
      </H1>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={slidesPerView}
        loop={true}
        effect="coverflow"
        navigation
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        ref={swiperRef}
        style={{ width: "90vw" }}
      >
        {AboutUs.map((aboutus, index) => (
          <SwiperSlide key={index}>
            <Card
              hight="440px"
              title={aboutus.title}
              body={
                <Typography style={{ textAlign: "justify" }}>
                  {aboutus.body}
                </Typography>
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Flex alignItems="center" justifyContent="center" my={3}>
        {slides.map((_, index) => (
          <span
            key={index}
            style={{
              cursor: "pointer",
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: index === activeSlideIndex ? "#007bff" : "#ccc",
              margin: "0 5px",
            }}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default AboutusComponent;
