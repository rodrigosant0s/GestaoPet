const { Router } = require('express');
const router = Router();

const pool = require('../../../database/connection');



// Rotas


// create spending

router.post('/spending', async (req, res) => {
    const { title, cost, pet_id } = req.body;

    const response = await pool.query('INSERT INTO spending (title, cost, pet_id) VALUES ($1, $2, $3)', [title, cost, pet_id]);

    res.status(200).json({
        message: 'spending registered successfully',
        body: {
            spending: { title, cost, pet_id }
        }
    })
});


// get all spending

router.get('/spending', async (req, res) => {
    const response = await pool.query('SELECT * FROM spending ORDER BY pet_id ASC');

    res.status(200).json(response.rows)
})


// get spending by id

router.get('/spending/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const response = await pool.query('SELECT * FROM spending WHERE id = $1', [id]);
    res.status(200).send(response.rows[0]);
});


// delete spending 

router.delete('/spending/:id', async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM spending WHERE id = $1', [id])

    res.status(200).json({
        message: 'spending deleted successfully'
    })
});

// update spending

router.put('/spending/:id', async (req, res) => {
    const id = req.params.id;
    const { title, cost } = req.body;

    const response = await pool.query('UPDATE spending SET title = $1, cost = $2 WHERE id = $3', [title, cost, id]);

    res.status(200).json({
        message: 'spending updated successfully',
        body: {
            pet: { title, cost }
        }
    })
})


module.exports = router;