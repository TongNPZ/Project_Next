"use client"
// import Sidebar from './componnent/SidebarComponent/sideBar';
import Navbar from './componnent/NavbarComponent/navBar';
import Link from 'next/link';
import { Carousel, Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Home() {
  return (
    <div className='container-color'>
      <Navbar />
      <div className='row'>
        {/* <div className='col-md-2'>
          <Sidebar />
        </div> */}
        <div className='col-md-12'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <Carousel >
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/Life.jpg"
                      alt="First slide"
                      style={{ width: '1080px', height: '600px' }}
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/Main-Site.jpg"
                      alt="Second slide"
                      style={{ width: '1080px', height: '600px' }}
                    />
                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/asagha.jpg"
                      alt="Third slide"
                      style={{ width: '1080px', height: '600px' }}
                    />
                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>

                <br />
              </div>
              <br />

              <div className='col-md-4'>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-4'>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-4'>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
              </div>

            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

