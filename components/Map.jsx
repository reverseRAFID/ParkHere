import React from 'react';
import { Map, Marker } from 'pigeon-maps';

export default function MapContainer() {
  return (
    <div className='rounded-xl overflow-hidden'>  
      <Map height={400} defaultCenter={[23.80, 90.41]} defaultZoom={11}>
        <Marker width={50} anchor={[23.84, 90.39]} />
      </Map>
    </div>
  )
}
