import React from 'react';
import { connect } from 'react-redux';

class Guidelines extends React.Component {
    constructor(props) {
        super(props);
        
        
    }

//    componentDidMount(){
//        
//        setTimeout(slickTrigger, 0);
//    }
    
    


    render() {
        
        
        return (
            <div id="menu3" className="tab-pane fade col-xs-12 no-padding">
                <div className="col-xs-12 col-sm-10 limitheader-cont">
                    <div className="col-xs-12">
                        <h2 className="col-xs-12">مقدمة عن القوانين والعقوبات المترتبة على مخالفة قواعد البناء في المناطق المتميزة. مقدمة عن القوانين والعقوبات
                        المترتبة على مخالفة قواعد البناء في المناطق المتميزة</h2>
                    </div>
                </div>
        
                    <div className="swiper-container">
                        <div className="swiper-wrapper">

                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="image-container-4x3">
                                    <img src="assets/images/img.png" alt="#" className="img-slider-img" />
                                </div>
                            </div>

                        </div>
                        {/* <!-- Add Pagination --> */}
                        <div className="swiper-pagination"></div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>
             



                <div className="col-xs-12 col-sm-8 pdfsec-cont">
                    <iframe src="assets/images/sections/lamborgini.pdf" style={{ width: '100%', height: '800px', border: 'none' }}></iframe>
                </div>
            </div>

        );
    }
}


export default connect()(Guidelines);