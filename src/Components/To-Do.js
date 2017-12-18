import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    return(
      <ul>
        {this.props.todoList.map((item) => 
        <li key={item.id} id={item.id}>
          <span className={"status " + (item.isDone ? "done" : "")} onClick={this.props.markDone}>✓</span>
            {item.title}
          <span className="remove" onClick={this.props.removeTask}>✕</span>
        </li>)}
      </ul>
    );
  }
}

class TodoApp extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('todos') == null) {
      localStorage.setItem('todos', JSON.stringify([]));
    }

    this.state = {
      value: '',
      todoList: JSON.parse(localStorage['todos'])
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.markDone = this.markDone.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });  
  }

  handleSubmit(event) {
    event.preventDefault();
    const currentItem = {
      id: this.state.todoList.length + 1,
      title: this.state.value,
      isDone: false
    };

    if(this.state.value != '') {
      this.setState({
        todoList: this.state.todoList.concat(currentItem),
        value: ''
      }, () => {
        console.log(this.state.todoList);
      });
    }    
  }

  markDone(event) {
    const newList = this.state.todoList.map( item => {
      if (item.id == event.target.parentNode.id) {
        let toggleStatus = item.isDone ? false : true;
        return Object.assign({}, item, {isDone: toggleStatus});
      }
      return item;
    });

    this.setState({
      todoList: newList
    }, () => console.log(this.state.todoList));
  }

  removeTask(event) {
    const itemRemoved = (event.target.parentNode.id);
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter(
        item => item.id != itemRemoved
      )
    });
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todoList));
  }

  render() {
    return(
      <div className="todo-box">
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.value} />
          <button>Add To-Do</button>
        </form>
        <TodoList todoList={this.state.todoList} markDone={this.markDone}
        removeTask={this.removeTask}/>
      </div>
    );
  }
}

export default TodoApp;