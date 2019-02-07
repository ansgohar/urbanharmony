/*
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { bindActionCreators, compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// Selectors
import selectHomePage from './selectors';
import axios from 'axios';

// Styles
import styles from './styles.scss';
import Button from 'components/Button';
import InputText from 'components/InputText';
import Label from 'components/Label';
import PopUpWarning from 'components/PopUpWarning';

import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { googleAPI: '', query: '', loading: true, isOpen: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePopUpConfirm = () => {
    this.setState({ isOpen: false });
  }

  handleSubmit(event) {
    this.setState({ loading: true })
    var send = {
      APIKey: this.state.googleAPI,
      query: this.state.query,
    };

    let axiosConfig1 = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    var user = {
      identifier: 'admin',
      password: 'ABC2020$',
    };

    axios
      .post('/auth/local', user, axiosConfig1)
      .then(response => {
        console.log(send);
        return axios.put('/google-api/editquery', send, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + response.data.jwt,
          },
        });
      })
      .then(response => {
        this.setState({ loading: false })
        this.setState({ isOpen: true })
      });



    event.preventDefault();
  }

  handleChange(event, i) {
    if (i == 1)
      this.setState({ googleAPI: event.target.value });
    else
      this.setState({ query: event.target.value });
  }

  componentDidMount(event) {
    let axiosConfig1 = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    var user = {
      identifier: 'admin',
      password: 'ABC2020$',
    };

    axios
      .post('/auth/local', user, axiosConfig1)
      .then(response => {
        console.log(response.data.jwt);
        return axios.get('/google-api/getQuery', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + response.data.jwt,
          },
        });
      })
      .then(response => {
        this.setState({ query: response.data.message.query });
        this.setState({ googleAPI: response.data.message.APIKey });
        this.setState({ loading: false });
      });
  }

  render() {
    const popupContent = {
      confirm: 'Ok',
      message: 'API Updated Successfully',
      title: 'GOOGLE API',
    };
    return (
      <li>
        <div className={styles.homePage}>
          <br></br>
          <Label htmlFor="google-api" message="Google API Key" />
          <InputText disabled={this.state.loading} id="google-api" name="google-api" value={this.state.googleAPI} onChange={e => this.handleChange(e, 1)} />
          <br></br>
          <Label htmlFor="query" message="Query" />
          <InputText disabled={this.state.loading} id="query" name="query" value={this.state.query} onChange={e => this.handleChange(e, 2)} />
          <br></br>
          <div className={styles.buttonContainer}>
            <Button primary label="Update" onClick={this.handleSubmit} disabled={this.state.loading} />
          </div>


        </div>
        <div>
          <PopUpWarning
            isOpen={this.state.isOpen}
            onlyConfirmButton={true}
            content={popupContent}
            onConfirm={this.handlePopUpConfirm}
            toggleModal={() => this.setState({ isOpen: !this.state.isOpen })}
            popUpWarningType="success"
          />
        </div>
      </li>
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object,
};

HomePage.propTypes = {
  // homePage: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // Your actions here
    },
    dispatch,
  );
}

const mapStateToProps = createStructuredSelector({
  homePage: selectHomePage(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(HomePage));
