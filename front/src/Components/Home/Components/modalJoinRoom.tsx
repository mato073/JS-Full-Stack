import React from 'react'
import { Modal, makeStyles, Container, Typography, CssBaseline, TextField, Button } from '@material-ui/core';
import { joinRoom } from '../../../Services/rooms'


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

interface Props {
    open: boolean,
    handle: any,
    history: {
        push(url: string): void;
    };
}
const ModalView: React.FC<Props> = ({ open, handle, history }) => {


    const classes = useStyles();
    const [link, setLink] = React.useState("");

    const hand_name = (e: any) => {
        setLink(e.target.value)
    }

    const join = async () => {
        if (link !== "") {
            const result = await joinRoom(link);
            console.log(result);
            if (result.status === 200) {
                history.push(`/game/${link}`);
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
                            id="Link"
                            label="Link of the room"
                            name="Link"
                            onChange={hand_name}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => join()}
                            className={classes.submit}
                        >
                            Join
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