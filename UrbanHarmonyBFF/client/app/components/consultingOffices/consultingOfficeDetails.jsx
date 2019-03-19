import React from 'react';
import { connect } from 'react-redux';
import { getConsultingOfficeDetails } from '../../actions/index.js'
import * as queryString from "query-string";


class ConsultingOfficeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.getOfficeByID();
    }

    getOfficeByID() {
        var parsed = queryString.parse(this.props.location.search);
        fetch('/offices/id/' + parsed.office, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getConsultingOfficeDetails(data))
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
                                <td className="table-data table-header">اسم المكتب</td>
                                <td className="table-data">{this.props.officeDetails.officeName}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">المسئول</td>
                                <td className="table-data">{this.props.officeDetails.owner}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">مجال التخصص</td>
                                <td className="table-data">{this.props.officeDetails.speciality}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> العنوان </td>
                                <td className="table-data">{this.props.officeDetails.address}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> الرمز البريدى </td>
                                <td className="table-data">{this.props.officeDetails.postalCode}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> الهاتف </td>
                                <td className="table-data">{this.props.officeDetails.number}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> فاكس </td>
                                <td className="table-data">{this.props.officeDetails.Fax}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> البريد الأليكترونى </td>
                                <td className="table-data">{this.props.officeDetails.email}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> التخصصات المقيد بها المكتب </td>
                                <td className="table-data">{this.props.officeDetails.details}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    officeDetails: state.officeDetails,
});

export default connect(mapStateToProps)(ConsultingOfficeDetails);