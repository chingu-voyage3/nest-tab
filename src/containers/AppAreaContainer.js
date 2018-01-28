import React, { Component } from "react";

import Bookmark from "../Components/Bookmark";
import TodoApp from "../Components/To-Do";
import Pomodoro from "../Components/Pomodoro";
import Shelf from "../Components/Shelf";
import AppButtons from "../Components/AppButtons";
import AppViewer from "./AppViewer";
import DayInfoContainer from "./DayInfoContainer";
import SetUserName from "../Components/SetUserName";

//import app icons
import todoIcon from "../assets/icons/todo.png";
import pomodoroIcon from "../assets/icons/pomodoro.png";
import shelfIcon from "../assets/icons/shelf.png";
import bookmarkIcon from "../assets/icons/bookmark.png";

import "../styles/AppArea.css";


const listOfApps = [
    {
        app: "todo",
        title: "ToDo",
        icon: todoIcon,
        component: <TodoApp/>
    },
    {
        app: "pomodoro",
        title: "Pomodoro",
        icon: pomodoroIcon,
        component: <Pomodoro/>
    },
    {
        app: "shelf",
        title: "Shelf",
        icon: shelfIcon,
        component: <Shelf/>
    },
    {
        app: "bookmark",
        title: "Bookmark",
        icon: bookmarkIcon,
        component: <Bookmark/>
    }
];

class AppAreaContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appInView: false,
            currentApp: "",
            name: "",
            isNameSaved: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = param => event => {
        this.setState({
            appInView: this.state.currentApp === param.component ? !this.state.appInView : true,
            currentApp: param.component
        })
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('name', JSON.stringify(this.state.name));
        this.setState({
            isNameSaved: true
        })
    }

    render() {
        if (localStorage.getItem('name') == null) {
            return <SetUserName change={this.handleChange} submit={this.handleSubmit} name={this.state.name}/>
        }
        else return(
            <div className="appArea">
                <DayInfoContainer showHide={this.state.appInView ? "dayInfo poof" : "dayInfo"} />
                <AppViewer appComponent={this.state.currentApp} shouldView={this.state.appInView} dayInfo={<DayInfoContainer />} />
                <AppButtons listOfApps={listOfApps} handleClick={this.handleClick}/>
            </div>
        );
    }
}

export default AppAreaContainer;