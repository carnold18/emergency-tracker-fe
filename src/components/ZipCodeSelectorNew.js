import React, { Component } from 'react';
import Checkbox from './Checkbox';
import '../App.css';

export default class ZipCodeSelectorNew extends Component {

  constructor(props) {
      super(props);
      this.state = {
          checkedItems: new Map(),
          checkedArray: [],
          color: ""
      }
      this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));

    this.props.handleChecks(e);

    this.handleClick(e);

  }

  handleClick = (event) => {   

    event.target.checked ?
    document.getElementById('normal'+event.target.name).style.backgroundColor+="rgb(120,120,120,.4)" 
    : document.getElementById('normal'+event.target.name).style.backgroundColor="" 

  }

  render() {
    // console.log(this.state.checkedItems)
    return (
        <div id="checkbox-list">
          {
            this.props.zipCodes.map(item => (
              <label id={'normal'+item.name} className="checkbox-item" key={item.key} onKeyDown={this.handleClick} style={{backgroundColor: this.state.color}} >
                {item.name}
                <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
              </label>
            ))
          }
        </div>
    );
  }
}



// previous version of my component constructor

// constructor() {
  //   super();
    
  //   this.state = {
  //     // showMenu: false,
  //     selectedValue: undefined,
  //     radioOptions: this.props.zipCodes
  //   }

  //   // this.showMenu = this.showMenu.bind(this);
  //   // this.closeMenu = this.closeMenu.bind(this);
  // }
