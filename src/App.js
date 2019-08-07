import React, { Component } from 'react';
import './styles/main.scss';
import Sidebar from './components/Sidebar.js';
import MainBody from './components/MainBody.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleUp,faAngleDown,faCheck);

class App extends Component {
  state = {
    sortType: "top",
    activeSub : "AskReddit",
    activeSubURL: "https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1",
    darkMode: false,
    openSidebar: true
  };

  //Function to handle sub change from Sidebar.
  changeActiveSub = (name) => {
    this.setState(prevState => {
      return {
        activeSub: name,
        activeSubURL: "https://www.reddit.com/r/" + name + "/"+this.state.sortType+".json?limit=10&raw_json=1"
      }
    });
    this.openSideBar();
  };

  

  getSortType = (sortType) => {
    this.setState(prevState => {
      return {
        sortType: sortType,
        activeSubURL: "https://www.reddit.com/r/" + this.state.activeSub + "/"+this.state.sortType+".json?limit=10&raw_json=1"
      }
    })
  };

  getDarkMode = () => {
    this.setState(prevState => {
      return {
        darkMode: !prevState.darkMode
      }
    });
    this.setCookie('darkMode', this.state.darkMode);
  };


  // setCookie = (name, value) => {
  //   let cookie = [
  //     name,
  //     '=',
  //     JSON.stringify(value)
  //   ].join('');
  //   document.cookie = cookie;
  // };

  // readCookie = (name) => {
  //   let nameEQ = name + "=";
  //   let ca = document.cookie.split(';');
  //   for(let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) === 0) {
  //       return JSON.parse(
  //           c.substring(nameEQ.length, c.length)
  //       );
  //     }
  //   }
  //   return null;
  // };

  render() {
    return (
      <div className={'App theme-wrapper theme-dark'}>
        <Sidebar/>
        <MainBody
            activeSub={this.state.activeSub}
            activeSubURL={this.state.activeSubURL}
            getIsActiveSubStarred={this.activeSubStarredStatus}
            getSubCount={this.getSubCount}
            sortType={this.state.sortType}
            getSortType={this.getSortType}
            getDarkMode={this.getDarkMode}
            openSideBar={this.openSideBar}
            toggleStar={this.toggleStar}
        />
      </div>
    );
  }
}

export default App;
