import { Drawer, makeStyles, Typography, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import React from 'react'
import { useParams } from "react-router-dom";
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
    },
    listDiv: {
        borderRadius: 25,
        backgroundColor: '#7FDBFF',
        margin: 20
    },
    player: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'spaceAround',
        marginTop: 5,
        marginBottom: 5
    },

})

const Game: React.FC = () => {
    const classes = useStyles();
    const [players, setPlayers] = React.useState<any | null>([]);
    const { link }: { link: string } = useParams()

    const listePlayer = () => {
        /* const players = [{ color: "red", name: "Jordan", id: 6, status: "online" }, { color: "purple", name: "Ronan", id: 4, status: "online" }, { color: "blue", name: "Jack", id: 5, status: "online" },] */
        if (players !== null && players !== undefined) {
            return players.map((item: any, key: number) => {
                if (item.status === 'online') {
                    return (
                        <div key={key} className={classes.player}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: item.color, width: 35, height: 35 }}>
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
                <div className={classes.listDiv}>
                    <p>PLayers</p>
                    <ListItem className={classes.listPlayer}>
                        {listePlayer()}
                    </ListItem>
                </div>
            </Drawer>
            {link !== null && (<div className={classes.page} >
                <GameEngine setPlayers={(item: any) => setPlayers(item)} link={link} />
            </div>)}
        </div>
    )
}

export default Game;