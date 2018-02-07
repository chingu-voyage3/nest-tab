import React, { Component } from 'react';

//Start Button Component
function StartButton(props) {
    return (<button className="startButton" onClick={props.isRunning ? props.pause : props.start}>
    {props.isRunning ? "Pause" : "Start"}
    </button>);
}

function StopButton(props) {
    return (<button className={props.isRunning ? "stopButton" : "stopButton hidden"} onClick={props.onClick}>Stop</button>);
}

function TaskPicker(props) {
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

function WorkingOn(props) {
    return(
        <p>Working on: <span className="working">{props.task}</span></p>
    )
}

class CountdownTimer extends Component {
    constructor(props) {
        super(props);

        const todos = JSON.parse(localStorage['todos']);
        const undoneTodos = todos.filter( item => !item.isDone);

        this.state = {
            pomoMinutes: 25,
            pomoSeconds: 0,
            isRunning: false,
            todoList: todos,
            chosenTask: undoneTodos[0] ? undoneTodos[0].title : "No items!"
        };

        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.assignTask = this.assignTask.bind(this);
    }

    assignTask(event) {
        this.setState({
            chosenTask: event.target.value
        });
    }

    tick() {
        if (this.state.pomoSeconds != 0) {
            this.setState({
                pomoSeconds: this.state.pomoSeconds - 1
            });
        } else {
            this.setState({
                pomoMinutes: this.state.pomoMinutes - 1,
                pomoSeconds: 59,
                todoList: (this.state.todoList.map(item => (
                    item.title == this.state.chosenTask 
                    ? Object.assign({}, item, {workTime: item.workTime+1}) : item
                )))
            }, () => {
                localStorage.setItem('todos', JSON.stringify(this.state.todoList));
            })
        }

        if (this.state.pomoMinutes == 0 && this.state.pomoSeconds == 0) {
            clearInterval(this.intervalID);
            this.setState({
                pomoMinutes: 25,
                pomoSeconds: 0,
                isRunning: false
            }, () => document.getElementById("progressBox").classList.remove("flip"));
        }

        const progress = 100 - ((((this.state.pomoMinutes * 60) + this.state.pomoSeconds) / 1500) * 100);
        let progressDegree = Math.trunc(360*progress/100);
        document.getElementById("progressBar").style.transform = "rotate("+progressDegree+"deg)";
        console.log(document.getElementById("progressBar"));

        if (Math.trunc(progress) == 50) {
            document.getElementById("progressBox").classList.add("flip");            
        }
    }

    startTimer() {
        this.setState({
            isRunning: true
        }, () => this.intervalID = setInterval(() => this.tick(), 1000));
    }

    pauseTimer() {
        clearInterval(this.intervalID);
        this.setState({
            isRunning: false
        });
    }

    stopTimer() {
        clearInterval(this.intervalID);
        this.setState({
            pomoMinutes: 25,
            pomoSeconds: 0,
            isRunning: false
        }, () => {
            document.getElementById("progressBar").style.transform = "rotate(0deg)";
            document.getElementById("progressBox").classList.remove("flip");
        })
    }

    render() {

        return (
            <div className="pomodoro">
                <h3 className="title">Pomodoro Timer</h3>
                {this.state.isRunning
                    ? <WorkingOn task={this.state.chosenTask} />
                    : <TaskPicker todoList={this.state.todoList} assignTask={this.assignTask}
                    chosenTask={this.state.chosenTask}/>
                }
                <div className="timeBox" id="progressBox">
                    <div className="outer">
                        <div className="inner" id="progressBar"></div>
                    </div>
                    <div className="innerTimeBox">
                        <p className="clockTime">{this.state.pomoMinutes}m : {this.state.pomoSeconds < 10 ? "0" : ""}
                        {this.state.pomoSeconds}s </p>
                    </div>
                </div>
                <div className={this.state.isRunning ? "timeButtons running" : "timeButtons"}>
                <StartButton start={this.startTimer} pause={this.pauseTimer}
                isRunning={this.state.isRunning}/>
                <StopButton onClick={this.stopTimer} isRunning={this.state.isRunning}/>
                </div>
            </div>
        );
    }
}

class Pomodoro extends Component {

    render() {
        return (
            <div>
                <CountdownTimer />
            </div>
        );
    }
}

export default Pomodoro;