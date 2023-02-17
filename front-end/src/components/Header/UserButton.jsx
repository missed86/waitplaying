// import './UserButton.css'
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import UserMenu from "./UserMenu";

const Component = styled.div`
  width: 35px;
  height: 35px;
  position: relative;
  cursor: pointer;
`;
const Avatar = styled.img`
  overflow: hidden;
  border-radius: 50%;
  object-fit: fill;
  width: 35px;
  height: 35px;
`;

export default function UserButton() {
  const [actived, setActived] = useState(false);
  const modalEl = useRef();

  const handleClick = () => {
    setActived(!actived);
  };
  useEffect(() => {
    const handler = (event) => {
      if (!modalEl.current) {
        return;
      }
      if (!modalEl.current.contains(event.target)) {
        setActived(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  return (
    <Component ref={modalEl} onClick={handleClick}>
      <Avatar src="/assets/default_user.png" alt="default_user" />
      <UserMenu actived={actived} />
    </Component>
  );
}
