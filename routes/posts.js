const express = require('express');
const router = express.Router();
const Tache = require('../models/Tache');

//Route Get
router.get('/', async (req,res) => {
	try{
		const taches = await Tache.find();
		res.json(taches);
	}catch(err){
		res.json({message : err});
	}
});

//Route Post
router.post('/', async (req,res) => {
	const tache = new Tache({
		description: req.body.description,
		faite: req.body.faite
	});
	try{
		const savedTache = await tache.save();
		res.json(savedTache);
	}catch(err){
		res.json({message : err});
	}
});

module.exports = router;