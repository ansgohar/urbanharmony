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

    render() {
        return (
            <div className="tile pressCard col-xs-12 padding-mobile">
                <div className="col-xs-12 newscard-container no-padding">
                    <div className="col-xs-12 col-sm-3 news-rightSide nopadding-mobile">
                        <div className="image-container-4x3">
                            {/* Add image here */}
                            {/* <img src={this.props.record.image} /> */}
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-9 news-leftSide nopadding-mobile">
                        {/* Add Data here */}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(AllVideos);