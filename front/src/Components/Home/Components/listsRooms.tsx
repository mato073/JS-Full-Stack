import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SportsEsports from '@material-ui/icons/SportsEsports';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column'
    },
}));

interface Props {
    rooms: any,
    history: {
        push(url: string): void;
    };
}

const ListsRooms: React.FC<Props> = (props) => {
    const { rooms, history } = props;

    const classes = useStyles();

    const goToGame = (link: string) => {
        localStorage.setItem('link', link);
        history.push('/game')
    }

    const Elements = () => {
        if (rooms === null) {
            return (
                <div>
                    <p>this is null</p>
                </div>
            )
        } else {
            return rooms.map((item: any, key: number) => {
                return (
                    <div key={key}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <SportsEsports />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={item.status} />
                        </ListItem>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={() => goToGame(item.link)}
                        > Join
                         </Button>
                        < Divider />
                    </div>
                )
            })
        }
    }
    return (
        <List className={classes.root}>
            <Elements />
        </List>
    )
}
export default ListsRooms