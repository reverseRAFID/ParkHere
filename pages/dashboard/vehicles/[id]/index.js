import React from 'react'
import { useRouter } from 'next/router'

export default function VehicleDetails() {
  const id = useRouter().query.id;
  return (
    <div>VehicleDetails</div>
  )
}
