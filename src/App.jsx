import React from 'react';
import Navbar from './components/navbar';
import StockDashboard from './pages/Stockdashboard';
import Footer from './components/footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-zinc-900 text-white">
      <Navbar />
      <main className="p-4">
        <StockDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
