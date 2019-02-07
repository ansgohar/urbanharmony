/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import NotificationProvider from '../NotificationProvider'
import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';
import { Alert } from 'reactstrap';



import axios from 'axios';

import Button from 'components/Button';

import Logo from 'assets/images/background_welcome_homepage.png';

import messages from './messages.json';
import styles from './styles.scss';
import { BeatLoader } from 'react-spinners';
import { showNotification } from '../NotificationProvider/actions.js';

var update = require('immutability-helper');

const Wrapper = styled.section`
  background: #f5f5f5;
  text-align: center;
  display: block;
`;
const Wrapper2 = styled.section`
margin:auto
display:block
text-align:center;
background:   #888888;
text-align: center;
border: 3px solid #C8C8C8;

`;
const Wrapper3 = styled.section`
color:white;
margin:auto
background:   #C8C8C8;
border: 3px solid #C8C8C8;
display:block;
overflow:hidden;
height: 100%;

`;

const Wrapper4 = styled.section`
margin:auto
display:block
text-align:center;
background:  #DCDCDC;
height:40px;
`;
const Wrapper5 = styled.section`
margin:auto
display:block
text-align:center;
background:  #DCDCDC;
display:block;
overflow:hidden;
height: 100%;

`;
const Wrapper6 = styled.section`
bottom-margin:auto
display:block
text-align:center;
background:    black;
display:block;
overflow:auto;
height: 100%;
`;
const Wrapper7 = styled.section`
bottom-margin:auto
display:block
text-align:center;
background:    #F5F5F5;
height:40px;
`;

const Wrapper8 = styled.section`
width: 655px;
margin: auto;
`;

const Title = styled.span`
  font-size: 1em;
  text-align: right;
  color: black;
`;

const Button2 = styled.button`
  font-size: 18px;
  margin-top: 14px;
  color: #f44336;
  margin: 1em 1em;
  color: white;
  border: 2px solid white;
  width: 150px;
  heigh: 60px;
`;
const Image = styled.img`
  width: 600;
  height: 600;
  border: 2px solid white;
`;

const Div1 = styled.div`
  top-margin: 0.5em;
  width: 300px;
  height: 100px;
  color: blue;
  display: block;
  text-align: center;
  background: #dcdcdc;
`;

const Editable = styled.div`
  text-align: right;
  text-transform: lowercase;
  font-style: normal;
  font-size: 22px;
  margin-top: 5%;
`;
const EditablePlaceholder = styled.div`
  [contenteditable]:not(:focus):empty::after {
    content: attr(placeholder);
  }
`;

/* eslint-disable  jsx-a11y/anchor-has-content */

export class HomePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    NewsArticles: [],
    file: '',
    val: '',
    html: '',
    loading: true
  };

  handle(e) {
    this.setState({
      val: e.target.value,
    });
  }

  componentDidMount(event) {
    // let news =this.handle(event);
    //const query = 'التنسيق الحضاري';
    //const apiKey='4948ea4cb6644e54b5528b7bde411db9';
    var data = this.state.NewsArticles;
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
        console.log(`https://newsapi.org/v2/everything?q=${response.data.message.query}&apiKey=${response.data.message.APIKey}`)
        fetch(
          `https://newsapi.org/v2/everything?q=${response.data.message.query}&apiKey=${response.data.message.APIKey}`
        )
          .then(Response => Response.json())
          .then(findresponse => {
            console.log(findresponse.articles);

            this.setState({
              NewsArticles: findresponse.articles,
              loading: false,
            });
          });
      });



  }

  _handleSubmit(e) {
    e.preventDefault(); //dah bymna3 el loading
    // TODO: do something with -> this.state.file
  }

  handleDataChange(e, i, param) {
    var data = this.state.NewsArticles;
    this.setState({ html: e.target.value });

    if (param == 1) {
      var updated = update(this.state.NewsArticles[i], {
        title: { $set: e.target.value },
      });
    } else if (param == 2) {
      var updated = update(this.state.NewsArticles[i], {
        author: { $set: e.target.value },
      });
    } else if (param == 3) {
      var updated = update(this.state.NewsArticles[i], {
        publishedAt: { $set: e.target.value },
      });
    } else if (param == 4) {
      var updated = update(this.state.NewsArticles[i], {
        description: { $set: e.target.value },
      });
    }
    var newdata = update(data, { $splice: [[i, 1, updated]] });
    this.setState({
      NewsArticles: newdata,
    });
    //console.log(this.state.NewsArticles[i]);
  }

  async _handleShare(e, i) {
    e.preventDefault();
    var data = this.state.NewsArticles[i];
    var send = {
      URL: data.url,
      AuthorName: data.author,
      ArticleName: data.title,
      Description: data.description,
      ThumpURL: data.urlToImage,
      ImgURL: data.urlToImage,
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
      .get('../journal?ArticleName=' + data.title)
      .then(response => {
        //console.log(response.data)
        if (response.data.length == 0) {
          return axios
            .post('/auth/local', user, axiosConfig1)
            .then(response => {
              console.log(response.data.jwt);
              return axios.post('/journal', send, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + response.data.jwt,
                },
              });
            })
            .then(response => {
              console.log('Response', response);
              //strapi.notification.success('content-manager.success.record.delete');
              //this.props.dispatch(showNotification('Shared', 'success'));
              //strapi.notification.success('content-manager.news.success.shared'); 
            });

        }
        else {
          //this.props.dispatch(showNotification('Already Shared', 'error'));
          //strapi.notification.error('content-manager.news.error.shared'); 
        }
        window.scrollTo(0, 0)
      });

  }


  _handleImageChange(e, i) {
    //dah byhandle el ta3`yeer bta3 el sora
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    var data = this.state.NewsArticles;
    reader.onloadend = () => {
      var updated = update(this.state.NewsArticles[i], {
        urlToImage: { $set: reader.result },
      });
      var newdata = update(data, { $splice: [[i, 1, updated]] });

      this.setState({
        file: file,
        NewsArticles: newdata,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let data;

    if (this.state.loading) {
      data =
        <Wrapper8>
          <div className={styles.wrapper}>
            <div className='sweet-loading' >
              <BeatLoader
                color={'#123abc'}
                loading={this.state.loading}
              />
            </div>
          </div>
        </Wrapper8>


    } else {
      let { NewsArticles } = this.state;
      if (NewsArticles == null) {
        return (
          <div>
            <body />
            <h1>No Result Found</h1>
          </div>
        );
      }
      data =
        <Wrapper>

          <div className={styles.wrapper}>
            <h1>{this.state.val}</h1>
            <Helmet title="Home Page" />

            {this.state.NewsArticles.map((dynamicData, i) => {
              return (

                <div>
                  <Wrapper2>
                    <Wrapper3>
                      <div className="col-lg-12">
                        <div className="col-lg-1"> </div>
                        <div className="col-lg-4">
                          <h3>
                            <a
                              className="text-dark"
                              target="_blank"
                              href={dynamicData.url}
                            >
                              {dynamicData.source.name}
                            </a>{' '}
                          </h3>
                        </div>
                        <div className="col-lg-1"> </div>

                        <div className="col-lg-5">
                          <h3>
                            <Title>

                              {NewsArticles[i].title}
                              >
                          </Title>
                          </h3>{' '}
                        </div>
                        <div className="col-lg-1"> </div>
                      </div>
                    </Wrapper3>
                    <Wrapper4>
                      <div className="text-light bg-dark">
                        <div className="col-lg-4">
                          <div>
                            <div>
                              <EditablePlaceholder>
                                <ContentEditable
                                  placeholder="Enter Author name"
                                  html={NewsArticles[i].author} // innerHTML of the editable div
                                  disabled={false} // use true to disable edition
                                  onChange={e => this.handleDataChange(e, i, 2)} // handle innerHTML change
                                />
                              </EditablePlaceholder>
                            </div>
                          </div>
                        </div>
                        <ContentEditable
                          html={dynamicData.publishedAt}
                          disabled={false} // use true to disable edition
                          onChange={e => this.handleDataChange(e, i, 3)}
                        />
                      </div>
                    </Wrapper4>

                    <Wrapper5>
                      <div className="row">
                        <div className="col-lg-12">
                          {/* <div className="col-lg-1"></div> */}
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="col-lg-4 ">
                                    <Image
                                      src={NewsArticles[i].urlToImage}
                                      alt=""
                                      width="500px"
                                      height="450px"
                                    />

                                    <div
                                      className="fileupload fileupload-new"
                                      data-provides="fileupload"
                                    >
                                      <Div1 className="fileupload-preview thumbnail">
                                        <div>
                                          <span className="btn btn-file">
                                            <input
                                              type="file"
                                              onChange={e =>
                                                this._handleImageChange(e, i)
                                              }
                                            />
                                          </span>
                                        </div>
                                      </Div1>
                                    </div>
                                    <div className="col-lg-1 col-md-7" />
                                  </div>
                                </td>
                                <td>
                                  <Editable>
                                    <div className="col-lg-7">
                                      <div>
                                        <ContentEditable
                                          html={dynamicData.description} // innerHTML of the editable div
                                          disabled={false} // use true to disable edition
                                          onChange={e => this.handleDataChange(e, i, 4)} // handle innerHTML change
                                        />
                                      </div>
                                    </div>
                                  </Editable>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="col-lg-1" />
                        </div>{' '}
                      </div>
                    </Wrapper5>

                    <Wrapper6>
                      <Button2
                        className="btn btn-primary"
                        onClick={e => this._handleShare(e, i)}
                      >
                        Share
                    </Button2>
                    </Wrapper6>
                  </Wrapper2>
                  <Wrapper7 />
                </div>
              );
            })}
          </div>
        </Wrapper>
    }
    return (
      <div>
        {data}
      </div>
    )
  }


}



HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(HomePage);
