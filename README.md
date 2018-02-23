![Image alt text](https://i.imgur.com/JVWC1el.png "Main Screen")

## Table of Content
* [Introduction](https://github.com/faahim/nest-tab#introduction)
* [Download](https://github.com/faahim/nest-tab#download)
* [Features](https://github.com/faahim/nest-tab#features)
* [Tech Stack](https://github.com/faahim/nest-tab#tech-stack)
* [Development](https://github.com/faahim/nest-tab#development)
* [Versions](https://github.com/faahim/nest-tab#versions)
* [Courtesy](https://github.com/faahim/nest-tab#courtesy)

Introduction
------------------------

**Nest Tab** is a simple Google Chrome extension that replaces your New Tab page with a clean looking page that contains tools to help you be productive. Simplicity and usefulness is the main focus of Nest Tab. It currently features a _Todo_ list and a _Pomodoro_ clock that works together, a _Shelf_ to dump urls that you want to take a look at later, and a _Bookmark_ quick acess tool. More features are to be added soon. This project was built as part of the [Chingu Build to Learn](https://medium.com/chingu/voyage-build-to-learn-handbook-4d4fc9370429) program.

Download
-------------------

The packaged extension file can be downloaded [here](https://github.com/faahim/nest-tab/raw/master/package/nest-tab.crx). Also, An in-browser demo is available [here](https://faahim.github.io/nest-tab/demo/).
I'm planning to submit it in Chrome Web Store as well.

Features
------------------

Some of the main features of **Nest Tab**:
+ A Todo app that let's you add details for items, mark them as done/not-done etc
+ A Pomodoro app that works in sync with Todo app to let you track your time working on specific tasks from Todo list. You can see how much time you've worked on task from task details in Todo app.
+ A Shelf where you can leave url for visiting at a later time. Shelf attemps to collect metadata of your url to keep things organised.
+ A Bookmark browser that lets you browse all your saved bookmark in quick and easy way and also open them in a new tab.
+ Detects and shows weather information for your current location.
+ Google search from the home screen.
+ Fetches specially curated wallpapers from the internet. It updates the wallpaper every hour if you leave the tab open. Alternatively, You can update it anytime using the _Change Wallpaper_ button on the top left corner.

More features are in plan to be implemented. If you have any feature idea, please create an issue here.

### Screenshots

![Image alt text](https://i.imgur.com/Bsk2TcB.png "Todo App")
![Image alt text](https://i.imgur.com/PeW3CKq.png "Pomodoro App")
![Image alt text](https://i.imgur.com/Sse0qwU.png "Shelf App")
![Image alt text](https://i.imgur.com/unXGN4k.png "Bookmark App")


Tech Stack
-----------------

I've used below technology to create Nest Tab:
+ HTML5
+ CSS3
+ SASS
+ React (with [create-react-app](https://github.com/facebook/create-react-app) boilerplate )
+ [Unsplash API](https://source.unsplash.com/) for images
+ [DarkSkies API](https://darksky.net/dev) for weather data
+ [Chrome API](https://developer.chrome.com/extensions/api_index)
+ [Google Material Icons](https://material.io/icons/)


Development
----------------

If you want to contribute or just want to run the project locally, Follow these steps:
+ Clone this repo
+ Inside the project directory, run `npm install`
+ Once all the packages are installed, run `npm start`
+ The previous command will start the local dev server and will open the project in browser tab automatically. If it doesn't manually open `http://localhost:3000/` (Please note that features which rely on data from Chrome API will show an error since the API can not be used from `localhost`. You need to build the project and run it inside chrome as an extension (see below) to use those feature).
+ You're ready to go! Your change in codes will be reflected in browser automatically.

### Deployment to Chrome
If you want to run the project inside chrome as an extension, follow these steps:
+ While in project folder, run `npm run build` to create a build of the project
+ Open Chrome and enter `chrome://extensions` in url box
+ Check the _Developer Mode_ box
+ Click the _Open unpacked extension..._ button and select the `build` folder which created inside of the project folder.
+ Open a new tab and start testing.


Versions
------------------
+ Version 0.0.1: Initial Release


Courtesy
------------------
I'd specially like to thank [Eddy Willson](https://github.com/eddyw), [Bartek Lewandowski](https://github.com/Jabarlew) and the entire Chingu Voyage community for their help and support. They were by my side everytime I was on verge of giving up. This project wouldn't come to light without them. So, Thank you! :)