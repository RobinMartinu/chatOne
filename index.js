const http = require('http');

const fs = require('fs');

const url = require('url');



const apiDenVTydnu = require('./modules/api-denvtydnu').apiDenVTydnu;
const apiSvatek = require('./modules/api-svatek').apiSvatek;
const apiChat = require ('./modules/api-chat').apiChat;


let citac = 0;
let msgs = new Array();


function processStaticFiles (res, fileName){
    fileName = fileName.substr(1);
    console.log(fileName);
    let contentType = "text/html";

    if (fileName.endsWith(".png")){
        contentType = "image/png";
    } else if (fileName.endsWith(".jpg")){
        contentType = "image/jpeg";
    }

    if (fs.existsSync(fileName)){
        fs.readFile(fileName, function(err, data) {
                res.writeHead(200, {'Content-Type': contentType});
                res.write(data);
                res.end();
            }
        )
    } else {
        res.writeHead(404);
        res.end();
    }

}

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    if (q.pathname == "/") {
        citac++; //dtto citac=citac+1
        processStaticFiles(res, "/index.html");
        return;
    }
    if (q.pathname.lastIndexOf(".") > -1 && q.pathname.length - q.pathname.lastIndexOf(".") < 6){

        processStaticFiles(res, req.url);
        return;
    }

    if (q.pathname == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>blablabla</body></html>");

    } else if (q.pathname == "/jsondemo") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Bob";
        obj.prijmeni = "Bobíček";
        obj.rokNarozeni = 2002;
        res.end(JSON.stringify(obj));

    } else if (q.pathname == "/jsoncitac") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.pocetVolani = citac;
        res.end(JSON.stringify(obj));

    }

    else if (q.pathname == "/denVTydnu") {
       apiDenVTydnu(req, res);

    } else if (q.pathname.startsWith("/chat/") ) {
        apiChat(req, res);




    } else if (q.pathname == "/svatek") {
        apiSvatek(req,res);

    } else if (q.pathname == "/chat") {
        processStaticFiles(res, "/chat.html");
        return;
    }



    else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: " +citac + "</body></html>");
    }
}).listen(8888);