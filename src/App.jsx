import React, { useState } from 'react';
import './index.css';
import camisetaFront from './assets/camiseta-front.png';
import camisetaBack from './assets/camiseta-back.png';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [squadNumber, setSquadNumber] = useState('');

  const isTyping = playerName.trim().length > 0 || squadNumber.trim().length > 0;
  const [size, setSize] = useState('M');

  return (
    <div className="layout-container flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-white dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 text-primary">
          <span className="material-symbols-outlined text-3xl font-bold">sports_soccer</span>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold leading-tight tracking-tight">Promoción 2006B</h2>
        </div>
        {/* <div className="hidden md:flex flex-1 justify-center gap-10">
          <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">Home</a>
          <a className="text-primary text-sm font-semibold uppercase tracking-wider border-b-2 border-primary" href="#">Customize</a>
          <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">Collections</a>
          <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider" href="#">Support</a>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div> */}
      </header>
      
      <main className="flex-grow flex flex-col md:flex-row px-6 md:px-20 py-8 gap-10 max-w-[1440px] mx-auto w-full">
        {/* Left Side: Configuration Forms */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            {/* <nav className="flex items-center gap-2 text-primary/60 text-sm font-medium">
              <a className="hover:text-primary" href="#">Shop</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-bold">Jersey Customizer</span>
            </nav> */}
            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight">Bienvenido</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Hora de personalizar tu camiseta.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-primary/5 space-y-6">
            <div className="space-y-5">
              <label className="block">
                <span className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">Nombre</span>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">person</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light/50 dark:bg-background-dark/30 text-lg uppercase font-bold tracking-widest placeholder:text-primary/20 placeholder:font-normal" 
                    maxLength="12" 
                    placeholder="RONALDO"
                    type="text" 
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                  />
                </div>
                <span className="text-xs text-slate-500 mt-2 block">Máximo 12 caracteres.</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">Número</span>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">numbers</span>
                    <input 
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light/50 dark:bg-background-dark/30 text-lg font-bold" 
                      max="99"
                      min="1"
                      placeholder=""
                      type="number" 
                      value={squadNumber}
                      maxLength="2"
                      onChange={(e) => setSquadNumber(e.target.value)}
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">Talle (Size)</span>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">straighten</span>
                    <select 
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light/50 dark:bg-background-dark/30 text-lg font-bold appearance-none"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 text-xl">
              CONFIRMAR
            </button>
          </div>
        </div>
        
        {/* Right Side: Preview Container */}
        <div className="flex-1 flex items-center justify-center -mt-20">
          <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden">
            {/* Jersey Graphics Representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={isTyping ? camisetaBack : camisetaFront} 
                alt="Camiseta" 
                className="absolute inset-0 w-full h-full object-center"
              />
              
              {/* Jersey Texts (Only show when typing) */}
              {isTyping && (
                <div className="relative w-[85%] h-[85%] flex flex-col items-center justify-start pt-12 z-10">
                  {/* Player Name (Live Preview) */}
                  <div className="text-black font-black text-5xl mb-5 select-none uppercase drop-shadow-md text-center" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                    {playerName}
                  </div>
                  {/* Squad Number (Live Preview) */}
                  <div className="text-black font-normal text-[200px] leading-none select-none drop-shadow-xl text-center" style={{ fontFamily: "'Chakra Petch', sans-serif", marginTop: "-20px", letterSpacing: "-15px" }}>
                    {squadNumber}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      {/* <footer className="bg-white dark:bg-slate-900 border-t border-primary/5 px-6 md:px-20 py-10 mt-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined font-bold">sports_soccer</span>
              <h2 className="text-slate-900 dark:text-slate-100 font-black tracking-tight">ProKit Studio</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">The official customization partner for elite football clubs. Precision engineering meets artistic design in every stitch.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest">Support</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li><a className="hover:text-primary" href="#">Size Guide</a></li>
              <li><a className="hover:text-primary" href="#">Shipping Info</a></li>
              <li><a className="hover:text-primary" href="#">Returns</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4">
              <a className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
              <a className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined text-sm">mail</span>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto pt-10 mt-10 border-t border-primary/5 text-center text-xs text-slate-400">
          © 2024 ProKit Studio Customizer. All Rights Reserved.
        </div>
      </footer> */}
    </div>
  );
}

export default App;
