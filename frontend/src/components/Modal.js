import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import {addCommentToReview} from '../actions/productAction'

const ModalWindow = ({ productId }) => {

  const dispatch = useDispatch()

  const [comment, setComment] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const sumbmitHandler = (e) => {
      e.preventDefault()
      setShow(false)
      dispatch(addCommentToReview(productId, {comment}))
  }

  return (
    <>
      <Button variant="primary" style={{margin:'12px'}} onClick={handleShow}>
        Write Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write review</Modal.Title>
        </Modal.Header>
        <Modal.Body>Comment</Modal.Body>

        {
            userInfo ?
            (
                <Form onSubmit={sumbmitHandler} style={{padding:'15px'}}>
                    <Form.Group controlId="comment">
                         <Form.Control 
                             as="textarea" 
                             row="3" 
                             value={comment} 
                             onChange={(e)=>setComment(e.target.value)}>
                          </Form.Control>
                     </Form.Group>
                     <Button 
                         type="submit"
                          variant="primary"
                         >
                              Comment
                     </Button>
                     <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                 </Form>   
             ) : null

        }
       
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow
