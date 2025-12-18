import { useState } from "react";

export default function StockCardWrapper({ title, children, options = [], onSelect }) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border border-white/10 shadow-xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h3 className="text-sm font-semibold tracking-wide text-indigo-400">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          {options.length > 0 && (
            <button
              onClick={() => setOpen(!open)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            >
              ▼
            </button>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            {collapsed ? "+" : "–"}
          </button>
        </div>
      </div>

      {open && (
        <div className="px-6 py-3 border-b border-white/10 flex flex-wrap gap-2">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                setOpen(false);
                onSelect(item);
              }}
              className="px-3 py-1 text-xs rounded-full bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 transition"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {!collapsed && <div className="p-6">{children}</div>}
    </div>
  );
}
