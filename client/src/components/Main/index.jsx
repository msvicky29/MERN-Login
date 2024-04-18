import { useState } from "react";
// import styles from "./styles.module.css";
import { AppBar, Button, Toolbar} from "@mui/material";
import styled from '@emotion/styled'
import UserData from "../UserData";

// import Table from "../Table/Table";

const Main = () => {
	const MyToolBar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
        background: "linear-gradient(to right, #734bdc, #866be7)"
    })
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div>
			<AppBar position="fixed" color="secondary" >
				<MyToolBar sx={{display:"flex", justifyContent:"space-between"}}>

				<h1>Dashboard</h1>
				<Button color="error" variant="contained" onClick={handleLogout}>Log out</Button>
				</MyToolBar>
			</AppBar>
			<UserData/>

		</div>
	);
};

export default Main;