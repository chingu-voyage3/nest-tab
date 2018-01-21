import bg1 from "../assets/wallpapers/01.jpeg";
import bg2 from "../assets/wallpapers/02.jpeg";
import bg3 from "../assets/wallpapers/03.jpeg";
import bg4 from "../assets/wallpapers/04.jpeg";
import bg5 from "../assets/wallpapers/05.jpeg";
import bg6 from "../assets/wallpapers/06.jpeg";
import bg7 from "../assets/wallpapers/07.jpeg";
import bg8 from "../assets/wallpapers/08.jpeg";
import bg9 from "../assets/wallpapers/09.jpeg";
import bg10 from "../assets/wallpapers/10.jpeg";
import bg11 from "../assets/wallpapers/11.jpeg";
import bg12 from "../assets/wallpapers/12.jpeg";
import bg13 from "../assets/wallpapers/13.jpeg";

const bgArray = [
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
  bg7,
  bg8,
  bg9,
  bg10,
  bg11,
  bg12,
  bg13
];

export function getBackgroundImage() {
  return `url(${bgArray[Math.floor(Math.random() * 13)]})`;
}
