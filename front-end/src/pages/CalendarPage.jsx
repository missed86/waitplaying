import { useState } from "react";
// import "./Calendar.css";
import styled from "styled-components";

import ListView from "../components/Calendar/ListView";

const Page = styled.div`
	display:flex;
	flex: 1 1 0%;
	height: 100%;
`
export default function CalendarPage() {

	return(
		<Page>
			<ListView/>
		</Page>
	);
}
