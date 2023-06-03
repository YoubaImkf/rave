# Project Rave🎙️
I've put a lot of effort into this project so that it has a remarkable code structure and an architecture worthy of the name.

The aim of this project is to develop a stamp transfer application in React-Native using [expo](https://docs.expo.dev/) and [jsdoc](https://jsdoc.app/index.html) for commenting structure. 
Stamp transfer will be performed by a neural network, the RAVE model developed by Antoine Caillon at ircam. 

You can find a demonstration very similar to this application at https://caillonantoine.github.io/ravejs/.

## 🎉 Getting started 
![]()

### The prerequisites

You must have node with npm installed.

### 👼 Creating the project 

1. Copy the project with git clone:

```sh
# clone most recent project
git clone https://github.com/YoubaImkf/rave.git
# enter project folder
cd project ./rave
```


### ⚙️ Setup environment 


1. Install the node packages:

```sh
npm install
```

### ▶️ Running the app 


Start the web app with:

```sh
npx expo start  # live reloading mode
```
___


## Possible [structure :](https://www.obytes.com/blog/how-to-structure-your-react-native-project)


my-app/
├── src/                  (Application source code)
│   ├── components/       (Reusable components)
│   │   ├── Home.js       (Component for the Home view)
│   │   ├── Record.js     (Component for the Record view)
│   │   ├── Rave.js       (Component for the Rave view)
│   ├── screens/          (Top-level screens for each view - UI)
│   │   ├── HomeScreen.js (Container for the Home view)
│   │   ├── RecordScreen.js (Container for the Record view)
│   │   ├── RaveScreen.js (Container for the Rave view)
│   ├── navigation/       (Navigation configurations)
│   │   ├── AppNavigator.js (Main navigation stack)
│   ├── services/         (API or server communication services)
│   │   ├── ServerService.js (Service for server communication)
│   ├── utils/            (Utility functions or helper files)
├── App.js                (Entry point of the application)
├── package.json          (Dependency configurations)
├── .gitignore            (Git ignore file)
