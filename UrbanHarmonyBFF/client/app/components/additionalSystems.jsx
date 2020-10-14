import React from 'react';
import * as config from '../../config/config.js';
import AdditionalSystemsItem from './additionalSystemsItem.jsx';

class AdditionalSystems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            dataLength: 0,
            indicators: [],
            items: []
        };
    }

    componentDidMount() {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({identifier: config.user, password: config.pass})
        };
        const baseURL = `http://${config.host}:${config.cms_port}`
        let path = `/auth/local`;

        fetch(`${baseURL}${path}`, options)
            .then(res => res.json())
            .then(body => body.jwt)
            .then(token => {
                options.method = 'GET';
                options.headers['Authorization'] = `Bearer ${token}`
                delete options.body;
                delete options.headers['Content-Type'];

                path = '/subsys';

                fetch(`${baseURL}${path}`, options)
                    .then(res => res.json())
                    .then(body => {
                        let toShow = [];
                        body.forEach(value => {
                            if (value.show) {
                                toShow.push(value);
                            }
                        });
                        console.info(body);
                        this.setState({
                           data: toShow,
                           dataLength: toShow.length
                        });

                        this.createCarouselItems();
                    })
            })
            .catch(error => console.error(error));
    }

    createCarouselItems() {
        let indicators = [];
        for (let i = 0; i < this.state.dataLength; ++i) {
            if (i === 0) {
                indicators.push(<li data-target="#secondaryCarousel" data-slide-to={i.toString()} className="active"></li>)
            } else {
                indicators.push(<li data-target="#secondaryCarousel" data-slide-to={i.toString()}></li>)
            }
        }

        let items = [];
        for (let i = 0; i < this.state.dataLength; ++i) {
            let currentData = this.state.data[i];
            if (i === 0) {
                items.push(<AdditionalSystemsItem active={true} title={currentData.title}
                                                  details={currentData.details} link={currentData.link} image={currentData.image}/>)
            } else {
                items.push(<AdditionalSystemsItem title={currentData.title}
                                                  details={currentData.details} link={currentData.link} image={currentData.image}/>)
            }
        }

        this.setState({
            indicators,
            items
        });
    }

    render() {
        if (!this.state.dataLength) {
            return '';
        }

        return (
            <div id="additionalServices" className="row">
                <div className="col-xs-12 no-padding additionalSec">
                    <div className="sec-h2" style={{color: 'white'}}>خدمات أضافية</div>
                    <div id="secondaryCarousel" className="carousel slide" data-ride="carousel">
                        {/* <!-- Indicators --> */}
                        <ol className="carousel-indicators">
                            {this.state.indicators}
                        </ol>
                        {/* <!-- Wrapper for slides --> */}
                        <div className="carousel-inner">
                            {this.state.items}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdditionalSystems;