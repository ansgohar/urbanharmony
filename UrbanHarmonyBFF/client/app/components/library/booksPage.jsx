import React from 'react';
import { connect } from 'react-redux';
import { getLibraryBooks } from '../../actions/index.js';

class BooksDetails extends React.Component {
    constructor(props) {
        super(props);
        this.getBooks();
    }


    getBooks() {
        fetch('/books', {
            method: 'GET'
        }).then(res => res.json()

        )
            .then(data => this.props.dispatch(getLibraryBooks(data))
            );

    }

    render() {
        return (
            typeof this.props.books === undefined ? <div /> : this.props.books.filter(arr => {
                if(arr.title === undefined){
                }
                if( (arr.bookCategory) && (arr.title) && (arr.bookCategory === this.props.query.category) && ((arr.title).includes(this.props.query.bookName))){                    
                    return arr
                }
                else if(this.props.query.bookName === ""){
                    
                    return arr
                }
                else if(arr.title === undefined){
                }
                else if((this.props.query.category === "All") && ((arr.title).includes(this.props.query.bookName))){
                    return arr

                }
            }).map(book => <BK record={book} key={book.id} />)
        );
    }
}

class BK extends React.Component {
    constructor(props) {
        super(props);
    }

    translateLabel(label) {
        if (label == 'history') {
            return 'حضارة وتاريخ'
        }
        else if (label == 'engineering') {
            return 'هندسة وتخطيط عمراني'
        }
        else if (label == 'sociology') {
            return 'علوم إجتماعية وبيئية'
        }
        else {
            return 'ادب وفنون'
        }
    }


    render() {
        return (
            <div class="col-xs-12 newscard-container nopadding-mobile">
                <div class="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">

                    <div class="image-container-3x4" style={this.props.record.image === "http://localhost:1337" ? {backgroundImage: 'url("/assets/images/no-image-4x3.png")', backgroundRepeat:'no-repeat', backgroundPosition:'center'  } : {backgroundImage: 'none' } }>
                        <img src= { (this.props.record.image) !== "http://localhost:1337" ? this.props.record.image : null} />
                    </div>
                </div>
                <div class="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                    <span class="cardCat book-label">{this.translateLabel(this.props.record.bookCategory)}</span>
                    <h3>{this.props.record.title}</h3>
                    <div class="col-xs-12 col-sm-6 no-padding book-table">
                        <table>
                            <tr>
                                <td>رقم الطبعة</td>
                                <td>{this.props.record.printingNO}</td>
                            </tr>
                            <tr>
                                <td>إسم السلسلة</td>
                                <td>{this.props.record.series}</td>
                            </tr>
                            <tr>
                                <td>عدد النسخ</td>
                                <td>{this.props.record.NumCopies}</td>
                            </tr>
                            <tr>
                                <td>الترقيم الدولي الموحد للكتاب</td>
                                <td>{this.props.record.ISBN}</td>
                            </tr>
                            <tr>
                                <td>المجموعة التي ينتمي إليها الكتاب</td>
                                <td>{this.translateLabel(this.props.record.bookCategory)}</td>
                            </tr>
                        </table>

                    </div>
                    <div class="col-xs-12 col-sm-6 no-padding book-table">
                        <table>
                            <tr>
                                <td>المؤلف</td>
                                <td>{this.props.record.author}</td>
                            </tr>
                            <tr>
                                <td>رقم التصنيف</td>
                                <td>{this.props.record.classNO}</td>
                            </tr>
                            <tr>
                                <td>الناشر</td>
                                <td>{this.props.record.publisher}</td>
                            </tr>
                            <tr>
                                <td>سنة النشر</td>
                                <td>{this.props.record.publishYear}</td>
                            </tr>
                            <tr>
                                <td>مكان النشر</td>
                                <td>{this.props.record.location}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}



export default connect()(BooksDetails);