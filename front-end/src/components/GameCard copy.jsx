import { useState } from "react";
import "./GameCard.css";

const ICONS = {
  add: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>

  ),
};

export default function GameCard({ image, title }) {
  const handleClick = (event) => {
    event.preventDefault();
    console.log(event);
    setActived(!actived);
  };
  const [actived, setActived] = useState(false);
  return (
    <div className="GameCard">
      <div className="hover">
        <div className="container">
          <div
            className={`button ${actived ? "actived" : ""}`}
            onClick={handleClick}
          >
            {ICONS.star}
          </div>
          <span className="title">{title}</span>
        </div>
      </div>

      <img className="cover" src={image} alt={title} />
    </div>
  );
}
