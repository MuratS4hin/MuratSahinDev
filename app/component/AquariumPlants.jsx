import React from 'react';
import './AquariumPlants.css';

const AquariumPlants = () => {
  return (
    <div className="aquarium-plants">
      {/* Vallisneria (Tall Grass) - 12 groups with varying heights */}
      <div className="val-container" style={{ left: '1%' }}>
        <div className="blade" style={{ height: '350px' }}></div>
        <div className="blade" style={{ height: '400px', animationDelay: '-1s' }}></div>
        <div className="blade" style={{ height: '320px', animationDelay: '-2s' }}></div>
      </div>

      <div className="val-container" style={{ left: '7%' }}>
        <div className="blade" style={{ height: '300px' }}></div>
        <div className="blade" style={{ height: '350px', animationDelay: '-1.5s' }}></div>
        <div className="blade" style={{ height: '280px', animationDelay: '-2.5s' }}></div>
      </div>

      <div className="val-container" style={{ left: '13%' }}>
        <div className="blade" style={{ height: '380px' }}></div>
        <div className="blade" style={{ height: '420px', animationDelay: '-0.8s' }}></div>
        <div className="blade" style={{ height: '360px', animationDelay: '-1.8s' }}></div>
      </div>

      <div className="val-container" style={{ left: '19%' }}>
        <div className="blade" style={{ height: '330px' }}></div>
        <div className="blade" style={{ height: '380px', animationDelay: '-1.2s' }}></div>
        <div className="blade" style={{ height: '310px', animationDelay: '-2.2s' }}></div>
      </div>

      <div className="val-container" style={{ left: '25%' }}>
        <div className="blade" style={{ height: '400px' }}></div>
        <div className="blade" style={{ height: '440px', animationDelay: '-0.9s' }}></div>
        <div className="blade" style={{ height: '380px', animationDelay: '-1.9s' }}></div>
      </div>

      <div className="val-container" style={{ left: '31%' }}>
        <div className="blade" style={{ height: '290px' }}></div>
        <div className="blade" style={{ height: '340px', animationDelay: '-1.6s' }}></div>
        <div className="blade" style={{ height: '270px', animationDelay: '-2.6s' }}></div>
      </div>

      <div className="val-container" style={{ right: '31%' }}>
        <div className="blade" style={{ height: '370px' }}></div>
        <div className="blade" style={{ height: '410px', animationDelay: '-1.3s' }}></div>
        <div className="blade" style={{ height: '350px', animationDelay: '-2.3s' }}></div>
      </div>

      <div className="val-container" style={{ right: '25%' }}>
        <div className="blade" style={{ height: '340px' }}></div>
        <div className="blade" style={{ height: '390px', animationDelay: '-1.2s' }}></div>
        <div className="blade" style={{ height: '330px', animationDelay: '-2.2s' }}></div>
      </div>

      <div className="val-container" style={{ right: '19%' }}>
        <div className="blade" style={{ height: '400px' }}></div>
        <div className="blade" style={{ height: '440px', animationDelay: '-0.9s' }}></div>
        <div className="blade" style={{ height: '380px', animationDelay: '-1.9s' }}></div>
      </div>

      <div className="val-container" style={{ right: '13%' }}>
        <div className="blade" style={{ height: '300px' }}></div>
        <div className="blade" style={{ height: '350px', animationDelay: '-1.5s' }}></div>
        <div className="blade" style={{ height: '280px', animationDelay: '-2.5s' }}></div>
      </div>

      <div className="val-container" style={{ right: '7%' }}>
        <div className="blade" style={{ height: '360px' }}></div>
        <div className="blade" style={{ height: '400px', animationDelay: '-1.1s' }}></div>
        <div className="blade" style={{ height: '340px', animationDelay: '-2.1s' }}></div>
      </div>

      <div className="val-container" style={{ right: '1%' }}>
        <div className="blade" style={{ height: '290px' }}></div>
        <div className="blade" style={{ height: '340px', animationDelay: '-1.6s' }}></div>
        <div className="blade" style={{ height: '270px', animationDelay: '-2.6s' }}></div>
      </div>

      {/* Anubias (Broad Leaves) - 8 clusters */}
      <div className="anubias" style={{ left: '5%', bottom: '10px' }}>
        <div className="leaf leaf-1"></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3"></div>
      </div>

      <div className="anubias" style={{ left: '15%', bottom: '5px' }}>
        <div className="leaf leaf-1" style={{ transform: 'rotate(-45deg)' }}></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3" style={{ transform: 'rotate(35deg) scale(0.9)' }}></div>
      </div>

      <div className="anubias" style={{ left: '30%', bottom: '8px' }}>
        <div className="leaf leaf-1" style={{ transform: 'rotate(-25deg)' }}></div>
        <div className="leaf leaf-2" style={{ transform: 'rotate(15deg) scale(0.85)' }}></div>
        <div className="leaf leaf-3" style={{ transform: 'rotate(50deg)' }}></div>
      </div>

      <div className="anubias" style={{ left: '42%', bottom: '5px' }}>
        <div className="leaf leaf-1"></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3"></div>
      </div>

      <div className="anubias" style={{ right: '42%', bottom: '5px' }}>
        <div className="leaf leaf-1" style={{ transform: 'rotate(-20deg)' }}></div>
        <div className="leaf leaf-2" style={{ transform: 'rotate(20deg) scale(0.9)' }}></div>
        <div className="leaf leaf-3"></div>
      </div>

      <div className="anubias" style={{ right: '30%', bottom: '8px' }}>
        <div className="leaf leaf-1" style={{ transform: 'rotate(-35deg)' }}></div>
        <div className="leaf leaf-2" style={{ transform: 'rotate(10deg) scale(0.85)' }}></div>
        <div className="leaf leaf-3" style={{ transform: 'rotate(45deg)' }}></div>
      </div>

      <div className="anubias" style={{ right: '15%', bottom: '5px' }}>
        <div className="leaf leaf-1" style={{ transform: 'rotate(-40deg)' }}></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3" style={{ transform: 'rotate(40deg) scale(0.9)' }}></div>
      </div>

      <div className="anubias" style={{ right: '5%', bottom: '10px' }}>
        <div className="leaf leaf-1"></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3"></div>
      </div>

      {/* Coral Reef - Center structure */}
      <div className="reef-structure">
        {/* Coral pieces */}
        <div className="coral coral-1"></div>
        <div className="coral coral-2"></div>
        <div className="coral coral-3"></div>
        <div className="coral coral-4"></div>
        <div className="coral coral-5"></div>
        <div className="coral coral-6"></div>
        <div className="coral coral-7"></div>
        <div className="coral coral-8"></div>
        <div className="coral coral-9"></div>
      </div>

      {/* Marimo Moss Balls - 8 with varying sizes and positions */}
      <div className="moss-ball" style={{ left: '10%', width: '60px', height: '55px' }}></div>
      
      <div className="moss-ball" style={{ left: '22%', width: '75px', height: '70px', bottom: '0px' }}></div>
      
      <div className="moss-ball" style={{ left: '35%', width: '50px', height: '45px', bottom: '5px' }}></div>

      <div className="moss-ball" style={{ left: '48%', width: '65px', height: '60px', bottom: '2px' }}></div>

      <div className="moss-ball" style={{ right: '48%', width: '55px', height: '50px', bottom: '3px' }}></div>

      <div className="moss-ball" style={{ right: '35%', width: '70px', height: '65px', bottom: '1px' }}></div>

      <div className="moss-ball" style={{ right: '22%', width: '50px', height: '45px', bottom: '5px' }}></div>

      <div className="moss-ball" style={{ right: '10%', width: '60px', height: '55px' }}></div>

      {/* Substrate/Ground */}
      <div className="substrate"></div>
    </div>
  );
};

export default AquariumPlants;
