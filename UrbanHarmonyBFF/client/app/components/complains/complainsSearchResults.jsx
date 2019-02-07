import { getComplainsList } from '../../actions/index.js'
import * as queryString from "query-string";
import { reset } from 'redux-form';

export default (async function ComplainSearchResults(values, dispatch) {
    console.log(values);

    if (values.streetName != null) {
        console.log(values.streetName);
        fetch('/complains/complainAddress/' + values.streetName, {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => dispatch(getComplainsList(data))

        );
    }
    else if (values != null) {
        let querySearch = queryString.stringify(values);
        console.log(querySearch);
        fetch('/complains/complainsSearch/' + querySearch, {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => dispatch(getComplainsList(data))

        );

    }
});


