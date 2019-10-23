listMsgs = "http://localhost:8888/chat/listmsgs";
addMsg = "http://localhost:8888/chat/addmsg";
const HOST = window.location;

function fetchFrom(url){

    return fetch(url).then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);

            let msgs = "";

            for (let i = obj.messages.length - 1; i >= 0; i--){
                msgs += obj.messages[i].text  + '\n'
            }

            document.getElementById("messages").innerHTML = msgs;

        });
    });
}

function btnUpdateMsg() {
   fetchFrom(`${HOST}/listmsgs`);
   // alert(`${HOST}`);
}

function btnSendMsg(){
    let msgContent = document.getElementById("newMsg").value;
    let url = `${HOST}` + "/addmsg?msg=" + msgContent;
    document.getElementById("newMsg").value = "";
    fetch(url).then();

    fetchFrom(`${HOST}/listmsgs`);

}
