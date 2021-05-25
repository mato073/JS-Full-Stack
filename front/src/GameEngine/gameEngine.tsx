import React from 'react'
import Board from './board'
import axios from 'axios'
import { SavePosition } from '../Services/rooms'


const GameEngine: React.FC = () => {

    const [viole, setViole] = React.useState<any | null>(null);
    const [selectedPice, setSelectedPice] = React.useState("");
    const [posVAlue, setPostValu] = React.useState(Number);
    const [colorChip, setColorChip] = React.useState("");
    const link = localStorage.getItem('link');




    React.useEffect(() => {
        const getData = async () => {
            const link = localStorage.getItem('link')
            const data = await axios.get(`http://localhost:8080/room/${link}`);
            setViole(data.data);
        }
        getData()
    }, [])

    const changePosition = (e: any, key: number) => {
        if (selectedPice !== "") {
            let newTab = viole;
            let Temp;
            if (colorChip === 'Purple') {
                Temp = newTab.board.Purple[posVAlue].position
                newTab.board.Purple[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Red') {
                Temp = newTab.board.Red[posVAlue].position
                newTab.board.Red[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Orange') {
                Temp = newTab.board.Orange[posVAlue].position
                newTab.board.Orange[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Yellow') {
                Temp = newTab.board.Yellow[posVAlue].position
                newTab.board.Yellow[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Green') {
                Temp = newTab.board.Green[posVAlue].position
                newTab.board.Green[posVAlue].position = e.target.getAttribute('transform');
            } else if (colorChip === 'Blue') {
                Temp = newTab.board.Blue[posVAlue].position
                newTab.board.Blue[posVAlue].position = e.target.getAttribute('transform');
            }
            newTab.board.White[key].position = Temp;
            SavePosition(newTab.board);
            setViole(newTab);
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
                <Board serverPosition={viole.board} position={(e: any, key: number, chip: string) => position(e, key, chip)} changePosition={(e: any, key: number) => changePosition(e, key)} />
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