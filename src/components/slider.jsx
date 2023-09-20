import React, { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import "../slider-style.css";
function Slider() {
  const [usdPrice, setUsdPrice] = useState("");
  const [usdChange, setUsdChange] = useState("");
  const [eurPrice, setEurPrice] = useState("");
  const [eurChange, setEurChange] = useState("");
  const [gbpPrice, setGbpPrice] = useState("");
  const [gbpChange, setGbpChange] = useState("");
  const [audPrice, setAudPrice] = useState("");
  const [audChange, setAudChange] = useState("");

  const pollingInterval = 20 * 60 * 1000; //polling interval to execute every 20 minutes

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        "http://95.0.125.26:8008/api/exchangeratestoday/"
        // "https://api.musmerexchange.com/api/exchangeratestoday/"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data);
      setUsdPrice(data[2].buying_price);
      setEurPrice(data[3].buying_price);
      setGbpPrice(data[0].buying_price);
      setAudPrice(data[1].buying_price);
      // change
      setUsdChange(data[2].percentage_change);
      setEurChange(data[3].percentage_change);
      setGbpChange(data[0].percentage_change);
      setAudChange(data[1].percentage_change);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchExchangeRate();
  
    const intervalId = setInterval(fetchExchangeRate, pollingInterval);

    return () => clearInterval(intervalId);
  }, []);

  const usdChangeFloat = parseFloat(usdChange);
  const percentageChangeStyleUSD = {
    color: usdChangeFloat < 0 ? "#B30000" : "green",
  };
  const eurChangeFloat = parseFloat(eurChange);
  const percentageChangeStyleEUR = {
    color: eurChangeFloat < 0 ? "#B30000" : "green",
  };
  const gbpChangeFloat = parseFloat(gbpChange);
  const percentageChangeStyleGBP = {
    color: gbpChangeFloat < 0 ? "#B30000" : "green",
  };
  const audChangeFloat = parseFloat(audChange);
  const percentageChangeStyleAUD = {
    color: audChangeFloat < 0 ? "#B30000" : "green",
  };
  return (
    <div className="slider fixed top-[1rem] mt-[1rem]" >
      <div className="slide-track" >
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/us.png'}
        percentageChangeStyle={percentageChangeStyleUSD}
        nameItem={'USD'}
        priceItem={usdPrice}
        arrowItem={usdChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={usdChange}
        alt={'US Dollar'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/fr.png'}
        percentageChangeStyle={percentageChangeStyleEUR}
        nameItem={'EUR'}
        priceItem={eurPrice}
        arrowItem={eurChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={eurChange}
        alt={'Euros'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/gb.png'}
        percentageChangeStyle={percentageChangeStyleGBP}
        nameItem={'GBP'}
        priceItem={gbpPrice}
        arrowItem={gbpChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={gbpChange}
        alt={'Pound Sterling'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/au.png'}
        percentageChangeStyle={percentageChangeStyleAUD}
        nameItem={'AUD'}
        priceItem={audPrice}
        arrowItem={audChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={audChange}
        alt={'Australian Dollar'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/us.png'}
        percentageChangeStyle={percentageChangeStyleUSD}
        nameItem={'USD'}
        priceItem={usdPrice}
        arrowItem={usdChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={usdChange}
        alt={'US Dollar'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/fr.png'}
        percentageChangeStyle={percentageChangeStyleEUR}
        nameItem={'EUR'}
        priceItem={eurPrice}
        arrowItem={eurChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={eurChange}
        alt={'Euros'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/gb.png'}
        percentageChangeStyle={percentageChangeStyleGBP}
        nameItem={'GBP'}
        priceItem={gbpPrice}
        arrowItem={gbpChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={gbpChange}
        alt={'Pound Sterling'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/au.png'}
        percentageChangeStyle={percentageChangeStyleAUD}
        nameItem={'AUD'}
        priceItem={audPrice}
        arrowItem={audChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={audChange}
        alt={'Australian Dollar'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/us.png'}
        percentageChangeStyle={percentageChangeStyleUSD}
        nameItem={'USD'}
        priceItem={usdPrice}
        arrowItem={usdChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={usdChange}
        alt={'US Dollar'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/fr.png'}
        percentageChangeStyle={percentageChangeStyleEUR}
        nameItem={'EUR'}
        priceItem={eurPrice}
        arrowItem={eurChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={eurChange}
        alt={'Euros'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/gb.png'}
        percentageChangeStyle={percentageChangeStyleGBP}
        nameItem={'GBP'}
        priceItem={gbpPrice}
        arrowItem={gbpChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={gbpChange}
        alt={'Pound Sterling'}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/au.png'}
        percentageChangeStyle={percentageChangeStyleAUD}
        nameItem={'AUD'}
        priceItem={audPrice}
        arrowItem={audChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={audChange}
        alt={'Australian Dollar'}
        />
      </div>
    </div>
  );
}

export default Slider;

const SliderItem = ({
  picItem,
  percentageChangeStyle,
  nameItem,
  priceItem,
  arrowItem,
  changeItem,
  alt

}) => (
  <div className="slide">
    <img src={picItem} alt={alt} className="w-[1.2rem] h-[1rem]" />
    <div
      className="w-fit flex flex-row items-center justify-center"
      style={percentageChangeStyle}
    >
      <h1>{nameItem}</h1> {priceItem}
      <div className="w-fit flex flex-row items-center justify-center">
        {arrowItem}
        {changeItem} %
      </div>
    </div>
  </div>
);