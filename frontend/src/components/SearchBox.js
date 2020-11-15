import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push(`/`)
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                style={{backgroundColor:'#D3D3D3'}}
                onChange={(e) => setKeyword(e.target.value)}
            >
            </Form.Control>
            <Button type="submit" variant="outline-success" className="p-2" style={{marginLeft:"1rem"}}>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
