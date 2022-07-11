import React, { Component } from 'react';
//import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Nav from './Nav';
import Users from './Users';
import Things from './Things';
import Home from './Home';
import store, { loadData, setView } from './store';
import { Provider, connect } from 'react-redux';

const root = createRoot(document.querySelector('#app'));

class _App extends Component{
  async componentDidMount(){
    window.addEventListener('hashchange', ()=> {
      this.props.setView(window.location.hash.slice(1));
    });
    try {
      this.props.loadData();
    }
    catch(ex){
      console.log(ex);
    }
  }
  render(){
    const { view } = this.props;
    return (
      <div>
        <Nav />
        {
          view === '' ? <Home /> : null

        }
        {
          view === 'users' ? <Users /> : null

        }
        {
          view === 'things' ? <Things /> : null

        }
      </div>
    );
  }
}


const mapDispatch = (dispatch)=> {
  return {
    setView: (view) => setView(dispatch, view),
    loadData: () => loadData(dispatch)
  };
};
const mapStateToProps = state => {
  return {
    view: state.view
  };
};

const App = connect(mapStateToProps, mapDispatch)(_App);


root.render(<Provider store={ store }><App /></Provider>);
/*
const root = document.querySelector('#app');
render(React.createElement('hr'), root);
*/
