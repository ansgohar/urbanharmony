import React from 'react';
import { connect } from 'react-redux';
import { getLaws } from '../../actions/index.js'

class LawsPage extends React.Component {
    constructor(props) {
        super(props);
        this.getLawsData();
    }

    getLawsData() {
        fetch('/lawsborders/laws', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getLaws(data))
        );
    }

    render() {

        let allLaws = this.props.laws;
        return allLaws.map(a => {
            console.log(a.PDF)
            if (a.PDF.match(/\.(pdf)$/) ){
                return <Lws record={a} key={a.id} />
            }
            
        })
    }
}


class Lws extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="col-xs-12 tite law-card conferenceCard col-sm-10">
                <div class="col-xs-12 newscard-container nopadding-mobile">
                    <div class="col-xs-12  news-leftSide">
                        <h3>{this.props.record.title}</h3>
                        <p class="col-xs-12 col-sm-10 lawcard-text no-padding">
                            {this.props.record.detail}
                        </p>
                        <div class="col-xs-12 col-sm-2 no-padding sharing-cont">
                            {/* <a href={"https://urbanharmonycms.mybluemix.net" + this.props.record.PDF} class="download-btn" download="True"></a> */}
                            <a href={this.props.record.PDF} class="pdf-btn" target="_blank"></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect()(LawsPage);