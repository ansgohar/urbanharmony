import React from 'react';
import axios from 'axios';
import './style.scss';
import * as config from '../../../../../../UrbanHarmonyBFF/server/config/local.json';
export class PetitionPage extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      surveyId: '',
      owner: '',
      ownerType: '',
      committeDesicion: '',
      recommendation: '',
      commiteeDate: ''
    };
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({[name]: value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    let surveyId = this.state.surveyId;
    if (!surveyId || surveyId === '' || surveyId === ' ') {
      alert('Please ensure that the survey id is filled in');
      return;
    }

    const identityPayload = {
      identifier: config.USER,
      password: config.SECERT
    };

    const baseUrl = `${config.CMS_URL}`
    let url = 'auth/local';

    const token = (await axios.post(`${baseUrl}${url}`, identityPayload)).data.jwt;

    // Fetch Survey address details
    url = `surveylist/${this.state.surveyId}`;
    const surveyDetails = (await axios.get(`${baseUrl}${url}`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })).data;
    
    url = 'petition';

    let payload = {
      surveylist: this.state.surveyId,
      owner: this.state.owner,
      ownerType: this.state.ownerType,
      committeDesicion: this.state.committeDesicion,
      recommendation: this.state.recommendation,
      commiteeDate: this.state.commiteeDate,
      address: surveyDetails.address,
      governorate: surveyDetails.governorate,
      mainArea: surveyDetails.mainArea,
      subArea: surveyDetails.subArea,
      regNo: this.state.surveyId
    };

    const petitionResponse = (await axios.post(`${baseUrl}${url}`, payload, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }))
      .data;

    const petitionID = petitionResponse._id;

    await axios.put(`${baseUrl}${url}/${petitionID}`, {genID: petitionID}, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    url = `content-manager/explorer/surveylist/${payload.surveylist}?source=content-manager`;

    await axios.put(`${baseUrl}${url}`, {status: 'exists'}, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    alert(`Petition has been inserted successfully, ID: ${petitionID}`);
  }

  render() {

    const labelStyle = {
      marginRight: '10px'
    };

    const boxStyle = {
      width: '100%',
      background: 'white',
      border: '2px solid grey',
      borderRadius: '4px'
    };

    return (
      <div style={{padding: '20px', margin: '20px', background: 'gainsboro', border: '1px solid grey'}}>
        <h1>Petition Insertion</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="surveyId" style={labelStyle}>Survey ID: </label>
            <input style={boxStyle} type="text" name="surveyId" id="surveyId" value={this.state.surveyId} onChange={this.handleChange}/>
          </div>
          <hr />
          <div>
            <label style={labelStyle} htmlFor="owner">Owner: </label>
            <input style={boxStyle} type="text" name="owner" id="owner" value={this.state.owner} onChange={this.handleChange}/>
          </div>
          <hr />
          <div>
            <label style={labelStyle} htmlFor="ownerType">Owner Type: </label>
            <input style={boxStyle} type="text" name="ownerType" id="ownerType" value={this.state.ownerType} onChange={this.handleChange}/>
          </div>
          <hr />
          <div>
            <label style={labelStyle} htmlFor="committeDesicion">Committee Decision: </label>
            <input style={boxStyle} type="text" name="committeDesicion" id="committeDesicion" value={this.state.committeDesicion} onChange={this.handleChange}/>
          </div>
          <hr />
          <div>
            <label style={labelStyle} htmlFor="recommendation">Committee Recommendation: </label>
            <input style={boxStyle} type="text" name="recommendation" id="recommendation" value={this.state.recommendation} onChange={this.handleChange}/>
          </div>
          <hr />
          <div>
            <label style={labelStyle} htmlFor="commiteeDate">Committee Date: </label>
            <input style={boxStyle} type="date" name="commiteeDate" id="commiteeDate" value={this.state.commiteeDate} onChange={this.handleChange}/>
          </div>
          <hr />
          <input style={{background: 'lightgreen', width: '100%', borderRadius: '10px', padding: '5px', fontWeight: 'bold'}} type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default PetitionPage;
