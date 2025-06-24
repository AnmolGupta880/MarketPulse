export default function StockCard({ title, symbol, price, change }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
      <h2 className="text-2xl font-bold text-indigo-600 mb-2">{title}</h2>
      {symbol && (
        <>
          <p className="text-gray-700 text-lg">Symbol: {symbol}</p>
          <p className="text-gray-700 text-lg">Price: ₹ {price}</p>
          <p className={`text-lg font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            Change: {change >= 0 ? '+' : ''}{change}%
          </p>
        </>
      )}
    </div>
  );
}
