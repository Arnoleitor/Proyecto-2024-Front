import React from 'react'
import Grid from '../components/Grid'
import Carrito from '../components/Carrito'

const Motherboards = () => {
  return (
      <div>
        <div className='carrito'>
          <Carrito />
        </div>
      <h1 style={{fontFamily:'fantasy'}}>Placas base</h1>
      <Grid/>
    </div>
  )
}

export default Motherboards
