import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
	title,
	description,
	path,
	image,
	imageAlt,
}) {
	const url = "https://beta.waitplaying.com/" + (path ? path : '');
	const defaultProps = {
		title: "WaitPlaying",
		description: "WaitPlaying is a platform that allows you to follow the games you want to play and notifies you when they are released.",
		path: '',
		image: "https://beta.waitplaying.com/logo512.png",
		imageAlt: "WaitPlaying Logo",
	}

	title = title ? title : defaultProps.title;
	description = description ? description : defaultProps.description;
	path = path ? path : defaultProps.path;
	image = image ? image : defaultProps.image;
	imageAlt = imageAlt ? imageAlt : defaultProps.imageAlt;

	return (
		<Helmet>
			{/* Standard metadata tags */}
			<title>{title}</title>
			{/* <link rel="icon" type="image/svg+xml" href="/logo.svg" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta charset="UTF-8" /> */}
			<meta name="description" content={description} />
			{/* End standard metadata tags */}
			{/* Facebook tags */}
			<meta name="title" content={title}/>
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={image} />
			<meta property="og:image:alt" content={imageAlt} />

			{/* End Facebook tags */}
			{/* Twitter tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:image:alt" content={imageAlt} />
			<meta name="twitter:url" content={url} />
			<meta name="twitter:type" content="website" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			{/* End Twitter tags */}
		</Helmet>
	);
}
