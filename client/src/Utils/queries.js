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
