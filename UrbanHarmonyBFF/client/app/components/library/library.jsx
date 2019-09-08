import React from 'react';
import { connect } from 'react-redux';
import BooksDetails from './booksPage.jsx';
import AllVideos from './videos.jsx';

class LibraryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            bookName:"EMPTY",
            category:"All"
        }
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


                                <div class="col-xs-12  col-sm-8 search-barcont" style={{zIndex: "3"}}>
                                    <div class="col-xs-12 col-sm-7 searchbar">
                                        <label class="fieldLabel col-xs-12 nopadding-mobile">بحث بإسم</label>
                                        <input class="input-search" id="query"/>
                                    </div>

                                    <div class="col-xs-12 col-sm-3 search-in">
                                        <label class="fieldLabel col-xs-12 nopadding-mobile">البحث في</label>
                                        <select class="search-drop formDropdown" id="bookCategory">
                                            <option value="All" selected>كل الكتب</option>
                                            <option value="literature">أدب و فنون </option>
                                            <option value="sociology">علوم إجتماعية و بيئية</option>
                                            <option value="engineering" >هندسة و تخطيط عمراني</option>
                                            <option value="history" >حضارة و تاريخ</option>
                                        </select>
                                    </div>


                                    <div class="col-xs-12 col-sm-2 searchbar-btn">
                                        <a id="searchLibrary" >
                                        <button class="btn btn-info submitFormBtn" 
                                        id="searchLibrary-input" 
                                        onClick={()=>{this.setState(prevState =>{
            return {
                bookName: document.getElementById("query").value , 
                category: document.getElementById("bookCategory").value
            }
        })}}>بحث</button>
                                        </a>
                                        
                                    </div>

                                    <div class="col-xs-12 col-sm-2 searchbar-btn">
                                        <a id="resetSearch">
                                            <button class="btn btn-info submitFormBtn" id="searchLibrary-reset"
                                            onClick={()=>{ document.getElementById("query").value = "";
                                            document.getElementById("bookCategory").value = "All";
                                            this.setState(prevState =>{
                                                return {
                                                    bookName: document.getElementById("query").value , 
                                                    category: document.getElementById("bookCategory").value
                                                }
                                            })

                                            }}> اخلاء خانات البحث </button>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-xs-12  col-sm-10 library-cardscont" style={{paddingBlock: "25px"}}>
                                    <h3 class="col-xs-12 librarysearch-result nopadding-mobile">نتيجة البحث</h3>
                                    <BooksDetails books={this.props.books} query={this.state}/>
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
