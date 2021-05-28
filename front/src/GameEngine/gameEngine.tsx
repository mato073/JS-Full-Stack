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

const link = localStorage.getItem('link')

const GameEngine: React.FC<Props> = ({ setPlayers, players }) => {
    const [myPos, setMypos] = React.useState<any | null>(null);
    const [selectedPice, setSelectedPice] = React.useState("");
    const [myColor, setMyColor] = React.useState(String);
    const [posVAlue, setPostValu] = React.useState(Number);
    const [colorChip, setColorChip] = React.useState("");
    const [curentTurn, setCutentTurn] = React.useState<any | null>();


    React.useEffect(() => {
        const getData = async () => {
            const data = await axios.get(`http://localhost:8080/room/${link}`);
            const { user } = await getUser();
            const curent = data.data.players.find((item: any) => item.id === user.id);
            setMyColor(curent.color);
            setCutentTurn(data.data.turn);
            socket.connect();
            socket.emit('join', { room: link, user: { name: user.name, id: user.id } })
            setMypos(data.data.board)
        }
        getData()
    }, [])

    React.useEffect(() => {
        socket.on('possition', (data: object) => {
            setMypos(data);
        })
        socket.on('newPlayer', (data: object) => {
            setPlayers(data);
        })
        socket.on('newTurn', (color: string) => {
            setCutentTurn(color);
        })
    }, [])

    const SendPosition = (possition: object) => {
        socket.emit('possition', { room: link, position: possition });
    }

    const checkTurn = () => {
        if (myColor === curentTurn)
            return true;
        return false
    }

    const nexTrun = () => {
        socket.emit('newTurn', { room: link, color: myColor });
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
            nexTrun();
            setSelectedPice("");
        }
    }

    const position = (e: any, key: number, chip: string) => {
        const value = checkTurn();
        if (value === true) {
            setSelectedPice(e.target.id);
            setColorChip(chip);
            setPostValu(key);
        }
    }

    if (Board !== null && Board !== undefined) {
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