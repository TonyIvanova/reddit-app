import React from "react";
import { Card, Container } from "react-bootstrap";

export const Error = () => {
  return (
    <>
    <Container>
    <Card className='m-3 border-0'><Card.Body className='text-center'> <h2 className='display-4'>404</h2>
    <h4>Page not found</h4></Card.Body> </Card>
    </Container>
     
    
    </>
  );
};
