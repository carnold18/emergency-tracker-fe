import React, { Component } from 'react';
import '../App.css';

class Dropdown extends Component {
    constructor() {
        super();

        this.state = {
            displayMenu: false,
        }

        this.showDropdownMenu = this.showDropdownMenu.bind(this)
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this)

    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu)
        })
    }

    hideDropdownMenu(event) {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu)
        })
    }

    render() {
        return (
            <div className='dropdown' style={{padding:"2em"}}>
                <div className="dropdown-button" onClick={this.showDropdownMenu}>Change Your Status</div>
                {this.state.displayMenu ? (
                    <ul className="plain" style={{positionL:15}}>
                        <li className="low" onClick={this.props.changeStatus0} style={{margin:"20"}}>Low</li>
                        <li className="medium" onClick={this.props.changeStatus1}>Medium</li>
                        <li className="high" onClick={this.props.changeStatus2}>High</li>
                    </ul>
                    ) : null
                }
            </div>
        );
    }
}

export default Dropdown;