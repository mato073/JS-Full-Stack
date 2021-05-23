import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../../Services/rooms'

import ListsRooms from './Components/listsRooms'

import { Drawer, makeStyles, Button, Box, AppBar, Toolbar, Typography } from '@material-ui/core'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        //display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    list: {
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
const Home: React.FC = () => {
    const classes = useStyles();
    const [rooms, setRooms] = useState(null);

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
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Rooms
                        </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.list}>
                    <ListsRooms rooms={rooms} />
                </div>
            </main>
        </div>
    )
}

export default Home;