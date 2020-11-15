import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = (props) => {
    let styles = {  
        width:'100px', 
        height:'100px', 
        margin:'auto', 
        display: 'block' 
    }

    if (props.size === 'min') {
        styles = {...styles, height:'50px', width:'50px'}
    }
    return (
       
        <Spinner 
            animation='border'
            role='status'
            style={ 
                styles
            }
        >
            <span className='sr-only'> Loading... </span>
        </Spinner>
    )
}

export default Loader
