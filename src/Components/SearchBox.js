import React from 'react';

function SearchBox() {
    return(
        <form action="https://google.com/search" method="get">
            <input type="text" name="q" placeholder="Search the Web..." autoComplete="off"/>
        </form>
    );
}

export default SearchBox;