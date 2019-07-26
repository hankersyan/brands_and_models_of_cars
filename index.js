const request = require('request');
var fs = require('fs');
const jsolParse = require('./jsol');

let url = 'http://api.car.bitauto.com/CarInfo/getlefttreejson.ashx?tagtype=chexing&pagetype=masterbrand&objid='
request(url + '0', (err, res, body) => {
  if (err) { return console.log(err); }
  // console.log(body);
  let str = body.substring(body.indexOf('(') + 1, body.lastIndexOf(')'));
  let json = jsolParse(str);
  var brandsAndModels = jsolParse(str);

  var ids = [];

  for (let c in json.brand) {
    for (let cc in json.brand[c]) {
      ids.push({ alpha: c, subindex: cc, id: json.brand[c][cc].id });
    }
  }

  var promises = ids.map(function (itm) {
    return new Promise(function (resolve, reject) {
      request(url + itm.id, (err2, res2, body2) => {
        if (err2) { return reject(err2); }
        // console.log(body2);
        let str2 = body2.substring(body2.indexOf('(') + 1, body2.lastIndexOf(')'));
        let json2 = jsolParse(str2);
        brandsAndModels.brand[itm.alpha][itm.subindex].child = json2.brand[itm.alpha][itm.subindex].child;
        resolve();
      });
    });
  });

  Promise.all(promises)
    .then(function () {
      let jsonStr = JSON.stringify(brandsAndModels);
      console.log(jsonStr);
      fs.writeFileSync('brandsAndModels.json', jsonStr, 'utf8');
    })
    .catch(console.error);
});