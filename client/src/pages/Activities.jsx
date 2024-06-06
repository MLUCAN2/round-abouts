import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
// import Map from ('../components/Map')
import {  REMOVE_ACTIVITY, QUERY_ACTIVITIES_BY_USER } from '../Utils/mutations';

const Activities = () => {
    // Get activity based on the logged in user
    const userId = AuthService.getUser()._id; 
    const { loading, data, error } = useQuery(QUERY_ACTIVITIES_BY_USER, {
      variables: { userId },
    });
    const [removeActivity] = useMutation(REMOVE_ACTIVITY);
    
    // Delete the activity
    const handleDelete = async (id) => {
      try {
        await removeActivity({ variables: { activityId: id } });
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    };
  
    return (
        <div>
          <h2>Activities</h2>
          <ul>
            {activities.map(activity => (
              <li key={activity.id}>
                <h3>{activity.name}</h3>
                <p>Date: {activity.date}</p>
                <p>Description: {activity.description}</p>
                <p>Destination: {activity.destination}</p>
                {/* <Map destination={{ longitude: activity.longitude, latitude: activity.latitude }} /> */}
                <button onClick={() => handleDelete(activity._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
    );
};
    
export default Activities;




