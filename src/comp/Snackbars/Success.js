import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { changeIsSuccess } from "../../redux/playerState";
import { Box, Slide } from "@material-ui/core";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

export default function CustomizedSnackbars() {
	const { isSuccess, successMessage } = useSelector((state) => state.player);

	const dispatch = useDispatch();

	const classes = useStyles();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(changeIsSuccess(false));
	};

	return (
		<Box className={classes.root}>
			<Snackbar
				open={isSuccess}
				autoHideDuration={2000}
				anchorOrigin={{ horizontal: "left", vertical: "top" }}
				onClose={handleClose}
				TransitionComponent={Slide}
			>
				<Box>
					<Alert onClose={handleClose} severity="success">
						{successMessage}
					</Alert>
				</Box>
			</Snackbar>
		</Box>
	);
}
