import React, { Component } from 'react';
import BookmarkList from '../Components/BookmarkList'; 
import "../styles/Bookmark.css";
// import {bookmarkLists} from "./bookObj";
import { Scrollbars } from 'react-custom-scrollbars';
// const bookmarkLists = [];

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
    if (chrome === undefined) {
      this.setState({
        bookmarks: false
      })
    } else {
      chrome.bookmarks.getTree(result => {
        this.setState({
          bookmarkFetched: true,
          bookmarks: result
        }, () => this.foldersToTop())
      });
    }
  }
  /*eslint-enable no-undef*/

  foldersToTop() {
    const elements = document.querySelectorAll("div ul li");
    elements.forEach(item => {
      item.parentElement.insertBefore(item, null);
    });
  }

  componentWillMount() {
    this.fetchBookmark();
  }

  folderHandler(event) {
    event.target.classList.toggle("closed");
  }

  render() {
    return(
      <div>
        <Scrollbars style={{width: 450, height: 400}}>
          <BookmarkList isFetched={this.state.bookmarkFetched} bookmarks={this.state.bookmarks} folderHandler={this.folderHandler}/>
          {/* <BookmarkList folderHandler={this.folderHandler}/> */}
        </Scrollbars>
      </div>
    )
  }
}

export default BookmarkContainer;