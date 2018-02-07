import React, { Component } from 'react';

function BookmarkList(props) {
  return(
    <div className="bookmark">
      <h3 className="title">Bookmark</h3>
      <div className="bookmarkList">
        {props.isFetched ? mapTree(props.bookmarks[0].children, props.folderHandler) : <h3>Fetching bookmarks...</h3>}
        {/* {mapTree(bookmarkLists[0].children, props.folderHandler)} */}
      </div>
    </div>
  )
}

const mapTree = (arr, handler) => arr.map((item, index) => {
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
     return <li key={index}><a href={item.url} target="_blank">{item.title}</a></li>
  }
})


export default BookmarkList;