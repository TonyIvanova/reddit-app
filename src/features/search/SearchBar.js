import React from "react";
// https://www.reddit.com/search/?q=blah%20blah

//styling
import {Navbar, Container, Form} from 'react-bootstrap';
import logo from '../../logo.svg'; 
import { useHistory } from "react-router";
import {Link} from 'react-router-dom'; 

export function SearchBar() {

let history = useHistory();

let search; 
const handleChange = (e) => {
search = `search/search.json?q=${e.target.value}`; 

}

const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/'); // go to the home page 
    history.push(search); // create search link 
    
    
}


    return (
        <>
         <Navbar bg="primary" variant="dark">
             <Container>
            <Link to='/'> <img
    
        src={logo}
        width="30"
        height="30"
        className="d-inline-block float-left  
     m-1 "
        alt="Reddit logo"
      /> </Link>
     
      <Form  onSubmit={handleSubmit}>
            
             <Form.Control  placeholder="Search" onChange={handleChange} className='searchBar' />
       </Form>     
        </Container>
        

        </Navbar>
        </>
    )
};

