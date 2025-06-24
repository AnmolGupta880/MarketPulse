import axios from 'axios';

// Financial Modeling Prep API
const FMP_API_KEY = '3VAkTPWIZlUdzUSV2hv8ttygo8M3lgti';
const FMP_BASE_URL = 'https://financialmodelingprep.com/api/v3';

// NewsData.io API
const NEWSDATA_API_KEY = '0lEhTcRKSkTEYeLkQCmwpFFnFDJDQFLbMgG4pZxy';
const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1/news';

/**
 * Get live stock quote
 */
export const fetchStockPrice = async (symbol) => {
  try {
    const res = await axios.get(`${FMP_BASE_URL}/quote/${symbol}?apikey=${FMP_API_KEY}`);
    const data = res.data[0];
    return {
      symbol: data.symbol,
      price: data.price,
      change: data.change,
    };
  } catch (err) {
    console.error('Error fetching stock price:', err);
    return null;
  }
};

/**
 * Get latest news using NewsData.io
 */
export const fetchStockNews = async (symbol) => {
  try {
    const res = await axios.get(`${NEWSDATA_BASE_URL}`, {
      params: {
        apikey: NEWSDATA_API_KEY,
        q: symbol,
        language: 'en',
        category: 'business',
      },
    });

    if (!res.data.results || res.data.results.length === 0) {
      return [`No news found for ${symbol}`];
    }

    return res.data.results.slice(0, 5).map((news) => news.title);
  } catch (err) {
    console.error('Error fetching news:', err.message);
    return [`Failed to load news for ${symbol}`];
  }
};

/**
 * Get historical price data for a stock
 */
export const fetchStockHistory = async (symbol) => {
  try {
    const res = await axios.get(`${FMP_BASE_URL}/historical-price-full/${symbol}?serietype=line&apikey=${FMP_API_KEY}`);
    const history = res.data.historical?.slice(0, 5) || [];
    return history.map((day) => `${day.date}: ₹${day.close}`);
  } catch (err) {
    console.error('Error fetching stock history:', err);
    return ['Failed to fetch history.'];
  }
};
