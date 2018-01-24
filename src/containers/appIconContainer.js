import React, { Component } from "react";

import Bookmark from "../Components/Bookmark";
import TodoApp from "../Components/To-Do";
import Pomodoro from "../Components/Pomodoro";
import Shelf from "../Components/Shelf";
import AppButtons from "../Components/AppButtons";


const listOfApps = [
    {
        app: "todo",
        title: "ToDo"
    },
    {
        app: "pomodoro",
        title: "Pomodoro"
    },
    {
        app: "shelf",
        title: "Shelf"
    },
    {
        app: "bookmark",
        title: "Bookmark"
    }
];

class AppIconContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appInView: false,
            app: ""
        }
    }

    render() {
        return(
            <AppButtons listOfApps={listOfApps} />
        );
    }
}

export default AppIconContainer;