import React from 'react';
import icon from "../assets/icons/icon.png";
import "../styles/AppButtons.css";

function AppButtons(props) {
    return(
        <div className="appButtons">
            <ul>
                {props.listOfApps.map((item, index) => 
                    <li id={item.app} onClick={props.handleClick(item)} key={index}>
                        <a href="#">
                            <img src={icon} alt="Click to Open/Close app"/>
                            {item.title}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default AppButtons;