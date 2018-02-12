import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TitleBar from './TitleBar';
import FilterSwitches from './FilterSwitches';
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
    let list = props.shelfList;

    if (props.filter == "undone") {
        list = list.filter(item => !item.checked);
    } else if(props.filter == "done") {
        list = list.filter(item => item.checked);
    }

    return(
        <div className="shelfList">
            <ul>
                {list.map((item, index) =>
                    <li key={index}>
                        {item.title && <a href={item.url} target="_blank">{item.title}</a>}
                        <a href={item.url} target="_blank" className="url">
                        {item.url}
                        </a>
                        <i onClick={props.markChecked(item.id)} className={item.checked ? "material-icons done" : "material-icons"}>check_circle</i>
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
            shelfList: JSON.parse(localStorage['shelfList']),
            filter: "undone",
            showInput: false,
            showFilter: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.markChecked = this.markChecked.bind(this);
        this.updateMeta = this.updateMeta.bind(this);
        this.filterList = this.filterList.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.toggleInput = this.toggleInput.bind(this);
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
            url: this.state.inputUrl.startsWith("http") ? this.state.inputUrl : "http://"+this.state.inputUrl,
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

        if (this.state.inputUrl != "") {
            this.setState({
                shelfList: this.state.shelfList.concat(item),
                inputUrl: ""
            });
        }
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
                ? Object.assign({}, item, {checked: !item.checked}) : item
            )
        });
    }

    filterList(event) {
        event.preventDefault();

        //Adding/removing class for highlighting
        document.querySelector("a.active").classList.remove("active");
        event.target.classList.add("active");

        this.setState({
            filter: event.target.name
        }, () => console.log(this.state.filter))
    }

    toggleInput() {
        this.setState({
            toggleInput: !this.state.toggleInput
        })
    }

    toggleFilter() {
        this.setState({
            showFilter: !this.state.showFilter
        })
    }

    componentDidUpdate() {
        localStorage.setItem("shelfList", JSON.stringify(this.state.shelfList));
        // localStorage.removeItem("shelfList");
    }

    render() {
        return(
            <Scrollbars style={{width: 450, height: 400}}>
                <div className="shelf">
                    <TitleBar title="Shelf" toggleInput={this.toggleInput} toggleFilter ={this.toggleFilter}/>
                    {this.state.toggleInput && <ShelfInput value={this.state.inputUrl} handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />}
                    {this.state.showFilter && <FilterSwitches filterList={this.filterList}/>}
                    <ShelfList shelfList={this.state.shelfList} markChecked={this.markChecked} filter={this.state.filter}/>
                </div>
            </Scrollbars>
        );
    }
}

export default Shelf;