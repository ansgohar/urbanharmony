import React from 'react';
import { connect } from 'react-redux';
import { getComplainsGovernorates } from '../../actions/index.js'
import { getComplainsRegions } from '../../actions/index.js'

class Governorates extends React.Component {
    constructor(props) {
        super(props);
        this.getGovs();
        this.getReg();
        this.handleChange = this.handleChange.bind(this);
    }

    getGovs() {
        fetch('/complains/governorate', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getComplainsGovernorates(data))
        );
    }


    getReg() {
        fetch('/complains/regions/5b06dc900dc06a60c74f4a44', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getComplainsRegions(data))
        );
    }


    handleChange(e){
        let id = e.target.value;
        fetch('/complains/regions/' + id, {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getComplainsRegions(data))
        );

    }
    render() {

        let govs = this.props.governorates;
        let optionItems = govs.map((gov) =>
            <option key={gov.id} value={gov.id}>{gov.name}</option>);

        let region = this.props.regions;
        let regionOptions = region.map((reg) =>
            <option key={reg.id} value={reg.name}>{reg.name} </option>);

        return (
            <div>
                <div className="col-xs-12 col-sm-6">
                    <label className="fieldLabel col-xs-12">المنطقة<span className="requiredField">*</span></label>
                    <select className="formDropdown" placeholder="إختر إسم المنطقة" name="#">
                        {regionOptions}
                    </select>
                </div>

                <div className="col-xs-12 col-sm-6" onChange={this.handleChange}>
                    <label className="fieldLabel col-xs-12">المحافظة<span className="requiredField">*</span></label>
                    <select className="formDropdown" name="#">
                        {optionItems}
                    </select>
                </div>
            </div>
        );

    }

}

export default connect()(Governorates);