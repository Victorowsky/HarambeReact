import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { DataContext } from "../../../App";
import CloseIcon from "@material-ui/icons/Close";

import PlayButton from "../PlayButton";

import OneOption from "./OneOption";
import "./Options.css";
import { IconButton, makeStyles } from "@material-ui/core";
import Popout from "../../Popout";

const useStyles = makeStyles({
	closeButton: {
		boxSizing: "content-box",
		alignSelf: "flex-end",
		color: "white",
	},
	addAdminBtn: {
		width: "fit-content",
		color: "white",
		alignSelf: "center",
		borderColor: "white",
		transition: "0.3s",
		"&:hover": {
			color: "#90be6d",
			borderColor: "#90be6d",
		},
	},
});

const OptionsDialog = () => {
	const classes = useStyles();

	const {
		nicknameOfTimeAdmin,
		admin,
		timeAdmin,
		setIsDialogOpen,
		isServerTime,
		isDialogOpen,
		setIsServerTime,
		socket,
		nickname,
		isPlaylistOpen,
		setIsPlaylistOpen,
	} = useContext(DataContext);

	const optionsRef = useRef(null);

	const handleCloseOptionsDialog = () => {
		setIsDialogOpen(false);
	};
	const handleGetTimeAdmin = () => {
		if (admin) {
			if (timeAdmin) {
				socket.emit("timeAdminLeaveRequest", { nickname });
			} else {
				socket.emit("timeAdminRequest", { nickname });
			}
		}
	};

	const serverTimeToggle = () => {
		setIsServerTime((prev) => {
			socket.emit("serverTimeToggle", { isServerTime: !prev, nickname });
			return !prev;
		});
	};

	const serverPlaylistToggle = () => {
		setIsPlaylistOpen((prev) => {
			socket.emit("playlistToggle", { isOpen: !prev, nickname });
			return !prev;
		});
	};

	return (
		<Popout state={isDialogOpen} setState={setIsDialogOpen}>
			<div className="optionsDialog" ref={optionsRef}>
				{/* <IconButton
					className={classes.closeButton}
					onClick={handleCloseOptionsDialog}
				>
					<CloseIcon />
				</IconButton> */}
				<OneOption checked={isServerTime} onChange={serverTimeToggle}>
					<span>Server time </span>
				</OneOption>
				<OneOption checked={isPlaylistOpen} onChange={serverPlaylistToggle}>
					<span>Playlist open</span>
				</OneOption>
				<PlayButton onClick={handleGetTimeAdmin} title="Take time admin">
					{nicknameOfTimeAdmin
						? `${nicknameOfTimeAdmin} HAS CONTROL`
						: "TAKE CONTROL"}
				</PlayButton>
			</div>
		</Popout>
	);
};

export default OptionsDialog;
