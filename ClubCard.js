import React from 'react';
import { Link } from 'react-router-dom';

function ClubCard({ club }) {
  return (
    <div className="club-card">
      <h3>{club.name}</h3>
      <p>{club.description}</p>
      <Link to={`/club/${club.name}`}>
        <button>Learn More</button>
      </Link>
    </div>
  );
}

export default ClubCard;