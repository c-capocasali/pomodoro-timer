import {useEffect, useState} from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import SettingButton from "./SettingButton";
import SkipButton from "./SkipButton";
import Settings from "./Settings";
import type React from 'react';

function Timer(): React.ReactElement{
    const [isStarted, setIsStarted] = useState(false); 
    const [workTime, setWorkTime] = useState(30 * 60); 
    const [breakTime, setBreakTime] = useState(5 * 60); 
    const [tempoDecorrido, setTempoDecorrido] = useState(0); 
    const [mode, setMode] = useState("work");
    const [showSettings, setShowSettings] = useState(false); 

    const handleWorkTimeChange = (newWorkTimeInSeconds: number) => {
        if (newWorkTimeInSeconds > 0) {
            setWorkTime(newWorkTimeInSeconds);
        }
    }

    const handleBreakTimeChange = (newBreakTimeInSeconds: number) => {
        if (newBreakTimeInSeconds > 0) {
            setBreakTime(newBreakTimeInSeconds);
        }
    }

    useEffect(() => {
        if (!isStarted) {
            return;
        }
        const interval = setInterval(() => {
            setTempoDecorrido(prevSeconds => prevSeconds + 1);
        }, 1000);
        return () => clearInterval(interval); 
    }, [isStarted]); 

    const totalTimeForMode = mode === 'work' ? workTime : breakTime;
    const secondsLeft = totalTimeForMode - tempoDecorrido;

    useEffect(() => {
        if (secondsLeft <= 0) {
            if (mode === "work") {
                setMode("break");
            } else {
                setMode("work");
            }
            setIsStarted(false); 
            setTempoDecorrido(0); 
        }
    }, [secondsLeft, mode]); 


    //Calculando o tempo 
    const percentage = Math.round((secondsLeft / totalTimeForMode) * 100);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const pathColor = mode === "work" ? "#ff6347" : "#00ffff"; 

    const handleToggle = () => {
        setIsStarted(!isStarted); 
    }

    const handleSkip = () => {
        setTempoDecorrido(totalTimeForMode - 1);
    }

    return(
        <>
        <div className = 'progress-bar'>
            {!showSettings && 
                <CircularProgressbar 
                    value={percentage} 
                    text={`${displayTime}`} 
                    styles = {buildStyles({
                        pathColor: pathColor,
                        textColor: "white", 
                        textSize: "16px"
                    })}
                />
            }
        </div>

        <div>
            {showSettings &&
                <Settings
                    workTime={workTime}
                    setWorkTime={handleWorkTimeChange}
                    breakTime={breakTime}
                    setBreakTime={handleBreakTimeChange}
                />
            }
        </div>

        <div>
            {(isStarted && !showSettings) && <StopButton onClick={handleToggle}/>} 
            {(!isStarted && !showSettings) && <PlayButton onClick={handleToggle}/>}
            {(isStarted && !showSettings) && <SkipButton onClick={handleSkip}/> }
        </div>

        <div>
            <SettingButton onClick = {() => setShowSettings(!showSettings)}/>
        </div>
        </>
    )
}

export default Timer;