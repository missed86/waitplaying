import { createSlice } from "@reduxjs/toolkit";

export const PlatformFilterSlice = createSlice({
	name: "PlatformFilter",
	initialState: [
		{
			name: "PS4",
			icon: "playstation.svg",
			color: "playstation",
			actived: true,
		},
		{
			name: "PS5",
			icon: "playstation.svg",
			color: "playstation",
			actived: true,
		},
		{
			name: "Switch",
			icon: "switch.svg",
			color: "nintendo",
			actived: true,
		},
		{
			name: "One",
			icon: "xbox.svg",
			color: "xbox",
			actived: true,
		},
		{
			name: "Series X/S",
			icon: "xbox.svg",
			color: "xbox",
			actived: true,
		},
		{
			name: "PC",
			icon: "pc.svg",
			color: "pc",
			actived: true,
		},
	],
	reducers: {
		toggle: (state, action) => {
			return state.map(element => {
				if (element.name !== action.payload) {
					return element;
				}
				return { ...element, actived: !element.actived };
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggle } = PlatformFilterSlice.actions;

export default PlatformFilterSlice.reducer;
