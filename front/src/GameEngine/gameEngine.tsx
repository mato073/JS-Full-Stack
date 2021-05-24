import React from 'react'
import Board from './board'
import axios from 'axios'


const GameEngine: React.FC = () => {

    const [viole, setViole] = React.useState<any | null>(null);
    const [selectedPice, setSelectedPice] = React.useState("");
    const [posVAlue, setPostValu] = React.useState(Number);
    const [colorChip, setColorChip] = React.useState("");




    React.useEffect(() => {
        const getData = async () => {
            const data = await axios.get('http://localhost:8080/room/possition');
            setViole(data.data);
        }
        getData()
    }, [])


    const changePosition = (e: any, key: number) => {
        if (selectedPice !== "") {
            let newTab = viole;
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
            setViole(newTab);
            setSelectedPice("");
        }
    }

    const position = (e: any, key: number, chip: string) => {
        setSelectedPice(e.target.id);
        setColorChip(chip);
        setPostValu(key);
    }

    return (
        <div>
            <Board serverPosition={viole} position={(e: any, key: number, chip: string) => position(e, key, chip)} changePosition={(e: any, key: number) => changePosition(e, key)} />
        </div>
    )
}

export default GameEngine