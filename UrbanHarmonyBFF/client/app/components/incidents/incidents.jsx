import React from 'react';
import { connect } from 'react-redux';
import { getIncidents } from '../../actions/index.js'
import Image from '../image.jsx'


class AllIncidents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    getAllIncidents() {
        fetch(`/incidents/${this.props.type}`, {
            method: 'GET'
        }).then(res => res.json()
        ).then(data => {this.props.dispatch(getIncidents(data)); this.setState({data: data})}
        );
    }

    componentDidMount() {
        this.getAllIncidents();
    }

    render() {
        if (this.props.hide) {
            return null;
        }

        return (
            <div className="">
                {this.renderIncidents()}
            </div>
        )
    }
    renderIncidents() {
        let incidents = this.state.data;
        return incidents.map(a => {
            return <Incident record={a} key={a.id} />;
        });
    }
}


class Incident extends React.Component {
    constructor(props) {
        super(props);
    }

    convertDateToArabic(date) {
        if (date) {
            let arabicDate = new Date(date);
            return arabicDate.toLocaleDateString('ar-EG');
        }
        else {
            return '';
        }

    }

    render() {
        return (
            <div className="tile pressCard col-xs-12 padding-mobile">
                <div className="col-xs-12 newscard-container no-padding">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                        <div className="image-container-4x3">
                            {/* <img src={this.props.record.image} /> */}
                            <Image src={this.props.record.image} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                        <h3><a href={"/incidentDetails?incident=" + this.props.record.id}>{this.props.record.title}</a></h3>
                        <h4>تاريخ الرصد :{this.convertDateToArabic(this.props.record.date)}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    incidents: state.incidents,
});

export default connect(mapStateToProps)(AllIncidents);