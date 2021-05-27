import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../../Services/rooms'
import ModalView from './Components/modalNewRoom'

import ListsRooms from './Components/listsRooms'
import ModalJoinRoom from './Components/modalJoinRoom'

import { Drawer, makeStyles, Button, Box, AppBar, Toolbar, Typography } from '@material-ui/core'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    list: {
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center'

    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

interface Props {
    history: {
        push(url: string): void;
    };
}

const Home: React.FC<Props> = (props) => {
    const classes = useStyles();
    const [rooms, setRooms] = useState(null);
    const [open, setOpen] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const { history } = props;

    const handle = () => {
        setOpen(!open);
    }

    const handleJoin = () => {
        setOpenJoin(!openJoin);
    }

    useEffect(() => {
        const getData = async () => {
            const result = await getAllRooms();
            if (result.sussec !== false)
                setRooms(result.rooms);
        }
        getData()
    }, [setRooms])

    return (
        <div className={classes.root}>
            <ModalView open={open} history={history} handle={() => handle()} />
            <ModalJoinRoom open={openJoin} history={history} handle={() => handleJoin()} />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                color="#1a237e"
                anchor="left"
            >
                <Box
                    flex='1'
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-betwean"
                    p={1}
                    m={1}
                    bgcolor="#1a237e"
                    css={{ maxWidth: 300 }}
                >
                    <Box p={1} flexGrow={1} bgcolor="#1a237e">
                        Item 1
                    </Box>
                    <Box p={1} bgcolor="#1a237e">
                        <Button
                            onClick={() => handleJoin()}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            style={{marginBottom: 20} }
                        > Join Room
                        </Button>
                        <Button
                            onClick={() => handle()}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        > New game
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            <main className={classes.content}>
                <div>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Rooms
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.list}>
                    <ListsRooms history={history} rooms={rooms} />
                </div>
            </main>
        </div>
    )
}

export default Home;