import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import dollars_1 from "../assets/tech/dollar.gif"
import euros_1 from "../assets/tech/euro.gif"
import sterling_1 from "../assets/tech/sterling.gif"


const MyServiceCard = ({ index, buying, seling, icon, currencyPair }) => (
  <div className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[20px] shadow-card"
      >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-gray-900 rounded-[20px] py-5 px-12 min-h-[180px] md:px-2 flex justify-evenly items-center flex-col"
      >
        <img src={icon} alt="Currency" className="w-16 h-16 object-contain" />
        <div className=" w-full flex flex-row items-center justify-center gap">
          <h1>{currencyPair}</h1>
        </div>
        <div className="text-white w-full text-[15px] font-bold flex flex-row text-center md:gap-0 gap-3 justify-around items-center ">
          <span className="text-green-400 ">ALIŞ</span>{" "}
          <span className="text-red-500 ">SATIŞ</span>
        </div>
        <div className="text-white w-full text-[20px] font-bold flex flex-row text-center md:gap-0 gap-3 justify-around items-center ">
          <span className="text-green-400">{buying}</span>{" "}
          <span className="text-red-500">{seling}</span>
        </div>
      </div>
    </motion.div>
  </div>
);
const Hero = () => {
  const [exchangeRates, setExchangeRates] = useState({
    USDtoTL: 0,
    EURtoTL: 0,
    GBPtoTL: 0,
    USDtoTLs: 0,
    EURtoTLs: 0,
    GBPtoTLs: 0,
  });
const [mostRecent,setMostRecent] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          // "http://95.0.125.26:8008/api/exchangeratestoday/"
          "https://api.musmerexchange.com/api/exchangeratestoday/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const createdOnTimes = data.map(item => {
          const parts = item.created_on.split(' ');
          const dateParts = parts[0].split('-');
          const timeParts = parts[1].split(':');
          const year = parseInt(dateParts[2], 10);
          const month = parseInt(dateParts[1], 10) - 1; 
          const day = parseInt(dateParts[0], 10);
          const hour = parseInt(timeParts[0], 10);
          const minute = parseInt(timeParts[1], 10);
          const second = parseInt(timeParts[2], 10);
      
          return new Date(year, month, day, hour, minute, second);
      });
      
      const mostRecentCreatedOn = createdOnTimes.sort((a, b) => b - a);

      setMostRecent(mostRecentCreatedOn);
      
      if (mostRecentCreatedOn.length > 0) {
          // console.log("Most recent createdOnTime : ", mostRecentCreatedOn[0].toLocaleString());
      } else {
          console.log("No valid dates found in the data.");
      }

        setExchangeRates({
          USDtoTL: data[2].selling_price,
          EURtoTL: data[3].selling_price,
          GBPtoTL: data[0].selling_price,
          USDtoTLs: data[2].buying_price,
          EURtoTLs: data[3].buying_price,
          GBPtoTLs: data[0].buying_price,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const { USDtoTL, EURtoTL, GBPtoTL, USDtoTLs, EURtoTLs, GBPtoTLs } = exchangeRates;
  return (
    <>
      <div className={`relative w-full h-fill md:h-screen  mx-auto`} id="hero">
        <div className="flex items-center justify-center flex-col pt-20">
        
          <div className="mt-20 px-2">
          
            <h1
              className={`${styles.heroHeadText} pt-[4rem] text-white font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2`}
            >
              Musmer <span className="text-[rgb(255,112,13)]">Exchange</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              En iyi oranlar,En hızlı kolay ve{" "}
              <br className="sm:block hidden" />
              Güvenilir Doviz İşlemleri.
            </p>

          </div>
            
          <div className="md:mt-20 sm:mt-[2rem] gap-[2rem] flex font-bold md:w-5/6 md:gap-10 flex-col md:flex-row justify-center md:items-center">
            <MyServiceCard
              icon={dollars_1}
              buying={USDtoTL}
              seling={USDtoTLs}
              currencyPair="USD / TL"
            />
            <MyServiceCard
              icon={euros_1}
              buying={EURtoTL}
              seling={EURtoTLs}
              currencyPair="EURO / TL"
            />
            <MyServiceCard
              icon={sterling_1}
              buying={GBPtoTL}
              seling={GBPtoTLs}
              currencyPair="GBP / TL"
            />
          </div>
          <p className="mt-4 font-semibold text-md">Last update time : {mostRecent ? mostRecent[0].toLocaleTimeString() : "Last update date is not available"}</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
