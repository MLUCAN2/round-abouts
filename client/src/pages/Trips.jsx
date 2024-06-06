import { useQuery } from '@apollo/client';
import TripCards from '../components/TripCards';
import { QUERY_TRIPS } from '../Utils/queries';



const Trips = () => {
    
    
    const { data } = useQuery(QUERY_TRIPS, {
    
    });

    const trips = data?.trips || []
    
    return (
    <div className='cards'>

        <TripCards/>
        
    </div>
    )
}

export default Trips