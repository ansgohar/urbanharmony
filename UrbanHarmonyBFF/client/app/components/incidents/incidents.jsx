import React from 'react';
import { connect } from 'react-redux';
import { getIncidents } from '../../actions/index.js'


class AllIncidents extends React.Component {
    constructor(props) {
        super(props);
        this.getAllIncidents();
    }

    getAllIncidents() {
        fetch('/incidents', {
            method: 'GET'
        }).then(res => res.json()
        ).then(data => this.props.dispatch(getIncidents(data))
        );
    }

    render() {
        if (this.props.hide) {
            return null;
        }

        return (
            <div className="page-margin">
                {this.renderIncidents()}
            </div>
        )
    }
    renderIncidents() {
        let incidents = this.props.incidents;
        return incidents.map(a => {
            return <Incident record={a} key={a.id} />;
        });
    }
}


class Incident extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tile pressCard col-xs-12 padding-mobile">
                <div className="col-xs-12 newscard-container no-padding">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                        <div className="image-container-4x3">
                            <img src={this.props.record.image} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                        <h2><a href={"/incidentDetails?incident=" + this.props.record.id}>{this.props.record.title}</a></h2>
                        <h3>تاريخ الرصد :{this.props.record.date}</h3>
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