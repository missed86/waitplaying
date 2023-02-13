// import { useState } from "react";

import PlatformButton from "./PlatformButton";
// import "./PlatformBar.css";

// import { useContext, useEffect, useState } from "react";

import styled from "styled-components"

const Component = styled.div`
  margin: 0 0 20px 0;
  display:flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: hidden;
  flex-wrap: wrap;
`
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
    name: "PSVR2",
    icon: "playstation.svg",
    color: "playstation",
  },
  {
    name: "Switch",
    icon: "switch.svg",
    color: "nintendo",
  },
  {
    name: "XONE",
    icon: "xbox.svg",
    color: "xbox",
  },
  {
    name: "Series X",
    icon: "xbox.svg",
    color: "xbox",
  },
  {
    name: "PC",
    icon: "pc.svg",
    color: "pc",
  },
];

function PlatformBar({filters, setFilters}) {
  // console.log(platforms)
  const handleClick = (filter) => {
    const filtersCopy = [...filters];
    const index = filtersCopy.indexOf(filter);
    if (index === -1) {
      filtersCopy.push(filter);
    } else {
      filtersCopy.splice(index, 1);
    }
    setFilters(filtersCopy);
    // console.log(filters)
  };
  // useEffect(()=>{

  // },[filters])
  return (
      <Component>
        {platforms.map((element) => (
          <PlatformButton
            key={element.name}
            name={element.name}
            icon={element.icon}
            color={element.color}
            active={filters.includes(element.name)}
            onClick={() => handleClick(element.name)}
          />
        ))
        }
      </Component>
  );
}

export default PlatformBar;
