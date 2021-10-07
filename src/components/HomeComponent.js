import React, { Component } from "react";
import { LocalForm, Control } from "react-redux-form";
import { Redirect, NavLink } from 'react-router-dom';
import { Carousel, CarouselItem, CarouselControl, CarouselCaption, CarouselIndicators, Jumbotron } from 'reactstrap';

const items = [
    {
        src: 'http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG',
        caption: 'Amazon'
    },
    {
        src: 'https://logosarchive.com/wp-content/uploads/2021/05/jumia-seeklogo.com_.png',
        caption: 'Jumia'
    }
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
    }

    next() {
        const nextIndex =
            this.state.activeIndex === items.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        const nextIndex =
            this.state.activeIndex === 0
                ? items.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(index) {
        this.setState({ activeIndex: index })
    }


    render() {

        const slides = items.map((item) => {
            return (
                <CarouselItem key={item.src}>
                    <img src={item.src} className='carousel-img' />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            )
        })

        return (
            <>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-md-6'>
                                <h1>Search For Me</h1>
                                <p>Search for me is a simple website that allows you to search for a certian product on multiple pre-set websites at the same time.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container">

                    <div className="row">
                        <div className='col-12 col-md-5 m-auto d-flex justify-content-center '>
                            <h1>Websites we use</h1>
                        </div>
                    </div>
                    <div className="row carousel-row mb-4">
                        <div className="col-12 col-md-8 m-auto">
                            <Carousel
                                activeIndex={this.state.activeIndex}
                                next={this.next}
                                previous={this.previous}>
                                {/* <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex}/> */}
                                {slides}
                                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                            </Carousel>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default Home;