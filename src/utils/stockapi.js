import axios from "axios";

const MARKETSTACK_KEY = "1b4e0f592d20a770218f256aca609a61";
const GNEWS_KEY = "d2477148ca2f4e0ab8b3875e1efd938c";

export const fetchStockPrice = async (symbol) => {
  try {
    const res = await axios.get("http://api.marketstack.com/v1/eod/latest", {
      params: {
        access_key: MARKETSTACK_KEY,
        symbols: symbol,
      },
    });

    const d = res.data.data?.[0];
    if (!d) return null;

    return {
      symbol: d.symbol,
      price: d.close,
      change: d.change,
    };
  } catch {
    return null;
  }
};

export const fetchStockHistory = async (symbol) => {
  try {
    const res = await axios.get("http://api.marketstack.com/v1/eod", {
      params: {
        access_key: MARKETSTACK_KEY,
        symbols: symbol,
        limit: 5,
      },
    });

    return res.data.data.map((d) => ({
      date: d.date.split("T")[0],
      close: d.close,
    }));
  } catch {
    return [];
  }
};

export const fetchStockNews = async (symbol) => {
  try {
    const res = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: symbol,
        token: GNEWS_KEY,
        lang: "en",
        max: 5,
      },
    });

    return res.data.articles.map((a) => a.title);
  } catch {
    return [];
  }
};
