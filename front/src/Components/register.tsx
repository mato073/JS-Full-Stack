import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { register } from '../Services/connection'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface Props {
    history: {
      push(url: string): void;
    };
  }

const Register: React.FC<Props> = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [name, setName] = useState("");

    const { history } = props;

    const hand_email = (e: any) => {
        setEmail(e.target.value)
    }
    const hand_password = (e: any) => {
        setPassword(e.target.value)
    }
    const hand_confPassword = (e: any) => {
        setConfPassword(e.target.value)
    }
    const hand_name = (e: any) => {
        setName(e.target.value)
    }

    const register_user = async () => {
        console.log('user =', name, email, password, confPassword);
        if (name === "" || password != confPassword || email === "") {
            console.log('error');
            return;
        }
        const result = await register(name, email, password);
        if (result === true) {
            history.push('/login')
        } else {
            console.log('error');
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
        </Typography>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        onChange={hand_name}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={hand_email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={hand_password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirme-password"
                        label="confirme-password"
                        type="password"
                        id="confirme-password"
                        autoComplete="current-password"
                        onChange={hand_confPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => register_user()}
                    >
                        Sign In
          </Button>
                    <Link to="/login">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        > Login
            </Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
}

export default Register