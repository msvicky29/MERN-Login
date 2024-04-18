import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";
import { Stack,TextField,Button } from "@mui/material";
import './style.css'

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
        <>
        <div className='login-main'>
			<div className='login-box'>
				<form onSubmit={handleSubmit}>
					<h4>Sign Up</h4>
					<br />
					<Stack spacing={2}>
                        <TextField
                            label="First name"
                            variant="outlined"
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                        />
                        <TextField
                            label="Last name"
                            variant="outlined"
                            fullWidth
                            type='text'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            required
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                        />
                    </Stack>
					<br />
					<br />
					{error && <div className="error_msg">{error}</div>}
					<Button variant='contained' color='success' type="submit" fullWidth>Sign Up</Button>
				</form>
				<div> Already have a account?
					<Link to="/login">Login now</Link>
				</div>
			</div>

		</div>
        </>
	);
};

export default Signup;