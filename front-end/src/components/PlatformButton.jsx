import { useState } from "react";
import "./PlatformButton.css";
const ICON_PATH = "./assets/platforms/";

export default function PlatformButton({ name, icon, color }) {
  const [actived, setActived] = useState(true);

  return (
    <div
      className={`PlatformButton ${color} ${actived ? "actived" : ""}`}
      onClick={() => setActived(!actived)}
    >
      <img className={`icon`} src={ICON_PATH + icon} alt={name} draggable="false" />
      <span className="label">{name}</span>
    </div>
  );
}
