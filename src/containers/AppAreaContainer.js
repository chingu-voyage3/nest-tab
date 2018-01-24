import React, { Component } from "react";

import Bookmark from "../Components/Bookmark";
import TodoApp from "../Components/To-Do";
import Pomodoro from "../Components/Pomodoro";
import Shelf from "../Components/Shelf";
import AppButtons from "../Components/AppButtons";
import AppViewer from "./AppViewer";


const listOfApps = [
    {
        app: "todo",
        title: "ToDo",
        component: <TodoApp/>
    },
    {
        app: "pomodoro",
        title: "Pomodoro",
        component: <Pomodoro/>
    },
    {
        app: "shelf",
        title: "Shelf",
        component: <Shelf/>
    },
    {
        app: "bookmark",
        title: "Bookmark",
        component: <Bookmark/>
    }
];

class AppAreaContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appInView: false,
            currentApp: ""
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = param => event => {

        

        this.setState({
            appInView: this.state.currentApp === param.component ? !this.state.appInView : true,
            currentApp: param.component
        })
    }

    render() {
        return(
            <div className="appArea">
                <AppViewer component={this.state.currentApp} shouldView={this.state.appInView} />
                <AppButtons listOfApps={listOfApps} handleClick={this.handleClick}/>
            </div>
        );
    }
}

export default AppAreaContainer;