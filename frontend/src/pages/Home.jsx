import { Link } from 'react-router-dom';
import Antigravity from '../components/Antigravity';

const Home = () => {
  const loopText =
    'Immerse yourself in a carefully selected world of extraordinary films. From timeless classics to modern masterworks, discover stories that move, inspire, and transform.';

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Antigravity Background Effect */}
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <Antigravity
          count={400}
          magnetRadius={8}
          ringRadius={9}
          waveSpeed={0.3}
          waveAmplitude={1.2}
          particleSize={2}
          lerpSpeed={0.04}
          color="#962020"
          autoAnimate
          particleVariance={1.5}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={2}
          particleShape="capsule"
          fieldStrength={12}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7), rgba(0,0,0,0.85))'
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-0">
        <div className="text-center w-screen max-w-none mx-auto overflow-hidden">
          <div className="home-text-loop mb-8" aria-label="Featured message loop">
            <div className="home-text-loop__track">
              <span className="home-text-loop__item">{loopText}</span>
              <span className="home-text-loop__item" aria-hidden="true">{loopText}</span>
              <span className="home-text-loop__item" aria-hidden="true">{loopText}</span>
              <span className="home-text-loop__item" aria-hidden="true">{loopText}</span>
            </div>
          </div>

          {/* Hero Title */}
          <h1 
            className="font-bold mb-10 leading-[0.88] tracking-[-0.055em] w-screen whitespace-nowrap px-0"
            style={{
              fontSize: 'clamp(3.2rem, 17.2vw, 21rem)',
              color: 'white',
              textShadow: '0 0 52px rgba(150, 32, 32, 0.55)',
              letterSpacing: '-0.055em',
              transform: 'scaleX(1.04)'
            }}
          >
            DIVINE FILMS
          </h1>

          {/* Divider */}
          <div className="w-24 h-1 bg-red-700 mx-auto mb-8"></div>

          {/* Tagline */}
          <p 
            className="text-xl md:text-2xl text-gray-300 mb-4 font-light tracking-wide"
          >
            A CURATED COLLECTION OF CINEMATIC MASTERPIECES
          </p>

          {/* CTA Button */}
          <Link 
            to="/movies"
            className="inline-block group"
          >
            <div 
              className="bg-transparent hover:bg-red-900 text-white px-12 py-5 text-lg font-semibold tracking-widest uppercase transition-all duration-300 relative overflow-hidden rounded-full"
              style={{
                border: '3px solid #962020',
                boxShadow: '0 0 30px rgba(150, 32, 32, 0.3)'
              }}
            >
              <span className="relative z-10">Explore Movies</span>
              <div 
                className="absolute inset-0 bg-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
              ></div>
            </div>
          </Link>

          {/* Bottom Text */}
          <p className="text-gray-600 text-sm mt-16 tracking-wider uppercase">
            In-Store Experience • Streaming Collection
          </p>
        </div>
      </div>

      {/* Film Strip Effect (optional decorative element) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-2 z-20"
        style={{
          background: 'repeating-linear-gradient(90deg, #962020 0px, #962020 20px, transparent 20px, transparent 40px)',
          opacity: 0.3
        }}
      ></div>
    </div>
  );
};

export default Home;