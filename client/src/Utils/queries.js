import { gql } from '@apollo/client';


export const QUERY_TRIPS = gql`
    query trip($tripName: String!) {
        trip(tripName: $tripName) {
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