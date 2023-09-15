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
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "http://95.0.125.26:8008/api/exchangeratestoday/"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setUsdPrice(data[0].buying_price);
        setEurPrice(data[1].buying_price);
        setGbpPrice(data[2].buying_price);
        setAudPrice(data[3].buying_price);
        // change
        setUsdChange(data[0].percentage_change);
        setEurChange(data[1].percentage_change);
        setGbpChange(data[2].percentage_change);
        setAudChange(data[3].percentage_change);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchExchangeRate();
  }, []);

  const usdChangeFloat = parseFloat(usdChange);
  const percentageChangeStyleUSD = {
    color: usdChangeFloat < 0 ? "red" : "green",
  };
  const eurChangeFloat = parseFloat(eurChange);
  const percentageChangeStyleEUR = {
    color: eurChangeFloat < 0 ? "red" : "green",
  };
  const gbpChangeFloat = parseFloat(gbpChange);
  const percentageChangeStyleGBP = {
    color: gbpChangeFloat < 0 ? "red" : "green",
  };
  const audChangeFloat = parseFloat(audChange);
  const percentageChangeStyleAUD = {
    color: audChangeFloat < 0 ? "red" : "green",
  };
  return (
    <div className="slider fixed top-[1rem] mt-[1rem]">
      <div className="slide-track">
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/us.png'}
        percentageChangeStyle={percentageChangeStyleUSD}
        nameItem={'USD'}
        priceItem={usdPrice}
        arrowItem={usdChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={usdChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/fr.png'}
        percentageChangeStyle={percentageChangeStyleEUR}
        nameItem={'EUR'}
        priceItem={eurPrice}
        arrowItem={eurChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={eurChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/gb.png'}
        percentageChangeStyle={percentageChangeStyleGBP}
        nameItem={'GBP'}
        priceItem={gbpPrice}
        arrowItem={gbpChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={gbpChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/au.png'}
        percentageChangeStyle={percentageChangeStyleAUD}
        nameItem={'AUD'}
        priceItem={audPrice}
        arrowItem={audChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={audChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/us.png'}
        percentageChangeStyle={percentageChangeStyleUSD}
        nameItem={'USD'}
        priceItem={usdPrice}
        arrowItem={usdChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={usdChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/fr.png'}
        percentageChangeStyle={percentageChangeStyleEUR}
        nameItem={'EUR'}
        priceItem={eurPrice}
        arrowItem={eurChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={eurChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/gb.png'}
        percentageChangeStyle={percentageChangeStyleGBP}
        nameItem={'GBP'}
        priceItem={gbpPrice}
        arrowItem={gbpChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={gbpChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/au.png'}
        percentageChangeStyle={percentageChangeStyleAUD}
        nameItem={'AUD'}
        priceItem={audPrice}
        arrowItem={audChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={audChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/us.png'}
        percentageChangeStyle={percentageChangeStyleUSD}
        nameItem={'USD'}
        priceItem={usdPrice}
        arrowItem={usdChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={usdChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/fr.png'}
        percentageChangeStyle={percentageChangeStyleEUR}
        nameItem={'EUR'}
        priceItem={eurPrice}
        arrowItem={eurChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={eurChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/gb.png'}
        percentageChangeStyle={percentageChangeStyleGBP}
        nameItem={'GBP'}
        priceItem={gbpPrice}
        arrowItem={gbpChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={gbpChange}
        />
        <SliderItem 
        picItem={'https://flagcdn.com/48x36/au.png'}
        percentageChangeStyle={percentageChangeStyleAUD}
        nameItem={'AUD'}
        priceItem={audPrice}
        arrowItem={audChangeFloat < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        changeItem={audChange}
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

}) => (
  <div className="slide">
    <img src={picItem} alt="currency-icon" className="w-[1.2rem] h-[1rem]" />
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