import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';

function TripList() {
  const [trips, setTrips] = useState([]);
// Fetch Data with useEffect
  useEffect(() => {
    fetch('/trips')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTrips(data))
      .catch(error => console.error('Error fetching trips:', error));
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="trip-list">
      <h1>All Trips</h1>
      {trips.map(trip => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}

export default TripList;