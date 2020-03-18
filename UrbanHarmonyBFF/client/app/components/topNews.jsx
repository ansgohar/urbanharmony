import React from 'react';
import { getNews } from '../actions/index'
import { connect } from 'react-redux';
import Image from '../components/image.jsx'

class TopNews extends React.Component {
    constructor(props) {
        super(props);
    }

   async firstNews() {
        await fetch('/articles', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getNews(data))
            );

    }

    componentDidMount() {
        this.firstNews();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let rec = this.props.news;
        return (
            <News rec={this.props.news}/>

        );
    }
}

class News extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="carouselContent">
            <div className="thumb-cont">
                {/*console.info(this.props.rec) && this.props.rec.newImage1 && this.props.rec.newImage1 !== 'http://localhost:1337' ? <Image src={this.props.rec.newImage1} class={"thumb-img-news"}/> : ''*/}
                {this.props.rec.image && this.props.rec.image.url ? <Image class={"thumb-img-news"} src={`http://localhost:1337/${this.props.rec.image.url}`} /> : ''} 
                 <h2 className="h2NewsTop">{this.props.rec.title}</h2> 
                </div>
               
            <p>{this.props.rec.article}</p> 
            <a target="_blank" href={this.props.rec.linkURL}>مصدر الخبر</a>
        </div>
        );
    }
}


export default connect()(TopNews);