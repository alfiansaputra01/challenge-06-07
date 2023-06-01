import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/auth";
import GoogleLogin from "../components/GoogleLogin";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoggedin} = useSelector((state) => state.auth);
  const [crslMovie, setCrslMovie] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedin || user) {
      navigate("/");
    }
  }, [isLoggedin, navigate, user]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    dispatch(login(data, navigate));
  };

  const crsl1 = async () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US')
      .then((response) => {
        console.log(response.data.results)
        setCrslMovie(response.data.results.slice(0,1))
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
      crsl1()
  }, [])

  return (
    <div className="h-[100vh]">
      {
          crslMovie?.map((cr) => (
            <div className='h-[100vh] w-full grid place-items-center'
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${cr.backdrop_path})`,
            backgroundSize: "cover", 
            backgroundPosition: "center",
            boxShadow: "0px 0px 0px 0px #00000040,inset 0 0 0 1000px rgba(0,0,0,.7)" }}>
      <Container className="p-4">
      <div className="flex flex-col items-start gap-[20px] p-[15px]">
        <Row>
          <Col>
            {" "}
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="block text-gray-700 text-sm font-bold mb-2">Email address</Form.Label>
                <Form.Control className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p class="text-red-500 text-xs italic">We'll never share your email with anyone else.</p>
              </Form.Group>

              <Form.Group className="mb-6" controlId="formBasicPassword">
                <Form.Label className="block text-gray-700 text-sm font-bold mb-2">Password</Form.Label>
                <Form.Control className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p class="text-red-500 text-xs italic">Please choose a password.</p>
              </Form.Group>

              <div class="flex items-center justify-between">
                <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
        <Row>
          <Col>
          <h3 className="text-center">Or</h3>
          <div className="d-flex justify-content-center align-items-center">
            <GoogleLogin buttonText={"Login with Google"} />
          </div>
          </Col>
        </Row>
      </Container>
      </div>
      ))
      }
    </div>
  );
}

export default Login;
