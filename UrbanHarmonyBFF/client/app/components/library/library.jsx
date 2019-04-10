import React from 'react';
import { connect } from 'react-redux';
import BooksDetails from './booksPage.jsx';
import AllVideos from './videos.jsx';

class LibraryPage extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div id="borders-page" class="row library-page">
                <div class="col-xs-12 no-padding ">
                    <h2 class="sec-h2">مكتبة الجهاز</h2>
                    <div class="col-xs-12 tabs-container no-padding">
                        <div class="col-xs-12 filter-tabs">
                            <ul class="col-xs-12 col-sm-5 nav nav-tabs no-padding">
                                <li class="active"><a data-toggle="tab" href="#menu1">المكتبة العامة</a></li>
                                <li><a data-toggle="tab" href="#menu2">تسجيلات الجهاز </a></li>
                                {/* <li><a data-toggle="tab" href="#menu3">دراسات و بحوث</a></li> */}
                            </ul>
                        </div>
                        <div class="tab-content">

                            <div id="menu1" class="tab-pane fade col-xs-12 no-padding active in">


                                <div class="col-xs-12  col-sm-8 search-barcont">
                                    <div class="col-xs-12 col-sm-7 searchbar">
                                        <label class="fieldLabel col-xs-12 nopadding-mobile">بحث بإسم</label>
                                        <input class="input-search" />
                                    </div>

                                    <div class="col-xs-12 col-sm-3 search-in">
                                        <label class="fieldLabel col-xs-12 nopadding-mobile">البحث في</label>
                                        <select class="search-drop formDropdown">
                                            <option value="كل الكتب" selected>كل الكتب</option>
                                            <option value="">أدب و فنون </option>
                                            <option value="vw">علوم إجتماعية و بيئية</option>
                                            <option value="audi" >هندسة و تخطيط عمراني</option>
                                            <option value="audi" >حضارة و تاريخ</option>
                                        </select>
                                    </div>


                                    <div class="col-xs-12 col-sm-2 searchbar-btn">
                                        <button class="btn btn-info submitFormBtn">بحث</button>
                                    </div>
                                </div>

                                <div class="col-xs-12  col-sm-10 library-cardscont">
                                    <h3 class="col-xs-12 librarysearch-result nopadding-mobile">نتيجة البحث</h3>
                                    <BooksDetails books={this.props.books} />
                                </div>

                            </div>

                            <div id="menu2" class="tab-pane fade col-xs-12 no-padding">

                                <AllVideos videos={this.props.videos} />

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => ({
    books: state.books,
    videos: state.videos
});

export default connect(mapStateToProps)(LibraryPage);
