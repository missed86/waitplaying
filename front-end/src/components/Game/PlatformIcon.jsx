import styled from "styled-components";

const Icon = styled.span`
	color: #fff;
	display: flex;
	flex: 1;
	border-radius: 5px;
	${"" /* background-color: #333; */}
	padding: 3px 0;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 30px;
	${"" /* margin:10px; */}
	&>svg {
		fill: white;
		height: 100%;
	}
`;
const icon_print = (slug) => {
	switch (slug) {
		case "playstation-vr":
			return (
				<svg viewBox="0 0 64 64">
					<path
						fillRule="evenodd"
						d="M45.665 55.538a1.173 1.173 0 0 1 0 2.346H37.03a1.173 1.173 0 1 1 0-2.346h8.634zm12.02-10.528c.51 0 .923.415.923.925v6.55a.923.923 0 0 1-.923.924H25.01a.924.924 0 0 1-.924-.924v-6.55c0-.51.414-.925.924-.925h32.676zm-7.71.917a3.287 3.287 0 0 0-3.285 3.283 3.287 3.287 0 0 0 3.284 3.284 3.287 3.287 0 0 0 3.284-3.284 3.288 3.288 0 0 0-3.284-3.283zm-17.263 0a3.288 3.288 0 0 0-3.284 3.283 3.287 3.287 0 0 0 3.284 3.284 3.286 3.286 0 0 0 3.284-3.284 3.287 3.287 0 0 0-3.284-3.283zm0 1.955a1.329 1.329 0 1 1 .001 2.658 1.329 1.329 0 0 1 0-2.658zm17.262 0a1.33 1.33 0 1 1 0 2.659 1.33 1.33 0 0 1 0-2.659zM17.702 6.116l32.07 15.458-1.666 3.128S41.103 21.31 37.143 19.8c-3.462-1.318-8.574-2.517-10.807-2.11-.971.175-2.354.581-3.05 1.66 2.12.924 3.765 1.545 8.157 2.735 3.13.792 5.166 4.375 5.18 7.456.032 6.12-4.296 8.495-7.455 10.228-.303.166-.6.33-.888.492-1.306.74-2.893 1.145-4.471 1.145-.916 0-1.792-.136-2.532-.392-1.15-.402-4.82-1.819-7.961-3.543-2.685-1.469-4.862-2.974-5.972-4.127-.748-.777-1.39-1.525-1.698-2.802C5.2 28.69 5.443 20.017 5.6 18.984c.208-1.38.599-2.583 1.478-2.867l5.014-1.056c.849-.186 1.159-.227 1.383-.123.002 0 1.188.546 2.813 1.284.318-.719.835-2.06.413-3.01-.476-1.07-1.264-2.404-.861-3.194s1.862-3.902 1.862-3.902zM8.097 18.554a2.9 2.9 0 0 0-.216.773c-.163 1.082-.317 9.32.009 10.674.159.665.46 1.058 1.117 1.741.353.367 1.784 1.716 5.418 3.705 2.988 1.64 6.585 3.028 7.61 3.385.492.171 1.122.264 1.774.264 1.187 0 2.37-.299 3.335-.846.296-.167.602-.335.913-.506l.412-.226c2.954-1.63 5.87-3.43 5.847-7.967-.012-2.397-1.84-5.078-4.268-5.078-.497 0-1.01.114-1.525.338-1.822.795-3.253 1.287-4.757 1.287-.76 0-1.527-.116-2.49-.377-1.134-.306-4.51-1.807-7.537-3.47-2.338-1.28-4.25-2.679-5.276-3.43-.143-.104-.265-.195-.366-.267zm5.298 8.158a.77.77 0 0 1 .24.04l.12.05 3.273 1.616c.587.293.935 1.24.791 2.155-.124.808-.592 1.096-.987 1.096a.92.92 0 0 1-.306-.052l-.103-.043-3.274-1.617c-.6-.3-.927-1.118-.792-1.99.117-.75.534-1.255 1.038-1.255z"
					/>
				</svg>
			);
		case "psvr2":
			return (
				<svg viewBox="0 0 64 64">
					<path
						fillRule="evenodd"
						d="M8.706 29.314c.885-1.289 3.877-1.9 9.22-1.79 5.914.107 12.212 1.23 17.939 3.65 6.451 2.731 9.072 14.466-12.203 17.023-3.648.44-10.42-.216-11.571-1.427-1.152-1.21-3.268-4.29-3.966-8.984a20.238 20.238 0 01-.147-4.497c.009.433.078.708.196.728.216.03.511-.787.659-1.82.147-1.043.098-1.909-.107-1.939-.139-.019-.296.296-.444.778.207-1.083.424-1.722.424-1.722zm14.849 15.154c-.945-.66-2.107-.63-2.588.06-.482.688-.118 1.79.826 2.45.945.66 2.097.64 2.588-.06.482-.689.108-1.78-.826-2.45zm-10.893.551c-.69-.876-1.458-1.427-1.724-1.22-.255.196.09 1.082.768 1.958.69.885 1.458 1.437 1.723 1.23.255-.197-.088-1.082-.768-1.968zm12.112-28.632c1.313-.634 4.73-1.787 13.613 1.52 9.827 3.657 14.475 10.724 16.037 14.049.165-.36.413-.808.622-.799.865.04 1.314 2.284.854 4.018-.229.866-.707 1.949-1.313 2.733-.26.337-.62.468-.734-.01-.176-.734-.257-2.015-.358-2.55-1.277-2.102-5.998-8.688-20.408-10.287-4.755-.527-9.573-.473-12.408-.51-.194-.002-.917.05-1.13-.122a.547.547 0 01-.185-.263l-.059-.174c-.242-.733-.27-2.03.025-2.538.724-1.244 3.82-4.23 5.12-4.902l.148-.078zm1.683 13.527a2.154 2.154 0 100 4.31 2.155 2.155 0 100-4.31z"
					></path>
				</svg>
			);
		case "ps5":
			return (
				<svg viewBox="0 0 64 16">
					<path d="M 15.521 6.937 C 17.197 6.937 18.246 5.123 17.409 3.668 C 17.019 2.997 16.3 2.581 15.523 2.581 L 0.877 2.581 C 0.825 2.577 0.783 2.536 0.783 2.484 L 0.783 1.241 C 0.783 1.189 0.825 1.147 0.877 1.147 L 16.932 1.147 C 19.713 1.239 21.349 4.306 19.876 6.665 C 19.241 7.686 18.138 8.325 16.936 8.367 L 5.826 8.367 C 4.625 8.365 3.65 9.338 3.652 10.541 L 3.652 14.491 C 3.652 14.543 3.61 14.587 3.558 14.587 L 0.879 14.587 C 0.827 14.587 0.785 14.543 0.785 14.491 L 0.785 10.533 C 0.791 8.545 2.405 6.937 4.393 6.937 L 4.397 6.937 L 15.521 6.937 Z M 43.823 6.19 L 43.823 1.241 C 43.823 1.189 43.865 1.147 43.916 1.147 L 62.984 1.147 C 63.036 1.147 63.08 1.189 63.082 1.241 L 63.082 2.484 C 63.08 2.536 63.036 2.579 62.984 2.581 L 46.783 2.581 C 46.731 2.581 46.689 2.623 46.689 2.675 L 46.689 5.906 C 46.689 6.475 47.151 6.937 47.72 6.937 L 59.785 6.937 C 62.722 7.089 64.394 10.361 62.796 12.83 C 62.131 13.857 61.014 14.503 59.793 14.569 L 43.916 14.569 C 43.865 14.569 43.823 14.525 43.823 14.475 L 43.823 13.238 C 43.823 13.186 43.865 13.144 43.916 13.144 L 58.417 13.144 C 60.257 13.144 61.408 11.15 60.487 9.558 C 60.061 8.819 59.272 8.363 58.417 8.363 L 58.323 8.365 L 58.327 8.365 L 45.994 8.365 C 44.794 8.365 43.819 7.392 43.821 6.192 L 43.821 6.19 L 43.823 6.19 Z M 28.05 14.569 C 30.041 14.569 31.658 12.952 31.658 10.96 L 31.658 4.755 C 31.656 3.552 32.631 2.579 33.831 2.581 L 40.836 2.581 C 40.888 2.577 40.93 2.536 40.93 2.484 L 40.93 1.241 C 40.93 1.189 40.888 1.147 40.836 1.147 L 32.397 1.147 C 30.405 1.147 28.789 2.763 28.789 4.755 L 28.789 10.966 C 28.789 12.167 27.816 13.142 26.615 13.142 L 19.709 13.142 C 19.657 13.142 19.615 13.184 19.615 13.236 L 19.615 14.479 C 19.615 14.531 19.657 14.573 19.709 14.573 L 28.05 14.569 Z"></path>
				</svg>
			);
		case "ps4--1":
			return (
				<svg viewBox="0 0 64 16">
					<path d="M 44.988 11.532 L 57.419 3.848 C 57.445 3.825 57.478 3.812 57.513 3.813 C 57.592 3.813 57.654 3.875 57.654 3.954 L 57.652 3.973 L 57.652 11.657 C 57.651 11.706 57.614 11.746 57.565 11.75 L 45.063 11.75 C 44.959 11.75 44.907 11.719 44.895 11.688 C 44.878 11.626 44.907 11.58 44.988 11.532 Z M 42.666 13.185 L 57.563 13.185 C 57.6 13.185 57.629 13.212 57.635 13.248 L 57.635 14.508 C 57.635 14.556 57.675 14.595 57.723 14.595 L 60.418 14.595 C 60.466 14.595 60.506 14.556 60.506 14.508 L 60.506 13.268 C 60.513 13.216 60.557 13.176 60.609 13.175 L 63.282 13.175 C 63.331 13.175 63.371 13.135 63.371 13.086 L 63.371 11.817 C 63.371 11.77 63.333 11.731 63.286 11.731 L 60.607 11.731 C 60.556 11.733 60.513 11.692 60.512 11.64 L 60.512 2.662 C 60.512 1.927 60.242 1.46 59.785 1.304 L 59.006 1.304 C 58.707 1.387 58.445 1.503 58.207 1.653 L 58.219 1.645 L 42.18 11.545 C 41.557 11.933 41.341 12.369 41.497 12.699 C 41.622 12.969 41.977 13.171 42.675 13.171 L 42.666 13.185 Z M 1.148 14.612 L 3.872 14.612 C 3.912 14.595 3.937 14.555 3.937 14.512 L 3.937 10.564 C 3.937 9.3 4.651 8.429 5.692 8.429 L 16.91 8.429 C 19.008 8.658 20.803 6.934 20.659 4.828 L 20.659 4.839 C 20.79 3.023 19.422 1.446 17.606 1.319 L 1.098 1.319 L 1.081 1.344 L 1.081 2.588 C 1.081 2.633 1.119 2.673 1.166 2.673 L 15.963 2.673 C 17.22 2.673 17.812 3.58 17.812 4.835 C 17.812 6.091 17.222 7.005 15.963 7.005 L 4.265 7.005 C 2.381 7.076 0.936 8.7 1.083 10.579 L 1.083 10.566 L 1.083 14.516 C 1.083 14.562 1.114 14.599 1.156 14.61 L 1.148 14.612 Z M 33.011 11.019 L 33.011 4.824 C 33.011 3.564 33.601 2.66 34.86 2.66 L 42.618 2.66 C 42.668 2.656 42.707 2.616 42.71 2.567 L 42.71 1.333 L 42.702 1.302 L 33.202 1.302 C 31.379 1.428 30.006 3.012 30.139 4.835 L 30.139 4.824 L 30.139 11.017 C 30.139 12.267 29.535 13.173 28.297 13.173 L 20.108 13.173 C 20.059 13.173 20.019 13.213 20.019 13.262 L 20.019 14.508 C 20.019 14.55 20.044 14.587 20.079 14.604 L 29.381 14.604 C 31.429 14.742 33.13 13.046 32.997 10.998 L 32.997 11.009 L 33.011 11.019 Z"></path>
				</svg>
			);
		case "x360":
		case "xbox360":
		case "series-x":
		case "xboxone":
			return (
				<svg viewBox="0 0 64 64">
					<path d="M 28.908 58.875 C 24.68 58.47 20.399 56.952 16.721 54.552 C 13.64 52.541 12.944 51.715 12.944 50.065 C 12.944 46.752 16.587 40.949 22.82 34.334 C 26.36 30.576 31.291 26.172 31.824 26.291 C 32.86 26.523 41.148 34.608 44.251 38.413 C 49.157 44.431 51.413 49.358 50.267 51.555 C 49.396 53.225 43.991 56.489 40.02 57.743 C 36.747 58.776 32.449 59.214 28.908 58.875 Z M 8.781 46.62 C 6.221 42.692 4.927 38.824 4.302 33.23 C 4.096 31.383 4.17 30.326 4.77 26.535 C 5.52 21.809 8.21 16.343 11.444 12.978 C 12.821 11.546 12.944 11.511 14.623 12.076 C 16.661 12.763 18.838 14.266 22.215 17.319 L 24.184 19.101 L 23.109 20.422 C 18.115 26.557 12.844 35.252 10.857 40.632 C 9.777 43.557 9.342 46.492 9.807 47.714 C 10.12 48.54 9.832 48.232 8.781 46.62 Z M 53.732 47.289 C 53.985 46.054 53.665 43.786 52.915 41.498 C 51.291 36.544 45.863 27.327 40.878 21.061 L 39.309 19.088 L 41.006 17.53 C 43.223 15.494 44.762 14.275 46.423 13.24 C 47.733 12.424 49.606 11.701 50.411 11.701 C 50.907 11.701 52.654 13.514 54.064 15.493 C 56.249 18.557 57.856 22.272 58.67 26.139 C 59.196 28.638 59.24 33.987 58.755 36.479 C 58.357 38.525 57.516 41.178 56.696 42.978 C 56.081 44.326 54.553 46.945 53.883 47.797 C 53.539 48.235 53.539 48.234 53.732 47.289 Z M 29.361 10.765 C 27.062 9.598 23.513 8.344 21.553 8.006 C 20.866 7.888 19.694 7.822 18.949 7.86 C 17.331 7.941 17.404 7.857 19.998 6.631 C 22.155 5.612 23.954 5.013 26.396 4.5 C 29.143 3.923 34.307 3.916 37.011 4.486 C 39.931 5.102 43.37 6.381 45.307 7.574 L 45.883 7.928 L 44.562 7.861 C 41.936 7.729 38.11 8.79 34.002 10.789 C 32.763 11.392 31.685 11.873 31.606 11.859 C 31.528 11.845 30.518 11.352 29.361 10.765 Z"></path>
				</svg>
			);
		case "switch":
			return (
				<svg viewBox="0 0 64 64">
					<g transform="matrix(0.010308, 0, 0, 0.010308, 3.899197, 3.376549)">
						<path
							d="M1365 5154 c-481 -86 -868 -442 -990 -910 -44 -169 -47 -268 -42
							-1579 3 -1204 4 -1232 24 -1325 111 -501 467 -858 973 -976 66 -15 150 -18
							691 -21 560 -4 618 -3 633 12 15 15 16 208 16 2396 0 1622 -3 2386 -10 2400
							-10 18 -27 19 -613 18 -476 -1 -619 -4 -682 -15z m905 -2400 l0 -2026 -407 5
							c-375 4 -415 6 -490 25 -322 83 -561 331 -628 654 -22 101 -22 2589 -1 2688
							60 281 255 514 518 619 132 53 193 59 621 60 l387 1 0 -2026z"
						></path>
						<path
							d="M1451 4169 c-63 -12 -159 -60 -210 -105 -105 -91 -157 -220 -149
							-372 4 -79 9 -100 41 -164 47 -97 118 -168 215 -216 67 -33 84 -37 171 -40 79
							-3 107 0 160 18 217 73 348 284 311 500 -43 257 -287 429 -539 379z"
						></path>
						<path
							d="M3157 5163 c-4 -3 -7 -1087 -7 -2409 0 -2181 1 -2402 16 -2408 27
							-10 803 -6 899 4 406 46 764 293 959 660 25 47 58 126 75 175 63 188 61 138
							61 1575 0 1147 -2 1318 -16 1391 -99 521 -496 914 -1018 1004 -70 12 -178 15
							-526 15 -240 0 -440 -3 -443 -7z m1068 -2178 c156 -41 284 -160 336 -312 33
							-94 32 -232 -1 -318 -61 -158 -181 -269 -335 -310 -250 -65 -516 86 -589 334
							-22 76 -21 204 4 282 75 245 335 389 585 324z"
						></path>
					</g>
				</svg>
			);
		case "win":
			return (
				<svg viewBox="0 0 64 64">
					<path d="M 27.835 33.261 L 27.835 51.31 L 8.921 48.703 L 8.921 33.261 L 27.835 33.261 Z M 27.835 12.655 L 27.835 30.925 L 8.921 30.925 L 8.921 15.27 L 27.835 12.655 L 27.835 12.655 Z M 55.053 33.261 L 55.053 55.053 L 29.907 51.587 L 29.907 33.261 L 55.053 33.261 Z M 55.053 8.921 L 55.053 30.934 L 29.907 30.934 L 29.907 12.386 L 55.053 8.921 L 55.053 8.921 Z"></path>
				</svg>
			);
		case "mac":
		case "ios":
			return (
				<svg viewBox="0 0 100 100">
					<path d="M 82.966 35.846 C 76.556 26.386 63.736 26.386 57.326 29.224 C 50.916 32.062 48.169 31.116 41.759 28.278 C 29.855 23.547 17.035 33.954 15.203 45.306 C 11.54 64.227 19.782 80.31 26.192 86.932 C 32.602 93.554 35.349 95.446 43.591 92.608 C 49.085 90.716 52.748 87.878 59.158 91.662 C 63.736 94.5 69.231 95.446 75.641 87.878 C 82.051 80.31 83.882 77.471 85.714 70.849 C 68.315 63.281 72.894 40.576 82.966 35.846 Z M 49.085 28.278 C 49.085 17.871 57.326 8.411 66.484 7.465 C 66.484 20.709 56.411 28.278 49.085 28.278 Z"></path>
				</svg>
			);
		case "android":
			return (
				<svg viewBox="0 0 32 32">
					<path d="M 7.058 11.203 L 6.993 11.203 C 6.149 11.203 5.461 11.894 5.461 12.734 L 5.461 19.405 C 5.461 20.25 6.149 20.937 6.993 20.937 L 7.06 20.937 C 7.903 20.937 8.592 20.248 8.592 19.405 L 8.592 12.734 C 8.587 11.889 7.903 11.206 7.058 11.203 Z M 9.324 21.98 C 9.324 22.754 9.957 23.385 10.732 23.385 L 12.238 23.385 L 12.238 26.989 C 12.238 27.834 12.927 28.522 13.77 28.522 L 13.834 28.522 C 14.68 28.522 15.369 27.833 15.369 26.988 L 15.369 23.385 L 17.471 23.385 L 17.471 26.989 C 17.471 27.834 18.164 28.522 19.005 28.522 L 19.07 28.522 C 19.915 28.522 20.603 27.833 20.603 26.988 L 20.603 23.385 L 22.109 23.385 C 22.883 23.385 23.515 22.754 23.515 21.98 L 23.515 11.448 L 9.324 11.448 L 9.324 21.98 Z M 19.954 5.061 L 21.149 3.216 C 21.261 3.056 21.155 2.835 20.961 2.819 C 20.865 2.812 20.774 2.858 20.725 2.938 L 19.485 4.848 C 18.512 4.452 17.471 4.251 16.422 4.253 C 15.371 4.251 14.33 4.452 13.357 4.848 L 12.119 2.938 C 12.042 2.82 11.882 2.785 11.765 2.864 C 11.647 2.942 11.613 3.098 11.69 3.216 L 12.888 5.061 C 10.731 6.118 9.276 8.11 9.276 10.394 C 9.276 10.535 9.284 10.674 9.297 10.809 L 23.545 10.809 C 23.556 10.672 23.563 10.533 23.564 10.394 C 23.564 8.11 22.109 6.118 19.953 5.061 L 19.954 5.061 Z M 13.118 8.364 C 12.591 8.365 12.26 7.796 12.522 7.338 C 12.645 7.126 12.871 6.996 13.115 6.995 C 13.642 6.995 13.973 7.563 13.71 8.022 C 13.588 8.233 13.363 8.364 13.118 8.364 Z M 19.724 8.364 C 19.196 8.366 18.865 7.797 19.127 7.339 C 19.249 7.127 19.476 6.996 19.72 6.995 C 20.247 6.993 20.577 7.563 20.316 8.02 C 20.194 8.233 19.968 8.364 19.724 8.364 Z M 25.848 11.203 L 25.784 11.203 C 24.941 11.203 24.25 11.894 24.25 12.734 L 24.25 19.405 C 24.25 20.25 24.942 20.937 25.784 20.937 L 25.848 20.937 C 26.693 20.937 27.381 20.248 27.381 19.405 L 27.381 12.734 C 27.381 11.893 26.692 11.203 25.848 11.203 Z"></path>
				</svg>
			);
		case "oculus-quest":
		case "oculus-rift":
		case "oculus-vr":
			return (
				<svg viewBox="0 0 24 24">
					<path d="M 17.113 13.624 C 16.847 13.809 16.55 13.92 16.232 13.971 C 15.913 14.022 15.598 14.012 15.28 14.012 L 8.719 14.012 C 8.401 14.012 8.084 14.024 7.765 13.971 C 7.449 13.922 7.148 13.804 6.884 13.624 C 6.35 13.255 6.03 12.648 6.028 11.999 C 6.028 11.335 6.351 10.736 6.886 10.374 C 7.148 10.186 7.448 10.074 7.76 10.024 C 8.073 9.973 8.385 9.973 8.711 9.973 L 15.273 9.973 C 15.586 9.973 15.911 9.961 16.223 10.011 C 16.536 10.061 16.836 10.173 17.099 10.349 C 17.635 10.715 17.954 11.324 17.949 11.973 C 17.949 12.623 17.623 13.223 17.087 13.598 L 17.113 13.624 L 17.113 13.624 Z M 19.758 7.329 C 19.058 6.768 18.243 6.37 17.37 6.164 C 16.872 6.047 16.363 5.983 15.852 5.972 C 15.478 5.959 15.103 5.964 14.715 5.964 L 9.3 5.964 C 8.919 5.964 8.538 5.959 8.157 5.972 C 7.644 5.983 7.135 6.047 6.636 6.164 C 5.763 6.371 4.948 6.769 4.248 7.33 C 2.827 8.464 2 10.183 2 12 C 2 13.819 2.825 15.534 4.241 16.672 C 4.941 17.232 5.756 17.631 6.628 17.839 C 7.127 17.955 7.636 18.019 8.148 18.029 C 8.523 18.043 8.898 18.039 9.285 18.039 L 14.698 18.039 C 15.073 18.039 15.46 18.043 15.835 18.029 C 16.344 18.02 16.851 17.956 17.347 17.839 C 18.219 17.628 19.034 17.229 19.735 16.67 C 21.166 15.543 22.001 13.822 22 12 C 22 10.183 21.175 8.466 19.758 7.329 Z"></path>
				</svg>
			);
		case "meta-quest-2":
			return (
				<svg viewBox="0 0 32 32">
					<path d="M 6.042 19.221 C 6.042 15.056 8.126 10.709 10.572 10.709 C 11.929 10.709 13.016 11.524 14.737 13.97 C 13.107 16.505 12.111 18.044 12.111 18.044 C 9.937 21.485 9.213 22.21 8.035 22.21 C 6.858 22.301 6.042 21.214 6.042 19.221 M 20.261 17.682 L 18.721 15.146 C 18.359 14.513 17.907 13.879 17.544 13.335 C 18.903 11.252 19.989 10.165 21.348 10.165 C 24.065 10.165 26.238 14.241 26.238 19.312 C 26.238 21.214 25.604 22.301 24.337 22.301 C 23.069 22.301 22.616 21.485 20.261 17.682 M 16.366 11.524 C 14.375 8.897 12.654 7.901 10.661 7.901 C 6.496 7.901 3.326 13.425 3.326 19.221 C 3.326 22.844 5.047 25.108 7.945 25.108 C 10.028 25.108 11.477 24.112 14.193 19.403 C 14.193 19.403 15.28 17.41 16.095 16.052 C 16.366 16.505 16.639 16.957 16.91 17.501 L 18.178 19.675 C 20.623 23.84 21.982 25.199 24.427 25.199 C 27.234 25.199 28.774 22.844 28.774 19.13 C 28.683 12.973 25.423 7.901 21.528 7.901 C 19.446 7.901 17.816 9.531 16.366 11.524"></path>
				</svg>
			);
		case "steam-vr":
			return (
				<svg viewBox="0 0 32 32">
					<path d="M 17.754 12.77 L 17.754 12.769 C 17.754 10.951 19.722 9.814 21.297 10.723 C 22.872 11.633 22.872 13.906 21.297 14.815 C 20.938 15.022 20.531 15.131 20.116 15.131 L 20.114 15.131 C 18.81 15.131 17.753 14.074 17.753 12.77 L 17.753 12.769 L 17.754 12.77 Z M 23.252 12.775 C 23.252 10.355 20.632 8.842 18.536 10.052 C 16.44 11.262 16.44 14.287 18.536 15.498 C 19.014 15.774 19.556 15.919 20.108 15.919 C 21.843 15.917 23.249 14.511 23.252 12.776 L 23.252 12.775 Z M 11.35 22.475 L 9.814 21.839 C 10.255 22.76 11.186 23.346 12.207 23.347 C 13.274 23.347 14.237 22.709 14.652 21.726 L 14.658 21.709 C 15.448 19.825 13.902 17.793 11.876 18.051 C 11.662 18.078 11.452 18.131 11.251 18.209 L 11.27 18.203 L 12.858 18.86 C 13.584 19.166 14.057 19.877 14.058 20.666 C 14.059 22.067 12.63 23.016 11.338 22.47 L 11.351 22.475 L 11.35 22.475 Z M 15.978 3.487 C 9.422 3.488 4.046 8.532 3.514 14.95 L 3.511 14.995 L 10.218 17.767 C 10.804 17.364 11.498 17.15 12.209 17.152 L 12.211 17.152 C 12.277 17.152 12.341 17.156 12.407 17.159 L 15.39 12.84 L 15.39 12.778 C 15.393 9.147 19.326 6.881 22.469 8.7 C 25.612 10.518 25.608 15.057 22.462 16.869 C 21.745 17.282 20.933 17.499 20.107 17.499 L 19.997 17.499 L 15.747 20.535 C 15.747 20.589 15.751 20.644 15.751 20.701 L 15.751 20.703 C 15.752 23.427 12.804 25.131 10.444 23.77 C 9.57 23.265 8.952 22.411 8.747 21.422 L 8.743 21.399 L 3.941 19.411 C 5.478 24.705 10.284 28.51 15.977 28.51 C 22.887 28.51 28.488 22.908 28.488 15.999 C 28.488 9.089 22.887 3.488 15.977 3.488 L 15.977 3.488 L 15.978 3.487 Z"></path>
				</svg>
			);
		case "windows-mixed-reality":
			return (
				<svg viewBox="0 0 32 32">
					<g transform="matrix(0.034764, 0, 0, -0.034764, -43.500576, 45.505795)">
						<path
							d="M1505 1155 c-143 -23 -152 -32 -143 -154 9 -122 80 -191 196 -191 38
				0 57 6 88 30 50 37 81 38 124 0 29 -24 44 -29 88 -30 90 0 141 31 183 113 16
				30 19 54 17 115 -3 74 -4 77 -32 91 -76 36 -370 51 -521 26z m385 -26 c41 -5
				90 -14 108 -20 32 -10 32 -11 32 -72 -1 -114 -56 -183 -155 -195 -38 -4 -48 0
				-83 28 -55 44 -105 44 -167 -1 -38 -27 -50 -31 -85 -26 -97 13 -154 89 -148
				197 3 48 6 56 30 68 56 27 321 38 468 21z"
						></path>
						<path
							d="M1662 1068 c5 -15 87 -18 91 -3 1 6 -20 11 -47 13 -36 2 -47 0 -44
				-10z"
						></path>
						<path
							d="M1516 675 c-8 -22 64 -89 112 -103 91 -28 186 -8 245 51 31 31 36 41
				26 53 -10 12 -18 8 -50 -25 -46 -46 -108 -66 -170 -56 -50 9 -113 45 -129 75
				-13 24 -26 26 -34 5z"
						></path>
					</g>
				</svg>
			);
		case "linux":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="800"
					height="800"
					fill="none"
					viewBox="0 0 16 16"
				>
					<path
						fill="#fff"
						d="M8.294 1c-.09 0-.184.005-.28.012-2.465.194-1.811 2.804-1.85 3.674-.043.637-.174 1.14-.612 1.762-.516.613-1.24 1.604-1.584 2.637-.162.485-.24.982-.167 1.452a.247.247 0 00-.064.079c-.152.156-.263.35-.387.49-.116.115-.283.155-.465.232-.183.08-.384.157-.504.397a.78.78 0 00-.077.351c0 .116.016.234.032.313.034.233.068.425.023.566-.145.396-.163.668-.062.865.102.195.313.275.549.351.472.117 1.114.079 1.618.35.54.272 1.088.39 1.526.274a1.03 1.03 0 00.705-.552c.342-.001.717-.157 1.318-.194.408-.034.918.155 1.503.116.015.078.037.116.067.194l.001.002c.229.454.65.66 1.1.625.45-.035.928-.313 1.316-.762.368-.446.982-.632 1.387-.877.203-.116.367-.273.379-.497.013-.234-.117-.473-.417-.803v-.056l-.002-.002c-.099-.117-.145-.312-.197-.54-.05-.234-.106-.459-.287-.61h-.001c-.035-.032-.072-.04-.11-.08a.208.208 0 00-.11-.037c.25-.745.153-1.487-.102-2.154-.31-.823-.854-1.54-1.269-2.032-.464-.587-.919-1.142-.91-1.965.016-1.255.138-3.578-2.067-3.581zm.309 1.986h.007c.125 0 .231.036.34.116a.89.89 0 01.256.31c.062.152.093.268.097.423 0-.012.004-.023.004-.035v.061a.05.05 0 01-.003-.012l-.002-.014c-.001.142-.03.282-.087.412a.556.556 0 01-.125.195.415.415 0 00-.051-.024c-.06-.027-.115-.038-.166-.078a.765.765 0 00-.128-.038c.03-.035.085-.078.107-.116a.69.69 0 00.051-.234V3.94a.706.706 0 00-.035-.233c-.027-.079-.06-.117-.107-.195-.05-.038-.098-.077-.156-.077h-.01c-.054 0-.102.018-.152.077a.467.467 0 00-.12.195.688.688 0 00-.052.234v.01c0 .053.004.105.011.156-.112-.039-.255-.078-.354-.117a.954.954 0 01-.01-.117V3.86a1.034 1.034 0 01.087-.448.63.63 0 01.251-.31.575.575 0 01.347-.117zm-1.728.035h.02c.084 0 .158.028.234.078a.806.806 0 01.2.272c.053.116.082.233.09.389v.002a.856.856 0 01-.002.155v.047l-.048.014c-.089.032-.16.079-.23.117a.633.633 0 00.002-.156V3.93c-.007-.078-.023-.117-.047-.194a.358.358 0 00-.097-.156.145.145 0 00-.107-.037h-.012c-.042.003-.076.023-.109.077a.322.322 0 00-.07.157.55.55 0 00-.013.193v.008c.007.08.021.117.047.195a.363.363 0 00.096.157c.006.005.012.01.02.014-.04.033-.068.04-.102.079a.177.177 0 01-.077.04 1.53 1.53 0 01-.16-.235 1.034 1.034 0 01-.09-.389 1.01 1.01 0 01.046-.39.834.834 0 01.165-.312c.075-.077.152-.116.244-.116zm.799.995c.194 0 .428.038.71.233.17.116.304.157.613.273h.002c.149.079.236.155.279.232v-.076a.333.333 0 01.009.274c-.072.18-.301.375-.62.491v.001c-.156.08-.292.195-.452.272-.161.078-.343.17-.59.155a.664.664 0 01-.262-.039 2.077 2.077 0 01-.188-.115c-.113-.079-.211-.194-.357-.271v-.003h-.003c-.233-.144-.359-.299-.4-.414-.04-.157-.003-.275.113-.35.13-.08.221-.159.282-.197.06-.043.083-.059.102-.076h.001v-.002c.099-.117.255-.274.49-.35.08-.021.171-.038.272-.038h-.001zm1.633 1.25c.21.826.698 2.026 1.012 2.609.167.311.5.967.643 1.764.091-.003.193.01.3.037.376-.975-.319-2.022-.636-2.314-.128-.116-.135-.195-.071-.195.344.312.796.917.96 1.608.075.312.093.644.012.974.039.017.079.035.12.04.601.311.824.547.717.896v-.025c-.035-.002-.07 0-.105 0h-.01c.089-.272-.106-.481-.62-.714-.534-.233-.96-.196-1.033.271-.005.025-.008.039-.01.079-.04.013-.082.03-.123.037-.25.157-.386.39-.462.693-.076.31-.1.674-.12 1.09v.002c-.011.195-.099.489-.186.787-.875.626-2.088.897-3.12.195a1.543 1.543 0 00-.234-.31.846.846 0 00-.16-.195.963.963 0 00.27-.04.359.359 0 00.184-.194c.063-.156 0-.407-.201-.678-.201-.273-.543-.58-1.043-.888-.368-.233-.575-.507-.671-.814-.096-.312-.083-.633-.009-.96.143-.624.51-1.23.743-1.611.063-.038.022.078-.238.568-.23.438-.665 1.456-.07 2.248.022-.578.15-1.146.377-1.678.329-.745 1.016-2.044 1.07-3.073.029.021.127.08.17.118.126.078.22.194.343.271a.694.694 0 00.511.196l.065.003c.24 0 .425-.078.581-.156.17-.078.304-.195.432-.233h.003c.272-.08.487-.235.609-.409zm1.275 5.225c.021.35.2.726.514.803.343.078.837-.194 1.045-.446l.123-.006c.184-.004.337.006.494.156l.002.002c.121.116.178.31.228.511.05.233.09.455.239.622.283.307.376.528.37.665l.003-.004v.01l-.002-.007c-.009.153-.108.231-.29.347-.368.234-1.02.416-1.434.916-.36.43-.8.665-1.188.695-.387.03-.721-.117-.918-.524l-.003-.002c-.122-.233-.07-.597.033-.985.103-.39.25-.784.27-1.107.022-.417.044-.779.114-1.058.07-.271.18-.465.374-.574l.026-.013v-.001zm-6.308.028h.006a.53.53 0 01.091.009c.22.032.412.194.597.438l.53.97.003.003c.141.31.44.62.693.955.253.348.45.66.425.915v.004c-.033.434-.28.67-.656.755-.376.079-.887 0-1.397-.27-.565-.314-1.235-.274-1.667-.352-.215-.039-.355-.117-.421-.233-.064-.117-.066-.352.071-.718v-.002l.002-.002c.068-.195.017-.439-.016-.652-.032-.234-.049-.414.025-.549.093-.194.23-.233.402-.31.172-.08.374-.118.534-.275h.001c.15-.157.26-.351.39-.49.11-.117.222-.196.387-.196zM8.45 5.226c-.254.117-.551.312-.868.312-.316 0-.566-.155-.747-.272-.09-.078-.163-.156-.217-.195-.096-.078-.084-.194-.044-.194.064.01.076.078.117.117.056.038.125.116.21.194.17.116.396.272.68.272.283 0 .615-.156.816-.272.114-.078.26-.194.378-.272.09-.08.087-.156.163-.156.074.01.02.078-.086.194a4.75 4.75 0 01-.403.273zm-.631-.923V4.29c-.004-.012.007-.024.017-.03.043-.024.105-.015.151.003.037 0 .094.04.088.079-.004.029-.05.038-.079.038-.032 0-.054-.025-.082-.04-.03-.01-.085-.004-.095-.037zm-.322 0c-.011.034-.066.028-.097.038-.027.015-.05.04-.081.04-.03 0-.076-.012-.08-.04-.005-.038.052-.077.088-.077.047-.018.107-.028.151-.003.011.005.021.017.018.029v.012h.001z"
					></path>
				</svg>
			);
		case "wii":
			return (    
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				version="1.1"
				viewBox="0 0 24 24"
			  >
				<path d="M17.84 16.94h-1.87v-6.15h1.87v6.15M18 8.58c0 .61-.5 1.11-1.1 1.11a1.11 1.11 0 01-1.11-1.11c0-.62.5-1.12 1.11-1.12.6 0 1.1.5 1.1 1.12m3.82 8.36h-1.88v-6.15h1.88v6.15M22 8.58c0 .61-.5 1.11-1.12 1.11a1.11 1.11 0 01-1.11-1.11 1.116 1.116 0 112.23 0m-9.1-.53h2l-2.12 7.45s-.28 1.54-1.5 1.54c-1.21 0-1.49-1.54-1.49-1.54l-1.34-4.86-1.34 4.86s-.29 1.54-1.5 1.54-1.49-1.54-1.49-1.54L2 8.05h2l1.72 6.62L7.11 9.3c.32-1.35 1.34-1.33 1.34-1.33s1.02-.02 1.34 1.33l1.38 5.37 1.73-6.62z"></path>
			  </svg>
			  )
		case "wiiu":
			return (
				<svg
				xmlns="http://www.w3.org/2000/svg"
				width="64"
				height="64"
				fill="#1A1A1A"
				viewBox="0 0 64 64"
			  >
				<path d="M10 12a6 6 0 00-6 6v28a6 6 0 006 6h44a6 6 0 006-6V18a6 6 0 00-6-6h-9v19c0 7.18-5.82 13-13 13s-13-5.82-13-13V12h-9zm15 0v19a7 7 0 1014 0V12H25z"></path>
			  </svg>
			)
		case "ngc":
			return (
				<svg
				xmlns="http://www.w3.org/2000/svg"
				width="64"
				height="64"
				ariaHidden="true"
				viewBox="0 0 14 14"
			  >
				<path d="M7 2.906l2.83 1.638 1.654-.955L7 1 1.987 3.895l1.653.953L7 2.906zm3.604 6.241V7.173l-1.012.584v.807L7.24 9.92v.002-2.717l5.02-2.896v5.793L7.24 13v-1.908l3.364-1.944zm-7.209 0l3.365 1.941v1.91l-5.02-2.896V4.308l1.655.955v3.884zM7 4.073L4.649 5.43 7 6.79l2.352-1.358L7 4.073zm-2.592 4.49L6.76 9.92V7.204L4.407 5.847v2.717z"></path>
			  </svg>
			)
		case "n64":
			return (
				<svg
				xmlns="http://www.w3.org/2000/svg"
				width="64"
				height="64"
				viewBox="0 0 24 24"
			  >
				<path d="M0 .6h7.1l9.85 15.9V.6H24v22.8h-7.04L7.06 7.5v15.9H0V.6"></path>
			  </svg>
			)
		case "nds":
		case "3ds":
			return (
				<svg
				xmlns="http://www.w3.org/2000/svg"
				width="800"
				height="800"
				viewBox="0 0 24 24"
			  >
				<path d="M17.653 16.63a.712.712 0 101.424 0 .712.712 0 10-1.424 0m-9.45 4.238h7.575c.3 0 .524-.225.544-.524v-5.175c-.02-.282-.263-.525-.544-.507H8.203a.54.54 0 00-.544.525v5.156c0 .301.244.525.544.525zm13.051-3.525a.729.729 0 00.73-.729.73.73 0 10-.73.729zm-1.443-.019a.714.714 0 10.001 1.427.714.714 0 00-.001-1.427zm-.713-2.137a.712.712 0 101.424 0 .712.712 0 10-1.424 0M2.54 16.612a1.65 1.65 0 103.3 0 1.65 1.65 0 10-3.3 0M21.272 0H2.728A2.73 2.73 0 00-.01 2.72v18.542C.009 22.781 1.228 24 2.728 24h18.526a2.753 2.753 0 002.756-2.719V2.737C23.991 1.219 22.772 0 21.272 0zm1.913 21.281a1.92 1.92 0 01-1.912 1.912H2.728a1.92 1.92 0 01-1.913-1.912v-8.456h22.369v8.456zm0-9.694H.815v-8.85A1.92 1.92 0 012.728.824h18.544c1.049 0 1.912.863 1.912 1.913v8.85m-5.775-8.475H6.534c-.3 0-.544.263-.544.563V9.15c0 .3.226.563.544.563h10.875a.548.548 0 00.544-.563V3.656a.543.543 0 00-.544-.544z"></path>
			  </svg>
			)
		case "gba":
			return (
				<svg
				xmlns="http://www.w3.org/2000/svg"
				width="800"
				height="800"
				fill="#fff"
				version="1.1"
				viewBox="0 0 792 792"
				xmlSpace="preserve"
			  >
				<path d="M619.417 38.989L553.078 0 90.348 267.107v.021l-.062.037L90 571.895l68.145 39.991.088-.052.286.168 461.168-269.424-.27-303.589zM143.183 567.478h-.002l-22.485-13.164.289-251.53 22.199 13.054v251.64zm15.133-278.544l-22.082-12.877L552.951 35.492l20.645 12.115-415.28 241.327zm15.541 278.265V315.63L588.703 74.319l.288 250.649-415.134 242.231zm92.579-83.006l246.256-143.338V147.022L266.436 289.57v194.623zm32.897-175.655l180.463-104.463v117.866L299.333 426.98V308.538zm-62.464 87.094l19.076-11.116v34.481l-19.076 11.088v29.322l-33.344 20.697v-30.637l-18.645 10.841.197-34.483 18.448-10.755v-29.829l33.344-20.697v31.088zM557.49 237.186c-.59 13.861-7.381 24.83-15.168 24.499-7.787-.331-13.622-11.837-13.032-25.698.59-13.862 7.381-24.83 15.168-24.499s13.622 11.836 13.032 25.698zm19.449-50.201c-.59 13.862-7.382 24.83-15.17 24.499-7.789-.332-13.625-11.837-13.035-25.699s7.382-24.83 15.17-24.499c7.789.332 13.624 11.838 13.035 25.699z"></path>
			  </svg>
			)
		case "psp":
			return (
				<svg viewBox="5.48 26.424 53.478 9.223">
				<g transform="translate(-55.36 -356.256)">
				  <path
					fill="#fff"
					strokeWidth={1}
					stroke="currentColor"
					d="M60.841 382.68h16.662v4.941H61.5v4.282h-.659v-4.94h16.003v-3.624H60.841v-.659"
				  ></path>
				  <path
					fill="#fff"
					strokeWidth={1}
					stroke="currentColor"
					d="M98.315 387.621v4.282h-.658v-4.94h16.003v-3.624H97.657v-.659h16.662v4.941H98.315"
				  ></path>
				  <path
					fill="#fff"
					strokeWidth={1}
					stroke="currentColor"
					d="M85.998 382.68v8.565h-8.495v.658h9.19v-8.564h8.495v-.659h-9.19"
				  ></path>
				</g>
			  </svg>
			)
		case "psvita":
			return (
				<svg viewBox="1.103 25.876 61.726 10.281">
				<path
				  fillRule="evenodd"
				  d="M59.281 33.999l-6.537-.002-1.128 2.16H50.13s4.632-8.771 4.817-9.07c.184-.299.713-1.246 1.565-1.2.853.045 1.209.695 1.372.971.161.278 4.945 9.299 4.945 9.299h-2.38l-1.168-2.158zm-2.794-5.197c-.208-.413-.675-.516-.93-.032l-2.104 3.955h5.154l-2.12-3.923zm-8.371-1.681l.008 8.944h-2.127v-8.934l-4.036-.007v-1.241l10.214-.007-.006 1.257-4.053-.012zm-9.698-1.183h2.162v10.186h-2.162V25.938zm-7.729 10.218c-.852-.047-1.207-.695-1.369-.971-.16-.276-4.935-9.28-4.935-9.28h2.376l3.954 7.34c.204.414.674.516.927.032l3.933-7.372h1.486s-4.626 8.754-4.809 9.053c-.184.299-.713 1.242-1.563 1.198zM18.24 28.687v4.662c0 1.705-.767 2.768-2.895 2.768h-4.569v-1.261h3.987c.816 0 1.304-.662 1.304-1.507v-4.662c0-1.487.721-2.769 2.835-2.769h4.537v1.262h-3.926c-1.059-.047-1.273.822-1.273 1.507zm-8.97 2.884H4.38c-.671 0-1.166.511-1.166 1.384v3.177H1.103v-3.059c0-1.721 1.077-2.879 2.607-2.879h4.948c1.212-.045 1.502-.649 1.502-1.523 0-.669-.335-1.584-1.502-1.491H1.103v-1.262H9.27c2.141 0 2.987 1.239 2.987 2.753 0 1.72-.846 2.9-2.987 2.9z"
				  clipRule="evenodd"
				></path>
			  </svg>
			)
		case "stadia":
			return (
				<svg viewBox="5.868 15.988 50.24 33.493">
				<g
				  fill="none"
				  fillRule="evenodd"
				  stroke="none"
				  strokeWidth="1"
				  transform="matrix(.41866 0 0 .41866 5.868 15.988)"
				>
				  <path
					fill="#fff"
					d="M1.009 23.341A2.408 2.408 0 000 25.291v.03c.003.317.069.64.204.946L11.69 52.288a2.41 2.41 0 003.011 1.296c7.52-2.681 33.562-11.165 50.415-6.589 0 0-16.906.978-32.193 12.966a2.4 2.4 0 00-.707 2.855l5.143 11.628 1.98 4.644c.471 1.102 1.977 1.235 2.641.237 3.567-5.372 9.581-8.055 15.359-10.397 5.918-2.398 12.094-4.187 18.394-5.252 6.713-1.135 13.567-1.438 20.351-.838 1.13.1 2.179-.593 2.516-1.674l5.189-16.583a2.398 2.398 0 00-.88-2.655c-5.786-4.192-28.705-18.27-69.008-12.614 0 0 34.392-19.756 78.053 1.946 1.323.658 2.92-.033 3.362-1.439l4.574-14.624c.071-.226.106-.456.11-.682v-.07a2.399 2.399 0 00-1.216-2.052C113.304 9.291 94.751 0 69.23 0 49.669-.001 26.016 5.456 1.009 23.341"
				  ></path>
				</g>
			  </svg>
			)
		case "psx":
		case "ps":
		case "ps2":
		case "ps3":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					preserveAspectRatio="xMidYMid"
					viewBox="0 0 200 154.819"
					>
					<path
						fill="#fffff"
						fillRule="evenodd"
						d="M197.239 117.962c-3.868 4.88-13.343 8.36-13.343 8.36l-70.492 25.32V132.97l51.877-18.484c5.887-2.11 6.791-5.091 2.006-6.657-4.776-1.569-13.425-1.119-19.316.999l-34.567 12.174v-19.379l1.993-.674s9.988-3.535 24.034-5.091c14.045-1.547 31.242.211 44.743 5.329 15.215 4.808 16.928 11.895 13.065 16.775zm-77.124-31.796V38.413c0-5.608-1.035-10.771-6.297-12.232-4.029-1.291-6.53 2.451-6.53 8.054v119.584l-32.25-10.236V1c13.712 2.545 33.689 8.563 44.429 12.183 27.312 9.377 36.572 21.048 36.572 47.344 0 25.63-15.821 35.344-35.924 25.639zM15.862 131.018C.243 126.619-2.357 117.454 4.763 112.174c6.579-4.875 17.769-8.545 17.769-8.545l46.241-16.442v18.745l-33.276 11.909c-5.878 2.109-6.782 5.095-2.005 6.66 4.78 1.565 13.433 1.12 19.32-.994l15.961-5.792v16.77c-1.012.18-2.141.36-3.184.535-15.966 2.609-32.97 1.52-49.727-4.002z"
					></path>
				</svg>
			)
			
		default:
			// return "-";
			return slug;
	}
};

export default function PlatformIcon({ slug }) {
	return <Icon>{icon_print(slug)}</Icon>;
}
