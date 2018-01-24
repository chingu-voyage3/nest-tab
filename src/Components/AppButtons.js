import React, { Component} from 'react';
import icon from "../assets/icons/icon.png";
import "../styles/AppButtons.css";

function AppButtons(props) {
    return(
        <div className="appButtons">
            <ul>
                {props.listOfApps.map(item => 
                    <li id={item.app} onClick={props.handleClick(item)}>
                        <img src={icon} alt="Click to Open/Close app"/>
                        <p>{item.title}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default AppButtons;