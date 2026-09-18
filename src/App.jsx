import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Activity, Calendar, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo('.hero-anim', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );

      // Navbar morphing logic
      ScrollTrigger.create({
        trigger: '.hero-section',
        start: 'bottom top',
        onEnter: () => {
          gsap.to('.nav-container', { backgroundColor: 'rgba(242, 240, 233, 0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(26,26,26,0.1)', color: '#1A1A1A', duration: 0.3 });
          gsap.to('.nav-logo', { color: '#1A1A1A', duration: 0.3 });
          gsap.to('.nav-link', { color: '#1A1A1A', duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to('.nav-container', { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', border: '1px solid transparent', color: '#F2F0E9', duration: 0.3 });
          gsap.to('.nav-logo', { color: '#F2F0E9', duration: 0.3 });
          gsap.to('.nav-link', { color: '#F2F0E9', duration: 0.3 });
        }
      });

      // Philosophie SplitText substitute (word by word fade)
      const philoWords = document.querySelectorAll('.philo-word');
      if(philoWords.length > 0) {
        gsap.fromTo(philoWords,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.05, ease: 'power3.out',
            scrollTrigger: {
              trigger: '.philo-section',
              start: 'top 60%',
            }
          }
        );
      }

      // Protocole Sticky Stacking
      const cards = gsap.utils.toArray('.protocole-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: () => `+=${window.innerHeight}`,
          onUpdate: (self) => {
             if (i > 0) {
               const prevCard = cards[i - 1];
               const progress = self.progress;
               gsap.set(prevCard, {
                 scale: 1 - (0.1 * progress),
                 opacity: 1 - (0.5 * progress),
                 filter: `blur(${20 * progress}px)`
               });
             }
          }
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="w-full relative">
      <Navbar />
      <Hero />
      <Features />
      <Philosophie />
      <Protocole />
      <Adhesion />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="nav-container flex items-center justify-between px-6 py-3 rounded-[3rem] w-full max-w-4xl transition-all duration-300 text-[#F2F0E9]">
        <div className="nav-logo font-sans font-bold text-lg tracking-tight">Hassan Sani</div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="nav-link text-sm font-medium hover:opacity-70 link-hover">Fonctionnalités</a>
          <a href="#philosophie" className="nav-link text-sm font-medium hover:opacity-70 link-hover">Approche</a>
          <a href="#protocole" className="nav-link text-sm font-medium hover:opacity-70 link-hover">Protocole</a>
        </div>
        <button className="magnetic-button bg-accent text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent/90 transition-colors relative overflow-hidden group">
          <span className="relative z-10 flex items-center gap-2">Consultation <ArrowRight size={16} /></span>
          <div className="absolute inset-0 bg-dark transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></div>
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section relative h-[100dvh] w-full flex flex-col justify-end p-6 md:p-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000&auto=format&fit=crop" 
          alt="Dark forest organic moss" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-5xl mb-12">
        <h1 className="flex flex-col gap-2">
          <span className="hero-anim text-background font-sans font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-balance">
            L'intégration technique est le
          </span>
          <span className="hero-anim text-background font-serif italic text-6xl md:text-8xl lg:text-9xl leading-none">
            moteur absolu.
          </span>
        </h1>
        <p className="hero-anim mt-6 text-background/80 font-sans text-lg md:text-xl max-w-xl text-balance">
          Intégration technique d'élite pour challenges et webinaires. Hassan Sani orchestre votre écosystème avec précision.
        </p>
        <div className="hero-anim mt-10">
          <button className="magnetic-button bg-accent text-background px-8 py-4 rounded-[2rem] text-lg font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-3 relative overflow-hidden group">
            <span className="relative z-10">Réserver une consultation</span>
            <ArrowRight className="relative z-10" size={20} />
            <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[2rem]"></div>
          </button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-sans font-bold text-dark text-3xl md:text-4xl">Artefacts Fonctionnels</h2>
          <p className="font-sans text-dark/60 mt-2 text-lg">Les piliers de notre architecture technique.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card1 />
          <Card2 />
          <Card3 />
        </div>
      </div>
    </section>
  );
}

function Card1() {
  const [items, setItems] = useState([
    { id: 1, label: 'Audit Architecture' },
    { id: 2, label: 'Maillage Outils' },
    { id: 3, label: 'Tests de Charge' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-dark/5 rounded-[2rem] p-8 shadow-sm flex flex-col h-[400px]">
      <div className="mb-auto">
        <h3 className="font-sans font-semibold text-xl text-dark">Mécanique Technique Solide</h3>
        <p className="font-sans text-dark/60 text-sm mt-2">Un système robuste conçu pour la performance, sans point de défaillance unique.</p>
      </div>
      
      <div className="relative h-[180px] mt-8 w-full flex justify-center items-end pb-4">
        {items.map((item, i) => {
          const isTop = i === 2;
          const isMiddle = i === 1;
          const isBottom = i === 0;
          return (
            <div 
              key={item.id}
              className="absolute w-[90%] rounded-xl p-4 flex items-center gap-3 transition-all duration-700"
              style={{
                backgroundColor: isTop ? '#2E4036' : isMiddle ? '#e2e0d8' : '#d4d2ca',
                color: isTop ? '#F2F0E9' : '#1A1A1A',
                transform: `translateY(-${i * 20}px) scale(${1 - (2-i)*0.05})`,
                zIndex: i,
                opacity: isBottom ? 0.4 : isMiddle ? 0.8 : 1,
                boxShadow: isTop ? '0 10px 20px -5px rgba(46,64,54,0.3)' : 'none',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <Activity size={18} className={isTop ? "text-accent" : ""} />
              <span className="font-mono text-sm font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Card2() {
  const [text, setText] = useState('');
  const fullText = "INITIALISATION RELANCE... \n> VERIFICATION SEGMENT...\n> ENVOI SMS: OK\n> ENVOI EMAIL: OK\n> TAUX D'OUVERTURE: 87%";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if(i > fullText.length) {
        setTimeout(() => { i = 0; setText(''); }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark rounded-[2rem] p-8 shadow-sm flex flex-col h-[400px]">
      <div className="mb-auto">
        <h3 className="font-sans font-semibold text-xl text-background">Relance Fiable</h3>
        <p className="font-sans text-background/60 text-sm mt-2">Automatisation chirurgicale pour ne perdre aucun prospect en chemin.</p>
      </div>
      
      <div className="mt-8 bg-[#111] border border-white/10 rounded-xl p-5 h-[180px] relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-mono text-xs text-white/50 tracking-wider">FLUX EN DIRECT</span>
        </div>
        <div className="font-mono text-sm text-accent whitespace-pre-wrap leading-relaxed flex-1">
          {text}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
        </div>
      </div>
    </div>
  );
}

function Card3() {
  const [activeDay, setActiveDay] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  useEffect(() => {
    let isMounted = true;
    const cycle = async () => {
      let day = 0;
      while (isMounted) {
        setActiveDay(-1); 
        await new Promise(r => setTimeout(r, 1000));
        if(!isMounted) return;
        setIsClicking(true);
        setActiveDay(day);
        await new Promise(r => setTimeout(r, 300));
        if(!isMounted) return;
        setIsClicking(false);
        await new Promise(r => setTimeout(r, 1000));
        day = (day + 1) % 5; 
      }
    };
    cycle();
    return () => { isMounted = false; }
  }, []);

  return (
    <div className="bg-white border border-dark/5 rounded-[2rem] p-8 shadow-sm flex flex-col h-[400px]">
      <div className="mb-auto">
        <h3 className="font-sans font-semibold text-xl text-dark">Show Up Élevé</h3>
        <p className="font-sans text-dark/60 text-sm mt-2">Maximisation de la présence en direct grâce à un parcours sans friction.</p>
      </div>
      
      <div className="mt-8 bg-background rounded-xl p-5 h-[180px] relative flex flex-col justify-center items-center">
        <div className="flex gap-2 mb-4">
          {days.map((d, i) => (
            <div 
              key={i} 
              className={`w-8 h-8 rounded-md flex items-center justify-center font-mono text-xs transition-colors duration-300 ${activeDay === i ? 'bg-accent text-white shadow-md' : 'bg-white text-dark/40 border border-dark/5'}`}
            >
              {d}
            </div>
          ))}
        </div>
        
        <div className="bg-primary text-white rounded-lg px-4 py-2 font-sans text-xs flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          <Calendar size={14} /> Planifié
        </div>
        
        <div 
          className="absolute z-10 transition-all duration-700 ease-in-out flex flex-col items-center pointer-events-none"
          style={{
            transform: `translate(${activeDay !== -1 ? (activeDay - 2.5) * 40 : 0}px, ${activeDay !== -1 ? -20 : 40}px) scale(${isClicking ? 0.9 : 1})`
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark drop-shadow-md">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
            <path d="M13 13l6 6"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Philosophie() {
  const sentence1 = "La plupart des agences se concentrent sur : l'esthétique sans fondation technique.";
  const sentence2 = "Nous nous concentrons sur : la mécanique de conversion.";

  return (
    <section id="philosophie" className="philo-section relative py-32 px-6 md:px-16 bg-dark overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop" 
          alt="Organic texture" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-16">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {sentence1.split(' ').map((word, i) => (
            <span key={`w1-${i}`} className="philo-word font-sans text-background/50 text-xl md:text-3xl font-medium inline-block">
              {word}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {sentence2.split(' ').map((word, i) => {
            const isHighlight = word.includes("conversion");
            return (
              <span 
                key={`w2-${i}`} 
                className={`philo-word font-serif italic text-4xl md:text-6xl lg:text-7xl leading-tight inline-block ${isHighlight ? 'text-accent' : 'text-background'}`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Protocole() {
  const steps = [
    { num: '01', title: 'Audit du Système', desc: "Analyse approfondie de l'infrastructure existante et identification des points de friction." },
    { num: '02', title: 'Déploiement Mécanique', desc: "Intégration technique solide, câblage des outils et mise en place des automatisations de relance." },
    { num: '03', title: 'Surveillance & Scale', desc: "Monitoring en temps réel pendant le challenge pour garantir un show up maximal." }
  ];

  return (
    <section id="protocole" className="bg-background">
      {steps.map((step, i) => (
        <div key={i} className="protocole-card h-[100dvh] w-full flex items-center justify-center p-6 md:p-16 sticky top-0 bg-background z-10">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="order-2 md:order-1">
              <span className="font-mono text-accent text-xl mb-4 block">[{step.num}]</span>
              <h2 className="font-sans font-bold text-dark text-4xl md:text-6xl tracking-tight mb-6">{step.title}</h2>
              <p className="font-sans text-dark/70 text-lg md:text-xl text-balance">{step.desc}</p>
            </div>
            
            <div className="order-1 md:order-2 h-[300px] md:h-[500px] bg-white rounded-[3rem] border border-dark/5 shadow-sm flex items-center justify-center relative overflow-hidden">
              {i === 0 && <Step1Anim />}
              {i === 1 && <Step2Anim />}
              {i === 2 && <Step3Anim />}
            </div>
            
          </div>
        </div>
      ))}
    </section>
  );
}

function Step1Anim() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div className="absolute inset-0 border-[1px] border-primary rounded-full animate-[spin_10s_linear_infinite]"></div>
      <div className="absolute inset-4 border-[1px] border-accent/50 rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
      <div className="absolute inset-8 border-[1px] border-dark/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
      <div className="w-2 h-2 bg-accent rounded-full"></div>
    </div>
  );
}

function Step2Anim() {
  return (
    <div className="w-full h-full p-8 relative flex flex-col justify-between">
      <div className="grid grid-cols-6 gap-2 opacity-20">
        {Array.from({length: 48}).map((_, i) => (
          <div key={i} className="w-full aspect-square bg-dark rounded-sm"></div>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_rgba(204,88,51,0.8)]" style={{
        animation: 'scan 3s ease-in-out infinite alternate',
      }}>
        <style>{`
          @keyframes scan {
            0% { top: 10%; }
            100% { top: 90%; }
          }
        `}</style>
      </div>
    </div>
  );
}

function Step3Anim() {
  return (
    <div className="w-full px-8">
      <svg viewBox="0 0 100 30" className="w-full overflow-visible">
        <path 
          d="M 0 15 L 20 15 L 25 5 L 35 25 L 40 15 L 60 15 L 65 10 L 70 20 L 75 15 L 100 15" 
          fill="none" 
          stroke="#CC5833" 
          strokeWidth="1"
          strokeDasharray="200"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate 
            attributeName="stroke-dashoffset" 
            values="200;0" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </path>
      </svg>
    </div>
  );
}

function Adhesion() {
  return (
    <section className="py-32 px-6 md:px-16 bg-white relative z-20 rounded-t-[3rem] -mt-[3rem]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-sans font-bold text-dark text-4xl md:text-6xl tracking-tight text-balance mb-6">
          Prêt à sécuriser votre lancement ?
        </h2>
        <p className="font-sans text-dark/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          L'intégration technique ne devrait jamais être la raison pour laquelle votre webinaire échoue. Sécurisons votre système.
        </p>
        
        <button className="magnetic-button bg-primary text-background px-10 py-5 rounded-[2rem] text-xl font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-4 relative overflow-hidden group">
          <span className="relative z-10">Réserver une consultation</span>
          <Terminal className="relative z-10" size={24} />
          <div className="absolute inset-0 bg-accent transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out z-0 rounded-[2rem]"></div>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-background pt-24 pb-8 px-6 md:px-16 rounded-t-[4rem] -mt-[2rem] relative z-30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-sans font-bold text-2xl tracking-tight mb-4">Hassan Sani</div>
          <p className="font-sans text-background/60 max-w-sm">
            Intégration technique d'élite pour challenges et webinaires. La mécanique derrière vos conversions.
          </p>
        </div>
        
        <div>
          <h4 className="font-sans font-semibold mb-4 text-white">Navigation</h4>
          <ul className="space-y-3 font-sans text-background/60">
            <li><a href="#features" className="hover:text-accent transition-colors">Fonctionnalités</a></li>
            <li><a href="#philosophie" className="hover:text-accent transition-colors">Approche</a></li>
            <li><a href="#protocole" className="hover:text-accent transition-colors">Protocole</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-sans font-semibold mb-4 text-white">Légal</h4>
          <ul className="space-y-3 font-sans text-background/60">
            <li><a href="#" className="hover:text-accent transition-colors">Mentions Légales</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Confidentialité</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-background/40 text-sm">© 2026 Hassan Sani. Tous droits réservés.</p>
        
        <div className="flex items-center gap-3 bg-[#111] border border-white/5 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="font-mono text-xs text-background/70 tracking-wider">SYSTÈME OPÉRATIONNEL</span>
        </div>
      </div>
    </footer>
  );
}
