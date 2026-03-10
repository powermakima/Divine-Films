import { useEffect, useRef } from 'react';

const CursorAntigravity = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const particles = useRef([]);
  const animationId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Initialize 300 particles for ring formation
    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < 300; i++) {
        const angle = (i / 300) * Math.PI * 2;
        particles.current.push({
          x: width / 2,
          y: height / 2,
          vx: 0,
          vy: 0,
          radius: Math.random() * 0.5 + 0.3,
          angle: angle,
          t: Math.random() * 100,
          speed: 0.01 + Math.random() / 200,
        });
      }
    };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const drawParticle = (particle) => {
      const magnetRadius = 6;
      const ringRadius = 7;
      const waveSpeed = 0.4;
      const waveAmplitude = 1;
      const time = Date.now() * 0.001;

      particle.t += particle.speed;

      // Calculate position around cursor
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Distance-based wave calculation
      const wave = Math.sin(particle.t * waveSpeed + particle.angle) * (0.5 * waveAmplitude);
      const currentRingRadius = ringRadius + wave;

      // Target ring position
      const ringX = targetX + Math.cos(particle.angle) * currentRingRadius;
      const ringY = targetY + Math.sin(particle.angle) * currentRingRadius;

      // Smooth lerp to ring
      particle.x += (ringX - particle.x) * 0.05;
      particle.y += (ringY - particle.y) * 0.05;

      // Pulse effect
      const pulseScale = 0.8 + Math.sin(particle.t * 3) * 0.2;
      const finalRadius = particle.radius * pulseScale;

      // Very faded purple-pink for subtle effect
      const hue = 280;
      ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.12)`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, finalRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      // Very subtle fade for motion trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.fillRect(0, 0, width, height);

      // Draw all particles
      particles.current.forEach(drawParticle);

      animationId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    initParticles();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5, display: 'block' }}
    />
  );
};

export default CursorAntigravity;
