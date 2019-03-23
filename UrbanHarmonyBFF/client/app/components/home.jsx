import React from 'react';
import NewsRecord from './result.jsx'
import NewsResult from './newsResult.jsx'
import TopNews from './topNews.jsx'
import TopProject from './project/topProject.jsx'
import WorkingProject from './project/workingProject.jsx'
import PlannedProject from './project/plannedProject.jsx'
import DoneProject from './project/doneProject.jsx'
import IntNews from './intNews.jsx'
import CompetitionOfTheMonth from './competition/competitionOfTheMonth.jsx'

import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'

export class HomePage extends React.Component {
    render() {
        return (

            <div className="page-content" data-spy="scroll" data-target="#myTopnav" data-offset="200">
                {/* <!-- Carousel -->  */}
                <div id="home-sec" className="row">
                    <div className="col-xs-12 sec1 no-padding ">
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                            {/* <!-- Indicators --> */}
                            <ol className="carousel-indicators">
                                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                <li data-target="#myCarousel" data-slide-to="1"></li>
                                <li data-target="#myCarousel" data-slide-to="2"></li>
                            </ol>
                            {/* <!-- Wrapper for slides --> */}
                            <div className="carousel-inner">
                                <div className="item active">
                                    <div className="image-container-16x5">
                                        <img src="assets/images/sections/slider_img_01.jpg" className="carouselImg" alt="1" />
                                    </div>
                                    <TopNews news={this.props.news[0]} hide={this.props.news.length === 0} />

                                </div>
                                <div className="item">
                                    <div className="image-container-16x5">
                                        <img src="assets/images/sections/Main_IMAGE.png" className="carouselImg" alt="2" />
                                    </div>
                                    <TopProject oneproject={this.props.oneproject[0]} hide={this.props.oneproject.length === 0} />

                                </div>
                                <div className="item">
                                    <div className="image-container-16x5">
                                        <img src="assets/images/sections/karnak.jpg" className="carouselImg" alt="3" />
                                    </div>
                                    <div className="carouselContent">
                                        <CompetitionOfTheMonth hide={this.props.competition.length === 0}
                                            competition={this.props.competition} showTitle="true" />
                                        <a href="/competitionDetails">المزيد</a>
                                    </div>

                                </div>
                                {/* <!-- Left and right controls --> */}
                                <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                    <span className="glyphicon glyphicon-triangle-left"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                    <span className="glyphicon glyphicon-triangle-right"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Our Vision -->  */}
                <div id="ourvision-sec " className="row" id="about">
                    <div className="col-xs-12 no-padding sec2">
                        <div className="col-xs-12 sec2-all">
                            <div className="col-xs-12 col-sm-5 sec2RightSide nopadding-mobile">
                                <div className="image-container-16x9">
                                    {/* <iframe className="videoDisplay col-xs-12"
                                        width="560" height="315" src="https://www.youtube.com/embed/WB1-H25b3DY" frameborder="0" allow="autoplay; encrypted-media" allowFullScreen>

                                    </iframe> */}
                                    <img src="assets/images/logo/urban-harmony-logo-video.jpeg" />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-7 sec2LeftSide nopadding-mobile">
                                <div className="sec2LeftSideText col-xs-12">
                                    <h2>رؤيتنا و أهدافنا</h2>
                                    <p>يهدف الجهاز إلى تحقيق القيم الجمالية للشكل الخارجى للأبنية والفراغات العمرانية والأثرية وأسس النسيج البصرى للمدن والقرى وكافة المناطق الحضارية للدولة، بما فى ذلك المجتمعات العمرانية الجديدة.</p>
                                    <a className="sec2Btn" href="/vision"> المزيد </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--Services--> */}
                <div id="impservecis-sec" className="row" id="services">
                    <div className="sec3 col-xs-12 no-padding">
                        <h2 className="sec-h2">أهم الخدمات</h2>
                        <div className="col-xs-12 col-sm-6 sec3LeftSide">
                            <div className="col-xs-12 col-sm-10 upperCard leftCard no-padding serviceCard">
                                <div className="card-img col-xs-12 col-sm-7 no-padding ">
                                    <div className="image-container-4x3">
                                        <img className="sec3CardImg" src="assets/images/sections/services_01.jpg" />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-5 cardText">
                                    <h2>المرصد الحضاري</h2>
                                    <p>
                                        رصد وتسجيل الجهاز للتغيرات الايجابية والسلبية التي تحدث في العمران المصري
                                    </p>
                                    <a className="serviceCardMoreBtn" href="/allIncidents">المزيد</a>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-10 downCard leftCard no-padding serviceCard">
                                <div className=" card-img col-xs-12 col-sm-7 no-padding ">
                                    <div className="image-container-4x3">
                                        <img className="sec3CardImg" src="assets/images/sections/services_04.jpg" />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-5 cardText">

                                    <h2>مكاتب إستشارية</h2>
                                    <p>
                                        دليل لبعض  المكاتب الاستشارية التى يمكن التعامل معها لتوفير تصاميم وفقا لمعاير الجهاز
                                    </p>
                                    <a className="serviceCardMoreBtn" href="/consultingOffices">المزيد</a>
                                    {/* <form action="#">
                                        <div className="advbtn-cont stickTotheBottom">
                                            <input className="advisoryBtn" type="submit" value="أدرج مكتبك كخبير" />
                                        </div>
                                    </form> */}
                                </div>
                            </div>


                        </div>
                        <div className="col-xs-12 col-sm-6 sec3RightSide">
                            <div className="col-xs-12 col-sm-10 upperCard rightCard no-padding serviceCard">
                                <div className="card-img col-xs-12 col-sm-7 no-padding ">
                                    <div className="image-container-4x3">
                                        <img className="sec3CardImg" src="assets/images/sections/services_02.jpg" />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-5 cardText">

                                    <h2>قوائم الحصر و التظلمات</h2>
                                    <p>
                                        فى ضوء صدور القانون رقم 144 لسنه 2006 بشأن الحفاظ على المبانى ذات الطراز المعمارى المتميز وقد تشكلت لجان لحصر المبانى والمنشآت الصادر بها قرار من المحافظ المختص وتقوم لجنة حصر المبانى والمنشآت بقيد العقارات المحظور هدمها فى سجلات يوضح بها أسباب القيد للمبانى والمنشآت
                                    </p>
                                    <a className="serviceCardMoreBtn" href="/complainsDetail">المزيد</a>
                                    {/* <form action="#">
                                        <div className="advbtn-cont stickTotheBottom">
                                            <input className="complaintBtn" type="submit" value="قدم تظلمك" />
                                        </div>
                                    </form> */}
                                </div>


                            </div>
                            <div className="col-xs-12 col-sm-10 downCard rightCard no-padding serviceCard">
                                <div className=" card-img col-xs-12 col-sm-7 no-padding ">
                                    <div className="image-container-4x3">
                                        <img className="sec3CardImg" src="assets/images/sections/services_03.jpg" />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-5 cardText">

                                    <h2>القوانين</h2>
                                    <p>
                                        القوانين والعقوبات المترتبة على مخالفة قواعد البناء في المناطق المتميزة.
                                    </p>
                                    <a className="serviceCardMoreBtn" href="/lawsDetails">المزيد</a>
                                </div>

                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className="col-xs-12 others-cont">
                                <a href="#" className="more-black" >خدمات أخرى</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Competitions -->  */}
                <div id="activities-sec" className="row" id="competitions">
                    <div className="col-xs-12 sec4">
                        <h2 className="sec-h2"> احداث وفاعليات </h2>
                        <div className="col-xs-12 cardsContainer nopadding-mobile">
                            <div className="col-xs-12 col-sm-10 competitionCardsContainer">
                                <div className="cardContainer col-xs-12  col-sm-4 nopadding-mobile">
                                    <div className="card col-xs-12 no-padding">
                                        <div className="cardImgContainer col-xs-12 no-padding">
                                            <div className="image-container-4x3">
                                                <img className="cardImg" src="assets/images/sections/competition_01.jpg" />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 comp-textitems-cont no-padding">
                                            <CompetitionOfTheMonth hide={this.props.competition.length === 0}
                                                competition={this.props.competition} showTitle="false" />

                                            <div className="col-xs-12 cardBtn stickTotheBottom">
                                                <a href="/competitionDetails" className="actionBtn 	btn" >للإشتراك في المسابقة  </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cardContainer col-xs-12  col-sm-4 nopadding-mobile">
                                    <div className="card col-xs-12 middleCard no-padding">
                                        <div className="cardImgContainer col-xs-12 no-padding">
                                            <div className="image-container-4x3">
                                                <img className="cardImg" src="assets/images/sections/competition_02.jpg" />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 comp-textitems-cont no-padding">
                                            <div className="cardText col-xs-12">
                                                <p>هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات أو عبارات محرجة أو غير لائقة مخبأة في هذا النص. </p>
                                                <a href="#">المزيد</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cardContainer col-xs-12  col-sm-4 nopadding-mobile">
                                    <div className="card col-xs-12 no-padding">
                                        <div className="cardImgContainer col-xs-12 no-padding">
                                            <div className="image-container-4x3">
                                                <img className="cardImg" src="assets/images/sections/competition_03.jpg" />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 comp-textitems-cont no-padding">
                                            <div className="cardText col-xs-12">
                                                <p>هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات أو عبارات محرجة أو غير لائقة مخبأة في هذا النص. </p>
                                            </div>
                                            <div className="col-xs-12 cardBtn stickTotheBottom">
                                                <button type="button" className="actionBtn 	btn">كراسة الشروط</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-xs-12">
                            <div className="col-xs-12 others-cont">
                                <a href="#" className="more-black" >المزيد من الفاعليات</a>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* <!-- Projects --> */}
                <div id="projects-sec" className="row" id="projects">
                    <div className="col-xs-12 sec5 no-padding">
                        <h2 className="sec-h2">مشروعات</h2>
                        <div className="col-xs-12 tabs-container">
                            <div className="col-xs-12">
                                <ul className="col-xs-12 col-sm-5 nav nav-tabs no-padding">
                                    <li className="active"><a data-toggle="tab" href="#menu3" id="1">مشروعات تمت</a></li>
                                    <li><a data-toggle="tab" href="#menu2">مشروعات مقترحة</a></li>
                                    <li><a data-toggle="tab" href="#menu1">مشروعات جارية</a></li>
                                </ul>
                            </div>
                            <div className="tab-content">

                                <div id="menu1" className="tab-pane fade col-xs-12 no-padding active in">
                                    <div className="col-xs-12 col-sm-10 tabsUpperRow" >
                                        <WorkingProject hide={this.props.working.length === 0}
                                            work={this.props.working} />
                                    </div>

                                </div>
                                <div id="menu2" className="tab-pane fade col-xs-12 no-padding">
                                    <div className="col-xs-12 col-sm-10 tabsUpperRow">
                                        <PlannedProject hide={this.props.planned.length === 0}
                                            plan={this.props.planned} />
                                    </div>

                                </div>
                                <div id="menu3" className="tab-pane fade col-xs-12 no-padding">
                                    <div className="col-xs-12 col-sm-10 tabsUpperRow">
                                        <DoneProject hide={this.props.done.length === 0}
                                            done={this.props.done} />


                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className="col-xs-12 others-cont">
                                <a href="/moreProjects" className="more-white" >المزيد من المشروعات</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--News--> */}
                <div id="lastnews-sec" className="row" id="news">

                    <div className="col-xs-12 no-padding sec6">
                        <h2 className="sec-h2">اخر الاخبار</h2>
                        <div className="filter-container col-xs-12 col-sm-10">
                            <input type="radio" id="pressCard" name="color" value="pressCard" />
                            <label className="filter-pressBtn filterBtn col-xs-4" htmlFor="pressCard">صحافة</label>
                            <input type="radio" id="newsCard" name="color" value="newsCard" />
                            <label className="filter-newsCard filterBtn col-xs-4" htmlFor="newsCard">أخبار</label>
                            <input type="radio" id="all" name="color" value="all" />
                            <label className="filter-allBtn filterBtn col-xs-4" htmlFor="all">الكل</label>

                            <NewsResult hide={this.props.articles.length === 0}
                                articles={this.props.articles} />

                            <IntNews hide={this.props.internalnews.length === 0}
                                internalnews={this.props.internalnews} />

                            <div className="col-xs-12">
                                <div className="col-xs-12 others-cont">
                                    <a href="/more" className="more-white" > المزيد من الأخبار </a>
                                </div>
                            </div>



                            {/* <!--NEWS CARDS END--> */}

                        </div>
                    </div>

                </div>
            </div>


        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    articles: state.articles,
    detail: state.detail,
    news: state.news,
    oneproject: state.oneproject,
    working: state.working,
    done: state.done,
    planned: state.planned,
    internalnews: state.internalnews,
    competition: state.competition,
});

const AppContainer = connect(
    mapStateToProps
)(HomePage);


export default AppContainer;







