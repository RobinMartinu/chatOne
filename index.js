const http = require('http');

const fs = require('fs');
let citac = 0;

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
    if (req.url == "/") {
        citac++; //dtto citac=citac+1
        processStaticFiles(res, "/index.html");
        return;
    }
    if (req.url.length - req.url.lastIndexOf(".") < 6){
        processStaticFiles(res, req.url);
        return;
    }

    if (req.url == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>blablabla</body></html>");
    } else if (req.url == "/jsondemo") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Bob";
        obj.prijmeni = "Bobíček";
        obj.rokNarozeni = 2002;
        res.end(JSON.stringify(obj));


    } else if (req.url == "/jsoncitac") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.pocetVolani = citac;
        res.end(JSON.stringify(obj));

    }


    else if (req.url == "/den") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
        let d = new Date();
        let obj = {};
        obj.sysDatum = d;
        obj.denCislo = d.getDay();
        obj.datumCesky = d.getDate() + "." + d.getMonth();
        res.end(JSON.stringify(obj));

    } else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: " +citac + "</body></html>");
    }
}).listen(8888);