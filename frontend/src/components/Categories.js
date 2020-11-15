import React from 'react'
import { Form, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Categories = () => {
    return (
        <div>
            <Form.Group style={{paddingRight:'1rem', margin:0}}>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Brands
                </Dropdown.Toggle>

                    <Dropdown.Menu style={{padding:'15px'}}>
                        <LinkContainer to="/brand/Apple">
                            <Dropdown.Item>Apple</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/brand/Sony">
                            <Dropdown.Item>Sony</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/brand/Asus">
                            <Dropdown.Item>Asus</Dropdown.Item>
                        </LinkContainer>
                    </Dropdown.Menu>
                </Dropdown>
            </Form.Group>
        </div>
    )
}

export default Categories

