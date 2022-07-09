import React from 'react';
import { connect } from 'react-redux';




const Nav = ({ users, things, view })=> {
  return (
    <nav>
      <a href='#' className={ view === '' ? 'selected': ''}>Home</a>
      <a href='#things' className={ view === 'things' ? 'selected': ''}>Things ({ things.length })</a>
      <a href='#users' className={ view === 'users' ? 'selected': ''}>Users ({ users.length })</a>
    </nav>
  );
}

const mapStateToProps = (state)=> {
  return state;
};

export default connect(mapStateToProps)(Nav);
