import { useReducer, useState } from "react";
import PlatformFilterReducer from "./PlatformFilterReducer";
import PlatformFilterContext from "./PlaformFilterContext";

const PlatformFilterState = (props) => {
	const initialState = [
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
	];

    const [state, dispatch] = useReducer(PlatformFilterReducer, initialState)

	const setActived = (key) => {};

    return (
        <PlatformFilterContext.Provider value={{state, setActived}}>
            {props.children}
        </PlatformFilterContext.Provider>
    )
};

export default PlatformFilterState;
