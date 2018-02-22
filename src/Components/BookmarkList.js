import React from 'react';

//Renders bookmark list tree and shows error on invalid platform
function BookmarkList(props) {
  return(
    <div className="bookmark">
      <h3 className="title">Bookmark</h3>
      <div className="bookmarkList">
        {props.isFetched ? mapTree(props.bookmarks[0].children, props.folderHandler) 
          : <h3>{ props.bookmarks === false ?
            "This is a Chrome specific feature that only runs inside Chrome. Please install the extension to use this feature. :)"
            : "Fetching Bookmark..."}</h3>}
      </div>
    </div>
  )
}

//Takes care of iterating over and creating list from chrome bookmark tree object
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