import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Works, StarsCanvas, } from "./components";
import FooterType from "./components/FooterType";
import Main from "./components/Main";
import { useState, useEffect } from "react";


const App = () => {
  const [exchangeRateData, setExchangeRateData] = useState([]);
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://api.musmerexchange.com/api/exchangeratestoday/",
          {
            method: "GET",
            headers: {
              Authorization:
                "token 6443ca9e33fec48eb0671b854360ddef8225cc58f1606312c5431bff9e3bf294",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setExchangeRateData(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchExchangeRate();
  }, []);

  
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Main exchangeRateData={exchangeRateData} />
        
        <About />
        <Feedbacks exchangeRateData={exchangeRateData} />
        <Experience />
        <Works />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>

        <FooterType />
      </div>
    </BrowserRouter>
  );
}

export default App;
