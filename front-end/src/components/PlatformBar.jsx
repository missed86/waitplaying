import PlatformButton from "./PlatformButton";

import "./PlatformBar.css";

const platforms = [
  {
    name: "PS4",
    icon: "playstation.svg",
    color: "playstation",
  },
  {
    name: "PS5",
    icon: "playstation.svg",
    color: "playstation",
  },
  {
    name: "Switch",
    icon: "switch.svg",
    color: "nintendo",
  },
  {
    name: "One",
    icon: "xbox.svg",
    color: "xbox",
  },
  {
    name: "Series X/S",
    icon: "xbox.svg",
    color: "xbox",
  },
  {
    name: "PC",
    icon: "pc.svg",
    color: "pc",
  },
];

function PlatformBar() {
  return (
      <div className="PlatformBar">
        {platforms.map((element) => (
          <PlatformButton
            key={element.name}
            name={element.name}
            icon={element.icon}
            color={element.color}
          />
        ))}
      </div>
  );
}

export default PlatformBar;
