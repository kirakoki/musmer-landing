import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import dollars_1 from "../assets/tech/dolar_resized.gif";
import euros_1 from "../assets/tech/euro_resized.gif";
import sterling_1 from "../assets/tech/sterling_resized.gif";
import "../slider-style.css";
import { BsFillTelephoneFill, BsPhone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

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
        className="bg-gray-900 rounded-[20px] py-4 px-8 min-h-[180px] md:px-2 flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="Currency"
          className="w-[7rem] h-[7rem] object-contain"
        />
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
        {!buying || !seling ? <div className="spinner2" /> : null}
      </div>
    </motion.div>
  </div>
);
const Hero = ({ exchangeRateData }) => {
  const [exchangeRates, setExchangeRates] = useState({
    USDtoTL: exchangeRateData[0]?.selling_price || "",
    EURtoTL: exchangeRateData[1]?.selling_price || "",
    GBPtoTL: exchangeRateData[2]?.selling_price || "",
    USDtoTLs: exchangeRateData[0]?.buying_price || "",
    EURtoTLs: exchangeRateData[1]?.buying_price || "",
    GBPtoTLs: exchangeRateData[2]?.buying_price || "",
  });

  const [mostRecent, setMostRecent] = useState("");

  const pollingInterval = 20 * 60 * 1000;

  useEffect(() => {
    const parseMostRecentCreatedOn = (data) => {
      const createdOnTimes = data.map((item) => {
        const parts = item.created_on.split(" ");
        const dateParts = parts[0].split("-");
        const timeParts = parts[1].split(":");
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
      } else {
        // console.log("No valid dates found in the data.");
      }
    };

    const updateExchangeRates = (data) => {
      setExchangeRates({
        USDtoTL: data[0]?.selling_price || "",
        EURtoTL: data[1]?.selling_price || "",
        GBPtoTL: data[2]?.selling_price || "",
        USDtoTLs: data[0]?.buying_price || "",
        EURtoTLs: data[1]?.buying_price || "",
        GBPtoTLs: data[2]?.buying_price || "",
      });
    };

    parseMostRecentCreatedOn(exchangeRateData);
    updateExchangeRates(exchangeRateData);

    const intervalId = setInterval(() => {
      parseMostRecentCreatedOn(exchangeRateData);
      updateExchangeRates(exchangeRateData);
    }, pollingInterval);

    return () => clearInterval(intervalId);
  }, [exchangeRateData]);

  const { USDtoTL, EURtoTL, GBPtoTL, USDtoTLs, EURtoTLs, GBPtoTLs } =
    exchangeRates;

  return (
    <>
      <div className={`relative w-full h-fill md:h-screen  mx-auto`} id="hero">
        <div className="flex items-center justify-center flex-col pt-20">
          <div className="hidden lg:block mt-[23rem] tns:mt-[20] sm:mt-16 lg:mt-[-2rem]   px-2">
            <h1
              className={`${styles.heroHeadText} pt-[17rem] md:pt-[5rem]  font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2`}
            >
              Musmer <span className="text-[rgb(255,112,13)]">Exchange</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              En iyi Kurlar, en hızlı, kolay ve{" "}
              <br className="sm:block hidden" />
              güvenilir döviz işlemleri.
            </p>
          </div>

          <div className="tns:mt-[30rem] mt-[20rem] md:mt-[8rem] lg:mt-[2rem] gap-[2rem] flex font-bold md:w-5/6 md:gap-10 flex-col md:flex-row justify-center md:items-center">
            <MyServiceCard
              icon={dollars_1}
              buying={USDtoTLs}
              seling={USDtoTL}
              currencyPair="USD / TL"
            />
            <MyServiceCard
              icon={euros_1}
              buying={EURtoTLs}
              seling={EURtoTL}
              currencyPair="EURO / TL"
            />
            <MyServiceCard
              icon={sterling_1}
              buying={GBPtoTLs}
              seling={GBPtoTL}
              currencyPair="GBP / TL"
            />
          </div>
          <div className="mt-4 font-semibold text-md flex flex-row">
            Son güncelleme:{" "}
            {mostRecent && mostRecent.length > 0 ? (
              mostRecent[0]?.toLocaleTimeString()
            ) : (
              <div className="spinner3" />
            )}
          </div>
          <div className="mt-[3rem] lg:hidden font-semibold text-md flex flex-col items-center space-y-2 w-full">
            <div className="flex items-center justify-center w-full">
              <a
                href="tel:+905338728888"
                className="flex flex-row items-center justify-center gap-2 w-full"
              >
                <HiOutlineDevicePhoneMobile className="text-[rgb(255,112,13)]" />
                <span className="text-sm">+90 533 872 88 88</span>
              </a>
            </div>
            <div className="flex items-center justify-center w-full">
              <a
                href="tel:+903924448822"
                className="flex flex-row items-center justify-center gap-2 w-full"
              >
                <BsFillTelephoneFill className="text-[rgb(255,112,13)]" />
                <span className="text-sm">+90 392 444 88 22</span>
              </a>
            </div>

            <div className="flex items-center justify-center w-full">
              <a
                href="mailto:info@musmerexchange.com"
                className="flex flex-row items-center justify-center gap-2 w-full"
              >
                <FiMail className="text-[rgb(255,112,13)]" />
                <span className="text-sm">info@musmerexchange.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
