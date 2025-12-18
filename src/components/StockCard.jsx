export default function StockCard({ title, symbol, price, change }) {
  const positive = Number(change) >= 0;

  return (
    <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-black text-white shadow-xl border border-white/10 hover:scale-[1.02] transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-wide text-indigo-400">
            {title}
          </h2>
          {symbol && (
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20">
              {symbol}
            </span>
          )}
        </div>

        {symbol ? (
          <>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">
                  ₹ {price ?? "--"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Current Price
                </p>
              </div>

              <div
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  positive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {positive ? "+" : ""}
                {change ?? 0}%
              </div>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-400 mt-6">
            No stock data available
          </div>
        )}
      </div>
    </div>
  );
}
