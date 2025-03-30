import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Security from './components/Security';
import Donations from './components/Donations';
import Documentation from './components/Documentation';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col overflow-hidden max-w-full">
        <Header />
        <div className="pt-24">
          <Routes>
            <Route path="/" element={
              <main className="flex-grow">
                <Hero />
                <Features />
                <Security />
                <Donations />
              </main>
            } />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
