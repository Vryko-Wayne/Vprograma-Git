const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add',(req, res) => {
    res.render('links/add');
});

router.post('/add', async(req, res) =>{
    const { tittle, url, description } = req.body;
    const newlink = {
        tittle,
        url,
        description
    };
    // con la siguiente instruccion enviamos los dato del formulario a la base de datos
    await pool.query('INSERT INTO links set ?', [newlink]);
    req.flash('success', 'Link guardadillo');
    res.redirect('/links');
});

router.get('/', async(req, res) =>{
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', { links});
});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link pa la PM');
    res.redirect('/links');
});

router.get('/edit/:id', async (req,res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit',{link: links[0]});
});

router.post('/edit/:id', async(req, res) =>{
    const { id } = req.params;
    const { tittle, description, url } = req.body;
    const newlink = {
        tittle,
        description,
        url
    }; 
    //console.log(newlink);
    await pool.query('UPDATE links set ? WHERE id = ?', [newlink, id]);
    req.flash('success', 'Link quedo al pelo');
    res.redirect('/links');
});


module.exports = router;
