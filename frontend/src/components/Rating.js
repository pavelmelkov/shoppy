import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import ModalWindow from '../components/Modal'
import {createReview} from '../actions/productAction'

const Rating = ({reviewed, touch, productId, value, text}) => {

    const product = productId

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)

    let styleCoursor = {}

    if (touch) {
        styleCoursor = {
            ...styleCoursor, cursor:'pointer'
        }
    } else {
        styleCoursor = {}
    }

    useEffect(
        () => {

        }, [reviewed]
    )

    const [id, setId] = useState(0)
    const hideUpdateRow = () => {
        setId(0)
    }
    const ratingMouseOver = (e) => {
        if (!e.target.id) {
            setId(0)
        } else {
            setId(e.target.id)
        }
    }

    const setReview = () => {
        if (!reviewed){
            setModal(true)
            dispatch(createReview(product, 
                {
                    rating: id,
                    comment: undefined
                }
            ))
        }
    }

    const color = (
        id === '1' ?
        [
        'red',
        'yellow',
        'yellow',
        'yellow',
        'yellow'
        ] :
        id === '2' ?
        [
        'red',
        'red',
        'yellow',
        'yellow',
        'yellow'
         ] :
        id === '3' ?
        [
        'red',
        'red',
        'red',
        'yellow',
        'yellow'
        ] :
        id === '4' ?
        [
        'red',
        'red',
        'red',
        'red',
        'yellow'
        ] :
        id === '5' ?
        [
        'red',
        'red',
        'red',
        'red',
        'red'
        ] :
        [
        'yellow',
        'yellow',
        'yellow',
        'yellow',
        'yellow'
        ] 
    )

    const colorByTouch = []
    if (!reviewed) {
        for(let i = 0; i <= 4; i++) {
            colorByTouch.push(color[i])
        }
    } else {
        for(let i = 0; i <= 4; i++) {
            colorByTouch.push('yellow')
        }
    }
    

    return (
        <>
        {
            (modal && touch && !reviewed) ? 
            <ModalWindow productId={product}/>
            : 
            null
        }
        <div className="rating">
            <div
                onClick={() => setReview()}
                onMouseOver={(e) => ratingMouseOver(e)} 
                onMouseOut={() => hideUpdateRow()}  
                style={{  display:'inline-block', ...styleCoursor }}>
                <span>
                    <i 
                    id='1'
                    style={{color: `${colorByTouch[0]}` }}
                    className={ 
                        value >= 1 ? 'fas fa-star' 
                        : value >= 0.5 ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                        }
                    >  
                    </i>
                </span>
            </div>
                
            <div
                onClick={() => setReview()}
                onMouseOver={(e) => ratingMouseOver(e)}   
                style={{  display:'inline-block', ...styleCoursor}}>
                <span>
                    <i 
                    id='2'
                    style={{color: `${colorByTouch[1]}` }}
                        className={ 
                            value >= 2 ? 'fas fa-star' 
                            : value >= 1.5 ? 'fas fa-star-half-alt' 
                            : 'far fa-star' 
                            }
                    >  
                    </i>
                </span>
            </div>
           
            <div
                onClick={() => setReview()}
                onMouseOver={(e) => ratingMouseOver(e)}   
                style={{  display:'inline-block', ...styleCoursor}}>
                <span>
                    <i 
                    id='3'
                    style={{color: `${colorByTouch[2]}` }}
                    className={ 
                        value >= 3 ? 'fas fa-star' 
                        : value >= 2.5 ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                        }
                    >  
                    </i>
                </span>
            </div>
           
            <div
                onClick={() => setReview()}
                onMouseOver={(e) => ratingMouseOver(e)}   
                style={{  display:'inline-block', ...styleCoursor}}>
                <span>
                    <i 
                    id="4"
                    style={{color: `${colorByTouch[3]}` }}
                    className={ 
                        value >= 4 ? 'fas fa-star' 
                        : value >= 3.5 ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                        }
                    >  
                    </i>
                </span>
            </div>
          
            <div
                onClick={() => setReview()}
                onMouseOver={(e) => ratingMouseOver(e)}   
                onMouseOut={() => hideUpdateRow()}  
                style={{  display:'inline-block', ...styleCoursor}}>
                <span>
                    <i 
                    id='5'
                    style={{color: `${colorByTouch[4]}` }}
                    className={ 
                        value >= 5 ? 'fas fa-star' 
                        : value >= 4.5 ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                        }
                    >  
                    </i>
                </span>
            </div>
            <>
                <span> {text ? text : ''} </span>
            </>
          
        </div>
    </>
    )
}


Rating.defaultProps = {
    color: '#f8e825',
}

Rating.propTypes={
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default Rating

