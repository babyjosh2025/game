import React, { useState, useEffect, useRef, useMemo } from 'react';

// Interfaces
interface Car {
  id: string;
  name: string;
  type: string;
  image?: string;
  stats: {
    handling: number;
    acceleration: number;
    speed: number;
    fuel: number;
    grip: number;
  };
}

interface RacerPosition {
  id: string;
  name: string;
  position: number;
  image?: string;
  stats: {
    handling: number;
    acceleration: number;
    speed: number;
  };
}

interface VirtualRaceProps {
  car: Car;
  onClose: () => void;
}

interface TrackObjectProps {
  src: string;
  alt: string;
  trajectory: 'upper' | 'lower' | 'lane';
  offset: number;
  size: number;
  initialTopOffset: number;
  initialLeftOffset: number;
  delay: number;
  duration: number;
  isRacing: boolean;
  speedMultiplier: number;
  resetKey: number;
  onComplete: () => void;
  trajectories: {
    upper: { initial: { top: number; left: number }; final: { top: number; left: number } };
    lower: { initial: { top: number; left: number }; final: { top: number; left: number } };
    lane: { initial: { top: number; left: number }; final: { top: number; left: number } };
  };
}

const TrackObject: React.FC<TrackObjectProps> = ({
  src,
  alt,
  trajectory,
  offset,
  size,
  initialTopOffset,
  initialLeftOffset,
  delay,
  duration,
  isRacing,
  speedMultiplier,
  resetKey,
  onComplete,
  trajectories,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const { initial, final } = trajectories[trajectory];

  const adjustedDuration = useMemo(
    () => duration / speedMultiplier,
    [duration, speedMultiplier]
  );

  useEffect(() => {
    setIsVisible(true);
  }, [resetKey]);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement || !isRacing) return;

    const handleAnimationEnd = () => {
      setIsVisible(false);
      onComplete();
    };

    imgElement.addEventListener('animationend', handleAnimationEnd);

    return () => {
      imgElement.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isRacing, onComplete]);

  if (!isVisible) return null;

  const startPosition = {
    top: initial.top + initialTopOffset,
    left: initial.left + initialLeftOffset,
  };

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`absolute ${isRacing ? `animate-${trajectory}` : ''}`}
      style={{
        width: `${size}px`,
        height: trajectory === 'lane' ? 'auto' : `${size}px`, // Preserva la proporción para la línea
        top: `${startPosition.top}px`,
        left: `${startPosition.left}px`,
        zIndex: trajectory === 'lower' ? 25 : trajectory === 'lane' ? 18 : 15,
        animation: isRacing
          ? `${trajectory}-move ${adjustedDuration}s linear ${delay}s forwards`
          : 'none',
        '--deltaX': `${final.left - initial.left}px`,
        '--deltaY': `${final.top - initial.top}px`,
      } as React.CSSProperties}
      onError={(e) => (e.currentTarget.src = `https://via.placeholder.com/${size}?text=Error`)}
    />
  );
};

const styles = `
  @keyframes flipReplace {
    0% { transform: perspective(500px) rotateX(0deg); opacity: 1; }
    50% { transform: perspective(500px) rotateX(180deg); opacity: 0.5; }
    100% { transform: perspective(500px) rotateX(360deg); opacity: 1; }
  }

  @keyframes movePosition {
    0% { transform: translateY(var(--startY)); }
    100% { transform: translateY(0); }
  }

  @keyframes upper-move {
    0% { 
      transform: translate(0, 0);
      opacity: 1;
    }
    90% { 
      transform: translate(180px, -99px);
      opacity: 1;
    }
    100% { 
      transform: translate(200px, -110px);
      opacity: 0;
    }
  }

  @keyframes lower-move {
    0% { 
      transform: translate(0, 0);
      opacity: 1;
    }
    90% { 
      transform: translate(198px, -117px);
      opacity: 1;
    }
    100% { 
      transform: translate(220px, -130px);
      opacity: 0;
    }
  }

  @keyframes lane-move {
    0% { 
      transform: translate(0, 0);
      opacity: 1;
    }
    90% { 
      transform: translate(calc(var(--deltaX) * 0.9), calc(var(--deltaY) * 0.9));
      opacity: 1;
    }
    100% { 
      transform: translate(var(--deltaX), var(--deltaY));
      opacity: 0;
    }
  }

  .animate-flip-move {
    animation: flipReplace 0.5s ease-in-out, movePosition 0.5s ease-in-out;
  }

  .animate-upper {
    animation: upper-move var(--duration) linear forwards;
  }

  .animate-lower {
    animation: lower-move var(--duration) linear forwards;
  }

  .animate-lane {
    animation: lane-move var(--duration) linear forwards;
  }
`;

const carData: Car[] = [
  {
    id: "1",
    name: "Wind",
    type: "Common",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/cocherojo1.png",
    stats: {
      fuel: 30,
      speed: 50,
      acceleration: 45,
      handling: 40,
      grip: 40
    }
  },
  {
    id: "2",
    name: "Falcon",
    type: "Uncommon",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/cocherojo.png",
    stats: {
      fuel: 40,
      speed: 65,
      acceleration: 55,
      handling: 50,
      grip: 50
    }
  },
  {
    id: "3",
    name: "Shadow",
    type: "Rare",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/cocherojo2.png",
    stats: {
      fuel: 50,
      speed: 80,
      acceleration: 75,
      handling: 70,
      grip: 65
    }
  },
  {
    id: "4",
    name: "Titan",
    type: "Epic",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/cocherojo3.png",
    stats: {
      fuel: 60,
      speed: 90,
      acceleration: 85,
      handling: 80,
      grip: 75
    }
  },
  {
    id: "5",
    name: "Dash",
    type: "Common",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/comun%20-Photoroom.png",
    stats: {
      fuel: 35,
      speed: 55,
      acceleration: 50,
      handling: 45,
      grip: 45
    }
  },
  {
    id: "6",
    name: "Tracer",
    type: "Common",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/poccomun-Photoroom.png",
    stats: {
      fuel: 35,
      speed: 55,
      acceleration: 50,
      handling: 45,
      grip: 45
    }
  },
  {
    id: "7",
    name: "Phantom",
    type: "Rare",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/raro-Photoroom.png",
    stats: {
      fuel: 50,
      speed: 80,
      acceleration: 75,
      handling: 70,
      grip: 65
    }
  },
  {
    id: "8",
    name: "Blue Breeze",
    type: "Common",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/azulcomun-Photoroom%20(2).png",
    stats: {
      fuel: 35,
      speed: 55,
      acceleration: 50,
      handling: 45,
      grip: 45
    }
  },
  {
    id: "9",
    name: "Sapphire King",
    type: "Epic",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/azulepico-Photoroom%20(2).png",
    stats: {
      fuel: 60,
      speed: 90,
      acceleration: 85,
      handling: 80,
      grip: 75
    }
  },
  {
    id: "10",
    name: "Sky Warrior",
    type: "Epic",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/azulepico2-Photoroom.png",
    stats: {
      fuel: 55,
      speed: 85,
      acceleration: 80,
      handling: 75,
      grip: 70
    }
  },
  {
    id: "11",
    name: "Aqua Flash",
    type: "Uncommon",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/azulpococomun-Photoroom%20(1).png",
    stats: {
      fuel: 40,
      speed: 65,
      acceleration: 55,
      handling: 50,
      grip: 50
    }
  },
  {
    id: "12",
    name: "Ocean Dart",
    type: "Uncommon",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/azulpococomun-Photoroom.png",
    stats: {
      fuel: 40,
      speed: 65,
      acceleration: 55,
      handling: 50,
      grip: 50
    }
  },
  {
    id: "13",
    name: "Midnight Storm",
    type: "Rare",
    image: "https://raw.githubusercontent.com/Luis901702/coches/main/azulraro-Photoroom.png",
    stats: {
      fuel: 50,
      speed: 80,
      acceleration: 75,
      handling: 70,
      grip: 65
    }
  }
];

const VirtualRace: React.FC<VirtualRaceProps> = ({ car, onClose }) => {
  const [countdown, setCountdown] = useState<string | number>('READY');
  const [isRacing, setIsRacing] = useState(false);
  const [raceTime, setRaceTime] = useState(30);
  const [positions, setPositions] = useState<RacerPosition[]>([]);
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [currentObjects, setCurrentObjects] = useState<any[]>([]);
  const [playerPosition, setPlayerPosition] = useState<string | null>(null);
  const [isCarVisible, setIsCarVisible] = useState(true); // Estado para visibilidad del coche
  const previousPositionsRef = useRef<RacerPosition[]>([]);
  const upperLaneRef = useRef<boolean>(false);
  const lowerLaneRef = useRef<boolean>(false);
  const laneRef = useRef<boolean>(false);
  const lastUpperObjectRef = useRef<string | null>(null);
  const lastLowerObjectRef = useRef<string | null>(null);

  const objectSize = 80;
  const carSize = 280;

  const trajectories = {
    upper: {
      initial: { top: 110, left: 190 },
      final: { top: 0, left: 390 },
    },
    lower: {
      initial: { top: 260, left: 430 },
      final: { top: 130, left: 650 },
    },
    lane: {
      initial: { top: 220, left: 260 }, // Posición inicial (parece correcta según tu código)
      final: { top: 65, left: 520 },  // Ajusta top y left para la posición final
    },
  };

  const objectTemplates = useMemo(() => ({
    upper: [
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/captus-Photoroom.png',
        alt: 'Captus',
        trajectory: 'upper' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/nopal-Photoroom.png',
        alt: 'Nopal',
        trajectory: 'upper' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/piedra-Photoroom.png',
        alt: 'Piedra',
        trajectory: 'upper' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/roca-Photoroom.png',
        alt: 'Roca',
        trajectory: 'upper' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/arbusto-Photoroom%20(2).png',
        alt: 'Arbusto',
        trajectory: 'upper' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/arbusto2.png',
        alt: 'Arbusto 2',
        trajectory: 'upper' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/arbusto3.png',
        alt: 'Arbusto 3',
        trajectory: 'upper' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
    ],
    lower: [
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/captus-Photoroom.png',
        alt: 'Captus',
        trajectory: 'lower' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/nopal-Photoroom.png',
        alt: 'Nopal',
        trajectory: 'lower' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/piedra-Photoroom.png',
        alt: 'Piedra',
        trajectory: 'lower' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/roca-Photoroom.png',
        alt: 'Roca',
        trajectory: 'lower' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/arbusto-Photoroom%20(2).png',
        alt: 'Arbusto',
        trajectory: 'lower' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/arbusto2.png',
        alt: 'Arbusto 2',
        trajectory: 'lower' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/arbusto3.png',
        alt: 'Arbusto 3',
        trajectory: 'lower' as const,
        offset: 0,
        size: objectSize,
        initialTopOffset: 0,
        initialLeftOffset: 0,
      },
    ],
    lane: [
      {
        src: 'https://raw.githubusercontent.com/Luis901702/coches/main/lineacarril-Photoroom.png',
        alt: 'Lane Line',
        trajectory: 'lane' as const,
        offset: 0,
        size: 150, // Tamaño personalizado para la línea de carril
        initialTopOffset: 0, // Ajusta para desplazamiento vertical fino
        initialLeftOffset: 0, // Ajusta para desplazamiento horizontal fino
      },
    ],
  }), []);

  const baseDuration = 2;

  useEffect(() => {
    if (!isRacing || raceTime <= 0) return;

    const speedInterval = setInterval(() => {
      setSpeedMultiplier((prev) => {
        if (prev < 1.5) return prev + 0.025;
        if (prev < 2) return prev + 0.025;
        if (prev < 4) return prev + 0.05;
        return prev;
      });
    }, 100);

    return () => clearInterval(speedInterval);
  }, [isRacing, raceTime]);

  const getRandomObject = (trajectory: 'upper' | 'lower' | 'lane', lastObjectSrc: string | null) => {
    const objects = objectTemplates[trajectory];
    if (trajectory === 'lane') {
      return objects[0];
    }
    const availableObjects = lastObjectSrc
      ? objects.filter((obj) => obj.src !== lastObjectSrc)
      : objects;
    return availableObjects[Math.floor(Math.random() * availableObjects.length)];
  };

  const spawnObject = (trajectory: 'upper' | 'lower' | 'lane') => {
    if (raceTime <= 0) return;

    if (
      (trajectory === 'upper' && upperLaneRef.current) ||
      (trajectory === 'lower' && lowerLaneRef.current) ||
      (trajectory === 'lane' && laneRef.current)
    ) {
      return;
    }

    if (trajectory === 'upper') {
      upperLaneRef.current = true;
    } else if (trajectory === 'lower') {
      lowerLaneRef.current = true;
    } else {
      laneRef.current = true;
    }

    const lastObjectSrc =
      trajectory === 'upper'
        ? lastUpperObjectRef.current
        : trajectory === 'lower'
        ? lastLowerObjectRef.current
        : null;
    const newObject = {
      ...getRandomObject(trajectory, lastObjectSrc),
      delay: 0,
      key: Date.now() + Math.random(),
    };

    if (trajectory === 'upper') {
      lastUpperObjectRef.current = newObject.src;
    } else if (trajectory === 'lower') {
      lastLowerObjectRef.current = newObject.src;
    }

    setCurrentObjects((prev) => [...prev, newObject]);
  };

  useEffect(() => {
    if (!isRacing || raceTime <= 0) return;

    spawnObject('upper');
    setTimeout(() => spawnObject('lower'), 1000);
  }, [isRacing]);

  useEffect(() => {
    if (!isRacing || raceTime <= 0) return;

    const spawnLaneInterval = setInterval(() => {
      spawnObject('lane');
    }, 400);

    return () => clearInterval(spawnLaneInterval);
  }, [isRacing, raceTime]);

  const handleObjectComplete = (key: number) => {
    setCurrentObjects((prev) => {
      const obj = prev.find((o) => o.key === key);
      if (obj && raceTime > 0) {
        if (obj.trajectory === 'upper') {
          upperLaneRef.current = false;
          setTimeout(() => spawnObject('upper'), 0);
        } else if (obj.trajectory === 'lower') {
          lowerLaneRef.current = false;
          setTimeout(() => spawnObject('lower'), 0);
        } else if (obj.trajectory === 'lane') {
          laneRef.current = false;
          setTimeout(() => spawnObject('lane'), 0);
        }
      }
      return prev.filter((obj) => obj.key !== key);
    });
  };

  useEffect(() => {
    const availableOpponents = carData.filter((opponent) => opponent.id !== car.id);
    const shuffledOpponents = [...availableOpponents].sort(() => Math.random() - 0.5);
    const selectedOpponents = shuffledOpponents.slice(0, 3);

    const opponents: RacerPosition[] = [
      {
        id: car.id,
        name: car.name,
        position: 1,
        stats: {
          handling: Math.floor(car.stats.handling * 0.8),
          acceleration: Math.floor(car.stats.acceleration * 0.9),
          speed: car.stats.speed,
        },
        image: car.image,
      },
      ...selectedOpponents.map((opponent, index) => ({
        id: opponent.id,
        name: opponent.name,
        position: index + 2,
        stats: {
          handling: opponent.stats?.handling || 50,
          acceleration: opponent.stats?.acceleration || 50,
          speed: opponent.stats?.speed || 50,
        },
        image: opponent.image,
      })),
    ];

    setPositions(opponents);
    previousPositionsRef.current = opponents;
  }, [car]);

  useEffect(() => {
    if (countdown === 'READY') {
      setTimeout(() => setCountdown(3), 2000);
    } else if (typeof countdown === 'number' && countdown > 0) {
      setTimeout(() => setCountdown((prev) => (typeof prev === 'number' ? prev - 1 : prev)), 1000);
    } else if (countdown === 0) {
      setIsRacing(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (!isRacing) return;

    const raceInterval = setInterval(() => {
      setRaceTime((prev) => {
        if (prev <= 0) {
          clearInterval(raceInterval);
          const player = positions.find((racer) => racer.id === car.id);
          if (player) {
            switch (player.position) {
              case 1:
                setPlayerPosition('First Place');
                break;
              case 2:
                setPlayerPosition('Second Place');
                break;
              case 3:
                setPlayerPosition('Third Place');
                break;
              case 4:
                setPlayerPosition('Fourth Place');
                break;
              default:
                setPlayerPosition('Unknown Place');
            }
          }
          return 0;
        }
        return prev - 1;
      });

      if (raceTime > 0 && raceTime % 5 === 0) {
        setPositions((prev) => {
          previousPositionsRef.current = [...prev];
          const shuffled = [...prev].sort(() => Math.random() - 0.5);
          return shuffled.map((racer, index) => ({
            ...racer,
            position: index + 1,
          }));
        });
        setTriggerAnimation((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(raceInterval);
  }, [isRacing, raceTime, positions, car.id]);

  const getTranslateY = (racer: RacerPosition) => {
    const previousPosition =
      previousPositionsRef.current.find((p) => p.id === racer.id)?.position || racer.position;
    const positionDiff = previousPosition - racer.position;
    return positionDiff * 60;
  };

  const toggleCarVisibility = () => {
    setIsCarVisible((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <style>{styles}</style>
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="bg-white p-4 rounded-t-lg h-[500px] relative">
          <div className="relative h-full flex items-center justify-center">
            <button
              onClick={toggleCarVisibility}
              className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors z-30"
            >
              {isCarVisible ? 'Ocultar Coche' : 'Mostrar Coche'}
            </button>

            <img
              src="https://raw.githubusercontent.com/Luis901702/coches/main/pista%20desierto.png"
              alt="Race Track"
              className="w-[80%] h-[80%] object-contain z-10 track"
              style={{ position: 'absolute', zIndex: 10 }}
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/500?text=Track+Error')}
            />

            {currentObjects.map((obj) => (
              <TrackObject
                key={obj.key}
                {...obj}
                duration={baseDuration}
                isRacing={isRacing}
                speedMultiplier={speedMultiplier}
                resetKey={obj.key}
                onComplete={() => handleObjectComplete(obj.key)}
                trajectories={trajectories}
              />
            ))}

            {isCarVisible && (
              <img
                src={car.image || 'https://via.placeholder.com/80?text=Car'}
                alt={car.name}
                className="absolute top-[40px] left-[300px] z-20 car"
                style={{ width: `${carSize}px`, height: `${carSize}px`, zIndex: 20 }}
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/80?text=Car+Error')}
              />
            )}

            {countdown !== 0 && <div className="absolute inset-0 bg-gray-500/30 z-40"></div>}
          </div>
          {countdown !== 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <span className="text-8xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {countdown}
              </span>
            </div>
          )}
          {raceTime <= 0 && playerPosition && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <span className="text-8xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {playerPosition}
              </span>
            </div>
          )}
        </div>

        <div className="bg-[#1a1a1a] p-4">
          <div className="space-y-2">
            {positions.map((racer) => {
              const translateY = getTranslateY(racer);
              return (
                <div
                  key={`${racer.id}-${triggerAnimation}`}
                  className={`flex items-center gap-4 p-2 rounded animate-flip-move ${
                    racer.id === car.id ? 'bg-yellow-500/20' : ''
                  }`}
                  style={{ '--startY': `${translateY}px` } as React.CSSProperties}
                >
                  <img
                    src={racer.image || 'https://via.placeholder.com/32?text=Car'}
                    alt={racer.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/32?text=Car+Error')}
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">{racer.name}</div>
                    <div className="grid grid-cols-3 gap-4 mt-1">
                      <div className="text-gray-400 text-sm">Handling: {racer.stats.handling}</div>
                      <div className="text-gray-400 text-sm">Acceleration: {racer.stats.acceleration}</div>
                      <div className="text-gray-400 text-sm">Speed: {racer.stats.speed}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-4 rounded-b-lg flex items-center justify-between">
          <div className="text-white text-xl font-medium">Time: {raceTime}s</div>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
          >
            Exit Race
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualRace;