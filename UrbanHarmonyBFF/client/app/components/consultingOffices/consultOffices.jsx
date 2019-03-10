import React from 'react';
import { connect } from 'react-redux';
import { getConsultingOffices } from '../../actions/index.js'


class ConsultingOffices extends React.Component {
    constructor(props) {
        super(props);
        this.getOffices();
    }

    getOffices() {
        fetch('/offices', {
            method: 'GET'
        }).then(res => res.json()
        ).then(data => this.props.dispatch(getConsultingOffices(data))
        );
    }

    render() {
        if (this.props.hide) {
            return null;
        }

        return (
            <div className="col-xs-12 page-margin consult-office newscard-container nopadding-mobile">
            {this.renderOffices()}
            </div>
        )
    }
    renderOffices() {
        let offices = this.props.offices;
        return offices.map(a => {
            return <Offices record={a} key={a.id} />;
        });
    }
}


class Offices extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="col-xs-12 news-rightSide nopadding-mobile">
                    <h2>{this.props.record.officeName}</h2>
                    <a href={"/consultingOfficeDetails?office=" + this.props.record.id} >التفاصيل</a>
                    <div className="divider-bottom"></div>
                </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    offices: state.offices,
});

export default connect(mapStateToProps)(ConsultingOffices);
