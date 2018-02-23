import React, { Component } from 'react';
import { formatTime } from "../utils/formatTime";
import "../styles/CurrentTime.css";

//Constracts and updates the time
class CurrentTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: formatTime()
        }
    }

    tick() {
        this.setState({
            time: formatTime()
        });

        const seconds = new Date().getSeconds();
        const minute = new Date().getMinutes();
        if (minute === 0 && seconds === 0) {
            this.props.changeBg()
        }
    }

    componentDidMount() {
        this.tickTick = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.tickTick);
    }

    render() {
        return(
            <div className="time"><p>{this.state.time}</p></div>
        );
    }
}

export default CurrentTime;