import React from 'react';
import { connect } from 'react-redux';
import { getIncidentDetails } from '../../actions/index.js'
import * as queryString from "query-string";


class IncidentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.getIncidentByID();
    }

    getIncidentByID() {
        var parsed = queryString.parse(this.props.location.search);
        fetch('/incidents/' + parsed.incident, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getIncidentDetails(data))
            );

    }

    render() {
        if (this.props.hide) {
            return null;
        }
        return (
            <div className=" newscard-container page-margin table-padding">
                <div className="col-xs-12 news-rightSide nopadding-mobile">
                    <div className="col-xs-12 news-leftSide">
                        <table className="default-table">
                            <tr className="table-row">
                                <td className="table-data table-header">موقع الرصد </td>
                                <td className="table-data">{this.props.incidentDetails.address}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">سبب الرصد </td>
                                <td className="table-data">{this.props.incidentDetails.description}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> تاريخ الرصد </td>
                                <td className="table-data">{this.props.incidentDetails.date}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> تصوير </td>
                                <td className="table-data">{this.props.incidentDetails.photographer}</td>
                            </tr>
                        </table>
                    </div>

                    <div className="col-xs-12 news-rightSide">
                        <img className="image-size" src={this.props.incidentDetails.image} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    incidentDetails: state.incidentDetails,
});

export default connect(mapStateToProps)(IncidentDetails);