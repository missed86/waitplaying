import { useParams } from "react-router-dom";
import "./Game.css";

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
  like: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
    </svg>
  ),
  dislike: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
    </svg>
  ),
};

const games = {
  "god-of-war-ragnarok": {
    title: "God of War: Ragnarök",
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.png",
    backcover:
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scd71z.jpg",
    genres: ["Adventure", "Hack and slash/Beat 'em up"],
    platforms: ["PlayStation 4", "PlayStation 5"],
    releasedate: "Nov 09, 2022",
    description:
      "God of War: Ragnarök is the ninth installment in the God of War series and the sequel to 2018's God of War. Continuing with the Norse mythology theme, the game is set in ancient Norway and feature series protagonists Kratos, the former Greek God of War, and his young son Atreus. The game is expected to kick off the events of Ragnarök, where Kratos and Atreus must journey to each of the Nine Realms in search of answers as they prepare for the prophesied battle that will end the world.",
  },
  "the-callisto-protocol": {
    title: "The Callisto Protocol",
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ymo.png",
    backcover:
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/schtuh.jpg",
    genres: ["Adventure", "Shooter"],
    platforms: [
      "Xbox One",
      "PlayStation 4",
      "PlayStation 5",
      "PC (Microsoft Windows)",
      "Xbox Series X|S",
    ],
    releasedate: "Dec 02, 2022",
    description:
      "In this narrative-driven, third-person survival horror game set 300 years in the future, the player will take on the role of Jacob Lee – a victim of fate thrown into Black Iron Prison, a maximum-security penitentiary located on Jupiter's moon, Callisto. When inmates begin to transform into monstrous creatures, the prison is thrown into chaos.",
  },
  "a-plague-tale-requiem": {
    title: "A Plague Tale: Requiem",
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5pwb.png",
    backcover:
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9lz.jpg",
    genres: ["Adventure", "Role-playing (RPG)"],
    platforms: ["PlayStation 5", "PC (Microsoft Windows)", "Xbox Series X|S"],
    releasedate: "Oct 18, 2022",
    description:
      "A Plague Tale: Requiem is an action-adventure game similar to its predecessor. The player assumes control of Amicia and must face against both soldiers from the French Inquisition and hordes of rats that are spreading the black plague. Gameplay is largely similar to the first game, though the combat system is significantly expanded. The game features a progression system in which the player will be awarded additional skills and abilities. Stealth players will unlock skills that allow them to sneak around more efficiently, while those who prefer a more lethal approach will unlock additional combat skills. Locations are also larger, giving players additional options to progress.",
  },
  "final-fantasy-xvi": {
    title: "Final Fantasy XVI",
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5w3k.png",
    backcover:
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8kw0.jpg",
    genres: ["Adventure", "Role-playing (RPG)"],
    platforms: ["PlayStation 5", "PC (Microsoft Windows)"],
    releasedate: "Jun 22, 2023",
    description:
      "Final Fantasy XVI is an upcoming action role-playing game developed and published by Square Enix. It is the sixteenth game in the mainline Final Fantasy series and will be released for the PlayStation 5. It is being produced by Naoki Yoshida and directed by Hiroshi Takai.",
  },
};
export default function Game() {
  const { slug } = useParams();
  const {
    title,
    cover,
    backcover,
    genres,
    releasedate,
    description,
    platforms,
  } = games[slug];
  return (
    <div className="Game">
      <div className="backcover-wrapper">
        <img className="backcover" src={backcover} alt={title} />
      </div>
      <div className="main">
        <div className="side-menu">
          <img className="cover" src={cover} alt={title} />
					<div className="game-options">

          <button className="go-button">
            <div className="go-icon">{ICONS.add}</div>
            <span>Follow</span>
          </button>
          <button className="go-button">
            <div className="go-icon">{ICONS.like}</div>
            <span>Like</span>
          </button>
          <button className="go-button">
            <div className="go-icon">{ICONS.dislike}</div>
            <span>Dislike</span>
          </button>
					</div>
        </div>
        <div className="description">
          <div className="title">
            <h1>{title}</h1>
            <h2>{releasedate}</h2>
          </div>
          <p>{platforms.join(", ")}</p>
          <p>{genres.join(", ")}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
