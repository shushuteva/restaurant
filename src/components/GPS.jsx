import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const API_KEY = "AIzaSyAEMedOjZMWqkpKXhM5D7LbmMxS5BsUroU";

const START_POSITION = { lat: 42.694486, lng: 23.268159 };
const TARGET_POSITION = { lat: 42.657153, lng: 23.355448 }; 

const TOTAL_STEPS = 100;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const libraries = ["geometry"];

function getPointOnRoute(path, progress) {
  const totalDistance = window.google.maps.geometry.spherical.computeLength(path);
  
  const targetDistance = totalDistance * progress;

  let distanceCovered = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const segmentStart = path[i];
    const segmentEnd = path[i + 1];
    const segmentDistance = window.google.maps.geometry.spherical.computeDistanceBetween(segmentStart, segmentEnd);

    if (distanceCovered + segmentDistance >= targetDistance) {
      const fractionOfSegment = (targetDistance - distanceCovered) / segmentDistance;
      return window.google.maps.geometry.spherical.interpolate(segmentStart, segmentEnd, fractionOfSegment);
    }
    
    distanceCovered += segmentDistance;
  }

  return path[path.length - 1];
}

function StableMapComponent() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: libraries
  });

  const [directions, setDirections] = useState(null);
  const [routePath, setRoutePath] = useState([]); 
  const [currentStep, setCurrentStep] = useState(0);
  const [packetPosition, setPacketPosition] = useState(START_POSITION);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentStep(step => (step >= TOTAL_STEPS ? TOTAL_STEPS : step + 1));
        }, 2500); 
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (routePath.length > 0) {
        const progress = currentStep / TOTAL_STEPS;
        const newPosition = getPointOnRoute(routePath, progress);
        if (newPosition) {
            setPacketPosition(newPosition);
        }
        }
    }, [currentStep, routePath]);
  
  const directionsCallback = useCallback((response, status) => {
    if (status === 'OK' && response) {
      setDirections(response);
      const path = response.routes[0].overview_path;
      setRoutePath(path);
    } else {
      console.error(`Directions request failed due to ${status}`);
    }
  }, []);

  if (loadError) return <div>Error loading maps. Check the console for details.</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} options={{streetViewControl: false, mapTypeControl: false, keyboardShortcuts: true, cameraControl: false}}>
      <DirectionsService
        options={{ destination: TARGET_POSITION, origin: START_POSITION, travelMode: 'DRIVING' }}
        callback={directionsCallback}
      />
      {directions && <DirectionsRenderer options={{ directions }} />}
      <Marker
        position={packetPosition}
        icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
        label="Packet"
      />
    </GoogleMap>
  );
}

export default React.memo(StableMapComponent);