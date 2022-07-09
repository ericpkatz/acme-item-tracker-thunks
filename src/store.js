import { createStore } from 'redux';

const initialState = {
  view: window.location.hash.slice(1),
  users: [],
  things: []
};

const store = createStore((state = initialState, action)=> { 
  if(action.type === 'DELETE_THING'){
    return {
      ...state, 
      things: state.things.filter(thing => thing.id !== action.thing.id )
    };
  }
  if(action.type === 'UPDATE_THING'){
    return {
      ...state, 
      things: state.things.map(thing => thing.id !== action.thing.id ? thing : action.thing)
    };
  }
  if(action.type === 'DELETE_USER'){
    return {
      ...state, 
      users: state.users.filter(user => user.id !== action.user.id )
    };
  }
  if(action.type === 'SET_THINGS'){
    return {...state, things: action.things };
  }
  if(action.type === 'SET_USERS'){
    return {...state, users: action.users }; 
  }
  if(action.type === 'SET_VIEW'){
    return {...state, view: action.view }; 
  }
  if(action.type === 'CREATE_THING'){
    return {...state, things: [...state.things, action.thing ]}; 
  }
  if(action.type === 'CREATE_USER'){
    return {...state, users: [...state.users, action.user ]}; 
  }
  return state;
});

export default store;

