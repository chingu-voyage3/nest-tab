import React, { Component } from 'react';

class TaskDetails extends Component {
  render() {
    return(
      <div className="taskDetails">
        <textarea onChange={this.props.handleDescription(this.props.todoItem.id)} placeholder="Write some details..."
        value={this.props.todoItem.description} id={"taskDetails" + this.props.todoItem.id}>
        </textarea>
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    return(
      <ul>
        {this.props.todoList.map((item) => 
        <div className="itemContainer">
          <li key={item.id} id={item.id}>
            <span onClick={this.props.markDone(item.id)} className={"status " + (item.isDone ? "done" : "")}>
              <i onClick={this.props.markDone(item.id)} className="material-icons">check_circle</i>
            </span>
              {item.title}
            <span className="expandTask" onClick={this.props.expandTask(item.id)}>
              <i onClick={this.props.expandTask} class="material-icons">expand_more</i>
            </span> 
            <span className="remove">
              <i onClick={this.props.removeTask(item.id)} class="material-icons">delete</i>
            </span>
          </li>
          <TaskDetails todoItem={item} handleDescription={this.props.handleDescription}/>
        </div>)}
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
    this.expandTask = this.expandTask.bind(this);
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
      isDone: false,
      description: '',
      workTime: false
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

  markDone = param => event => {
    const newList = this.state.todoList.map( item => {
      if (item.id == param) {
        return Object.assign({}, item, {isDone: !item.isDone});
      }
      return item;
    });

    this.setState({
      todoList: newList
    }, () => console.log(this.state.todoList));
  }

  removeTask = param => event => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter(
        item => item.id != param
      )
    });
  }

  expandTask = param => event => {
    const ele = "taskDetails" + param;
    document.getElementById(ele).classList.toggle("expanded");
  }

  handleDescription = param => event => {
    const {todoList} = this.state;
    this.setState({
      todoList: todoList.map(
        item => (
          item.id == param ? Object.assign({}, item, {description: event.target.value})
        : item ) 
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
        removeTask={this.removeTask} expandTask={this.expandTask}
        handleDescription={this.handleDescription}/>
      </div>
    );
  }
}

export default TodoApp;