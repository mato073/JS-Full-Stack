import { Drawer, makeStyles, Typography, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import React from 'react'
import GameEngine from '../GameEngine/gameEngine'
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 240;

const useStyles = makeStyles({
    root: {
        display: 'flex'
    },
    page: {
        background: 'black',
        width: "100%",
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    listPlayer: {
        display: 'flex',
        flexDirection: 'column'
    }
})

const Game: React.FC = () => {
    const classes = useStyles();
    const [players, setPlayers] = React.useState<any | null>([]);

    const listePlayer = () => {
        console.log('players ici =', players[0]);

        if (players !== null && players !== undefined) {
            console.log('test');
            return players.map((item: any, key: number) => {
                if (item.status === 'online') {
                    return (
                        <div key={key}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} />
                        </div>
                    );
                }
            })
        }
    }
    return (
        <div className={classes.root}>
            <Drawer className={classes.drawer} variant="permanent" anchor='left' classes={{ paper: classes.drawerPaper }} >
                <div>
                    <Typography variant="h5" >My Room</Typography>
                </div>
                <ListItem className={classes.listPlayer}>
                    {listePlayer()}
                    {/*   <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={'test'} /> */}
                </ListItem>
            </Drawer>
            <div className={classes.page} >
                <GameEngine setPlayers={(item: any) => setPlayers(item)} players={players} />
            </div>
        </div>
    )
}

export default Game;