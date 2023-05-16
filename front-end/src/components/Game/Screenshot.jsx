import React from "react";
import styled from "styled-components";

// import { VisibilityContext } from "react-horizontal-scrolling-menu";


const Thumb = styled.img`
    height: 200px;
`

export function Screenshot({ image, itemId }) {
//   const visibility = React.useContext(VisibilityContext);

//   const visible = visibility.isItemVisible(itemId);

  return (
    <div
    role="button"
      style={{
        // border: "1px solid",
        display: "inline-flex",
        margin: "5px",
        userSelect: "none",
      }}
      tabIndex={0}
      className="card">
      <Thumb src={image} alt={itemId} />
    </div>
  );
}
