const express = require('express');
const router = express.Router();
const Tache = require('../models/Tache');
const Joi = require("joi");

//Route Get
router.get('/', async (req,res) => {
    const schema = Joi.Tache({
        description: Joi.string().required(),
        faite: Joi.boolean().required(),
    });
	try{
		const taches = await Tache.find();
		res.json(taches);
	}catch(err){
		res.json({message : err});
	}
});

//Route Post
router.post('/', async (req,res) => {
    const schema = Joi.Tache({
        description: Joi.string().required(),
        faite: Joi.boolean().required(),
    });
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
//Get specific tache
router.get('/:tacheId', async (req,res) => {
    const schema = Joi.Tache({
        description: Joi.string().required(),
        faite: Joi.boolean().required(),
    });
	try{
		const tache = await Tache.findById(req.params.tacheId);
		res.json(tache);
	} catch(err){
		res.json({ message: err});
	};
});

//delete specific tache
router.delete('/:tacheId', async(req,res) => {
    const schema = Joi.Tache({
        description: Joi.string().required(),
        faite: Joi.boolean().required(),
    });
	try{
		const removedTache = await Tache.remove({_id : req.params.tacheId}); //id_ needs to match req.params.postId
		res.json(removedTache);
	}catch(err){
		res.json({ message: err});
	};
});

//update specific tache
router.patch('/:tacheId',async(req,res) => {
    const schema = Joi.Tache({
        description: Joi.string().required(),
        faite: Joi.boolean().required(),
    });
	try{
		const updatedTache = await Tache.updateOne(
			{_id : req.params.tacheId},
			{ $set: {description: req.body.description} }
		);
		res.json(updatedTache);
	}catch(err){
		res.json({ message: err});
	};
});

module.exports = router;