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
        let allGuidelines = this.props.guidelines;
        return allGuidelines.map(a => {
            //console.log(a.PDF)
            if (a.PDF.match(/\.(pdf)$/)) {
                return <Content record={a} key={a.id} />
            }
        })
    }
}

class Content extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="tile pressCard law-card col-xs-12 col-sm-10">
                <div class="col-xs-12 newscard-container nopadding-mobile">
                    <div class="col-xs-12  news-leftSide">
                        <h3>{this.props.record.title}</h3>
                        <p class="col-xs-12 col-sm-10 lawcard-text no-padding">
                            {this.props.record.detail}
                        </p>
                        <div class="col-xs-12 col-sm-2 no-padding sharing-cont">
                            <a href={this.props.record.PDF} class="pdf-btn" target="_blank"></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Guidelines);