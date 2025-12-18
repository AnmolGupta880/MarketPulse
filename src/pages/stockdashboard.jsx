import { useState } from "react";
import axios from "axios";
import StockCardWrapper from "../components/StockCardWrapper";

const MARKETSTACK_KEY = "1b4e0f592d20a770218f256aca609a61";
const NEWSDATA_KEY = "d2477148ca2f4e0ab8b3875e1efd938c";

const STOCKS = ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "NFLX", "NVDA"];

export default function StockDashboard() {
  const [priceData, setPriceData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [priceOpen, setPriceOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const fetchPrice = async (symbol) => {
    const res = await axios.get("http://api.marketstack.com/v1/eod/latest", {
      params: {
        access_key: MARKETSTACK_KEY,
        symbols: symbol,
      },
    });
    setPriceData(res.data.data[0]);
    setPriceOpen(false);
  };

  const fetchHistory = async (symbol) => {
    const res = await axios.get("http://api.marketstack.com/v1/eod", {
      params: {
        access_key: MARKETSTACK_KEY,
        symbols: symbol,
        limit: 5,
      },
    });
    setHistoryData(res.data.data);
    setHistoryOpen(false);
  };

  const fetchNews = async (symbol) => {
    const res = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: NEWSDATA_KEY,
        q: symbol,
        language: "en",
      },
    });
    setNewsData(res.data.results || []);
    setNewsOpen(false);
  };

  return (
    <section className="min-h-screen bg-neutral-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto grid gap-8">

        <StockCardWrapper title="Stock Price">
          <button
            onClick={() => setPriceOpen(!priceOpen)}
            className="w-full mb-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
          >
            Select Stock ▾
          </button>

          {priceOpen && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {STOCKS.map((s) => (
                <button
                  key={s}
                  onClick={() => fetchPrice(s)}
                  className="py-2 rounded bg-white/10 hover:bg-white/20"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {priceData && (
            <div className="space-y-2 text-sm">
              <div>Symbol: {priceData.symbol}</div>
              <div>Price: ${priceData.close}</div>
              <div>Date: {priceData.date}</div>
            </div>
          )}
        </StockCardWrapper>

        <StockCardWrapper title="Stock News">
          <button
            onClick={() => setNewsOpen(!newsOpen)}
            className="w-full mb-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
          >
            Select Stock ▾
          </button>

          {newsOpen && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {STOCKS.map((s) => (
                <button
                  key={s}
                  onClick={() => fetchNews(s)}
                  className="py-2 rounded bg-white/10 hover:bg-white/20"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <ul className="space-y-2 text-sm">
            {newsData.slice(0, 5).map((n, i) => (
              <li key={i} className="bg-white/10 p-3 rounded">
                {n.title}
              </li>
            ))}
          </ul>
        </StockCardWrapper>

        <StockCardWrapper title="Stock History">
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className="w-full mb-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
          >
            Select Stock ▾
          </button>

          {historyOpen && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {STOCKS.map((s) => (
                <button
                  key={s}
                  onClick={() => fetchHistory(s)}
                  className="py-2 rounded bg-white/10 hover:bg-white/20"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <ul className="space-y-2 text-sm">
            {historyData.map((h, i) => (
              <li key={i} className="bg-white/10 p-3 rounded">
                {h.date} — ${h.close}
              </li>
            ))}
          </ul>
        </StockCardWrapper>

      </div>
    </section>
  );
}
