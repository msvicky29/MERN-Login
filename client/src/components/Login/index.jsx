import { useState } from "react";
import axios from "axios";
import { Button, TextField } from '@mui/material'
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import './style.css'

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
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
        // <div className='login_container'>
        // 	<div className='login_form_container'>
        // 		<div className='left'>
        // 			<form className="form_container" onSubmit={handleSubmit}>
        // 				<h1>Login to Your Account</h1>
        // 				<input
        // 					type="email"
        // 					placeholder="Email"
        // 					name="email"
        // 					onChange={handleChange}
        // 					value={data.email}
        // 					required
        // 					className="input"
        // 				/>
        // 				<input
        // 					type="password"
        // 					placeholder="Password"
        // 					name="password"
        // 					onChange={handleChange}
        // 					value={data.password}
        // 					required
        // 					className="input"
        // 				/>
        // 				{error && <div className="error_msg">{error}</div>}
        // 				<button type="submit" className="green_btn">
        // 					Sign In
        // 				</button>
        // 			</form>
        // 		</div>
        // 		<div className='right'>
        // 			<h1>New Here ?</h1>
        // 			<Link to="/signup">
        // 				<button type="button" className='white_btn'>
        // 					Sign Up
        // 				</button>
        // 			</Link>
        // 		</div>
        // 	</div>
        // </div>
        <div className='login-main'>

            <div className='login-box'>
                <form onSubmit={handleSubmit}>


                    <h4>Login</h4>
                    <br /><br />
                    <Stack spacing={2} >


                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            type='password'
                            fullWidth
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required />


                            
                    </Stack>

                    <br />

                    {error && <div className="error_msg">{error}</div>}
                    <Button variant='contained' type="submit" color='success' fullWidth>Log IN</Button>
                </form>
                <div> Don't have any account?Just
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>

        </div>
    );
};

export default Login;

