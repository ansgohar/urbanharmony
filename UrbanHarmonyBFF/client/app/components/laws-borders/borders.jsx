import React from 'react';
import { connect } from 'react-redux';
import { getBorders } from '../../actions/index.js'



class Borders extends React.Component {
    constructor(props) {
        super(props);
        this.getBordersData();
    }

    getBordersData() {
        fetch('/lawsborders/borders', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getBorders(data))
        );
    }

    render() {
        if (this.props.hide) {
            return null;
        }

        let allborders = this.props.borders;
        return allborders.map(a => {
            return <Brd record={a} key={a.id} />
        })
    }
}

class Brd extends React.Component {
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
                            <a href={"https://urbanharmonycms.mybluemix.net" + this.props.record.PDF} class="pdf-btn" target="_blank"></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect()(Borders);