import React from 'react'
import Board from './board'
import axios from 'axios'
import { SavePosition } from '../Services/rooms'
import socket from '../Services/socketConect'
import { getUser } from '../Services/user'

interface Props {
    setPlayers: any,
    players: any
}

const GameEngine: React.FC<Props> = ({ setPlayers, players }) => {

    const [viole, setViole] = React.useState<any | null>(null);
    const [myPos, setMypos] = React.useState<any | null>(null);
    const [selectedPice, setSelectedPice] = React.useState("");
    const [posVAlue, setPostValu] = React.useState(Number);
    const [colorChip, setColorChip] = React.useState("");


    React.useEffect(() => {
        const getData = async () => {
            const link = localStorage.getItem('link')
            const data = await axios.get(`http://localhost:8080/room/${link}`);
            const user = await getUser();

            socket.connect();

            socket.emit('newPlayer', { data: user.user.name })
            setViole(data.data);
            setMypos(data.data.board)
        }
        getData()
    }, [])

    React.useEffect(() => {
        socket.connect();
    }, [])

    React.useEffect(() => {
        socket.on('possition', ({ data }: any) => {
            setMypos(JSON.parse(data));
        })
        socket.on('newPlayer', ({ data }: any) => {
            const temp = players;
            console.log(temp);
            
            temp.push({ name: data });
            setPlayers(temp);
        })
    }, [])

    const SendPosition = (possition: object) => {
        socket.emit('possition', { data: JSON.stringify(possition) });
    }

    const changePosition = (e: any, key: number) => {
        if (selectedPice !== "") {
            let newTab = myPos;
            let Temp;
            if (colorChip === 'Purple') {
                Temp = newTab.Purple[posVAlue].position
                newTab.Purple[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Red') {
                Temp = newTab.Red[posVAlue].position
                newTab.Red[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Orange') {
                Temp = newTab.Orange[posVAlue].position
                newTab.Orange[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Yellow') {
                Temp = newTab.Yellow[posVAlue].position
                newTab.Yellow[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Green') {
                Temp = newTab.Green[posVAlue].position
                newTab.Green[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Blue') {
                Temp = newTab.Blue[posVAlue].position
                newTab.Blue[posVAlue].position = e.target.getAttribute('transform');
            }
            newTab.White[key].position = Temp;
            SavePosition(newTab);
            SendPosition(newTab);
            setSelectedPice("");
        }
    }

    const position = (e: any, key: number, chip: string) => {
        setSelectedPice(e.target.id);
        setColorChip(chip);
        setPostValu(key);
    }

    if (viole !== null && viole !== undefined) {
        return (
            <div>
                <Board serverPosition={myPos} position={(e: any, key: number, chip: string) => position(e, key, chip)} changePosition={(e: any, key: number) => changePosition(e, key)} />
            </div>
        )
    } else {
        return (
            <div>
                <h1>The game is loading</h1>
            </div>
        )
    }
}

export default GameEngine