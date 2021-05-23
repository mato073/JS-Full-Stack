import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { login } from '../Services/connection'

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

const Login: React.FC<Props> = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hand_email = (e: any) => {
    setEmail(e.target.value)
  }
  const hand_password = (e: any) => {
    setPassword(e.target.value)
  }

  const classes = useStyles();
  const { history } = props;

  const login_user = async () => {
    const result = await login(email, password);
    if (result === true) {
      history.push('/home')
    } else {
      console.log('error');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
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
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={hand_password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => login_user()}
            className={classes.submit}
          >
            Login
          </Button>
          <Link to="/register">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            > Register
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Login