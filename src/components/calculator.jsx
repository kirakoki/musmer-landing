import { parse } from "dotenv";
import React, { useEffect, useState } from "react";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";

function Calculator({ exchangeRateData }) {
  // console.log(exchangeRateData, "here");

  const [inputCurrency, setInputCurrency] = useState("TRY");
  const [inputAmount, setInputAmount] = useState("0.00");
  const [outputCurrency, setOutputCurrency] = useState("GBP");
  const [outputAmount, setOutputAmount] = useState("");
  const [exchangeRateMultiplier, setExchangeRateMultiplier] = useState();

  const handleInputAmountChange = (value) => {
    // console.log(value, "input amount value here");
    setInputAmount(value);
  };

  const calculateExchangeRateMultiplier = (inputCurrency, outputCurrency) => {
    // console.log(exchangeRateData, "gggggggggggggg amount value here");
    // console.log(inputCurrency, "-", outputCurrency, "vluuu");

    function sortCurrencyArrayAscending(arr) {
      return arr.slice().sort((a, b) => a.currency - b.currency);
    }
    const sortedCurrencyData = sortCurrencyArrayAscending(exchangeRateData);

    // console.log(sortedCurrencyData);

    const currencyPair = `${inputCurrency}-${outputCurrency}`;

    let usdSellingPrice = sortedCurrencyData.find(
      (currency) => currency.currency === 1
    )?.selling_price;
    let eurSellingPrice = sortedCurrencyData.find(
      (currency) => currency.currency === 2
    )?.selling_price;
    let gbpSellingPrice = sortedCurrencyData.find(
      (currency) => currency.currency === 3
    )?.selling_price;
    let usdBuyingPrice = sortedCurrencyData.find(
      (currency) => currency.currency === 1
    )?.buying_price;
    let eurBuyingPrice = sortedCurrencyData.find(
      (currency) => currency.currency === 2
    )?.buying_price;
    let gbpBuyingPrice = sortedCurrencyData.find(
      (currency) => currency.currency === 3
    )?.buying_price;

    if (currencyPair === "TRY-USD") {
      setExchangeRateMultiplier(usdSellingPrice);
    } else if (currencyPair === "TRY-EUR") {
      setExchangeRateMultiplier(eurSellingPrice);
    } else if (currencyPair === "TRY-GBP") {
      setExchangeRateMultiplier(gbpSellingPrice);
    } else if (currencyPair === "USD-TRY") {
      setExchangeRateMultiplier(usdBuyingPrice);
    } else if (currencyPair === "EUR-TRY") {
      setExchangeRateMultiplier(eurBuyingPrice);
    } else if (currencyPair === "GBP-TRY") {
      setExchangeRateMultiplier(gbpBuyingPrice);
    } else if (currencyPair === "USD-EUR") {
      let n_rate = usdBuyingPrice / eurSellingPrice;
      // console.log("n_Rate: ", n_rate);
      setExchangeRateMultiplier(n_rate);
    } else if (currencyPair === "EUR-USD") {
      let n_rateb = eurBuyingPrice / usdSellingPrice;
      // console.log("n_Rate: ", n_rateb);
      setExchangeRateMultiplier(n_rateb);
    } else if (currencyPair === "GBP-USD") {
      let n_rateg = gbpBuyingPrice / usdSellingPrice;
      // console.log("n_Rate: ", n_rateg);
      setExchangeRateMultiplier(n_rateg);
    } else if (currencyPair === "USD-GBP") {
      let n_ratei = usdBuyingPrice / gbpSellingPrice;
      // console.log("n_Rate: ", n_ratei);
      setExchangeRateMultiplier(n_ratei);
    } else if (currencyPair === "GBP-EUR") {
      let n_ratep = gbpBuyingPrice / eurSellingPrice;
      // console.log("n_Rate: ", n_ratep);
      setExchangeRateMultiplier(n_ratep);
    } else if (currencyPair === "EUR-GBP") {
      let n_ratez = eurBuyingPrice / gbpSellingPrice;
      // console.log("n_Rate: ", n_ratez);
      setExchangeRateMultiplier(n_ratez);
    } else {
      let rate = 1;
      setExchangeRateMultiplier(rate);
    }
    // console.log("Exchange Rate Multiplier:", exchangeRateMultiplier);
  };

  const calculateExchange = (inputAmount, exchangeRateMultiplier) => {
    // console.log(exchangeRateData, "insdide the calc function");
    if (!setExchangeRateMultiplier) return;

    const inputAmountValue = parseFloat(inputAmount);
    let calculatedAmount = 0;

    switch (`${inputCurrency}-${outputCurrency}`) {
      case "TRY-USD":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue / exchangeRateMultiplier;
        break;
      case "TRY-EUR":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue / exchangeRateMultiplier;
        break;
      case "TRY-GBP":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue / exchangeRateMultiplier;
        break;
      case "USD-TRY":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      case "EUR-TRY":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      case "GBP-TRY":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      case "USD-EUR":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      case "EUR-USD":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      case "USD-GBP":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      case "GBP-USD":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      case "EUR-GBP":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      case "GBP-EUR":
        calculatedAmount = isNaN(inputAmountValue)
          ? 0
          : inputAmountValue * exchangeRateMultiplier;
        break;
      default:
        // Handle other currency pairs if needed
        break;
    }

    setOutputAmount(calculatedAmount.toFixed(2));
  };

  useEffect(() => {
    calculateExchangeRateMultiplier(inputCurrency, outputCurrency);
    calculateExchange(inputAmount, exchangeRateMultiplier);
  }, [inputAmount, inputCurrency, outputCurrency]);

  const handleReverseClick = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
    setInputAmount(0.00)
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
                <option value="TRY">TRY</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
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
              onClick={handleReverseClick}
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
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="TRY">TRY</option>
              </select>
            </div>
            <div className="w-full bg-gradient-to-r from-white to-orange-500 p-[1px] rounded-[10px] shadow-card h-min max-w-[6rem] md:w-[7.5rem]">
              <span
                readOnly
                type="text"
                className="color-zinc-950 px-2 py-[0.25rem] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block min-w-[5rem] w-full rounded-md sm:text-sm focus:ring-1 min-h-[2rem]"
              >
                {isNaN(outputAmount) ? "0.00" : outputAmount}
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
