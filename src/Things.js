import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, users, deleteThing, increment, updateThing })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            const user = users.find(user => user.id === thing.userId) || {};

            return (
              <li key={ thing.id }>
                { thing.name } ({ thing.ranking })
                owned by { user.name || 'nobody' }
                <div>
                  <select defaultValue={ thing.userId } onChange={ ev => updateThing(thing, ev.target.value )}>
                    <option value=''>-- nobody --</option>
                    {
                      users.map( user => {
                        return (
                          <option key={ user.id } value={ user.id }>{ user.name }</option>
                        );
                      })
                    }
                  </select>
                </div>
                <button onClick={ ()=> deleteThing(thing)}>x</button>
                <button onClick={()=> increment(thing, -1)}>-</button>
                <button onClick={()=> increment(thing, 1)}>+</button>
                
              </li>
            );
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};

export default connect(
  (state)=> {
    return {
      things: state.things,
      users: state.users
    }
  },
  (dispatch)=> {
    return {
      updateThing: async(thing, userId)=> {
        thing = {...thing, userId: userId * 1 };
        thing = (await axios.put(`/api/things/${thing.id}`, thing)).data;
        console.log(thing);
        dispatch({ type: 'UPDATE_THING', thing });
      },
      increment: async(thing, dir)=> {
        thing = {...thing, ranking: thing.ranking + dir};
        thing = (await axios.put(`/api/things/${thing.id}`, thing)).data;
        dispatch({ type: 'UPDATE_THING', thing });
      },
      deleteThing: async(thing)=> {
        await axios.delete(`/api/things/${thing.id}`);
        dispatch({ type: 'DELETE_THING', thing });
      }
    };

  }
)(Things);
