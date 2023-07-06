import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'

class Header extends Component {
  render() {
    return (
      <div>
        <nav>
            <Link to='/'>
                <button className='btn-header'>INÍCIO</button>
            </Link>
            <Link to='/request'>
                <button className='btn-header'>REQUEST</button>
            </Link>
            <Link to='/cats'>
                <button className='btn-header'>10 GATOS</button>
            </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
