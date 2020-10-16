import React from 'react';
import { connect } from 'react-redux';
import ComplainsData from './complainsData.jsx'
import SurveySearch from './search.jsx'
import AllComplainsList from './complainsList.jsx'
import searchResults from './searchResults.jsx';
import ComplainSearchResults from './complainsSearchResults.jsx';
import * as config from "../../../config/config";
import ReactMarkdown from "react-markdown";

class ComplainsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: ''
        }
    }

    fetchPetitionDetails() {
        const host = `http://${config.host}:${config.cms_port}`;
        const path = `${host}/dynamictexts`;
        const query = `${path}?location=petition`;

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        };

        fetch(query, options)
            .then(res => res.json())
            .then(body => this.setState({info: body[0].details}))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchPetitionDetails();
    }

    render() {
        return (

            <div id="borders-page" className="row search-page">
                <div className="col-xs-12 no-padding ">
                    <h2 className="sec-h2">قوائم الحصر و التظلمات</h2>
                    <div className="col-xs-12 tabs-container no-padding">
                        <div className="col-xs-12 filter-tabs">
                            <ul className="col-xs-12 col-sm-5 nav nav-tabs no-padding">
                                <li className="active"><a data-toggle="tab" href="#menu1">قوائم الحصر</a></li>
                                <li><a data-toggle="tab" href="#menu2">موقف التظلم و الاحكام</a></li>
                            </ul>
                        </div>
                        <div className="tab-content">

                            <div id="menu1" className="tab-pane fade col-xs-12 no-padding active in">
                                <div className="col-xs-12 col-sm-10 limitheader-cont no-padding">
                                    <div className="col-xs-12 no-padding">
                                        <h2 className="col-xs-12">مقدمة عن قوائم الحصر</h2>
                                        <h2 className="col-xs-12">يمكنك البحث في قوائم حصر العقارات المميزة وتقديم تظلمك للبث فيه</h2>
                                    </div>
                                </div>

                                <SurveySearch compID="surveySearch" governorates={this.props.governorates} regions={this.props.regions}
                                    surveyList={this.props.surveyList} onSubmit={searchResults} />

                                <div className="col-xs-12 search-result">
                                    <div className="col-xs-12 result-title"> المباني داخل الحي  </div>
                                    <strong>** يمكنك تكبير أو تصغير القوائم بسحبهم لليمين أو اليسار</strong>
                                    {/* =========== REACT TABLEEEE ============ */}
                                    <ComplainsData surveyList={this.props.surveyList} />

                                </div>
                            </div>

                            <div id="menu2" className="tab-pane fade col-xs-12 no-padding">
                                <div className="col-xs-12  infopannel-sec nopadding-mobile">
                                    <div className="col-xs-12 col-sm-10 infopannel-cont">
                                        <div className="col-xs-12 nopadding-mobile">
                                            <ul className="col-xs-12 nav nav-tabs">
                                                <li className="active"><a data-toggle="tab" href="#menu1tab1" aria-expanded="false">معلومات عن تقديم التظلمات</a></li>
                                                <li className=""><a data-toggle="tab" href="#menu1tab3" aria-expanded="true">متابعة التظلم</a></li>
                                            </ul>
                                            <div className="col-xs-12 tab-content nopadding-mobile">
                                                <div id="menu1tab1" className="col-xs-12 tab-pane subtab fade active in">
                                                    <ReactMarkdown source={this.state.info} />
                                                </div>
                                                <div id="menu1tab3" className="col-xs-12 tab-pane subtab fade no-padding">

                                                    <div className="col-xs-12 col-sm-10 limitheader-cont no-padding">
                                                        <div className="col-xs-12 no-padding">
                                                            <h2 className="col-xs-12">مقدمة عن التظلمات.يمكنك البحث في قوائم التظلمات لمتابعة تظلمك </h2>
                                                        </div>
                                                    </div>

                                                    <SurveySearch compID="complainSearch" governorates={this.props.governorates} regions={this.props.regions}
                                                        complainsList={this.props.complainsList} onSubmit={ComplainSearchResults}  />

                                                    <div className="col-xs-12 search-result">
                                                        <div className="col-xs-12 result-title">
                                                            <strong>** يمكنك تكبير أو تصغير القوائم بسحبهم لليمين أو اليسار</strong>
                                                        </div>
                                                        <AllComplainsList complainsList={this.props.complainsList} />

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


}


const mapStateToProps = (state, ownProps) => ({
    complainData: state.complainData,
    surveyList: state.surveyList,
    governorates: state.governorates,
    regions: state.regions,
    complainsList: state.complainsList,
});

export default connect(mapStateToProps)(ComplainsPage);
