

exports.apiDenVTydnu = function (req, res) {
    res.writeHead(200, {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin":"*"
    });
    let d = new Date();
    let obj = {};
    obj.sysDatum = d;
    obj.denCislo = d.getDay();
    obj.datumCesky = d.getDate() + "." + d.getMonth();
    res.end(JSON.stringify(obj));
};