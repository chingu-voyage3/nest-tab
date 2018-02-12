import React from 'react';
import '../styles/FilterSwitches.css';

function FilterSwitches(props) {
    return(
        <div className="shelfSwitcher">
            <div className="switches">
                <a href="#" name="undone" onClick={props.filterList} className="active">Pending</a>
                <a href="#" name="done" onClick={props.filterList}>Done</a>
                <a href="#" name="all" onClick={props.filterList}>All</a>
            </div>
        </div>
    );
}

export default FilterSwitches;