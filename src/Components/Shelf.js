import React, { Component } from 'react';
const urlMetadata = require('url-metadata');

function ShelfInput(props) {
    return(
        <div className="shelfInput">
            <form onSubmit={props.handleSubmit}>
                <input type="text" onChange={props.handleChange}
                value={props.value} placeholder="Paste url here" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

function ShelfList(props) {
    return(
        <div className="shelfList">
            <ul>
                {props.shelfList.map((item, index) =>
                    !item.checked &&
                    <li key={index}>
                        {item.title && <a href={item.url} target="_blank">{item.title}</a>}
                        <a href={item.url} target="_blank" className="url">
                        {item.url}
                        </a>
                        <i onClick={props.markChecked(item.id)} className="material-icons">check_circle</i>
                        {item.description && <p>{item.description}</p>}
                    </li>
                )}
            </ul>
        </div>
    );
}

class Shelf extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('shelfList') == null) {
            localStorage.setItem('shelfList', JSON.stringify([]));
        }

        this.state = {
            inputUrl: "",
            shelfList: JSON.parse(localStorage['shelfList'])
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.markChecked = this.markChecked.bind(this);
        this.updateMeta = this.updateMeta.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputUrl: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const item = {
            id: this.state.shelfList.length + 1,
            checked: false,
            url: this.state.inputUrl,
            title: null,
            description: null,
            icon: null,
            checked: false
        }

        urlMetadata("https://cors-anywhere.herokuapp.com/"+this.state.inputUrl).then(
            (metadata) => {
                const itemWithMeta = Object.assign({}, item, {
                    title: metadata.title,
                    description: metadata.description,
                    icon: metadata.image
                });
                this.updateMeta(itemWithMeta);
            },
            function(error) {
                console.log(error);
            }
        );

        this.setState({
            shelfList: this.state.shelfList.concat(item),
            inputUrl: ""
        });
    }

    updateMeta(meta) {
        this.setState({
            shelfList: this.state.shelfList.map(
                item => item.id == meta.id ? meta : item
            )
        })
    }

    markChecked = param => event => {
        const { shelfList } = this.state;

        this.setState({
            shelfList: shelfList.map(
                item => item.id == param
                ? Object.assign({}, item, {checked: true}) : item
            )
        });
    }

    componentDidUpdate() {
        localStorage.setItem("shelfList", JSON.stringify(this.state.shelfList));
        // localStorage.removeItem("shelfList");
    }

    render() {
        return(
            <div className="shelf">
                <ShelfInput value={this.state.inputUrl} handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />
                <ShelfList shelfList={this.state.shelfList} markChecked={this.markChecked}/>
            </div>
        );
    }
}

export default Shelf;