import React, { useState, useEffect, useRef } from 'react';
import { fetchStockPrice, fetchStockNews, fetchStockHistory } from '../utils/stockapi';
import StockCard from '../components/StockCard';

import StockCardWrapper from '../components/StockCardWrapper';


import gsap from 'gsap';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export default function StockDashboard() {
  const [symbol, setSymbol] = useState('');
  const [newsSymbol, setNewsSymbol] = useState('');
  const [historySymbol, setHistorySymbol] = useState('');
  const [stockDataList, setStockDataList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const marqueeRef = useRef();

  const stockList = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'TCS', 'INFY', 'RELIANCE', 'ICICIBANK', 'HDFCBANK', 'META', 'NFLX', 'NVDA', 'BABA', 'ADANIENT'];

  const handleFetch = async (stockSymbol) => {
    setLoading(true);
    const data = await fetchStockPrice(stockSymbol);
    if (data) {
      setStockDataList((prev) => [...prev, data]);
    }
    setLoading(false);
  };

  const handleNewsFetch = async (stockSymbol) => {
    const news = await fetchStockNews(stockSymbol);
    setNewsList((prev) => [...prev, { symbol: stockSymbol, headlines: news }]);
  };

  const handleHistoryFetch = async (stockSymbol) => {
    const history = await fetchStockHistory(stockSymbol);
    setHistoryList((prev) => [...prev, { symbol: stockSymbol, history }]);
  };

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      const marqueeTrack = marqueeRef.current.querySelector(".marquee-track");
      if (marqueeTrack) {
        gsap.to(marqueeTrack, {
          xPercent: -50,
          repeat: -1,
          duration: 30,
          ease: "linear",
        });
      }
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-10 px-4 md:px-8 bg-neutral-800 text-white min-h-[85vh] overflow-hidden">
      <div className="relative overflow-hidden w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 py-4 mb-8" ref={marqueeRef}>
        <div className="marquee-track min-w-[200%] flex whitespace-nowrap gap-16 text-4xl font-bold text-white">
          {[...Array(10)].map((_, i) => (
            <span key={i}>📊 MarketPulse</span>
          ))}
        </div>
      </div>

      <div className="grid w-full place-content-center mt-6 mb-12">
        <TiltCard />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
        {/* STOCK PRICE */}
        <StockCardWrapper title="Search & Track Stocks">
          <input type="text" list="stock-suggestions" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} placeholder="Search Stock Symbol (e.g. TSLA)" className="w-full mb-2 px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-indigo-300" />
          <datalist id="stock-suggestions">{stockList.map((s) => <option key={s} value={s} />)}</datalist>
          <button onClick={() => handleFetch(symbol)} disabled={!symbol || loading} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50">{loading ? 'Fetching...' : 'Add Stock Card'}</button>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {stockDataList.map((stock, index) => (
              <StockCard key={index} title={`Stock (${stock.symbol})`} symbol={stock.symbol} price={stock.price} change={stock.change} />
            ))}
          </div>
        </StockCardWrapper>

        {/* NEWS */}
        <StockCardWrapper title="Search Stock News">
          <input type="text" list="stock-suggestions" value={newsSymbol} onChange={(e) => setNewsSymbol(e.target.value.toUpperCase())} placeholder="Enter Symbol for News (e.g. TCS)" className="w-full mb-2 px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-indigo-300" />
          <button onClick={() => handleNewsFetch(newsSymbol)} disabled={!newsSymbol} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50">Get News</button>
          <div className="mt-6 grid md:grid-cols-1 gap-4">
            {newsList.map((item, idx) => (
              <div key={idx} className="bg-white p-4 border rounded-lg shadow text-black">
                <h4 className="text-lg font-semibold text-indigo-700">News for {item.symbol}</h4>
                <ul className="list-disc ml-5 mt-2">
                  {item.headlines.map((news, i) => <li key={i}>{news}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </StockCardWrapper>

        {/* HISTORY */}
        <StockCardWrapper title="Search Stock History">
          <input type="text" list="stock-suggestions" value={historySymbol} onChange={(e) => setHistorySymbol(e.target.value.toUpperCase())} placeholder="Enter Symbol for History (e.g. INFY)" className="w-full mb-2 px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-indigo-300" />
          <button onClick={() => handleHistoryFetch(historySymbol)} disabled={!historySymbol} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50">Get History</button>
          <div className="mt-6 grid md:grid-cols-1 gap-4">
            {historyList.map((item, idx) => (
              <div key={idx} className="bg-white p-4 border rounded-lg shadow text-black">
                <h4 className="text-lg font-semibold text-indigo-700">History for {item.symbol}</h4>
                <ul className="list-disc ml-5 mt-2">
                  {item.history.map((day, i) => <li key={i}>{day}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </StockCardWrapper>
      </div>

      <div className="relative min-h-screen w-full mt-32 bg-neutral-950">
        <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 text-center md:text-[200px]">
          ASTRO<span className="text-indigo-500">.</span>
        </h2>
        <DragCards />
      </div>
    </section>
  );
}

// TiltCard Component
const TiltCard = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / rect.height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / rect.width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      className="relative h-96 w-80 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 shadow-xl overflow-hidden"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 flex flex-col justify-between rounded-xl bg-white/30 backdrop-blur-md text-white shadow-lg p-4"
      >
        <div className="text-center text-xl font-bold tracking-wide">📊 MarketPulse Dashboard</div>
        <div className="flex justify-center items-center h-24 rounded-md bg-white/20 text-sm mt-2 mb-2">📈 Mini Trend Graph (Coming Soon)</div>
        <div className="flex justify-between text-sm font-medium mt-2">
          <div className="text-green-300">🔼 Gainers: <span className="font-bold">128</span></div>
          <div className="text-red-300">🔽 Losers: <span className="font-bold">97</span></div>
        </div>
        <div className="mt-2 text-center text-sm text-white">Status: <span className="font-semibold text-green-200">LIVE</span></div>
        <div className="text-xs text-center mt-2 text-white/70">Powered by FMP API</div>
      </div>
    </motion.div>
  );
};

// DragCards + Card Components
const DragCards = () => {
  const containerRef = useRef(null);
  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      {cardsData.map((card, i) => (
        <Card key={i} containerRef={containerRef} {...card} />
      ))}
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);
  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");
    let maxZ = -Infinity;
    els.forEach((el) => {
      const z = parseInt(window.getComputedStyle(el).getPropertyValue("z-index"));
      if (!isNaN(z) && z > maxZ) maxZ = z;
    });
    setZIndex(maxZ + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{ top, left, rotate, zIndex }}
      className={twMerge("drag-elements absolute bg-neutral-200 p-1 pb-4", className)}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    />
  );
};

const cardsData = [
  { src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80", alt: "Example 1", rotate: "6deg", top: "20%", left: "25%", className: "w-36 md:w-56" },
  { src: "https://images.unsplash.com/photo-1691643158804-d3f02eb456a3?q=80", alt: "Example 2", rotate: "12deg", top: "45%", left: "60%", className: "w-24 md:w-48" },
  { src: "https://images.unsplash.com/photo-1743712578499-7266d3d89dc3?q=80", alt: "Example 3", rotate: "-6deg", top: "20%", left: "40%", className: "w-52 md:w-80" },
  { src: "https://images.unsplash.com/photo-1642052502780-8ee67e3bf930?q=80", alt: "Example 4", rotate: "8deg", top: "50%", left: "40%", className: "w-48 md:w-72" },
  { src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80", alt: "Example 5", rotate: "18deg", top: "20%", left: "65%", className: "w-40 md:w-64" },
  { src: "https://images.unsplash.com/photo-1640197618317-dc379a226fbe?q=80", alt: "Example 6", rotate: "-3deg", top: "35%", left: "55%", className: "w-24 md:w-48" },
];
