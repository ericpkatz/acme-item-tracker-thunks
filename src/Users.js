import React from 'react';
import { connect } from 'react-redux';
import { deleteUser, createUser, updateThing, updateUser } from './store';

const Users = ({ users, createUser, deleteUser, things, removeThingFromUser, increment })=> {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={ createUser }>+</button>
      <ul>
        {
          users.sort((u1, u2) => u2.ranking - u1.ranking)
            .map( user => {
            return (
              <li key={ user.id }>
                { user.name } ({ user.ranking })
                <button onClick={ ()=> deleteUser(user)}>x</button>
                <button onClick={()=> increment(user, -1)}>-</button>
                <button onClick={()=> increment(user, 1)}>+</button>
                <ul>
                {
                  things.filter( thing => thing.userId === user.id)
                    .map(thing => {
                      return (
                        <li key={ thing.id }>
                          { thing.name } ({ thing.ranking })
                          <button onClick={ ()=> removeThingFromUser(thing)}>x</button>
                        </li>
                      );
                    }) 
                  
                }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: async()=> {
      dispatch(createUser());
    },
    removeThingFromUser: async(thing)=> {
      thing = {...thing, userId: null}
      dispatch(updateThing(thing));
    },
    deleteUser: async(user)=> {
      dispatch(deleteUser(user));
    },
    increment: (user, dir)=> {
      user = {...user, ranking: user.ranking + dir};
      dispatch(updateUser(user));
    },
  };
}
export default connect(mapStateToProps, mapDispatch)(Users);
