import React, { useEffect, useRef } from 'react';
import Fish from './Fish.js';

const AquariumBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas to fill screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create a mix of different fish types
    const fishTypes = ['tropical', 'neon', 'clownfish', 'angelfish', 'goldfish', 'shark'];
    const fishArray = Array.from({ length: 25 }, () => {
      const randomType = fishTypes[Math.floor(Math.random() * fishTypes.length)];
      return new Fish(canvas, ctx, randomType);
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fishArray.forEach(fish => fish.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="aquarium-canvas" />;
};

export default AquariumBackground;