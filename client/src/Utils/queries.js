import { gql } from '@apollo/client';


export const QUERY_TRIPS = gql`
query User($userId: ID!) {
    user(userId: $userId) {
      trips {
        startDate
        destination
        endDate
        tripName
        description
        destination
        activities {
          activityName
          date
          description
          destination
        }
      }
    }
  }
`;
