const express = require('express');
const app = express();
const port = 3000;

const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(expressLayouts);

require('./utils/db');
const { Contact } = require('./models/contacts');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// app.get('/', (req, res) => {
//     res.render('login', {
//         title: 'Dashboard',
//         layout: 'layouts/auth'
//     });
// });

app.get('/', async (req, res) => {
    const contacts = await Contact.find();
    const jumlah = await Contact.count();
    res.render('dashboard', {
        title: 'Dashboard',
        layout: 'layouts/main',
        contacts,
        jumlah
    });
});
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ _id: req.body.id}).then((result) => {
        res.redirect('/');
    });
});

app.post('/contact', (req, res) => {
    Contact.insertMany(req.body, (error, result) => {
        res.redirect('/');
    });
});

app.put('/contact', async (req,res) => {
    await Contact.updateOne(
        { _id: req.body._id},
        { $set: {
            nama: req.body.nama,
            nohp: req.body.nohp,
            email: req.body.email,
            jabatan: req.body.jabatan
        }}
    ).then((result) => {
        res.redirect('/');
    });
});

app.post('/cari', async (req, res) => {
    const contacts = await Contact.find({ nama: {$regex: `.*${req.body.nama}.*`, $options: 'i' }});
    const jumlah = await Contact.count();
    res.render('dashboard', {
        title: 'Dashboard',
        layout: 'layouts/main',
        contacts,
        jumlah
    });
});

app.get('/contact/:id', async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id});
    res.render('detail', {
        title: 'Detail Kontak',
        layout: 'layouts/main',
        contact
    });
});

app.listen(port, (req, res) => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`);
});