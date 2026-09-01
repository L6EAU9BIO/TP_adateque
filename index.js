import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import pool from './db.js';

const app = express();

app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT || 3000}`);
    
})

app.get('/genres', async (req, res) => {
    try {
        const result = await pool.query(
        'SELECT libelle FROM genre ORDER BY libelle ASC');
        res.json(result.rows);
    } catch (err) { console.log(err);
        res.status(404).json({ erreur: "Une erreur est parvenue au cours de la requête"});
    }
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

// Question : en quoi cette route diffère-t-elle de GET /films?genre_id=3 ? Écris ta réponse en commentaire.
// La route '/genres/:id/films' se base sur une route dédiée, tandis ce que '/films?genre_id=3' se base sur la route '/films' et lui ajoute le paramètre de filtre '?genre_id=3' pour chercher les film qui possède l'id de genre 3

app.get('/films', async(req,res) => {
    try {
        const id = req.query.genre_id ?? null;
        const disponible = req.query.disponible ?? null;
        const colonnesAutorisees = {titre:'titre',annee: 'annee', duree: 'duree_minute'};
        const colonnesParDefaut = 'titre';
        const tri = colonnesAutorisees[req.query.tri] ?? colonnesParDefaut; 
        const result = await pool.query(
            `SELECT titre , genre.libelle FROM film JOIN genre ON film.genre_id=genre.id WHERE genre_id = COALESCE($1,genre_id) AND disponible = COALESCE($2,disponible) ORDER BY ${tri}`, [id,disponible]);
            res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(404).json({ erreur: "Une erreur est parvenue au cours de la requête"})
    }
})

app.get ('/stats', async(req,res) => {
    try {
        const result = await pool.query('SELECT COUNT(*), AVG(duree_minute),genre.libelle FROM film JOIN genre ON film.genre_id = genre.id GROUP BY genre.libelle ORDER BY COUNT(*) DESC');
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(404).json({ erreur: "Une erreur est parvenue au cours de la requête"})
    }
})