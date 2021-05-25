import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SportsEsports from '@material-ui/icons/SportsEsports';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
}));

interface Props {
    rooms: any;
}

const ListsRooms: React.FC<Props> = (props) => {
    const rooms = props.rooms;

    const classes = useStyles();

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