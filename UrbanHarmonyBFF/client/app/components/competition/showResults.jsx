export default (async function showResults(values) {

    fetch("/competition", {
        body: JSON.stringify(values),
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',

    })
        .then(res => res.json())
        .then(json => {
            json.status === 'success' ?
                window.alert(`تم استلام طلبكم .. برجاء مراجعة بريدك الالكترونى`) :
                window.alert(`أنت بالفعل مشترك فى مسابقة الشهر`)
        });
});
