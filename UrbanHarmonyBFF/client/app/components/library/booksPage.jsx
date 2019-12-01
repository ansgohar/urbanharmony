import React from 'react';
import { connect } from 'react-redux';
import { getLibraryBooks } from '../../actions/index.js';
import Image from '../image.jsx'

class BooksDetails extends React.Component {
    constructor(props) {
        super(props);
        this.getBooks();
        this.state={
            books:[]
        }
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

         //   typeof this.props.books === undefined ? <div /> : 
         let queryBookName = this.props.query.bookName;
         let queryBookCategory = this.props.query.category;


         function checkbook (book, query){
             
             if( book && query && book.includes(query)){
              
                        return true;  
             }
            
             return false

         
        }

         if (this.props.query.bookName == "EMPTY"){
             return this.props.books.map(book => <BK record={book} key={book.id} />)
         }
            
            
            let booklist = this.props.books.filter(arr => {
                if(arr.title === undefined){
                    
                     
                }
                
                 // case 01: book name & category both matched
                else if( (arr.bookCategory) && (arr.title) && (arr.bookCategory === queryBookCategory) && (checkbook(arr.title, queryBookName))){      
                    //console.log("case 01: book name & category both matched")              
                    return arr
                }
                // case 02: no empty bookname query
                else if(queryBookName.match(/^$/)){
                    //console.log("case 02: no empty bookname query");
                    // case 02.1: empty bookname with category name
                    if(queryBookCategory == arr.bookCategory){
                        //console.log("case 02.1: empty bookname with category name");
                        return arr
                    // case 02.2: empty bookname with no category
                    }else if(queryBookCategory === "All"){
                        //console.log("case 02.2: empty bookname with no category");
                        return arr
                    }
                    
                }
                // case 03: bookname matched and category is empty
                else if((queryBookCategory === "All") && (checkbook(arr.title, queryBookName))){
                    //console.log("case 03: bookname matched and category is empty")              

                    return arr

                }})


            let noresult = 

                <div class="col-xs-12 newscard-container nopadding-mobile">
                    <div class="nopadding-mobile">
                        <h2 style={{paddingTop: "12px", textAlign: "center"}}>لا يوجد نتيجة للبحث</h2>
                    </div>
                </div>
                   
            
                
            console.log(booklist)
            
            return booklist[0] === undefined ? noresult : booklist.map(book => <BK record={book} key={book.id} />) ;

            // if (booklist[0] != undefined){
            //     return booklist.map(book => <BK record={book} key={book.id} />)
            // }else {
            //     return
            //        <div>
            //             <h2 style={{paddingTop: "12px", textAlign: "center"}}>لا يوجد نتيجة للبحث</h2>
            
            //        </div> }  
       
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
            return ''
        }
    }


    render() {

        const abstractAvialable = this.props.record.abstract != undefined;
        return (
            <div class="col-xs-12 newscard-container nopadding-mobile">
                <div class="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">

                    <div class="image-container-3x4" >
                    <Image src={this.props.record.image} /> 

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
                            {!abstractAvialable ? "" : <React.Fragment><tr><td>نبذة</td><td>{this.props.record.abstract}</td></tr></React.Fragment>}
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