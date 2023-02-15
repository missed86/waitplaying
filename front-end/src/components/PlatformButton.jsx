import { useState, useEffect } from "react";
import "./PlatformButton.css";
const ICON_PATH = "/assets/platforms/";

export default function PlatformButton({ name, icon, color, active, onClick }) {
  const [actived, setActived] = useState(true);
  const handleClick = (name) => {
    setActived(!actived);
  };
  useEffect(() => {
    setActived(active);
  }, [active]);
  return (
    <div
      className={`PlatformButton ${color} ${actived ? "actived" : ""}`}
      onClick={onClick}
    >
      <img className={`icon`} src={ICON_PATH + icon} alt={name} draggable="false" />
      <span className="label">{name}</span>
    </div>
  );
}
