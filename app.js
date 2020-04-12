
const bodyParser= require('body-parser')
const express = require('express');
const fs = require('fs')
const app = express();
const port = 3000;

const read = fs.readFileSync('./data/Marque.json');
let data= JSON.parse(read);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/index'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/views'));




app.get('/', (req, res) => {
 res.render('pages/index',{data});
});


app.post('/add', (req, res) => {
	const { Marque,Collection,Categorie} = req.body;

	data.push({Marque:Marque, Collection:Collection, Categorie:Categorie});
	fs.writeFileSync('./data/Marque.json', JSON.stringify(data, null, 4));
	res.render('Marque.ejs');
});
app.listen(port, () => console.log(`localhost ${port}!`));
