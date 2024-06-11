import React from 'react'
import './Title.css'

const Title = ({subTitulo, titulo}) => {
  return (
    <div className='titulo'>
        <p>{subTitulo}</p>
        <h2>{titulo}</h2>
    </div>
  )
}

export default Title