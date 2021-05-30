import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Button, Grid, TextField } from '@material-ui/core/'
import { format, compareAsc } from 'date-fns';
import { fr } from 'date-fns/locale'

const useStyles = makeStyles((theme) => ({
    root: {
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
    rooms: any,
    history: {
        push(url: string): void;
    };
}

const ListsRooms: React.FC<Props> = (props) => {
    const { rooms, history } = props;
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState("");

    const hand_name = (e: any) => {
        setName(e.target.value)
    }
    const hand_date = (e: any) => {
        setDate(e.target.value)
    }


    const classes = useStyles();

    const goToGame = (link: string) => {
        history.push(`/game/${link}`)
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

    /*     const custom_sort = (a: any, b: any) => {
            return compareAsc(new Date(a.date), new Date(b.date));
        }
    
        const sherchName = () => {
            const names = rooms.filter((item: any) => item.name === name);
            console.log(names);
    
        }
    
        const sherch = () => {
            let newValue: any;
            if (name !== "") {
                newValue = sherchName();
            }
        } */

    return (
        <div className={classes.root}>
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
                        <Button variant="contained" color="primary"/*  onClick={() => sherch()} */ >Search</Button>
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
    )
}
export default ListsRooms