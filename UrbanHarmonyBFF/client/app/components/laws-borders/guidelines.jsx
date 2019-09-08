import React from 'react';
import { connect } from 'react-redux';
import { getGuidelines } from '../../actions/index.js';
import Slider from "react-slick";

class Guidelines extends React.Component {
    constructor(props) {
        super(props);
        this.getGuidelinesData();
    }

    getGuidelinesData() {
        fetch('/lawsborders/guidelines', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getGuidelines(data))
        );
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true
        }

        

        return (

            <div class="tile pressCard law-card col-xs-12 col-sm-10">
                <div class="col-xs-12 newscard-container nopadding-mobile">
                    <Slider {...settings}>
                        {this.renderPDF()}
                    </Slider>
                </div>
            </div>
        )
    }

    renderPDF() {
        let allGuidelines = this.props.guidelines;
        return allGuidelines.map(a => {
            //console.log(a.PDF)
            if (a.PDF.match(/\.(pdf)$/)) {
                return <GDL record={a} key={a.id} />
            }
        })
    }
}

class GDL extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="col-xs-12  news-leftSide">
                {/* <h3>{this.props.record.title}</h3>
                <p class="col-xs-12 col-sm-10 lawcard-text no-padding">
                    {this.props.record.detail}
                </p> */}
                <div>
                    <iframe src={this.props.record.PDF} style={{ width: '100%', height: '500px', border: 'none' }}></iframe>
                </div>
            </div>
        );
    }
}


export default connect()(Guidelines);