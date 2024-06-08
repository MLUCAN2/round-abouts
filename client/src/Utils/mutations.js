import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation addTrip($tripName: String!, $startDate: String!, $endDate: String!, $destination: String!, $description: String!) {
    addTrip(tripName: $tripName, startDate: $startDate, endDate: $endDate, destination: $destination, description: $description) {
      _id
      tripName
      startDate
      endDate
      destination
      description
    }
  }
`;

export const QUERY_ACTIVITIES = gql`
  query GetActivities {
    activities {
      _id
      activityName
      date
      description
      destination
    }
  }
`;
export const REMOVE_ACTIVITY = gql`
  mutation RemoveActivity($activityId: ID!) {
    removeActivity(activityId: $activityId) {
      _id
    }
  }
`;

export const ADD_ACTIVITY_TO_TRIP = gql`
  mutation AddActivityToTrip($tripId: ID!, $activityName: String!, $date: String!, $description: String!, $destination: String!) {
    addActivityToTrip(tripId: $tripId, activityName: $activityName, date: $date, description: $description, destination: $destination) {
      _id
      tripName
      startDate
      endDate
      description
      activities {
        _id
        activityName
        date
        description
        destination
      }
    }
  }
`;

export const QUERY_ACTIVITIES_BY_USER = gql`
  query GetActivitiesByUser($userId: ID!) {
    activitiesByUser(userId: $userId) {
      _id
      activityName
      date
      description
      destination
    }
  }
`;

export const REMOVE_TRIP= gql`
  mutation RemoveTrip($tripId: ID!) {
    removeTrip(tripId: $tripId) {
      _id
    }
  }
`;