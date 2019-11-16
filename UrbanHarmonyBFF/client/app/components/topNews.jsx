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
                {/* <img class="thumb-img" src={this.props.rec.image}></img> */}
                 <h2 className="h2NewsTop">{this.props.rec.title}</h2>
                <Image src={this.props.rec.image} class={"thumb-img-news"}/> 
                </div>
               
            <p>{this.props.rec.article}</p> 
            <a target="_blank" href={this.props.rec.linkURL}>مصدر الخبر</a>
        </div>
        );
    }
}


export default connect()(TopNews);