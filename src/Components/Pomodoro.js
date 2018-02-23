import React from 'react';

//Start Button Component for Pomodoro timer
export function StartButton(props) {
    return (<button className="startButton" onClick={props.isRunning ? props.pause : props.start}>
    {props.isRunning ? "Pause" : "Start"}
    </button>);
}

//Stop Button Component for Pomodoro timer
export function StopButton(props) {
    return (<button className={props.isRunning ? "stopButton" : "stopButton hidden"} onClick={props.onClick}>Stop</button>);
}

//Taskpicker dropdown for Pomodoro, lists all undone tasks from todo
export function TaskPicker(props) {
    const undoneTodos = props.todoList.filter( item => !item.isDone);
    return(
        <div className="taskPicker">
            <p>Pick a task to work on:</p> 
            {undoneTodos.length ? 
            <select value={props.chosenTask} onChange={props.assignTask}>
                {undoneTodos.map((item, index) => 
                <option value={item.title} id={item.id} key={index}>
                    {item.title}
                </option>)}
            </select>
            : <p>No undone tasks, Woo hoo! Create some new ones!</p>}
        </div>
    );
}

//Renders name of the task currently being worked on
export function WorkingOn(props) {
    return(
        <p>Working on: <span className="working">{props.task}</span></p>
    )
}
