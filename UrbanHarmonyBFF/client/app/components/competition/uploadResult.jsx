export default (async function uploadResult(values) {
    console.log(values);
    fetch("/competition", {
        body: JSON.stringify(values),
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'content-type': 'application/json'
        },
        method: 'PUT',

    })
        .then(res => res.json())
        .then(json => {
            window.alert(JSON.stringify(json));
        });
});
