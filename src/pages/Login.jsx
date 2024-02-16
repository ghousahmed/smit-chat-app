import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'
import { Button, TextField } from '@mui/material';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { emailRegex } from '../contants';
import { auth, signInWithEmailAndPassword } from '../config/firebase';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function LoginPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                console.log(user)
                navigate('/chat')
            })
            .catch((err) => console.log(err))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid className="login-container" columns={12} xs={12} md={12} lg={6} lgOffset={4}>
                    <Item>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div style={{ padding: 10 }}>
                                <h2>Login</h2>
                                <div style={{ marginBottom: 10 }}>
                                    <TextField
                                        {...register("email", {
                                            required: "Please enter email",
                                            pattern: {
                                                value: emailRegex,
                                                message: "Please enter correct email"
                                            }
                                        })}
                                        error={errors.email && true}
                                        helperText={errors.email?.message}
                                        size="small"
                                        fullWidth color="warning" id="outlined-basic" label="Email address" variant="outlined" />
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    <TextField
                                        {...register("password", {
                                            required: "Please enter password",
                                        })}
                                        error={errors.password && true}
                                        helperText={errors.password?.message}
                                        type='password'
                                        size="small"
                                        fullWidth
                                        color="warning" id="outlined-basic" label="Password" variant="outlined" />
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    <Button type='submit' fullWidth color="warning" variant="contained">LOGIN</Button>
                                </div>
                                <div>
                                    Don't have an account? <Link to={'/register'}>Register now</Link>
                                </div>
                            </div>
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LoginPage;