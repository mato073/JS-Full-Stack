import React from 'react'

import { Drawer, makeStyles, Button, Box } from '@material-ui/core'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        display: 'felx',
        flexDirection: 'row',
        justifycontent: 'spacebetween'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        display: 'flex',
        flex: 1,
    },
}));
const Home: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <Box
                    flex='1'
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-betwean"
                    p={1}
                    m={1}
                    bgcolor="white"
                    css={{ maxWidth: 300 }}
                >
                    <Box p={1} flexGrow={1} >
                        Item 1
                    </Box>
                    <Box p={1}>
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
            <main >
                <div className={classes.content}>
                    <text>re</text>
                </div>
            </main>
        </div>
    )
}

export default Home;