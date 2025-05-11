import React, { useState } from 'react';
import CarCard from './components/CarCard';
import { carData } from './data/carData';

function App() {
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  const filteredCars = selectedRarity === 'all' 
    ? carData 
    : carData.filter(car => car.type.toLowerCase() === selectedRarity.toLowerCase());

  const rarityTypes = ['All', 'Common', 'Uncommon', 'Rare', 'Epic'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Car Collection</h1>
          
          <div className="flex gap-2">
            {rarityTypes.map((rarity) => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity.toLowerCase())}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRarity === rarity.toLowerCase()
                    ? 'bg-rose-600 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;