import React from 'react';
import "../styles/AppViewer.css";

function AppViewer(props) {
    return(
        <div className={props.shouldView ? "appContainer active" : "appContainer"}>
            {props.shouldView && props.component}
        </div>
    );
}

export default AppViewer;