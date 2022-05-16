const mongoose = require('mongoose');

/* Membuat schema */
const Contact = mongoose.model('contacts', {
    nama: {
        type: String,
        required: true
    },
    nohp: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    jabatan: {
        type: String
    }
});

module.exports = { Contact }