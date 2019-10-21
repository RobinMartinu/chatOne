url = "http://localhost:8888/svatek";
function fetchFrom(url){
    fetch(url.then(function(response) {
        response.text().then(function(text) {
            let obj = JSON.parse(text);

        });
    });
}

function loadNameDay(url){
    let date = document.getElementById("date").valueAsDate;
    fetch(url.then(function(response) {
        response.text().then(function(text) {
            let obj = JSON.parse(text);
            document.getElementById("svatek").innerHTML = obj.svatek;
        });
    });
}
