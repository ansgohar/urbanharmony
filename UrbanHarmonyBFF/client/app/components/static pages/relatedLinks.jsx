import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

class RelatedLinks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="project-details" className="row project-details">
                <div className="col-xs-12 no-padding ">
                    <h2 className="sec-h2 add-padding">مواقع ذات صلة</h2>
                    <div className="add-margin">
                        <div className="col-sm-6 section-right-side related-links">
                            <p><a href="http://www.lib.berkeley.edu/" target="_blank">مكتبة جامعة كاليفورنيا</a></p>

                            <p><a href="http:\\www.planning.org" target="_blank">الجمعية الأمريكية للمخططين المعتمدين</a></p>

                            <p><a href="http:\\www.undp.org" target="_blank">برنامج التنمية للأمم المتحدة </a></p>

                            <p><a href="http:\\www.akdn.org" target="_blank">شبكة الأغاخان للتنمية</a></p>

                            <p><a href="http:\\www.adpsr-norcal.org" target="_blank"> موقع للمعماريين والمصممين والمخططين للمسئوليات الإجتماعية</a></p>

                            <p><a href="http:\\www.cnu.org" target="_blank">موقع العمران الجديد بالولايات المتحدة الأمريكية </a></p>

                            <p><a href="http:\\www.gardenvisit.com" target="_blank">موقع لتصميم الحدائق وتنسيق المواقع</a></p>

                            <p><a href="http:\\www.makingcitieswork.org" target="_blank"> مواقع استراتيجية  التنمية للمدن</a></p>

                            <p><a href="http:\\www.greatbuildings.com" target="_blank">موقع المبانى  العظيمة</a></p>

                            <p><a href="http:\\www.architectureweek.com" target="_blank">موقع الاسبوع المعمارى</a></p>

                            <p><a href="http:\\www.sustainable.doe.gov" target="_blank">موقع قسم الصحة والخدمات الأهلية بالولايات المتحدة</a></p>

                            <p><a href="http:\\www.ecotopia.com" target="_blank">موقع خاص بالحفاظ البيئى والتنمية المستدامة </a></p>

                            <p><a href="http:\\www.urban.org" target="_blank">http:\\www.urban.org</a></p>

                            <p><a href="http:\\www.carfree.com" target="_blank">http:\\www.carfree.com</a></p>

                            <p><a href="http:\\www.worldcarfree.net" target="_blank">http:\\www.worldcarfree.net</a></p>

                            <p><a href="http:\\www.greenways.gov.uk" target="_blank">http:\\www.greenways.gov.uk</a></p>

                            <p><a href="http:\\www.transportation.org" target="_blank">http:\\www.transportation.org</a></p>

                            <p><a href="http:\\www.sasaki.com" target="_blank">http:\\www.sasaki.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}

export default connect()(RelatedLinks);
