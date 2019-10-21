listMsgs = "http://localhost:8888/chat/listmsgs";



function fetchFrom(url){

    return fetch(url).then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);
            let msgs = obj.messages[0].text  + '\n' + obj.messages[1].text;
            document.getElementById("messages").innerHTML = msgs;

        });
    });
}

function btnUpdateMsg() {
    document.getElementById("messages").innerHTML = JSON.stringify(fetchFrom(listMsgs));
}
