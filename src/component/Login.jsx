import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { useDispatch } from "react-redux";
import {login} from '../Redux/Actions/authActions'

function Login() {const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      email,
      password,
    });

    dispatch(login(data, navigate));
  };
  return (
    <Container className="p-4">
      <Row className="mb-4">
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <p>Dont Have an Account?</p>
          <Link as={Link} to={'/register'}>
          <Button variant="success" type="submit">
              Register
            </Button>
          </Link>
          <Link as={Link} to={'/'}>
          <Button variant="success" type="submit">
              Home
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center">Or</h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <GoogleLogin buttonText="Login with Google 🚀" />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;