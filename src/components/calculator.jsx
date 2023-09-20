import React, { useEffect, useState } from "react";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";

function Calculator() {
  const [inputCurrency, setInputCurrency] = useState("TRY");
  const [inputAmount, setInputAmount] = useState("0");  
  const [outputCurrency, setOutputCurrency] = useState("GBP");
  const [outputAmount, setOutputAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  const handleInputAmountChange = (value) => {
    setInputAmount(value);
  };

  

  useEffect(() => {
    setOutputAmount(calculateExchange());
  }, [inputAmount, exchangeRate]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          // "http://95.0.125.26:8008/api/exchangeratestoday/"
          "https://api.musmerexchange.com/api/exchangeratestoday/"
          );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        // console.log(data);
  
        const currencyPair = `${inputCurrency}-${outputCurrency}`;
        if (currencyPair === 'TRY-USD') {
          setExchangeRate(data[2].buying_price);
        } else if (currencyPair === 'TRY-EUR') {
          setExchangeRate(data[3].buying_price);
        } else if (currencyPair === 'TRY-GBP') {
          setExchangeRate(data[0].buying_price);
        } else if (currencyPair === 'USD-TRY') {
          setExchangeRate(data[2].selling_price);
        } else if (currencyPair === 'EUR-TRY') {
          setExchangeRate(data[3].selling_price);
        } else if (currencyPair === 'GBP-TRY') {
          setExchangeRate(data[0].selling_price);
        } else {
          // alert('Invalid currency pair');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const intervalId = setInterval(() => {
      fetchExchangeRate();
    }, 1200000); // Fetch data every 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, [inputCurrency, outputCurrency]);
  

  useEffect(() => {
    calculateExchange();
  }, [exchangeRate]);
  
  const calculateExchange = () => {
    if (!exchangeRate) return;

    const inputAmountValue = parseFloat(inputAmount);
    let calculatedAmount = 0;

    
    switch (`${inputCurrency}-${outputCurrency}`) {
      case 'TRY-USD':
        calculatedAmount = isNaN(inputAmountValue) ? 0 : inputAmountValue / exchangeRate;
        break;
      case 'TRY-EUR':
        calculatedAmount = isNaN(inputAmountValue) ? 0 : inputAmountValue / exchangeRate;
        break;
      case 'TRY-GBP':
        calculatedAmount = isNaN(inputAmountValue) ? 0 : inputAmountValue / exchangeRate;
        break;
      case 'USD-TRY':
        calculatedAmount = isNaN(inputAmountValue) ? 0 : inputAmountValue * exchangeRate;
        break;
      case 'EUR-TRY':
        calculatedAmount = isNaN(inputAmountValue) ? 0 : inputAmountValue * exchangeRate;
        break;
      case 'GBP-TRY':
        calculatedAmount = isNaN(inputAmountValue) ? 0 : inputAmountValue * exchangeRate;
        break;
      default:
        // Handle other currency pairs if needed
        break;
    }
  
    return calculatedAmount.toFixed(2);

  };

  return (
    <div className="w-full bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[20px] shadow-card flex-grow">
      <div className="bg-gray-900 rounded-[20px] py-5 px-12 min-h-[180px] md:px-2 flex justify-evenly items-center flex-col flex-grow">
        <div className="p-[10px] rounded-[20px] ">
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
            <div className="w-full bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[10px] shadow-card h-min w-[5rem] md:w-[7.5rem]">
              <input
                type="text"
                value={inputAmount}
                onChange={(e) => handleInputAmountChange(e.target.value)}
                className="color-zinc-950 px-2 py-[0.35rem] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
            </div>
          </div>
          <div className="flex w-full text-center items-center justify-center p-5 ">
            <button
              onClick={() => {
                setInputCurrency(outputCurrency);
                setOutputCurrency(inputCurrency);
              }}
              className="flex items-center justify-center rounded-full p-2 w-[4rem] h-[4rem] text-[2rem] font-bold border-solid border-2 border-bg-gradient-to-r from-white to-orange-500 active:translate-y-0 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 active:shadow-md active:translate-y-[-2px] p-4 "
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
            <div className="w-full bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[10px] shadow-card h-min w-[5rem] md:w-[7.5rem]">
              <span
                
                readOnly
                type="text"
                className="color-zinc-950 px-2 py-[0.35rem] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 min-h-[2rem]"
              >
                {outputAmount}
              </span>
            </div>
          </div>
          <div className="w-full flex text-center justify-center p-3 flex-grow ">
            <p>
              Changing From{" "}
              <span className="text-slate-300">{inputCurrency} </span>
              to <span className="text-orange-500">{outputCurrency}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
