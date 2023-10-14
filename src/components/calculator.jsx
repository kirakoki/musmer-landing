import { parse } from "dotenv";
import React, { useEffect, useState } from "react";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";

function Calculator({ exchangeRateData }) {
  
  useEffect(() => {
    // console.log('Exchange Rate Data in Calculator:', exchangeRateData);
  }, [exchangeRateData]);
  const [inputCurrency, setInputCurrency] = useState("TRY");
  const [inputAmount, setInputAmount] = useState("0.00");
  const [outputCurrency, setOutputCurrency] = useState("GBP");
  const [outputAmount, setOutputAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [preventApiCall, setPreventApiCall] = useState(false); 


  const [usdBuyingPrice, setUsdBuyingPrice] = useState('');
  const [usdSellingPrice, setUsdSellingPrice] = useState('');
  const [eurBuyingPrice, setEurBuyingPrice] = useState('');
  const [eurSellingPrice, setEurSellingPrice] = useState('');
  const [gbpBuyingPrice, setGbpBuyingPrice] = useState('');
  const [gbpSellingPrice, setGbpSellingPrice] = useState('');
  


  const handleInputAmountChange = (value) => {
    setInputAmount(value);
  };

  useEffect(() => {
    setOutputAmount(calculateExchange());
  }, [inputAmount, exchangeRate]);


  const pollingInterval = 20 * 60 * 1000; //polling interval to execute every 20 minutes

  
  const fetchExchangeRate = async () => {
    try {
      if (!preventApiCall) { // Check the flag before making the API call
        const response = await fetch(
          "https://api.musmerexchange.com/api/exchangeratestoday/",
          {
            method: "GET",
            headers: {
              Authorization: `token ${import.meta.env.VITE_REACT_APP_AUTH_TOKEN}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const desiredOrder = ["USD", "EUR", "GBP", "AUD"];

        const sortedData = data.sort((a, b) => {
          const aIndex = desiredOrder.indexOf(a.currency__name);
          const bIndex = desiredOrder.indexOf(b.currency__name);
          return aIndex - bIndex;
        });
        let s_usd = parseFloat(sortedData[0].selling_price)
        let s_euro = parseFloat(sortedData[1].selling_price)
        let b_usd = parseFloat(sortedData[0].buying_price)
        let b_euro = parseFloat(sortedData[1].buying_price)
        let b_gbp = parseFloat(sortedData[2].buying_price);
        let s_gbp = parseFloat(sortedData[2].selling_price);
        

setUsdBuyingPrice(b_usd)
setUsdSellingPrice(s_usd)
setEurBuyingPrice(b_euro)
setEurSellingPrice(s_euro)
setGbpBuyingPrice(b_gbp)
setGbpSellingPrice(s_gbp)
        // console.log("Sorted Data:", sortedData);
        


        const currencyPair = `${inputCurrency}-${outputCurrency}`;
        if (currencyPair === "TRY-USD") {
          setExchangeRate(sortedData[0].selling_price);
        } else if (currencyPair === "TRY-EUR") {
          setExchangeRate(sortedData[1].selling_price);
        } else if (currencyPair === "TRY-GBP") {
          setExchangeRate(sortedData[2].selling_price);
        } else if (currencyPair === "USD-TRY") {
          setExchangeRate(sortedData[0].buying_price);
        } else if (currencyPair === "EUR-TRY") {
          setExchangeRate(sortedData[1].buying_price);
        } else if (currencyPair === "GBP-TRY") {
          setExchangeRate(sortedData[2].buying_price);
        } else if (currencyPair === "USD-EUR"){
          let n_rate = usdBuyingPrice / eurSellingPrice
        // console.log("n_Rate: ", n_rate);
          setExchangeRate(n_rate);
        }
        else if (currencyPair === "EUR-USD"){
          let n_rateb = eurBuyingPrice / usdSellingPrice
        // console.log("n_Rate: ", n_rateb);
          setExchangeRate(n_rateb);
        } else if (currencyPair === "GBP-USD"){
          let n_rateg = gbpBuyingPrice / usdSellingPrice
        // console.log("n_Rate: ", n_rateg);
          setExchangeRate(n_rateg);
        } else if (currencyPair === "USD-GBP"){
          let n_ratei = usdBuyingPrice / gbpSellingPrice
        // console.log("n_Rate: ", n_ratei);
          setExchangeRate(n_ratei);
        } else if (currencyPair === "GBP-EUR"){
          let n_ratep = gbpBuyingPrice / eurSellingPrice
        // console.log("n_Rate: ", n_ratep);
          setExchangeRate(n_ratep);
        } else if (currencyPair === "EUR-GBP"){
          let n_ratez = eurBuyingPrice / gbpSellingPrice
        // console.log("n_Rate: ", n_ratez);
          setExchangeRate(n_ratez);
        } else {
          let rate = 1;
          setExchangeRate(rate);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();

    const intervalId = setInterval(fetchExchangeRate, pollingInterval);

    return () => clearInterval(intervalId);
  }, [inputCurrency, outputCurrency]);

  useEffect(() => {
    calculateExchange();
  }, [exchangeRate]);

  const calculateExchange = () => {
    if (!exchangeRate) return;

    const inputAmountValue = parseFloat(inputAmount);
    let calculatedAmount = 0;

    switch (`${inputCurrency}-${outputCurrency}`) {
      case "TRY-USD":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue / exchangeRate;
        break;
      case "TRY-EUR":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue / exchangeRate;
        break;
      case "TRY-GBP":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue / exchangeRate;
        break;
      case "USD-TRY":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      case "EUR-TRY":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      case "GBP-TRY":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      case "USD-EUR":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      case "EUR-USD":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      case "USD-GBP":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      case "GBP-USD":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      case "EUR-GBP":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      case "GBP-EUR":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRate;
        break;
      default:
        // Handle other currency pairs if needed
        break;
    }

    return calculatedAmount.toFixed(2);
  };

  const handleReverseClick = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
    setPreventApiCall(true); // Set the flag to prevent API call
  };

 

  return (
    <div className="w-full bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[20px] shadow-card flex-grow">
      <div className="bg-gray-900 rounded-[20px] py-5  max-px-12 min-h-[180px] px-2 flex justify-evenly items-center flex-col flex-grow">
        <div className="p-[10px] rounded-[20px] flex flex-col items-center">
          <div className="flex gap-4 rounded-[20px] ">
            <div className="bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[10px] shadow-card h-min">
              <select
                value={inputCurrency}
                onChange={(e) => setInputCurrency(e.target.value)}
                className="font-bold text-1.5rem p-1 bg-white text-black rounded-md"
                name=""
                id="input_currency"
              >
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="TRY">TRY</option>
              </select>
            </div>
            <div className="w-full bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[10px] shadow-card h-min max-w-[6rem] md:w-[7.5rem]">
              <input
                aria-label="input an Amount"
                type="text"
                value={inputAmount}
                onChange={(e) => handleInputAmountChange(e.target.value)}
                className="color-zinc-950 px-2 py-[0.25rem] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[5rem] sm:w-full rounded-md sm:text-sm focus:ring-1"
              />
            </div>
          </div>
          <div className="flex w-full text-center items-center justify-center p-5 ">
            <button
            name="reverse"
              aria-label="exchange_btn"
              // onClick={handleReverseClick}
              className="flex items-center justify-center rounded-full p-2 w-[4rem] h-[4rem] text-[2rem] font-bold border-solid border-2 border-bg-gradient-to-r from-white to-orange-500 active:translate-y-0 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 active:shadow-md "
              id="exchange"
            >
              <HiMiniArrowPathRoundedSquare className="" />
            </button>
          </div>
          <div className="flex gap-4">
            <div className=" bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[10px] shadow-card h-min">
              <select
                className="font-bold p-1 bg-white text-black rounded-md"
                id="output_currency"
                value={outputCurrency}
                onChange={(e) => setOutputCurrency(e.target.value)}
              >
                <option value="EUR">EUR</option>
                <option value="TRY">TRY</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div className="w-full bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[10px] shadow-card h-min max-w-[6rem] md:w-[7.5rem]">
              <span
                readOnly
                type="text"
                className="color-zinc-950 px-2 py-[0.25rem] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block min-w-[5rem] w-full rounded-md sm:text-sm focus:ring-1 min-h-[2rem]"
              >
                {outputAmount}
              </span>
            </div>
          </div>
          <div className="w-full flex text-center justify-center p-3 flex-grow ">
            <p>
              {inputCurrency}'den{" "}
              <span className="text-slate-300">{outputCurrency} </span>
              olarak değiştiriliyor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
