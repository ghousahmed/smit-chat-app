import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'
import { Button, TextField } from '@mui/material';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { emailRegex } from '../contants';
import { auth, setDoc, db, doc, createUserWithEmailAndPassword, signOut } from '../config/firebase';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function SignupPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (res) => {
                await setDoc(doc(db, "users", res.user.uid), data);
                navigate("/login")
                reset()
            })
            .catch((err) => {
                console.log("err", err)
            })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid className="login-container" columns={12} xs={4} xsOffset={4}>
                    <Item>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div style={{ padding: 10 }}>
                                <h2>Register</h2>
                                <div style={{ marginBottom: 10 }}>
                                    <TextField
                                        {...register("full_name",
                                            {
                                                required: "Please enter full name",

                                            }
                                        )}
                                        error={errors.full_name && true}
                                        helperText={errors.full_name?.message}
                                        size="small"
                                        fullWidth
                                        color="warning" id="outlined-basic" label="Full name" variant="outlined"
                                    />
                                </div>
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
                                        fullWidth color="warning" id="outlined-basic" label="Email address" variant="outlined"
                                    />
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    <TextField
                                        {...register("password", {
                                            required: "Please enter password",
                                        })}
                                        error={errors.password && true}
                                        helperText={errors.password?.message}
                                        type='password' size="small"
                                        fullWidth color="warning" id="outlined-basic" label="Password" variant="outlined" />
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    <Button type='submit' fullWidth color="warning" variant="contained">REGISTER</Button>
                                </div>
                                <div>
                                    Already have an account? <Link to={'/login'}>Login now</Link>
                                </div>
                            </div>
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SignupPage;