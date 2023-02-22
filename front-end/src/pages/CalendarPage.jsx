import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
// import "./Calendar.css";
import styled from "styled-components";

import ListView from "../components/Calendar/ListView";
import Calendar from "../components/Calendar/Calendar";

const Page = styled.div`
  display: flex;
  flex: 1 1 0%;
  height: 100%;
  gap: 10px;
`;

export default function CalendarPage() {
  const { user, tokens, logoutUser } = useContext(AuthContext);
  const [list, setList] = useState(null)
  const getFollows = async () => {
    let response = await fetch(`http://localhost:8000/auth/calendar/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(tokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
		setList(data)
    } else if (response.status === 401) {
      logoutUser();
    }
  };
  useEffect(()=>{
	getFollows()
  },[])
  return (
    <Page>
      <ListView list={list}/>
      <Calendar />
    </Page>
  );
}
