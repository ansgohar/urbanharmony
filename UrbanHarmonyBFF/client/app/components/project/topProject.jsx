import React from 'react';
import { getProject } from '../../actions/index'
import { connect } from 'react-redux';
import Image from '../image.jsx'

class TopProject extends React.Component {
    constructor(props) {
        super(props);
    }

    firstProject() {
        fetch('/project/working', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.props.dispatch(getProject(data))
            );

    }
    componentDidMount() {
        this.firstProject();
    }

    render() {
        if (this.props.hide) {
            return null;
        }
        let rec = this.props.oneproject;
        return (
            <Prj rec={this.props.oneproject} />

        );
    }
}

class Prj extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="carouselContent">
                <h1 style={{"paddingTop": "15px"}}>
                    {/* <img class="thumb-img" src={this.props.rec.image}></img> */}
                    <Image src={this.props.rec.image} class={"thumb-img"}/> 

                    {this.props.rec.title}</h1>
                <p>{this.props.rec.event}</p>
                <a href={"/projectDetail?project=" + this.props.rec.id}>المزيد</a>
            </div>
        );
    }
}


export default connect()(TopProject);