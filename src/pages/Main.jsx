import React, { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";

const MyComponent = ({ exchangeRateData }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          // minHeight: 500.00,
          color: 0xef6f17, // Change this color to your preference
          backgroundColor: 0x050816, // Change this color to your preference
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={myRef}
      className="w-fill h-screen flex flex-col items-center justify-center"
    >
      <Navbar />
      <Hero  exchangeRateData={exchangeRateData} />
    </div>
  );
};

const Main = ({ exchangeRateData }) => {

  return (
    <>
      <Slider exchangeRateData={exchangeRateData} />
      <MyComponent  exchangeRateData={exchangeRateData} />
    </>
  );
};

export default Main;
