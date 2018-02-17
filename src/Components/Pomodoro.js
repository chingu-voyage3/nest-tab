import React, { Component } from 'react';

//Start Button Component
export function StartButton(props) {
    return (<button className="startButton" onClick={props.isRunning ? props.pause : props.start}>
    {props.isRunning ? "Pause" : "Start"}
    </button>);
}

export function StopButton(props) {
    return (<button className={props.isRunning ? "stopButton" : "stopButton hidden"} onClick={props.onClick}>Stop</button>);
}

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

export function WorkingOn(props) {
    return(
        <p>Working on: <span className="working">{props.task}</span></p>
    )
}
