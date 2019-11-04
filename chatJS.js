listMsgs = "http://localhost:8888/chat/listmsgs";
addMsg = "http://localhost:8888/chat/addmsg";


// DOWNOAD NPM I NGROK
// RUN BY
    // NGROK HTTP <PORT>
// blocked by school firewall

//-----------------------
// DOWNOAD NPM I SERVEO
// RUN BY
// ssh -R 80:localhost:8888 serveo.net


const HOST = window.location.protocol + "//" + window.location.hostname + ((window.location.port) ? ":" + window.location.port : "");

function fetchFrom(url){

    return fetch(url).then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);

            let msgs = "";

            for (let i = obj.messages.length - 1; i >= 0; i--){
                msgs += '<b>' + obj.messages[i].user + '</b>' +": " + obj.messages[i].text  + '<br>';
            }

            document.getElementById("messages").innerHTML = msgs;

        });
    });
}

function btnUpdateMsg() {
   fetchFrom(`${HOST}/chat/listmsgs`);
   alert(`${HOST}`);
}

function btnSendMsg(){
    if(document.getElementById("newMsg").value !== "") {
        let user = document.getElementById("user").value;
        let msgContent = document.getElementById("newMsg").value;
        let url = `${HOST}` + "/chat/addmsg?msg=" + msgContent + "&user=" + user;
        document.getElementById("newMsg").value = "";
        fetch(url).then();

        fetchFrom(`${HOST}/chat/listmsgs`);
    }

}
