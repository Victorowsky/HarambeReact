import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { DataContext } from "../../../App";
import OneOption from "./OneOption";
import "./Options.css";
import AdminList from "./AdminList";
import ChangeChat from "./ChangeChat";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

const OptionsDialog = () => {
	const { socket } = useContext(DataContext);

	const { isServerTime, isPlaylistOpen, iFrame } = useSelector(
		(state) => state.player
	);

	const optionsRef = useRef(null);

	const serverTimeToggle = () => {
		socket.emit("serverTimeToggle");
	};

	const serverPlaylistToggle = () => {
		socket.emit("playlistToggle", { isOpen: !isPlaylistOpen });
	};

	const iFrameToggle = () => {
		socket.emit("iFrameToggle");
	};

	return (
		<div className="optionsDialog" ref={optionsRef}>
			<OneOption checked={isServerTime} onChange={serverTimeToggle}>
				<Typography>Server time</Typography>
			</OneOption>

			<OneOption checked={isPlaylistOpen} onChange={serverPlaylistToggle}>
				<Typography>Playlist open</Typography>
			</OneOption>

			<OneOption checked={iFrame} onChange={iFrameToggle}>
				<Typography>iFrame</Typography>
			</OneOption>

			<ChangeChat />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<AdminList />
			</div>
		</div>
	);
};

export default OptionsDialog;
