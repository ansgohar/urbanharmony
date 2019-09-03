import React from 'react'
import {connect} from 'react-redux'
import {getImage} from '../actions/index'
import * as fetch from 'node-fetch';



class Image extends React.Component {
    constructor(props){
        super(props);
    }


    checkurl(url){
        if (url == undefined){
            return false
        }

        var status = true
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
                if(Object.values(c)[0] == 404){
                    status = false;
                    console.log(c)
                    
                }
            }).catch(err => {
                console.log(err)
            });

        if((url.match(/\.(jpeg|jpg|gif|png)$/)) == null){
                status = false
            };

        console.log(status + " " + url)
        return status ? url : imageNotAvailable;

    }

    render(){
        let imgurl = this.checkurl(this.props.src)
        console.log(imgurl)
        let imgClass = "";
        if(this.props.class != undefined){
            imgClass = this.props.class
        }

        return(
            <img src={imgurl} class={imgClass} ></img>
        )
        
    }
}

export default connect()(Image);