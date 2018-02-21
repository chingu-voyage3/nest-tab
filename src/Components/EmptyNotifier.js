import React from 'react';
import '../styles/EmptyNotifier.css';

function EmptyNotifier(props) {
    return(
        <div className="empty">
            <h3>Whhow! Such emptiness! <i className="material-icons">sentiment_very_dissatisfied</i></h3>
            <p>Click the <i className="material-icons">add</i> button to add a new item.</p>
        </div>
    )
}

export default EmptyNotifier;