import { useState } from "react";
import styled from "styled-components";
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const Component = styled.div`
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`


const CoverURL = (cover) => `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.png`
const main_platforms = ["PS5", "PS4", "Series X", "PC"];

const only_main_platforms = (array) =>
  array.filter((p) => main_platforms.includes(p));

export default function GameCard({ image, title, platforms, marked }) {
// console.log("🚀 ~ file: GameCard.jsx:52 ~ GameCard ~ marked:", marked)

  platforms = [...new Set(platforms)]
  const handleClick = (event) => {
    event.preventDefault();
    // console.log(event);
    setActived(!actived);
  };
  const [actived, setActived] = useState(marked);
  return (
    <Component className="GameCard">
      <div
        className={`button ${actived ? "actived" : ""}`}
        onClick={handleClick}
      >
        {ICONS.add}
      </div>
      <div className="hover">
        <div className="platforms">
          {platforms.length <= 3
            ? platforms.map((platform) => {
                return (
                  <span key={platform+title} className="platform-pill">
                    {platform}
                  </span>
                );
              })
            : only_main_platforms(platforms)
                .slice(0, 3)
                .map((platform) => {
                  return (
                    <span key={platform+title} className="platform-pill">
                      {platform}
                    </span>
                  );
                })}
                {(platforms.length>3)?(
                  <span key={title} className="platform-pill">
                    +
                  </span>
                ):""}
          {/* {only_main_platforms.slice(0, 3).map((platform) => {
            return (
              <span key={platform} className="platform-pill">
                {platform}
              </span>
            );
          })}
          {platforms.length > 3 ? <span>+</span> : ""} */}
        </div>
        <div className="container">
          <span className="title">{title}</span>
        </div>
      </div>
      <img className="cover" src={CoverURL(image)} alt={title} />
    </Component>
  );
}
