# brands_and_models_of_cars
汽车品牌和型号数据库，抓取自易车网。对于简单用途，如：关联选择汽车品牌和型号，只需要引用brands.json和models.json。


# 运行
npm install

node index.js # 抓取完整数据 brandsAndModels.json

node simple.js # 提炼数据 simpleBrandsAndModels.json、brands.json、models.json

## brands.json 提炼后，按字母归类的品牌，3kb
## models.json 提炼后，品牌下型号，26kb