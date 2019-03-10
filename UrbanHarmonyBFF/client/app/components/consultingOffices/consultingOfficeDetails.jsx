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
            <div className="col-xs-12 newscard-container consult-office nopadding-mobile page-margin">
            <h3> اسم المكتب : {this.props.officeDetails.officeName}</h3>
            <h3>   المسئول : {this.props.officeDetails.owner} </h3>
            <h3>مجال التخصص : {this.props.officeDetails.speciality}</h3>
            <h3>   العنوان : {this.props.officeDetails.address}</h3>
            <h3> الرمز البريدى : {this.props.officeDetails.postalCode}</h3>
            <h3> الهاتف : {this.props.officeDetails.number}</h3>
            <h3> فاكس : {this.props.officeDetails.Fax}</h3>
            <h3>البريد الأليكترونى : {this.props.officeDetails.email}</h3>
            <h3>   التخصصات المقيد بها المكتب : {this.props.officeDetails.details}</h3>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    officeDetails: state.officeDetails,
});

export default connect(mapStateToProps)(ConsultingOfficeDetails);