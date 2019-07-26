var fs = require('fs');

var data = fs.readFileSync('./brandsAndModels.json', 'utf8');
var str = data.toString();
var json = JSON.parse(str);

var simple = {};
var brands = {};
var models = {};

for (let alphabet in json.brand) {
    let a = {};
    let aa = [];
    for (let b = 0; b < json.brand[alphabet].length; b++) {
        let brand = json.brand[alphabet][b];
        a[brand.name] = [];
        aa.push(brand.name);
        for (let c = 0; c < brand.child.length; c++) {
            let child = brand.child[c];
            if (child.hasOwnProperty('child')) {
                for (let d = 0; d < child.child.length; d++) {
                    a[brand.name].push(child.child[d].name);
                }
            } else {
                a[brand.name].push(child.name);
            }
        }
        models[brand.name] = a[brand.name];
    }
    simple[alphabet] = a;
    brands[alphabet] = aa;
}
fs.writeFileSync('./simpleBrandsAndModels.json', JSON.stringify(simple), 'utf8');
fs.writeFileSync('./brands.json', JSON.stringify(brands), 'utf8');
fs.writeFileSync('./models.json', JSON.stringify(models), 'utf8');
