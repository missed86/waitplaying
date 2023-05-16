import styled from "styled-components";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import {
	LeftArrow,
	RightArrow,
	onWheel,
	usePreventBodyScroll,
} from "../utils/ScrollMenuFunctions";
import { Screenshot } from "./Screenshot";

const ScreenshotURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_original/${id}.jpg`;
const ScreenshotMedURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${id}.jpg`;
const ScreenshotThumbURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_thumb/${id}.jpg`;

const Component = styled.div`
	max-width: 95vw;
	margin-top: 10px;
	margin-bottom: 10px;

	.react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
		display: none;
	}

	.react-horizontal-scrolling-menu--scroll-container {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.react-horizontal-scrolling-menu--arrow-left {
		position: relative;
	}
	.react-horizontal-scrolling-menu--arrow-right {
		position: relative;
	}
`;

const Wrapper = styled.div`
	max-width: 100%;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
`;

export default function Gallery({ screenshots }) {
	const { disableScroll, enableScroll } = usePreventBodyScroll();
	return (
		<Component>
			<Wrapper onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
				<ScrollMenu
					LeftArrow={LeftArrow}
					RightArrow={RightArrow}
					onWheel={onWheel}
				>
					{screenshots.map((code) => {
						return (
							<Screenshot
								image={ScreenshotMedURL(code)}
								alt={code}
								itemId={code}
								key={code}
							/>
						);
					})}
				</ScrollMenu>
			</Wrapper>
		</Component>
	);
}
