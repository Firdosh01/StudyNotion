import React from 'react'

function HighlightText( {text}) {
  return (
    <span className='font-bold gradient'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText
