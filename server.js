const express = require('express'); 
const pool = require('./database'); 
const err=require('err');
const cors = require('cors') 
const port = process.env.PORT || 5000; 
 
const app = express(); 
 
app.use(cors()); 
app.use(express.json()); 
app.listen(port, () => { 
    console.log("Server is listening to port " + port) 
});

app.get("/refuge", async (req, res) => {
    
    const { country, region, sommet } = req.query; 
    console.log(country,region,sommet);
    try {
        console.log("get posts request has arrived"); 
        const localisation = `${region}, ${country}`;
        const results = await pool.query(
            `
            SELECT r.*
            FROM refuge r
            JOIN relier_sommet_refuge rsr ON r.id_refuge = rsr.id_refuge
            JOIN sommet s ON rsr.id_sommet = s.id_sommet
            WHERE 
            ($1::text IS NULL OR r.localisation ILIKE '%' || $1 || '%')
            AND ($2::text IS NULL OR s.nom ILIKE '%' || $2 || '%');
            `,
            [localisation, sommet]
        );
        res.json(results.rows);
    } catch (error) {
        console.error("Erreur lors de la recherche :", error.message);
        res.status(500).send("Erreur lors de la recherche");
    }
});


/*
app.get('/posts', async(req, res) => { 
    try { 
        console.log("get posts request has arrived"); 
        const posts = await pool.query( 
            "SELECT * FROM refuge;" 
        ); 
        res.json(posts.rows); 
    } catch (err) { 
        console.error(err.message); 
    } 
});
*/