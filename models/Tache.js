const mongoose = require('mongoose');

const TacheSchema = mongoose.Schema({
    description:{  
        type: String,
        required: true,
    },
    faite:{
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Tache', TacheSchema);