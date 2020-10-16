import React from 'react';
import * as config from '../../config/config.js';

class AdditionalSystemsItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const isActive = (this.props.active ? 'item active' : 'item');

        return(
            <div className={isActive}>
                <div className="col-xs-12 additionalSec-all">
                    <div className="col-xs-12 col-sm-5 secAdditionalRightSide nopadding-mobile">
                        <div className="secAdditionalText col-xs-12">
                            <h2>{this.props.title}</h2>
                            <p>{this.props.details}</p>
                            <a href={this.props.link} target='_blank'>للمزيد اضغط هنا</a>
                        </div>
                    </div>
                    {/*If no image is found do not render the image*/}
                    {this.props.image && this.props.image.url ? <div className="col-xs-12 col-sm-7 secAdditionalLeft nopadding-mobile">
                        <div className="secAdditionalLeftSidePic">
                            <img className="image-size" src={`http://${config.host}:${config.cms_port}${this.props.image.url}`} alt="Test"/>
                        </div>
                    </div> : ''}
                </div>
            </div>
        );
    }
}

export default AdditionalSystemsItem