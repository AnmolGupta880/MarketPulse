import React from 'react';
<<<<<<< HEAD
import Navbar from './components/navbar';            
import StockDashboard from './pages/StockDashboard'; 
import Footer from './components/footer';            

=======
import Navbar from './components/navbar';
import StockDashboard from './pages/stockDashboard';
import Footer from './components/footer';
>>>>>>> e50915cdc80eedcc1a4326cc7d9fe444b00b2f07

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
