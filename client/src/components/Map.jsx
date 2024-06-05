import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWx1Y2FuIiwiYSI6ImNseDF3eXVzMzAxNzAycW90YXYxbzJ3emoifQ.1DVTulVkMLWlp1YgJ-bAOw';

const Map = ({ destination }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
  
    useEffect(() => {
      if (map.current) return; 
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [destination.longitude, destination.latitude], 
        zoom: 12
      });
    }, [destination]);
  
    return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
  };
  
  export default Map;
  