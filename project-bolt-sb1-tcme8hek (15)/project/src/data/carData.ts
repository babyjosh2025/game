import { Car } from '../types';

const cocherojo = "https://raw.githubusercontent.com/Luis901702/coches/main/cocherojo1.png";
const cocherojo1 = "https://raw.githubusercontent.com/Luis901702/coches/main/cocherojo.png";
const cocherojo2 = "https://raw.githubusercontent.com/Luis901702/coches/main/cocherojo2.png";
const cocherojo3 = "https://raw.githubusercontent.com/Luis901702/coches/main/cocherojo3.png";
const cocheComun = "https://raw.githubusercontent.com/Luis901702/coches/main/comun%20-Photoroom.png";
const cochePocComun = "https://raw.githubusercontent.com/Luis901702/coches/main/poccomun-Photoroom.png";
const cocheRaro = "https://raw.githubusercontent.com/Luis901702/coches/main/raro-Photoroom.png";

// Nuevas imágenes
const cocheAzulComun = "https://raw.githubusercontent.com/Luis901702/coches/main/azulcomun-Photoroom%20(2).png";
const cocheAzulEpico = "https://raw.githubusercontent.com/Luis901702/coches/main/azulepico-Photoroom%20(2).png";
const cocheAzulPocoEpico = "https://raw.githubusercontent.com/Luis901702/coches/main/azulepico2-Photoroom.png";
const cocheAzulPocoComun1 = "https://raw.githubusercontent.com/Luis901702/coches/main/azulpococomun-Photoroom%20(1).png";
const cocheAzulPocoComun2 = "https://raw.githubusercontent.com/Luis901702/coches/main/azulpococomun-Photoroom.png";
const cocheAzulRaro = "https://raw.githubusercontent.com/Luis901702/coches/main/azulraro-Photoroom.png";
const cocheGrisComun = "https://raw.githubusercontent.com/Luis901702/coches/main/coche%20griscomun-Photoroom.png";
const cocheGrisComun2 = "https://raw.githubusercontent.com/Luis901702/coches/main/coche%20grispococomun2.png";

export const carData: Car[] = [
  {
    id: "1",
    name: "Wind",
    type: "Common",
    image: cocherojo,
    stats: {
      fuel: 30,
      speed: 45,
      acceleration: 10,
      handling: 45,
      grip: 20
    }
  },
  {
    id: "2",
    name: "Falcon",
    type: "Uncommon",
    image: cocherojo1,
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
    image: cocherojo2,
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
    image: cocherojo3,
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
    image: cocheComun,
    stats: {
      fuel: 30,
      speed: 15,
      acceleration: 40,
      handling: 25,
      grip: 40
    }
  },
  {
    id: "6",
    name: "Tracer",
    type: "Common",
    image: cochePocComun,
    stats: {
      fuel: 30,
      speed: 10,
      acceleration: 50,
      handling: 50,
      grip: 10
    }
  },
  {
    id: "7",
    name: "Phantom",
    type: "Rare",
    image: cocheRaro,
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
    image: cocheAzulComun,
    stats: {
      fuel: 30,
      speed: 30,
      acceleration: 30,
      handling: 30,
      grip: 30
    }
  },
  {
    id: "9",
    name: "Sapphire King",
    type: "Epic",
    image: cocheAzulEpico,
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
    image: cocheAzulPocoEpico,
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
    image: cocheAzulPocoComun1,
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
    image: cocheAzulPocoComun2,
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
    image: cocheAzulRaro,
    stats: {
      fuel: 50,
      speed: 80,
      acceleration: 75,
      handling: 70,
      grip: 65
    }
  },
  {
    id: "14",
    name: "Grinder",
    type: "Common",
    image: cocheGrisComun,
    stats: {
      fuel: 30,
      speed: 45,
      acceleration: 10,
      handling: 45,
      grip: 20
    }
  },
  {
    id: "15",
    name: "Rexon",
    type: "Common",
    image: cocheGrisComun2,
    stats: {
      fuel: 30,
      speed: 15,
      acceleration: 40,
      handling: 25,
      grip: 40
    }
  }
];