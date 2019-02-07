import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import MorePressNews from './pressnews.jsx';
import { getPressNews } from '../actions/index'
import IntNews from './intNews.jsx'
import AllIntNews from './moreInternalNews.jsx'

class MoreNews extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="news-home" className="row news-home">

                <div className="col-xs-12 no-padding sec6">
                    <h2 className="sec-h2">اخر الاخبار</h2>
                    <div className="filter-container">

                        {/* <input type="radio" id="conferenceCard" name="color" />
                        <label className="filter-conBtn filterBtn  col-xs-3" htmlFor="conferenceCard">مؤتمرات</label> */}
                        <input type="radio" id="pressCard" name="color" value="pressCard"/>
                        <label className="filter-pressBtn filterBtn  col-xs-4" htmlFor="pressCard">صحافة</label>
                        <input type="radio" id="newsCard" name="color" value="newsCard"/>
                        <label className="filter-newsCard filterBtn  col-xs-4" htmlFor="newsCard">أخبار</label>
                        <input type="radio" id="all" name="color" value="all"/>
                        <label className="filter-allBtn filterBtn  col-xs-4" htmlFor="all">الكل</label>


                        <MorePressNews hide={this.props.pressNews.length === 0}
                            pressNews={this.props.pressNews} />

                        <AllIntNews hide={this.props.allinternalnews.length === 0}
                            allinternalnews={this.props.allinternalnews} />


                        {/* <div className="tile conferenceCard col-xs-12 nopadding-mobile">
                            <div className="col-xs-12 newscard-container no-padding">
                                <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                                    <div className="image-container-4x3">
                                        <img src="assets/images/sections/news_01.png" />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                                    <span className="cardCat">مؤتمرات</span>

                                    <h3>هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم</h3>
                                    <span className="author">كتبة أحمد محمود يوم ٢٥ مارس ٢٠١٨</span>
                                    <p>لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم
                                        في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن
                                        الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن
                                    كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. </p>
                                    <a href="#">اقرأ المزيد</a>
                                </div>
                            </div>

                        </div> */}
                    </div>
                </div>

            </div>


        );
    }
}



const mapStateToProps = (state, ownProps) => ({
    pressNews: state.pressNews,
    allinternalnews: state.allinternalnews,
});

const MoreContainer = connect(
    mapStateToProps
)(MoreNews);


export default MoreContainer;
