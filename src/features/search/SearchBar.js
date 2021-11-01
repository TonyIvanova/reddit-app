import React from "react";
// https://www.reddit.com/search/?q=blah%20blah
import {useState} from 'react'; 
//styling
import {Navbar, Container, Form} from 'react-bootstrap';
import logo from '../../logo.svg'; 
import { useHistory } from "react-router";


export function SearchBar() {

let history = useHistory();


let search; 
const handleChange = (e) => {
search = `search.json?q=${e.target.value}`; 

}

const handleSubmit = (e) => {
    e.preventDefault();
    history.push(search); 

    console.log(history); 
    
}


    return (
        <>
         <Navbar bg="primary" variant="dark">
             <Container>
             <img
    
        src={logo}
        width="30"
        height="30"
        className="d-inline-block float-left  
     m-1 "
        alt="Reddit logo"
      /> 
      <Form  onSubmit={handleSubmit}>
             <Form.Control  placeholder="Search" onChange={handleChange} />
       </Form>     
        </Container>
        

        </Navbar>
        </>
    )
};

