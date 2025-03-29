import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Security from './components/Security';
import Donations from './components/Donations';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden max-w-full">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Security />
        <Donations />
      </main>
      <Footer />
    </div>
  );
}

export default App;
