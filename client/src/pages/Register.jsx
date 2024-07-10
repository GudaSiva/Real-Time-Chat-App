import { useContext } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { registerInfo, updateRegisterInfo } = useContext(AuthContext);
  return (
    <>
      <Form>
        <Row
          style={{ height: "100vh", justifyContent: "center", padding: "10%" }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2 style={{ color: "white" }}>Register</h2>
              <Form.Control
                type="test"
                placeholder="Full Name"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    full_name: e.target.value,
                  });
                }}
              />
              <Form.Control
                type="test"
                placeholder="User Name"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    user_name: e.target.value,
                  });
                }}
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    email: e.target.value,
                  });
                }}
              />
              <Form.Select
                aria-label="Gender"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    gender: e.target.value,
                  });
                }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  });
                }}
              />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    confirm_password: e.target.value,
                  });
                }}
              />
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
