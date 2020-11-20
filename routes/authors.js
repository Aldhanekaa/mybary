const express = require('express');
const router = express.Router();
const Author = require('../models/author')

router.get('/', async (req, res) => {
    let searchOptions = {};

    if (req.query.name) {
        searchOptions.name = new RegExp(req.query.name.trim(), 'i')
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { authors: authors, input: req.query.name })
    } catch {
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
})

// create author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name.trim()
    });
    try {
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    } catch {
        res.render("authors/new", { author: author, errorMessage: "error has occured" });
    }
})

module.exports = router;