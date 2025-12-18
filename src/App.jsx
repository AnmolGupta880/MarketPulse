import React from "react";
import Navbar from "./components/navbar";
import StockDashboard from "./pages/stockdashboard";
import Footer from "./components/footer";

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#4338ca_0%,_transparent_55%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#7c3aed_0%,_transparent_60%)] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-zinc-950" />

      <div className="relative z-10">
        <Navbar />
        <main className="px-4 md:px-8 py-6">
          <StockDashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
