import { Button, Col, Form, Row, Stack } from "react-bootstrap";

const Login = () => {
  return (
    <>
      <Form>
        <Row
          style={{ height: "100vh", justifyContent: "center", padding: "10%" }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2 style={{ color: "white" }}>Login</h2>
              <Form.Control type="test" placeholder="User Name" />
              <Form.Control type="email" placeholder="Email" />
              <Form.Control type="password" placeholder="Password" />
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
