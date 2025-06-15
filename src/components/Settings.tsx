interface SettingsProps {
    workTime: number;
    setWorkTime: (seconds: number) => void;
    breakTime: number;
    setBreakTime: (seconds: number) => void;
}





function Settings(props:SettingsProps){
    return(
        <div className="setting-container">
            <h1>Configurações</h1>

            <div className="work-time-container">
                <label htmlFor="idpomodoro">Pomodoro </label>
                <input type="number" min = "1"  max = "1440" value = {props.workTime/60} 
                onChange={(e)=> props.setWorkTime(parseInt(e.target.value, 10)*60)} 
                name="pomodo" id="idpomodoro" />
            </div>

            <div className="break-time-container">
                <label htmlFor="ibreaktime">Break </label>
                <input type="number" min = "1" max = "1440"value = {props.breakTime/60} 
                onChange={(e)=> props.setBreakTime(parseInt(e.target.value, 10)*60)} 
                name="break" id="ibreaktime" />
            </div>

            
        </div>
    )
    
}

export default Settings; 