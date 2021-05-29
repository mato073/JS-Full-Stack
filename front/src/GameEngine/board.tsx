import React from 'react'

interface Props {
    serverPosition: any,
    changePosition: any,
    position: any,
}

const Board: React.FC<Props> = ({ serverPosition, changePosition, position}) => {

    const purple = () => {

        if (serverPosition !== null) {
            return serverPosition.Purple.map((item: any, key: any) => {
                return (
                    <use transform={item.position} key={key} id={item.id} xlinkHref="#PurpleBall" onClick={(e) => position(e, key, 'purple')} ></use>
                )
            })
        }
    }

    const red = () => {

        if (serverPosition !== null) {
            return serverPosition.Red.map((item: any, key: any) => {
                return (
                    <use transform={item.position} key={key} id={item.id} xlinkHref="#RedBall" onClick={(e) => position(e, key, 'red')} ></use>
                )
            })
        }
    }
    const orange = () => {

        if (serverPosition !== null) {
            return serverPosition.Orange.map((item: any, key: any) => {
                return (
                    <use transform={item.position} key={key} id={item.id} xlinkHref="#OrangeBall" onClick={(e) => position(e, key, 'orange')} ></use>
                )
            })
        }
    }
    const yellow = () => {

        if (serverPosition !== null) {
            return serverPosition.Yellow.map((item: any, key: any) => {
                return (
                    <use transform={item.position} key={key} id={item.id} xlinkHref="#YellowBall" onClick={(e) => position(e, key, 'yellow')} ></use>
                )
            })
        }
    }
    const green = () => {

        if (serverPosition !== null) {
            return serverPosition.Green.map((item: any, key: any) => {
                return (
                    <use transform={item.position} key={key} id={item.id} xlinkHref="#GreenBall" onClick={(e) => position(e, key, 'green')} ></use>
                )
            })
        }
    }


    const blue = () => {

        if (serverPosition !== null) {
            return serverPosition.Blue.map((item: any, key: any) => {
                return (
                    <use transform={item.position} key={key} id={item.id} xlinkHref="#BlueBall" onClick={(e) => position(e, key, 'blue')} ></use>
                )
            })
        }
    }

    const white = () => {

        if (serverPosition !== null) {
            return serverPosition.White.map((item: any, key: any) => {
                return (
                    <use key={key} transform={item.position} xlinkHref="#WhiteHole" onClick={(e) => changePosition(e, key)} ></use>
                )
            })
        }
    }




    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="800"
                height="800"
                version="1"
                viewBox="200 200 600 600"
            >
                <link id="dark-mode-general-link" rel="stylesheet" type="text/css"></link>
                <style id="dark-mode-custom-style" type="text/css"></style>
                <style id="dark-mode-native-style" type="text/css"></style>
                <defs>
                    <linearGradient id="LinearGradientWhite"> <stop offset="0" stopColor="#fff"></stop> <stop offset="0.8" stopColor="#e8e8e8"></stop><stop offset="1" stopColor="silver"></stop>
                    </linearGradient>
                    <linearGradient id="LinearGradientRed">
                        <stop offset="0" stopColor="#f99"></stop>
                        <stop offset="0.8" stopColor="#d32d2d"></stop>
                        <stop offset="1" stopColor="#b40000"></stop>
                    </linearGradient>
                    <linearGradient id="LinearGradientOrange">
                        <stop offset="0" stopColor="#ffe4c1"></stop>
                        <stop offset="0.72" stopColor="#ff9a19"></stop>
                        <stop offset="1" stopColor="#f08800"></stop>
                    </linearGradient>
                    <linearGradient id="LinearGradientYellow">
                        <stop offset="0" stopColor="#fffbc1"></stop>
                        <stop offset="0.75" stopColor="#e7dc29"></stop>
                        <stop offset="1" stopColor="#c8bc00"></stop>
                    </linearGradient>
                    <linearGradient id="LinearGradientBlue">
                        <stop offset="0" stopColor="#b9b9ff"></stop>
                        <stop offset="0.8" stopColor="#3131cf"></stop>
                        <stop offset="1" stopColor="#0000b4"></stop>
                    </linearGradient>
                    <linearGradient id="LinearGradientGreen">
                        <stop offset="0" stopColor="#00eb00"></stop>
                        <stop offset="0.5" stopColor="#00b600"></stop>
                        <stop offset="1" stopColor="#005000"></stop>
                    </linearGradient>
                    <linearGradient id="LinearGradientPurple">
                        <stop offset="0" stopColor="#ebcef2"></stop>
                        <stop offset="0.8" stopColor="#ac37c9"></stop>
                        <stop offset="1" stopColor="#79278d"></stop>
                    </linearGradient>
                    <filter
                        id="StoneDropShadow"
                        width="1.5"
                        height="1.5"
                        x="-0.25"
                        y="-0.25"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur
                            in="SourceAlpha"
                            result="blur"
                            stdDeviation="2"
                        ></feGaussianBlur>
                        <feColorMatrix
                            result="bluralpha"
                            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.4 0"
                        ></feColorMatrix>
                        <feOffset dx="2" dy="2" in="bluralpha" result="offsetBlur"></feOffset>
                        <feMerge>
                            <feMergeNode in="offsetBlur"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                    </filter>
                    <radialGradient
                        id="RadialGradientWhite"
                        cx="0"
                        cy="0"
                        r="16"
                        fx="8"
                        fy="8"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#LinearGradientWhite"
                    ></radialGradient>
                    <radialGradient
                        id="RadialGradientRed"
                        cx="0"
                        cy="0"
                        r="16"
                        fx="-6"
                        fy="-6"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#LinearGradientRed"
                    ></radialGradient>
                    <radialGradient
                        id="RadialGradientOrange"
                        cx="0"
                        cy="0"
                        r="16"
                        fx="-6"
                        fy="-6"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#LinearGradientOrange"
                    ></radialGradient>
                    <radialGradient
                        id="RadialGradientYellow"
                        cx="0"
                        cy="0"
                        r="16"
                        fx="-6"
                        fy="-6"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#LinearGradientYellow"
                    ></radialGradient>
                    <radialGradient
                        id="RadialGradientGreen"
                        cx="0"
                        cy="0"
                        r="16"
                        fx="-6"
                        fy="-6"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#LinearGradientGreen"
                    ></radialGradient>
                    <radialGradient
                        id="RadialGradientBlue"
                        cx="0"
                        cy="0"
                        r="16"
                        fx="-6"
                        fy="-6"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#LinearGradientBlue"
                    ></radialGradient>
                    <radialGradient
                        id="RadialGradientPurple"
                        cx="0"
                        cy="0"
                        r="16"
                        fx="-6"
                        fy="-6"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#LinearGradientPurple"
                    ></radialGradient>
                    <circle
                        id="WhiteHole"
                        cx="0"
                        cy="0"
                        r="16"
                        fill="url(#RadialGradientWhite)"
                        stroke="#ccc"
                        strokeWidth="2"
                    ></circle>
                    <circle
                        id="RedBall"
                        cx="0"
                        cy="0"
                        r="16"
                        fill="url(#RadialGradientRed)"
                        stroke="#999"
                        strokeWidth="1"
                        filter="url(#StoneDropShadow)"
                    ></circle>
                    <circle
                        id="OrangeBall"
                        cx="0"
                        cy="0"
                        r="16"
                        fill="url(#RadialGradientOrange)"
                        stroke="#aaa"
                        strokeWidth="1"
                        filter="url(#StoneDropShadow)"
                    ></circle>
                    <circle
                        id="YellowBall"
                        cx="0"
                        cy="0"
                        r="16"
                        fill="url(#RadialGradientYellow)"
                        stroke="#bbb"
                        strokeWidth="1"
                        filter="url(#StoneDropShadow)"
                    ></circle>
                    <circle
                        id="GreenBall"
                        cx="0"
                        cy="0"
                        r="16"
                        fill="url(#RadialGradientGreen)"
                        stroke="#999"
                        strokeWidth="1"
                        filter="url(#StoneDropShadow)"
                    ></circle>
                    <circle
                        id="BlueBall"
                        cx="0"
                        cy="0"
                        r="16"
                        fill="url(#RadialGradientBlue)"
                        stroke="#999"
                        strokeWidth="1"
                        filter="url(#StoneDropShadow)"
                    ></circle>
                    <circle
                        id="PurpleBall"
                        cx="0"
                        cy="0"
                        r="16"
                        fill="url(#RadialGradientPurple)"
                        stroke="#999"
                        strokeWidth="1"
                        filter="url(#StoneDropShadow)"
                    ></circle>
                </defs>
                <path
                    id="Mainstar"
                    fill="#e6e6e6"
                    stroke="gray"
                    strokeWidth="5"
                    d="M258.553 347c-11.778 0-17.88 10.327-11.778 20.4l66.566 115.296c6.93 12.004 6.93 22.604 0 34.609L246.775 632.6c-5.889 10.2 0 20.4 11.778 20.4h133.132c13.861 0 23.041 5.3 29.972 17.305L488.223 785.6c5.95 10.165 17.667 10.2 23.556 0l66.566-115.295C585.275 658.3 594.455 653 608.317 653H741.45c11.778 0 17.667-10.2 11.778-20.4L686.66 517.305c-6.93-12.005-6.93-22.605 0-34.61L753.227 367.4c5.889-10.2 0-20.4-11.778-20.4H608.317c-13.862 0-23.042-5.3-29.972-17.304L511.779 214.4c-5.89-10.2-17.667-10.2-23.556 0l-66.566 115.296C414.727 341.7 405.547 347 391.685 347z"
                    filter="url(#StoneDropShadow)"
                ></path>

                <g id="GroundWhite" >
                    {white()}
                </g>
                <g id="GroupPurple">
                    {purple()}
                </g>
                <g id="GroupRed">
                    {red()}
                </g>
                <g id="GroupOrange">
                    {orange()}
                </g>
                <g id="GroupYellow">
                    {yellow()}
                </g>
                <g id="GroupGreen">
                    {green()}
                </g>
                <g id="GroupBlue">
                    {blue()}
                </g>

            </svg>
        </div>
    )
}

export default Board