import React from 'react';
import { Map, Marker } from 'pigeon-maps';

export default function MapContainer() {
  return (
    <div className='rounded-xl overflow-hidden'>  
      <Map height={400} defaultCenter={[40.7128, -74.0060]} defaultZoom={11}>
        <Marker width={50} anchor={[40.7128, -74.0060]} />
      </Map>
    </div>
  )
}
