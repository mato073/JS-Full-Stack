import React from 'react'
import Board from './board'
import axios from 'axios'
import { SavePosition } from '../Services/rooms'
import socket from '../Services/socketConect'
import { getUser } from '../Services/user'
import { getRoom } from '../Services/rooms'

interface Props {
    setPlayers: any,
    link: string
}

const GameEngine: React.FC<Props> = ({ setPlayers, link }) => {
    const [myPos, setMypos] = React.useState<any | null>(null);
    const [selectedPice, setSelectedPice] = React.useState("");
    const [myColor, setMyColor] = React.useState(String);
    const [posVAlue, setPostValu] = React.useState(Number);
    const [colorChip, setColorChip] = React.useState("");
    const [curentTurn, setCutentTurn] = React.useState<any | null>();


    React.useEffect(() => {
        const getData = async () => {
            const data = await getRoom(link);
            if (data.status === 200) {
                const { user } = await getUser();
                const curent = data.room.players.find((item: any) => item.id === user.id);
                if (curent !== undefined)
                    setMyColor(curent.color);
                setCutentTurn(data.room.turn);
                socket.connect();
                socket.emit('join', { room: link, user: { name: user.name, id: user.id } })
                setMypos(data.room.board)
            }
            //print error
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
        socket.on('mycolor', (color: string) => {
            setMyColor(color);
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
            if (colorChip === 'purple') {
                Temp = newTab.Purple[posVAlue].position
                newTab.Purple[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'red') {
                Temp = newTab.Red[posVAlue].position
                newTab.Red[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'orange') {
                Temp = newTab.Orange[posVAlue].position
                newTab.Orange[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'yellow') {
                Temp = newTab.Yellow[posVAlue].position
                newTab.Yellow[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'green') {
                Temp = newTab.Green[posVAlue].position
                newTab.Green[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'blue') {
                Temp = newTab.Blue[posVAlue].position
                newTab.Blue[posVAlue].position = e.target.getAttribute('transform');
            }
            newTab.White[key].position = Temp;
            SavePosition(newTab, link);
            SendPosition(newTab);
            nexTrun();
            setSelectedPice("");
        }
    }

    const position = (e: any, key: number, chip: string) => {
        const value = checkTurn();
        if (value === true && myColor === chip) {
            setSelectedPice(e.target.id);
            setColorChip(chip);
            setPostValu(key);
        }
    }

    if (myPos !== null && myPos !== undefined) {
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