import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap/esm";
import { useSelector } from "react-redux";
import axios from "axios";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [crslMovie, setCrslMovie] = useState(null);

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
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
            <Card className="text-center">
              <Card.Header>Dashboard</Card.Header>
              <Card.Body>
                <Card.Title>My Profile</Card.Title>
                <Card.Text>Hello, my name is {user?.name}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">{user?.email}</Card.Footer>
            </Card>
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

export default Dashboard;
