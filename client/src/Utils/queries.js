import { gql } from '@apollo/client';


export const QUERY_TRIPS = gql`
query User($userId: ID!) {
    user(userId: $userId) {
      trips {
        _id
        startDate
        destination
        endDate
        tripName
        description
        destination
        activities {
          _id
          activityName
          date
          description
          destination
        }
      }
    }
  }
`;
