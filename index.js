import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import pool from './db.js';

// pool.query('SELECT NOW()')
//     .then(res => console.log('Connexion DB OK :', res.rows[0]))
//     .catch(err => console.log('Erreur DB:', err));

const app = express();

app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT || 3000}`);
    
})

app.get('/genres', async (req, res) => {
    const result = await pool.query(
        'SELECT libelle FROM genre ORDER BY libelle ASC');
        res.json(result.rows);
})

app.get('/films', async(req,res) => {
    const result = await pool.query(
        'SELECT titre , genre.libelle FROM film JOIN genre ON film.genre_id=genre.id');
        res.json(result.rows);
})

app.get('/films/:id', async(req,res) => {
    try{
        const result = await pool.query('SELECT titre, genre.libelle FROM film JOIN genre ON genre.id=film.genre_id WHERE film.id = $1 ', [req.params.id]);
        
        if (result.rows.length === 0) {
            res.status(404).json({erreur: "Aucun film trouvé pour cet id"})
        } else {
            res.json(result.rows[0])
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({ erreur: "Une erreur est parvenue au cours de la requête"});
    }
})

app.get('/genres/:id/films', async(req,res) => {
    try{
        const result = await pool.query('SELECT titre, genre.libelle, annee FROM film JOIN genre ON genre.id=film.genre_id WHERE genre.id = $1 ORDER BY film.annee', [req.params.id]);
        
        if (result.rows.length === 0) {
            res.status(404).json({erreur: "Aucun genre trouvé pour cet id"})
        } else {
            res.json(result.rows)
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({ erreur: "Une erreur est parvenue au cours de la requête"});
    }
})

