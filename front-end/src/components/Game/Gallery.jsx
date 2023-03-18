import styled from "styled-components";

const ScreenshotURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_original/${id}.jpg`;
const ScreenshotMedURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${id}.jpg`;
const ScreenshotThumbURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_thumb/${id}.jpg`;

const Component = styled.div`
	display: flex;
	flex: 1 1 0%;
    max-width: 95vw;
    margin-top: 40px;
`;

const Wrapper = styled.div`
    max-width:100%;
    overflow-x: hidden;
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const Thumb = styled.img`
    height: 200px;
` 

export default function Gallery({ screenshots }) {
	return (
		<Component>
			<Wrapper>
				{screenshots.map((code) => {
					return <Thumb src={ScreenshotMedURL(code)} alt={code} key={code} />;
				})}
			</Wrapper>
		</Component>
	);
}
