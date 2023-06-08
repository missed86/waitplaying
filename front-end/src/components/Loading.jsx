import styled from "styled-components";
import { keyframes } from "styled-components";

const Page = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const Component = styled.div`
	width: 300px;
	height: 300px;
	position: relative;
`;
const gamepad_animation = keyframes`
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(360deg);
        }
        50% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(360deg);
        }
    `;
const Logo = styled.div`
	position: absolute;
	top: calc(50% - 100px);
	left: calc(50% - 100px);
	display: flex;
	align-items: center;
	justify-content: center;
	svg {
		width: 200px;
		height: 200px;
	}
	transform-origin: center;
	animation-name: ${gamepad_animation};
	animation-duration: 4s;
	animation-timing-function: cubic-bezier;
	animation-iteration-count: infinite;
    animation-fill-mode: both;
`;
const animation = keyframes`
  0% {
    stroke-dasharray: 1 98;
    stroke-dashoffset: -105;
  }
  50% {
    stroke-dasharray: 80 10;
    stroke-dashoffset: -160;
  }
  100% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -300;
  }
`;
const Circle = styled.circle`
	transform-origin: center;
	animation-name: ${animation};
	animation-duration: 1.2s;
	animation-timing-function: cubic-bezier;
	animation-iteration-count: infinite;

	fill: transparent;
	/* stroke:#dd2476; */
	stroke: #fff;
	stroke-width: 1px;
	stroke-linecap: round;
	filter: url(#shadow);
`;
export default function Loading() {
	return (
		<Page>
			<Component>
				<svg viewBox="0 0 100 100">
					<defs>
						<filter id="shadow">
							<feDropShadow
								dx="0"
								dy="0"
								stdDeviation="5"
								// floodColor="#fc6767"
								floodColor="#888"
							/>
						</filter>
					</defs>
					<Circle cx="50" cy="50" r="45" />
				</svg>
				<Logo>{LogoSvg()}</Logo>
			</Component>
		</Page>
	);
}

const LogoSvg = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
		<defs>
			<clipPath id="clipPath16" clipPathUnits="userSpaceOnUse">
				<path d="M0 44.444h249.778V0H0z"></path>
			</clipPath>
		</defs>
		<g transform="matrix(5.66225 0 0 5.66225 -158.89 -27.128)">
			<ellipse
				cx="53.789"
				cy="42.288"
				stroke="#000"
				rx="14.547"
				ry="14.208"
			></ellipse>
			<g
				clipPath="url(#clipPath16)"
				transform="matrix(1.33333 0 0 -1.33333 25.426 77.892)"
			>
				<path
					d="M0 0h-3.36v3.36c0 1.02-.84 1.8-1.8 1.8H-6.6c-.96 0-1.74-.78-1.74-1.8V0h-3.42c-.96 0-1.8-.78-1.8-1.8v-1.38c0-1.02.84-1.8 1.8-1.8h3.42V-8.4c0-.96.78-1.74 1.74-1.74h1.44c.96 0 1.8.78 1.8 1.74v3.42H0c1.02 0 1.8.78 1.8 1.8v1.38C1.8-.78 1.02 0 0 0m36.68-24.12c-2.16-1.56-5.52-1.44-7.62.54-2.16 2.1-3.54 4.62-5.64 7.2-.96 1.2-1.92 1.86-4.14 1.14-4.38-1.44-7.06-1.8-11.62-1.68-3.66 0-5.8.18-10.18 1.62-2.22.72-3.18.06-4.14-1.14-2.1-2.58-3.48-5.1-5.64-7.2-2.1-1.98-5.52-2.1-7.68-.54-3.06 2.22-3.78 4.14-3 7.14 1.26 4.68 3.66 14.1 4.86 18.78 2.4 9.36 4.5 10.92 12.9 11.28 1.98.12 4.5.12 6.12-2.52.72-1.14 1.92-.96 3.06-.96h8.84c1.14 0 2.34-.12 3.06 1.02 1.62 2.64 4.14 2.64 6.12 2.52 8.34-.42 10.5-1.92 12.9-11.28 1.56-6.24 3.06-12.12 4.8-18.78.84-3 .12-4.92-3-7.14"
					transform="translate(26.756 28.65)"
				></path>
				<path
					stroke="#fff"
					strokeMiterlimit="10"
					strokeWidth="1.5"
					d="M0 0h-3.36v3.36c0 1.02-.84 1.8-1.8 1.8H-6.6c-.96 0-1.74-.78-1.74-1.8V0h-3.42c-.96 0-1.8-.78-1.8-1.8v-1.38c0-1.02.84-1.8 1.8-1.8h3.42V-8.4c0-.96.78-1.74 1.74-1.74h1.44c.96 0 1.8.78 1.8 1.74v3.42H0c1.02 0 1.8.78 1.8 1.8v1.38C1.8-.78 1.02 0 0 0zm36.68-24.12c-2.16-1.56-5.52-1.44-7.62.54-2.16 2.1-3.54 4.62-5.64 7.2-.96 1.2-1.92 1.86-4.14 1.14-4.38-1.44-7.06-1.8-11.62-1.68-3.66 0-5.8.18-10.18 1.62-2.22.72-3.18.06-4.14-1.14-2.1-2.58-3.48-5.1-5.64-7.2-2.1-1.98-5.52-2.1-7.68-.54-3.06 2.22-3.78 4.14-3 7.14 1.26 4.68 3.66 14.1 4.86 18.78 2.4 9.36 4.5 10.92 12.9 11.28 1.98.12 4.5.12 6.12-2.52.72-1.14 1.92-.96 3.06-.96h8.84c1.14 0 2.34-.12 3.06 1.02 1.62 2.64 4.14 2.64 6.12 2.52 8.34-.42 10.5-1.92 12.9-11.28 1.56-6.24 3.06-12.12 4.8-18.78.84-3 .12-4.92-3-7.14z"
					transform="translate(26.756 28.65)"
				></path>
				<path
					fillRule="evenodd"
					d="M0 0c4.107 0 7.467 3.443 7.467 7.65 0 4.207-3.36 7.65-7.467 7.65-4.107 0-7.467-3.443-7.467-7.65C-7.467 3.443-4.107 0 0 0"
					transform="translate(49.27 18.51)"
				></path>
				<path
					stroke="#fff"
					strokeMiterlimit="10"
					strokeWidth="1.5"
					d="M0 0c4.107 0 7.467 3.443 7.467 7.65 0 4.207-3.36 7.65-7.467 7.65-4.107 0-7.467-3.443-7.467-7.65C-7.467 3.443-4.107 0 0 0z"
					transform="translate(49.27 18.51)"
				></path>
				<path
					fillRule="evenodd"
					d="M0 0c0 .994-1.344.994-1.344 0v-4.743c0-.382.299-.688.672-.688h3.733c.896 0 .896 1.377 0 1.377H0z"
					transform="translate(49.93 30.823)"
				></path>
				<path
					fill="#FFF"
					stroke="#fff"
					strokeMiterlimit="10"
					d="M0 0c0 .994-1.344.994-1.344 0v-4.743c0-.382.299-.688.672-.688h3.733c.896 0 .896 1.377 0 1.377H0z"
					transform="translate(49.93 30.823)"
				></path>
			</g>
		</g>
	</svg>
);
