import { Drawer, makeStyles, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@material-ui/core'
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
    turn: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },

})

const Game: React.FC = () => {
    const classes = useStyles();
    const [players, setPlayers] = React.useState<any | null>([]);
    const { link }: { link: string } = useParams()
    const [curentTurn, setCutentTurn] = React.useState<any | null>();

    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

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
                <div className={classes.listDiv}>
                    <p>Curent turn</p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                        <Avatar style={{ backgroundColor: curentTurn, width: 35, height: 35 }}>
                            <PersonIcon />
                        </Avatar>
                    </div>
                </div>
                <div className={classes.listDiv}>
                    <p>Room code</p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                        {link}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                        <Button variant="contained" color="primary" onClick={() => copyToClipboard()}>Copy</Button>
                    </div>
                </div>
            </Drawer>
            {link !== null && (<div className={classes.page} >
                <GameEngine setPlayers={(item: any) => setPlayers(item)} link={link} curentTurn={curentTurn} setCutentTurn={(item: string) => setCutentTurn(item)} />
            </div>)}
        </div>
    )
}

export default Game;