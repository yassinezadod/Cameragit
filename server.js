const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 2000;

// Configurer la connexion à MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'data'
});

// Établir la connexion à MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connecté à MySQL');
});

// Utiliser body-parser pour récupérer les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route GET pour afficher le formulaire
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Définir la route pour soumettre le formulaire
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const sql = 'INSERT INTO utilisateurs (name, email) VALUES (?, ?)';
    connection.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        console.log('Données insérées :', result);

        res.send('Formulaire soumis avec succès');
    });
});

// Lancer le serveur
app.listen(port, () => {
    console.log('Serveur en écoute sur le port', port);
});
