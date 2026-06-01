import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ClickSpark = () => {
  useEffect(() => {
    const handleClick = (e) => {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        },
        colors: ['#facc15', '#ffffff'],
        ticks: 50,
        gravity: 0.8,
        scalar: 0.5,
        zIndex: 9999
      });
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null;
};

export default ClickSpark;
