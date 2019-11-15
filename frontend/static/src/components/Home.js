import React from 'react';
import {Carousel} from 'react-bootstrap';


import '../App.css';


function Home(props) {

    // function based components use props instead of this.props
    // class based components you call this.props
    return (
        <div>

            {/*{props.children}*/}

            <Carousel className="container p-4">
                <Carousel>
                    <Carousel.Item >
                        <img
                            className="d-block w-100 carousel-image"
                            src="https://gravityjack.com/wp-content/uploads/2016/08/mobile-app-communication.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>

                            <p>REAL TIME COMMUNICATION AT YOUR FINGERTIPS</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block w-100 carousel-image"
                            src="https://integratedwork.com/wp-content/uploads/2018/05/Ideas-e1527025600841.png"
                            alt="Third slide"

                        />

                        <Carousel.Caption>
                            {/*<h3>Second slide label</h3>*/}
                            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block w-100 carousel-image"
                            src="https://integratedwork.com/wp-content/uploads/2018/05/Communications-Flow-Graphic.png"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            {/*<h3>Third slide label</h3>*/}
                            {/*<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Carousel>
        </div>
    )
}


export default Home;
