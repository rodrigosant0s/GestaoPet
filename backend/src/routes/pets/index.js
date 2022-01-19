const { Router } = require('express');
const router = Router();

const pool = require('../../../database/connection');




// get all pets

router.get('/pet', async (req, res) => {
    const response = await pool.query('SELECT * FROM pets ORDER BY id ASC');
    res.status(200).json(response.rows);
});


// Select pet by id

router.get('/pet/:id', async (req, res) => {
    const petId = parseInt(req.params.id);
    const response =  await pool.query('SELECT * FROM pets WHERE id = $1', [petId]);
    
    res.status(200).json(response.rows[0]);
});


// create pet

router.post('/pet', async (req, res) => {
    const { animal_type, name } = req.body;
    const response = await pool.query("INSERT INTO pets (animal_type, name) VALUES ($1, $2)", [ animal_type, name]);
    
    res.status(200).json({
        message: 'pet registered successfully!',
        body: {
            pet: {animal_type, name}
        }
    })
});


// delete pet

router.delete('/pet/:id', async (req, res) => {
    const petId = parseInt(req.params.id);
    const response = await pool.query('DELETE FROM pets WHERE ID = $1', [petId]);

    res.status(200).json({
        message: 'pet deleted successfully',
    })
});


// update pet

router.put('/pet/:id', async (req, res) => {
    const petId = parseInt(req.params.id);
    const { animal_type, name } = req.body;
    const response = await pool.query('UPDATE pets SET animal_type = $1, name = $2 WHERE id = $3', [ animal_type, name, petId ]);

    res.status(200).json({
        message: 'pet updated successfully',
        body: {
            pet: { petId, animal_type, name }
        }
    })
});


module.exports = router;