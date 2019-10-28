const url = require('url');
let msgs = new Array();


exports.apiChat = function(req, res){
    let q = url.parse(req.url, true);

    if (q.pathname == "/chat/listmsgs") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});

        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));

    }

    else if (q.pathname == "/chat/addmsg") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});

        let obj = {};
        obj.user = q.query["user"];
        obj.text = q.query["msg"]; // TO DO parameter msg
        msgs.push(obj);
        res.end(JSON.stringify(obj));

    }
}