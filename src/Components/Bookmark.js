import React, { Component } from 'react';
import "../styles/Bookmark.css";
import {bookmarkLists} from "./bookObj";
import { Scrollbars } from 'react-custom-scrollbars';
// const bookmarkLists = [];

class BookmarkContainer extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   bookmarkFetched: false,
    //   bookmarks: null
    // }

    // this.fetchBookmark = this.fetchBookmark.bind(this);
  }

  // fetchBookmark() {
  // /*eslint-disable no-undef*/
  //   chrome.bookmarks.getTree(result => {
  //     // handleBookmarktree(result[0].children)
  //     console.log("pushing items into state...");
  //     // bookmarkLists.push(result);
  //     this.setState({
  //       bookmarkFetched: true,
  //       bookmarks: result
  //     })
  //   });
  // }
  // /*eslint-enable no-undef*/

  // componentDidMount() {
  //   this.fetchBookmark();
  // }

  folderHandler(event) {
    event.target.classList.toggle("closed");
  }

  render() {
    return(
      <div>
        {/* <Bookmark isFetched={this.state.bookmarkFetched} bookmarks={this.state.bookmarks} folderHandler={this.folderHandler}/> */}
        <Scrollbars style={{width: 450, height: 420}}>
        <Bookmark folderHandler={this.folderHandler} stopPropagation={this.stopPropagation}/>
        </Scrollbars>
      </div>
    )
  }
}

function Bookmark(props) {
  return(
    <div className="bookmark">
      <h3 className="title">Bookmark</h3>
      <div className="bookmarkList">
        {/* {console.log("In compo ",props.bookmarks)} */}
        {/* {props.isFetched ? mapTree(props.bookmarks[0].children, props.folderHandler) : <h3>Fetching bookmarks...</h3>} */}
        {mapTree(bookmarkLists[0].children, props.folderHandler)}
      </div>
    </div>
  )
}

const mapTree = (arr, handler) => arr.map(item => {
  // console.log("Current Node ", item)
  // console.log("Next Child ",item.children);
  if (item.children) {
     return <div className="folder closed" onClick={handler}>
      <span className="folder-wrap">
        <i class="material-icons">keyboard_arrow_right</i>
        <i class="material-icons">folder</i>
        <span className="handler">{item.title}</span>
      </span>
      <ul>{mapTree(item.children)}</ul>
     </div>
  } else {
     return <li><a href={item.url} target="_blank">{item.title}</a></li>
  }
})


export default BookmarkContainer;