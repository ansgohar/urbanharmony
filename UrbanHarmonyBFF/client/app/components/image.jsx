import React from 'react'
import {connect} from 'react-redux'
import {getImage} from '../actions/index'
import * as fetch from 'node-fetch';



class Image extends React.Component {
    constructor(props){
        super(props);
    }


    checkUrl(url){
        if (url === undefined){
            return false
        }

        let status = true
        let imageNotAvailable = "/assets/images/no-image-3x4.png";

        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        
        fetch(url, options)
            .then(res => res.json())
            .then(c => {
                if(Object.values(c)[0] === 404){
                    status = false;
                    
                }
            }).catch(err => {
                console.error(err);
            });

        if(url && (typeof url) === 'string' && (url.match(/\.(jpeg|jpg|gif|png)$/)) == null){
                status = false
            }

        //console.log(status + " " + url)
        return status ? url : imageNotAvailable;

    }

    render(){
        let imgUrl = this.checkUrl(this.props.src)
        let imgClass = {};
        if(this.props.class !== undefined){
            imgClass = this.props.class
        }

        return(
            <img alt="" src={imgUrl} className={imgClass} />
        )
        
    }
}

export default connect()(Image);