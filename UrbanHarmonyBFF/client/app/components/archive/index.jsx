import React, {Component} from 'react';
import ReactMarkdown from "react-markdown";

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="project-details" className="row project-details">
                <div className="col-xs-12 no-padding greyish-background">
                    <h2 className="sec-h2 add-padding">اﻷرشيف</h2>
                    <div className="add-margin">
                        <div className="col-sm-6 section-right-side related-links">
                            <ul>
                                <li>
                                    <a href="/newsArchive">ارشبف أخبار الجهاز</a>
                                </li>
                                <li>
                                    <a href="/journalsArchive">ارشبف الصحافة</a>
                                </li>
                                <li>
                                    <a href="/competitionsArchive">ارشبف المسابقات</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;