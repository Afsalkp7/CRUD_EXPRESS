const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine" , "ejs")
const PORT = process.env.PORT || 8089;


const {
    readData,
    writeData
    } = require ("./controller/control");




app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/add",(req,res)=>{
    var items = readData();
    const newItem = {
        id:items.length+1,
        name: req.body.name,
        description: req.body.desc,
        price: req.body.price
     };
    items.push(newItem);
    writeData(items);
    res.redirect('/items');
})

app.get('/items', (req, res) => {
    const items = readData();
    res.render('show', { items });
  });

  app.get('/edit/:id', (req, res) => {
    const items = readData();
    const itemId = parseInt(req.params.id);
    const item = items.find(item => item.id === itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.render('edit', { item });
  });


  app.post("/update/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const items = readData();
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).send('Item not found');
    }
    items[itemIndex] = {
      ...items[itemIndex],
      name: req.body.name,
      description: req.body.desc,
      price: req.body.price
    };
    writeData(items);
    res.redirect('/items');
  });
  

app.post("/delete/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const items = readData();
    const updatedItems = items.filter(item => item.id !== itemId);
    writeData(updatedItems);
    res.redirect('/items');
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

