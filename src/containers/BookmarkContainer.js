import React, { Component } from 'react';
import BookmarkList from '../Components/BookmarkList'; 
import "../styles/Bookmark.css";
// import {bookmarkLists} from "./bookObj"; //for test purpose
import { Scrollbars } from 'react-custom-scrollbars';
// const bookmarkLists = []; //for test purpose

class BookmarkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkFetched: false,
      bookmarks: null
    }

    this.fetchBookmark = this.fetchBookmark.bind(this);
  }

  /*eslint-disable no-undef*/
  fetchBookmark() {
    if (typeof chrome === "undefined" || chrome.bookmarks === undefined) {
      //set bookmark to false if it runs outside of chrome platform
      this.setState({
        bookmarks: false
      })
    } else {
      //Fetch the bookmark tree if it's running in chrome (As an extension)
      chrome.bookmarks.getTree(result => {
        this.setState({
          bookmarkFetched: true,
          bookmarks: result
        }, () => this.foldersToTop())
      });
    }
  }
  /*eslint-enable no-undef*/

  //Brings the folder on top of the list
  foldersToTop() {
    const elements = document.querySelectorAll("div ul li");
    elements.forEach(item => {
      item.parentElement.insertBefore(item, null);
    });
  }

  //Get the bookmarks ready before the component mounts
  componentWillMount() {
    this.fetchBookmark();
  }

  //Detects when a folder is opened (for styling only)
  folderHandler(event) {
    event.target.classList.toggle("closed");
  }

  render() {
    return(
      <div>
        <Scrollbars style={{width: 450, height: 400}}>
          <BookmarkList isFetched={this.state.bookmarkFetched} bookmarks={this.state.bookmarks} folderHandler={this.folderHandler}/>
          {/* <BookmarkList folderHandler={this.folderHandler}/> -- For testing locally*/}
        </Scrollbars>
      </div>
    )
  }
}

export default BookmarkContainer;