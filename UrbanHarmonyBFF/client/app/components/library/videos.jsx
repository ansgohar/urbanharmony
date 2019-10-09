import React from 'react';
import { connect } from 'react-redux';
import { getVideos } from '../../actions/index.js'


class AllVideos extends React.Component {
    constructor(props) {
        super(props);
        this.getAllVideos();
    }

    getAllVideos() {
        fetch('/videos', {
            method: 'GET'
        }).then(res => res.json()
        ).then(data => this.props.dispatch(getVideos(data))
        );
    }

    render() {
        if (this.props.hide) {
            return null;
        }

        let video = this.props.videos;
        return video.map(a => {
            return <VID record={a} key={a.id} />;
        });
    }
}


class VID extends React.Component {
    constructor(props) {
        super(props);
    }

    convertDateToArabic(date) {
        console.log(date)
        if (date) {
            let arabicDate = new Date(date);
            console.log(arabicDate.toLocaleDateString('ar-EG'))
            return arabicDate.toLocaleDateString('ar-EG');
        }
        else {
            return '' };

    }

    render() {

        function getId(url) {
            var regExpYoutube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var regExpFacebook = /facebook\.com\/([A-z0-9\.]+)\/videos(?:\/[0-9A-z].+)?\/(\d+)(?:.+)?$/gm;
            var matchYoutube = url.match(regExpYoutube);
            var matchFacebook = url.match(regExpFacebook);

               if(matchYoutube && matchYoutube[2].length == 11) {
                    let srcY = "//www.youtube.com/embed/"+matchYoutube[2];
                    // return srcY;
                    return <iframe className="iframe-size" width="560" height="315" src={srcY} frameborder="0" allowfullscreen/>
            }
             

             else if(matchFacebook){

            
                let list=matchFacebook[0].split("/")
               

                let id;

                for (let i=0 ; list.length>i ; i++){
                    if(list != undefined && list[i].match(/^[0-9]+$/) != null){
                        id = list[i];
                    }
                }
               

                let srcF = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F"+id+"%2F&width=500&show_text=false&height=280&appId" ;

                // return srcF;
                return  <iframe className="iframe-size" src={srcF} width="500" height="280"  scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true"/>
            }
        
            else{

                // return url;
                return <iframe className="iframe-size" src={url}/>

            }
        }
        
        return (
            <div className="tile pressCard col-xs-12 padding-mobile">
                <div className="col-xs-12 newscard-container no-padding">
                    <div className="col-xs-12 col-sm-4 news-rightSide nopadding-mobile">
                        <table className="default-table no-border-table">
                            <tr className="table-row">
                                <td className="table-data table-header">اسم القناة/الاذاعة </td>
                                <td className="table-data">{this.props.record.channel}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">اسم البرنامج</td>
                                <td className="table-data">{this.props.record.title}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> تاريخ البث </td>
                                <td className="table-data">{this.convertDateToArabic(this.props.record.Date)}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header"> اسماء الضيوف </td>
                                <td className="table-data">{this.props.record.guests}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">موضوع اللقاء</td>
                                <td className="table-data">{this.props.record.description}</td>
                            </tr>

                            <tr className="table-row">
                                <td className="table-data table-header">معلومات أخرى  </td>
                                <td className="table-data">{this.props.record.MoreDetails}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="col-xs-12 col-sm-6 news-leftSide nopadding-mobile">
                        {getId(this.props.record.url)} 
            {/* <iframe className="iframe-size" src={getId(this.props.record.url)}/> */}
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    }
}

export default connect()(AllVideos);