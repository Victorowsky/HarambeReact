import React from "react";
import Button2 from "../Button";
import { Box, Button, Typography } from "@material-ui/core";
import "./AdminPanel.css";
import Queue from "../Queue/Queue";
import AddVideo from "./AddVideo";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import SideOptions from "../SideOptions";
import { changeIsAddVideo } from "../../redux/playerState";

const useStyles = makeStyles({
	addVideoBtn: {
		color: "#90be6d",
		fontWeight: "700",
		borderColor: "#90be6d",
		"&:hover": {
			borderColor: "#90be6d",
		},
		"&:disabled": {
			color: "#f94144",
			borderColor: "#f94144",
		},
		"@media (max-width:460px)": {
			marginRight: "17px",
		},
	},
	queueCounter: {
		padding: "7px 12px",
		fontWeight: "700",
		backgroundColor: "#121212",
		borderRadius: "5px",
	},
	queueCounter_Wrapper: {
		width: "fit-content",
		marginRight: "auto",
		display: "flex",
		gap: "10px",
	},
	adminPanel: {
		color: "white",
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "flex-end",
		marginTop: "50px",
		width: "95%",
	},
});

const AdminPanel = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const { admin, nickname, isPlaylistOpen, videoQueue } = useSelector(
		(state) => state.player
	);

	const handleTwitchLogin = () => {
		window.location.href = `/auth/twitch`; //DECLARED IN APP
	};

	const isDisabled = admin ? false : !isPlaylistOpen;

	const handleOpenAddVideo = () => {
		dispatch(changeIsAddVideo(true));
	};

	return (
		<>
			<AddVideo />

			{/* ADDING VIDEO PANEL */}
			<Box className={classes.adminPanel}>
				<Box className={classes.queueCounter_Wrapper}>
					<Box className={classes.queueCounter}>{videoQueue.length}</Box>
					<Typography variant="h6">Current queue:</Typography>
				</Box>
				{/* QUEUE_H3 CSS IS IN Queue.css */}

				<SideOptions />

				{nickname && (
					<Button
						variant="outlined"
						color="primary"
						disabled={isDisabled}
						className={classes.addVideoBtn}
						onClick={handleOpenAddVideo}
					>
						ADD VIDEO
					</Button>
				)}

				{!nickname && (
					<Button2 onClick={handleTwitchLogin}> LOGIN WITH TWITCH</Button2>
				)}
			</Box>
			<Queue />
		</>
	);
};

export default AdminPanel;
