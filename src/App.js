import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import AdminPanel from "./comp/AdminPanel/AdminPanel";
import PlayerAndChat from "./comp/PlayerAndChat";
import Success from "./comp/Snackbars/Success";
import Error from "./comp/Snackbars/Error";
import Home from "./comp/MainPage/Home.js";
import { useRef } from "react";
export const DataContext = React.createContext();

// const socket = io(`/`);
const serverURL = "https://boiling-bastion-80662.herokuapp.com/";
const socket = io(serverURL);
const App = () => {
	const history = useHistory();
	const [admin, setAdmin] = useState(false);
	const [currentVideoLink, setCurrentVideoLink] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [videoQueue, setVideoQueue] = useState([]);
	const [maxDelay, setMaxDelay] = useState(2);
	const [twitchUserData, setTwitchUserData] = useState(null);

	const websiteURL = "https://boiling-bastion-80662.herokuapp.com"; // HEROKU HOSTING
	// const websiteURL = "http://localhost:3001"; //

	// APP, ADMINPANEL, PLAYERANDCHAT, PACKAGE.JSON

	useEffect(() => {
		fetch(`https://noembed.com/embed?url=${currentVideoLink}`)
			.then((res) => res.json())
			.then((res) => {
				document.title = res.title;
				if (res.title === undefined) {
					document.title = "Watch Together";
				}
			});
	}, [currentVideoLink]);

	useEffect(() => {
		fetch("/getProfile", { credentials: "include" })
			.then((res) => res.json())
			.then((res) => {
				if (res.profile) {
					setTwitchUserData(res.profile);
				}
			});
	}, []);

	const chatRef = useRef(null);

	return (
		<>
			<DataContext.Provider
				value={{
					chatRef,
					websiteURL,
					twitchUserData,
					admin,
					setAdmin,
					socket,
					currentVideoLink,
					setCurrentVideoLink,
					history,
					isSuccess,
					setIsSuccess,
					isError,
					setIsError,
					successMessage,
					setSuccessMessage,
					errorMessage,
					setErrorMessage,
					videoQueue,
					setVideoQueue,
					maxDelay,
					setMaxDelay,
				}}
			>
				<div className="app">
					<Switch>
						{/* DEFAULT TWITCH CHAT FOR MY CHANNEL (VICTOROWSKY_) */}
						<Route path="/" exact>
							{/* <PlayerAndChat />
              <div className="bottomDiv">
                <AdminPanel />
              </div> */}
							<Home />
						</Route>
						<Route path="/:twitchStreamer" exact>
							<PlayerAndChat />
							<div className="bottomDiv">
								<AdminPanel />
							</div>
						</Route>
					</Switch>
					<Success />
					<Error />
				</div>
			</DataContext.Provider>
		</>
	);
};

export default App;
