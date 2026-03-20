import React, { useState, useEffect } from 'react';
import './index.css';
import camisetaFront from './assets/camiseta-front.png';
import camisetaBack from './assets/camiseta-back.png';
import { checkNumberExists, submitJersey, getJerseys } from './services/api';

function App() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [squadNumber, setSquadNumber] = useState('');

  const [size, setSize] = useState('M');
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (playerName.trim().length > 0 || squadNumber.trim().length > 0) {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [playerName, squadNumber]);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [showListModal, setShowListModal] = useState(false);
  const [jerseysList, setJerseysList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const handleOpenList = async () => {
    setShowListModal(true);
    setIsLoadingList(true);
    try {
      const data = await getJerseys();
      setJerseysList(data);
    } catch (error) {
      console.error("Error fetching jerseys:", error);
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName || !dateOfBirth || !playerName || !squadNumber || !size) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    setIsSubmitting(true);
    try {
      const exists = await checkNumberExists(squadNumber);
      if (exists) {
        setErrorMessage('El número ya está en uso. Por favor, elige otro.');
        setIsSubmitting(false);
        return;
      }

      await submitJersey({
        fullName,
        dateOfBirth,
        playerName,
        squadNumber,
        size
      });

      setSuccessMessage('¡Guardado!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Hubo un error al procesar tu solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <span className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">Nombre Completo</span>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-4 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light/50 dark:bg-background-dark/30 text-lg font-bold placeholder:text-primary/20 placeholder:font-normal" 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">Fecha de Nacimiento</span>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-4 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light/50 dark:bg-background-dark/30 text-lg font-bold text-slate-700 dark:text-slate-300" 
                    type="date" 
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">Nombre en Camiseta</span>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-4 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light/50 dark:bg-background-dark/30 text-lg uppercase font-bold tracking-widest placeholder:text-primary/20 placeholder:font-normal" 
                    maxLength="12"
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
                    <input 
                      className="w-full px-4 py-4 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light/50 dark:bg-background-dark/30 text-lg font-bold" 
                      max="99"
                      min="1"
                      type="number" 
                      value={squadNumber}
                      maxLength="2"
                      onChange={(e) => setSquadNumber(e.target.value.replace(/\D/g, '').replace(/^0+/, ''))}
                      onKeyDown={(e) => {
                        if (['-', '+', '.', 'e', 'E'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="text-slate-700 dark:text-slate-300 font-semibold mb-2 block">Talla</span>
                  <div className="relative">
                    <select 
                      className="w-full px-4 py-4 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light/50 dark:bg-background-dark/30 text-lg font-bold appearance-none"
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
            {errorMessage && (
              <div className="bg-red-100 text-red-600 font-bold p-3 text-center rounded-xl text-sm border border-red-200">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 text-green-700 font-bold p-3 text-center rounded-xl text-sm border border-green-200">
                {successMessage}
              </div>
            )}
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 text-xl disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? 'VERIFICANDO...' : 'CONFIRMAR'}
            </button>
            <button 
              onClick={() => setShowModal(true)}
              disabled={isSubmitting}
              className="md:hidden w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-lg">
              <span className="material-symbols-outlined">visibility</span>
              PREVISUALIZAR DISEÑO
            </button>
            
            <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
            
            <button 
              onClick={handleOpenList}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-lg">
              <span className="material-symbols-outlined">list_alt</span>
              VER CAMISETAS REGISTRADAS
            </button>
          </div>
        </div>
        
        {/* Right Side: Preview Container */}
        <div className="hidden md:flex flex-col flex-1 items-center justify-center -mt-20">
          <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden">
            {/* Jersey Graphics Representation with 3D Flip */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1000px" }}>
              <div 
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                {/* Front Face */}
                <div 
                  className="absolute inset-0 w-full h-full flex items-center justify-center" 
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img 
                    src={camisetaFront} 
                    alt="Camiseta Frente" 
                    className="absolute inset-0 w-full h-full object-center"
                  />
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 w-full h-full flex items-center justify-center" 
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <img 
                    src={camisetaBack} 
                    alt="Camiseta Espalda" 
                    className="absolute inset-0 w-full h-full object-center"
                  />
                  {/* Jersey Texts */}
                  <div className="relative w-[85%] h-[85%] flex flex-col items-center justify-start pt-12 z-10">
                    <div className="text-black font-black text-5xl mb-5 select-none uppercase drop-shadow-md text-center" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                      {playerName || '\u00A0'}
                    </div>
                    <div className="text-black font-normal text-[200px] leading-none select-none drop-shadow-xl text-center" style={{ fontFamily: "'Chakra Petch', sans-serif", marginTop: "-20px", letterSpacing: "-15px" }}>
                      {squadNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="mt-6 flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-full font-bold transition-all shadow-sm"
          >
            <span className="material-symbols-outlined">3d_rotation</span>
            Girar Camiseta
          </button>
        </div>
      </main>

      {/* Mobile Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:hidden">
          <div className="relative w-full max-w-[400px] aspect-[4/5] overflow-hidden rounded-[2rem] flex flex-col items-center" style={{ perspective: "1000px" }}>
             <div 
               className="relative w-full h-full transition-transform duration-700 ease-in-out"
               style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
             >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
                  <img src={camisetaFront} alt="Camiseta Frente" className="absolute inset-0 w-full h-full object-center drop-shadow-2xl" />
                </div>
                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <img src={camisetaBack} alt="Camiseta Espalda" className="absolute inset-0 w-full h-full object-center drop-shadow-2xl" />
                  <div className="relative w-[85%] h-[85%] flex flex-col items-center justify-start pt-10 z-10">
                    <div className="text-black font-black text-4xl mb-5 select-none uppercase drop-shadow-md text-center" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                      {playerName || '\u00A0'}
                    </div>
                    <div className="text-black font-normal text-[130px] leading-none select-none drop-shadow-xl text-center" style={{ fontFamily: "'Chakra Petch', sans-serif", marginTop: "-20px", letterSpacing: "-8px" }}>
                      {squadNumber}
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="mt-8 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl text-lg z-[110]"
          >
            <span className="material-symbols-outlined text-2xl">3d_rotation</span>
            Girar Camiseta
          </button>

          <button 
             onClick={() => setShowModal(false)}
             className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center text-white z-[110] transition-all font-black text-2xl"
          >
             ×
          </button>
        </div>
      )}

      {/* List Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">format_list_bulleted</span>
                Registros
              </h3>
              <button 
                onClick={() => setShowListModal(false)}
                className="w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors"
               >
                <span className="material-symbols-outlined font-bold text-xl">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-slate-100/50 dark:bg-slate-800/50">
              {isLoadingList ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <span className="material-symbols-outlined animate-spin text-5xl text-primary font-bold">progress_activity</span>
                  <p className="text-slate-500 font-semibold">Cargando registros...</p>
                </div>
              ) : jerseysList.length === 0 ? (
                <div className="text-center text-slate-500 py-20">
                  <span className="material-symbols-outlined text-6xl mb-4 opacity-30">inventory_2</span>
                  <p className="font-bold text-xl text-slate-700 dark:text-slate-300">Aún no hay camisetas registradas.</p>
                  <p className="mt-2 text-sm">Los números que guardes aparecerán aquí.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jerseysList.map((jersey, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-4 md:p-5 rounded-2xl flex items-center gap-3 md:gap-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-primary text-white font-black text-2xl md:text-4xl rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0" style={{ fontFamily: "'Chakra Petch', sans-serif", letterSpacing: "-2px" }}>
                        {jersey.numero}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm md:text-lg text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight md:truncate">{jersey.nombre_completo}</p>
                        <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate mt-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px] md:text-[16px]">person</span> {jersey.nombre_camiseta}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 md:px-5 md:py-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-inner text-center shrink-0">
                        <span className="block text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Talla</span>
                        <span className="font-black text-base md:text-lg text-slate-800 dark:text-white leading-none">{jersey.talla}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 text-center text-xs font-bold text-slate-400">
              Total registrados: {jerseysList.length}
            </div>
          </div>
        </div>
      )}
      
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
