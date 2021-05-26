import React from 'react'
import Board from './board'
import axios from 'axios'
import { SavePosition } from '../Services/rooms'
import * as io from "socket.io-client"

const socket = io.connect('http://localhost:8080/');

const GameEngine: React.FC = () => {

    const [viole, setViole] = React.useState<any | null>(null);
    const [myPos, setMypos] = React.useState<any | null>(null);
    const [selectedPice, setSelectedPice] = React.useState("");
    const [posVAlue, setPostValu] = React.useState(Number);
    const [colorChip, setColorChip] = React.useState("");
    const link = localStorage.getItem('link');


    io.connect('http://localhost:8080/');
    React.useEffect(() => {
        const getData = async () => {
            const link = localStorage.getItem('link')
            const data = await axios.get(`http://localhost:8080/room/${link}`);
            setViole(data.data);
            setMypos(data.data.board)
        }
        getData()
    }, [])

    React.useEffect(() => {
        socket.on('possition', ({ data }: any) => {
            setMypos(JSON.parse(data));
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