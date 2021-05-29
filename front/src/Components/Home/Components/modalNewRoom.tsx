import React from 'react'
import { Modal, makeStyles, Container, Typography, CssBaseline, TextField, Button } from '@material-ui/core';
import { newRoom } from '../../../Services/rooms'

interface Props {
    open: boolean,
    handle: any,
    history: {
        push(url: string): void;
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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

const ModalView: React.FC<Props> = ({ open, handle, history }) => {


    const classes = useStyles();
    const [name, setName] = React.useState("");

    const hand_name = (e: any) => {
        setName(e.target.value)
    }

    const creatRoom = async () => {
        if (name !== "") {
            const result = await newRoom(name);
            console.log(result.link);

            if (result.link !== null && result.link != undefined) {
                history.push(`/game/${result.link}`)
            }
        }
    }
    const body = () => {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        New room
              </Typography>
                    <div className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name of the room"
                            name="name"
                            onChange={hand_name}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => creatRoom()}
                            className={classes.submit}
                        >
                            Create
                     </Button>
                    </div>
                </div>
            </Container>)
    }


    return (
        <Modal
            open={open}
            onClose={handle}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body()}
        </Modal>
    )
}

export default ModalView