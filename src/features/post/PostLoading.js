import React from "react";

import { Card, Container, Row, Col, Placeholder } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function PostLoading() {
  return (
    <>
      <Container className="container-xs py-3" style={{ maxWidth: "600px" }}>
        <Row>
          <Col className="col-2 text-center ">
            <FaChevronUp style={{ color: "gray" }} />
            <Placeholder as="h2" animation="glow">
              {" "}
              <Placeholder xs={12} />
            </Placeholder>
            <FaChevronDown style={{ color: "gray" }} />
          </Col>

          <Col className="col-10">
            <Card className=" p-0 m-0">
              <Card.Header className="post-header">
                <Container>
                  <Row className="justify-content-start">
                    <Col>
                      <Placeholder as="p" animation="glow">
                        {" "}
                        <Placeholder xs={12} />
                      </Placeholder>
                      
                    </Col>
                  </Row>
                  <Row>
                    <h4>
                      {" "}
                      <Placeholder as="p" animation="glow">
                        {" "}
                        <Placeholder xs={12} />
                      </Placeholder>{" "}
                      
                    </h4>
                  </Row>
                </Container>
              </Card.Header>
              <Card.Body className="p-3 text-center">
                <Placeholder as="p" animation="glow">
                  {" "}
                  <Placeholder xs={12} style={{height: '30vh'}}/>
                </Placeholder>
             

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
