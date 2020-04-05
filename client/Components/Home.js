import React from 'react'
import MaterialInport from '../materialUI'
const MaterialUI = MaterialInport()

const Home = (prop) => {
  return (
    <MaterialUI.Container maxWidth='md' component='home'>
      <MaterialUI.Typography variant='h6' color='textPrimary' gutterBottom>
           Home Screen
      </MaterialUI.Typography>
    </MaterialUI.Container>
  )
}

export default Home
