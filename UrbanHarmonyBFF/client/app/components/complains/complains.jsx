import React from 'react';
import { connect } from 'react-redux';
import ComplainsData from './complainsData.jsx'
import Governorates from './governorates.jsx'
import SurveySearch from './search.jsx'
import AllComplainsList from './complainsList.jsx'
import ReactTable from "react-table";
import searchResults from './searchResults.jsx';
import ComplainSearchResults from './complainsSearchResults.jsx';

class ComplainsPage extends React.Component {
    constructor(props) {
        super(props);
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
                                <li><a data-toggle="tab" href="#menu2">التظلمات</a></li>
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
                                                {/* <li className=""><a data-toggle="tab" href="#menu1tab2" aria-expanded="false">قدم تظلمك</a></li> */}
                                                <li className=""><a data-toggle="tab" href="#menu1tab3" aria-expanded="true">متابعة التظلم</a></li>
                                            </ul>
                                            <div className="col-xs-12 tab-content nopadding-mobile">
                                                <div id="menu1tab1" className="col-xs-12 tab-pane subtab fade active in">
                                                    <p>
                                                        فى ضوء صدور القانون رقم 144 لسنه 2006 بشأن الحفاظ على المبانى ذات الطراز المعمارى المتميز وقد تشكلت لجان لحصر المبانى والمنشآت الصادر بها قرار من المحافظ المختص وتقوم لجنة حصر المبانى والمنشآت بقيد العقارات المحظور هدمها فى سجلات يوضح بها أسباب القيد للمبانى والمنشآت.
                                                    </p>
                                                    <p>
                                                        ويمكن لذوى الشأن التظلم من القرارات النهائية للجنة الحصر بعد اعتمادها من السيد رئيس مجلس الوزراء بالقيد ضمن العقارات المحزور هدمها وذلك بالتقدم بطلب للجنة التظلمات المشكلة بقرار من رئيس مجلس الوزراء خلال شهر من تاريخ الاخطار.
                                                    </p>
                                                    <p>
                                                        المستندات المطلوب للتقدم بطلب تظلم :-
                                                    <br />
                                                        طلب تظلم بأسم رئيس لجنه التظلمات .
                                                    <br />
                                                        صورة عقد ملكية العقار .
                                                    <br />
                                                        صورة التوكيل ( فى حالة وجود موكل ).
                                                    <br />
                                                        شهادة مشتملات ( العوايد ).
                                                    <br />
                                                        سداد رسوم تظلم 75 جم ( خمسة وسبعون جنيهاً ) بديوان عام وزارة الثقافة – بميدان الكيت كات – امبابة – الجيزة أو دفع رسم تظلم عن طريق مكتب البريد لصالح وزارة الثقافة وإحضار صورة من الأخطار .
                                                    </p>
                                                </div>
                                                {/* <div id="menu1tab2" className="col-xs-12 tab-pane subtab fade">
                                                    <div className="col-xs-12 progressbar-cont">
                                                        <ul className="col-xs-12 progressbar">
                                                            <li className="passed"><div className="progress-style"><div className="prog-contentsty">معلومات شخصية</div></div></li>
                                                            <li className=""><div className="progress-style"><div className="prog-contentsty">معلومات عن التظلم</div></div></li>
                                                            <li className=""><div className="progress-style"><div className="prog-contentsty">الدفع</div></div></li>
                                                            <li className=""><div className="progress-style"><div className="prog-contentsty">تأكيد الإجرائات</div></div></li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-xs-12 competitionDetailsForm">
                                                        <form className="form-horizontal" action="#">
                                                            <div className="form-group">
                                                                <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="Name">الاسم<span className="requiredField">*</span></label>
                                                                <div className="col-xs-12 col-sm-3 formField">
                                                                    <input className="form-control" placeholder="" type="text" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="email">السن</label>
                                                                <div className="col-xs-12 col-sm-3 formField">
                                                                    <input className="form-control" placeholder="" type="text" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="fieldLabel col-sm-1 col-xs-12" htmlFor="email">المهنة</label>
                                                                <div className="col-xs-12 col-sm-3 formField">
                                                                    <input className="form-control" placeholder="" type="text" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="fieldLabel col-sm-1 col-xs-12"> البريد الإلكتروني<span className="requiredField">*</span></label>
                                                                <div className="col-xs-12 col-sm-3 formField">
                                                                    <input className="form-control" placeholder="" type="email" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="fieldLabel col-sm-1 col-xs-12">المحمول<span className="requiredField">*</span></label>
                                                                <div className="col-xs-12 col-sm-3 formField">
                                                                    <input className="form-control" placeholder="" type="text" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="fieldLabel col-sm-1 col-xs-12">وسيلة التواصل المفضلة</label>
                                                                <div className="formCheckBox col-xs-12 col-sm-3">
                                                                    <label className="mobCheckBox">
                                                                        <input type="checkbox" />
                                                                        محمول </label>
                                                                    <label className="emailCheckBox">
                                                                        <input type="checkbox" />
                                                                        بريد إلكتروني</label>
                                                                </div>
                                                                <input className="btn btn-info submitFormBtn" value="حفظ" type="submit" />
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div> */}
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
