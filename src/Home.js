import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, things, topRanked })=> {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Here at the Acme Item Tracker Corp we have { users.length } users and { things.length } things!
      </p>
      <h2>Top Ranked</h2>
      <ul>
        {
          topRanked.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapSToP = (s)=> {
  const topRank = Math.max(...s.things.map(thing => thing.ranking));
  const topRanked = s.things.filter(thing => thing.ranking === topRank);
  return {
    users: s.users,
    things: s.things,
    topRanked
  };
};

export default connect(mapSToP)(Home);
