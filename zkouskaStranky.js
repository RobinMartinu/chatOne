function loadNameDay(){
    let date = document.getElementById("date").valueAsDate;
    fetch("http://localhost:8888/svatek?d=" + date.getDate() + "&m=" + (date.getMonth()+1) ).then(function(response) {
        response.text().then(function(text) {
            let obj = JSON.parse(text);
            document.getElementById("svatek").innerHTML = obj.svatek;
        });
    });
}

function loadPage(){
    document.getElementById("date").valueAsDate = new Date();
    loadNameDay();
}