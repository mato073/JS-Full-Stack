import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../../Services/rooms'
import ModalView from './Components/modalNewRoom'

import ModalJoinRoom from './Components/modalJoinRoom'
import { format, compareAsc, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale'

import { Drawer, makeStyles, Button, Box, AppBar, Toolbar, Typography, Grid, TextField, Divider } from '@material-ui/core'

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
        display: 'flex',
        justifyContent: 'center'

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    listeRoom: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 40,
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: "#C0C0C0"
    },
    grid2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: "#1a237e",
    },
    elements2: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    elements: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

interface Props {
    history: {
        push(url: string): void;
    };
}

const Home: React.FC<Props> = (props) => {
    const classes = useStyles();
    const [rooms, setRooms] = useState<any | null>();
    const [allRooms, setAllRooms] = useState<any | null>();
    const [open, setOpen] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const { history } = props;
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState("");

    const hand_name = (e: any) => {
        setName(e.target.value)
    }
    const hand_date = (e: any) => {
        setDate(e.target.value)
    }

    const handle = () => {
        setOpen(!open);
    }

    const handleJoin = () => {
        setOpenJoin(!openJoin);
    }

    useEffect(() => {
        const getData = async () => {
            const result = await getAllRooms();
            if (result.sussec !== false) {
                setRooms(result.rooms);
                setAllRooms(result.rooms);
            }
        }
        getData()
    }, [setRooms])

    const goToGame = (link: string) => {
        history.push(`/game/${link}`)
    }

    const custom_sort = (a: any, b: any) => {
        return compareAsc(new Date(a.date), new Date(b.date));
    }

    const sherchName = (newValue: any) => {
        const names = newValue.filter((item: any) => item.name.includes(name));
        return names
    }

    const sherchDate = (all: any) => {
        const names = all.filter((item: any) => isSameDay(new Date(item.date), new Date(date)));

        return names;
    }

    const sherch = () => {

        let newValue = allRooms;
        if (name !== "") {
            newValue = sherchName(newValue);
            if (date !== "") {
                newValue = sherchDate(newValue);
            }
        }
        if (date !== '') {
            newValue = sherchDate(newValue);
        }
        setRooms(newValue)
    }

    const Elements = () => {
        if (rooms === null || rooms === undefined) {
            return (
                <div>
                    <p>this is null</p>
                </div>
            )
        } else {
            return rooms.map((item: any, key: number) => {
                const date = new Date(item.date);
                let newDate = format(date, 'dd LLLL yyyy', { locale: fr });
                return (
                    <div key={key}>
                        <Grid className={classes.grid}>
                            <Grid item className={classes.elements}>
                                <p><text style={{ fontWeight: "bold" }}> {item.name}</text>  </p>
                            </Grid>
                            {/* <Paper className={classes.paper}>{item.name}</Paper> */}
                            <Grid item className={classes.elements}>
                                <p> Status: <text style={{ fontWeight: "bold" }}> {item.status}</text></p>
                            </Grid>
                            <Grid item className={classes.elements}>
                                <p>Date: <text style={{ fontWeight: "bold" }}> {newDate}</text></p>
                            </Grid>
                            {item.status === 'not started' && (<Grid item className={classes.elements} >
                                <Button variant="contained" color="primary" onClick={() => goToGame(item.link)} >Join</Button>
                            </Grid>)}
                        </Grid>
                        <Divider />
                    </div >
                )
            })
        }
    }

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
                            style={{ marginBottom: 20 }}
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
                <div className={classes.list}>
                    <div>
                        <AppBar>
                            <Toolbar>
                                <Typography variant="h6">
                                    Rooms
                        </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div className={classes.listeRoom}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                            style={{ marginBottom: 10 }}
                        >
                            <Grid className={classes.grid2}>
                                <Grid item className={classes.elements2}>
                                    <TextField
                                        style={{ backgroundColor: 'white' }}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        type="text"
                                        id="name"
                                        onChange={(e: any) => hand_name(e)}
                                    />
                                </Grid>
                                <Grid item className={classes.elements2}>
                                    <TextField
                                        style={{ backgroundColor: 'white' }}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="date"
                                        type="date"
                                        id="date"
                                        onChange={(e: any) => hand_date(e)}
                                    />
                                </Grid>
                                <Grid item className={classes.elements} style={{ marginTop: 24 }}>
                                    <Button variant="contained" color="primary" onClick={() => sherch()} >Search</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                        >
                            <Elements />
                        </Grid>
                    </div>
                    {/* <ListsRooms history={history} rooms={rooms} /> */}
                </div>
            </main>
        </div>
    )
}

export default Home;