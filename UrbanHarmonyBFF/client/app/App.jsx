import React from 'react';
import HomePage from './components/home.jsx';
import MoreNews from './components/moreNewsPage.jsx';
import DetailInternal from './components/internalDetails.jsx'
import CompetitionDetails from './components/competition/competitionDetails.jsx'
import MoreProjects from './components/project/moreProjects.jsx'
import ProjectDetails from './components/project/projectDetails.jsx'
import ComplainsPage from './components/complains/complains.jsx'
import LawsBordersPage from './components/laws-borders/allcontent.jsx'
import Vision from './components/static pages/vision.jsx'
import ContactUs from './components//static pages/contactUS.jsx'
import RelatedLinks from './components/static pages/relatedLinks.jsx'
import LibraryPage from './components/library/library.jsx'
import GlobalSearchPage from './components/global search/searchPage.jsx';
import CompetitionInfo from './components/competition/competitionINFO.jsx';
import ConsultingOffices from './components/consultingOffices/consultOffices.jsx';
import ConsultingOfficeDetails from './components/consultingOffices/consultingOfficeDetails.jsx';
import AllIncidents from './components/incidents/incidents.jsx';
import IncidentDetails from './components/incidents/incidentDetails.jsx';
import Conferences from './components/conference/conferences.jsx';

import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class App extends React.Component {

    render() {

        return (
            <div className="container-fluid no-padding">
                {/* <!-- Navbar -->  */}
                <div className="row">
                    <header>
                        <div className="col-xs-12 navbar sticky no-padding">
                            <div className="nav-right-side col-xs-2 no-padding">
                                <a id="logo" href="/"><img className="nav-brand" src="assets/images/logo/urban-harmony-logo.jpeg" /></a>
                            </div>
                            <div className="burger-menu no-padding"><a href="#" className="burg-icon">&#9776;</a></div>
                            <nav className="navul col-xs-12 col-sm-12 col-md-10 no-padding">
                                <ul id="myTopnav" className="col-xs-12 col-sm-12 col-md-10 topnav">

                                    <li className="menu-position active"><a href="/" id="home">الرئيسية</a></li>
                                    <li className="menu-position"><a href="/vision" >عن الجهاز</a></li>
                                    <li id="imp-service-menu" className="menu-position">
                                        <a href="#services">أهم الخدمات<strong class="caret"></strong> </a>
                                        <ul id="imp-service-sub" class="second-level" style={{'width':'200px', marginTop: 0}}>
                                            <li><a href="/complainsDetail">قوائم الحصر والتظلمات</a></li>
                                            <li><a href="/allIncidents">المرصد الحضاري و الظبطية القضائية</a></li>
                                            <li id="dropdow" style={{"width": "200px"}}><a href="/lawsDetails">القوانين</a></li>
                                            <li><a href="/consultingOffices">مكاتب إستشارية</a></li>
                                        </ul>

                                    </li>
                                    <li className="menu-position"><a href="/competitionDetails" > مسابقات</a></li>
                                    <li className="menu-position"><a href="/conferences" >ندوات </a></li>
                                    <li className="menu-position"><a href="/moreProjects" >مشروعات</a></li>
                                    <li className="menu-position"><a href="/more" >الأخبار</a></li>
                                    <li className="menu-position"><a href="/library" id="lib">مكتبة الجهاز</a></li>
                                    <li className="menu-position"><a href="http://urbanharmony.org/grievance/">تسجيل و متابعة التظلمات</a></li>
                                </ul>
                                <div className="col-xs-6 col-sm-4 col-md-2 search-cont">
                                    <a id="searchBTN" onClick={()=> {
                                         document.getElementById('searchBTN').href = "/search?query=" + document.getElementById('globalsearch').value;
                                    }}>
                                        <img src="/assets/images/icons/search.png" />
                                    </a>
                                    {/* <button className="search-btn" type="submit"></button> */}
                                    <input className="search-input" type="search" id="globalsearch" />
                                </div>
                            </nav>
                        </div>
                    </header>
                </div>

                {/* Routes Will Go Here  */}

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/more" component={MoreNews} />
                    <Route path="/detail" component={DetailInternal} />
                    <Route path="/competitionDetails" component={CompetitionDetails} />
                    <Route path="/moreProjects" component={MoreProjects} />
                    <Route path="/projectDetail" component={ProjectDetails} />
                    <Route path="/complainsDetail" component={ComplainsPage} />
                    <Route path="/lawsDetails" component={LawsBordersPage} />
                    <Route path="/vision" component={Vision} />
                    <Route path="/contact-us" component={ContactUs} />
                    <Route path="/related-links" component={RelatedLinks} />
                    <Route path="/library" component={LibraryPage} />
                    <Route path="/search" component={GlobalSearchPage} />
                    <Route path="/competitionInfo" component={CompetitionInfo} />
                    <Route path="/consultingOffices" component={ConsultingOffices} />
                    <Route path="/consultingOfficeDetails" component={ConsultingOfficeDetails} />
                    <Route path="/allIncidents" component={AllIncidents} />
                    <Route path="/incidentDetails" component={IncidentDetails} />
                    <Route path="/conferences" component={Conferences} />
                </Switch>



                {/* <!-- Footer --> */}
                <div className="row">
                    <div className="col-xs-12 footerContainer no-padding">
                        <div className="footer col-xs-12 no-padding">
                            <div className="footerLeftSide col-xs-12 col-sm-3">
                                {/* <h2> النشرة الدورية</h2>
                                <h4> هل أنت مهتم باخر اخبار الجهاز</h4>
                                <button type="button" className="subscribeBtn">إشترك</button> */}
                            </div>
                            <div className="footerRightSide col-xs-12 col-sm-9">
                                <div className="footerLinks col-xs-12 no-padding">
                                    <a href="/vision">من نحن&#32;</a>
                                    <a href="/contact-us">إتصل بنا&#32;</a>
                                    <a href="/related-links">مواقع ذات صلة&#32;</a>
                                    <a href="#" enabled="false">الخصوصية&#32;</a>
                                    <a href="#" enabled="false">الشروط والأحكام&#32;</a>
                                </div>
                                <div className="col-xs-12 no-padding followUs">
                                    <span>تابعنا على</span>
                                    <a href="https://www.facebook.com/NOUH.Egypt/" target="blank" ><img src="assets/images/icons/facebook_icon.svg" alt="facebook" className="fbIcon" /></a>
                                    <a href="https://www.youtube.com/channel/UCn6HUs-FBOwl8--4WuKZiTw" target="_blank"><img src="assets/images/icons/youtube_icon.svg" alt="youtube" className="ytIcon"  /></a>
                                    <div className="copy-right">تم التصميم والتنفيذ بواسطة <img className="ibmIcon" src="assets/images/icons/ibm.png" alt="IBMCopyrights" /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





function equalizeHeights(itemSelector) {
    var maxHeight = 0;
    $(itemSelector).each(function () {
        if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });
    $(itemSelector).height(maxHeight);
}

$(document).ready(function () {
    equalizeHeights(".serviceCard .cardText");
    equalizeHeights(".competitionCardsContainer .comp-textitems-cont");
});


export default connect()(App);


$(document).ready(function () {
    $(".burg-icon").click(function () {
        $(".topnav").toggleClass("responsive");
    });
});

// $(document).ready(function(){
// $('body').scrollspy({
//     offset:200
//  });
// });
//search script
$(document).ready(function () {
    $(".search-btn").click(function () {
        $(".search-show").toggle();
    });

});

//script to switch checked radio button
$(function () {
    var $radios = $('input:radio[name=color]');
    if ($radios.is(':checked') === false) {
        $radios.filter('[value=all]').prop('checked', true);
    }
});

//script to fix scroll

$("#myTopnav a").on('click', function (event) {

    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;

        $('html, body').animate({ scrollTop: ($(hash).offset().top - 115) + 'px' }, 900);
        //, function(){
        //window.location.hash = hash;
        //});
    } // End if
});
