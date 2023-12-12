import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <div className='d-flex align-items-center justify-content-center w-100'
        style={{ height: '70vh' }}
    >
        <Spinner animation="border" />
    </div>
  )
}
