import React, { Component } from 'react';

//Start Button Component
function StartButton(props) {
    return (<button className="startButton" onClick={props.isRunning ? props.pause : props.start}>
    {props.isRunning ? "Pause" : "Start"}
    </button>);
}

function StopButton(props) {
    return (<button className="stopButton" onClick={props.onClick}>Stop</button>);
}

function TaskPicker(props) {
    return(
        <select>
          {props.todoList.map((item) => 
          <option value={item.title} id={item.id}>
              {item.title}
          </option>)}
        </select>
    );
}

class CountdownTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pomoMinutes: 25,
            pomoSeconds: 0,
            isRunning: false,
            todoList: JSON.parse(localStorage['todos'])
        };

        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    tick() {
        if (this.state.pomoSeconds != 0) {
            this.setState({
                pomoSeconds: this.state.pomoSeconds - 1
            });
        } else {
            this.setState({
                pomoMinutes: this.state.pomoMinutes - 1,
                pomoSeconds: 59
            })
        }

        if (this.state.pomoMinutes == 0 && this.state.pomoSeconds == 0) {
            clearInterval(this.intervalID);
        }
    }

    startTimer() {
        this.setState({
            isRunning: true
        });
        this.intervalID = setInterval(() => this.tick(), 1000);
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
        })
    }

    render() {

        return (
            <div>
                <h1>Pomodoro Timer</h1>
                <div className="taskPicker">
                    <h4>Pick a task to work on</h4>
                    <TaskPicker todoList={this.state.todoList}/>
                </div>
                <div className="timeBox">
                    <div className="innerTimeBox">
                        <h2>{this.state.pomoMinutes}m : {this.state.pomoSeconds < 10 ? "0" : ""}
                        {this.state.pomoSeconds}s </h2>
                    </div>
                </div>
                <div className="timeButtons">
                <StartButton start={this.startTimer} pause={this.pauseTimer}
                isRunning={this.state.isRunning}/>
                <StopButton onClick={this.stopTimer}/>
                </div>
            </div>
        );
    }
}

class Pomodoro extends Component {

    render() {
        return (
            <div className="pomodoro">
                <CountdownTimer />
            </div>
        );
    }
}

export default Pomodoro;