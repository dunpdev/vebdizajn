const express = require('express');
const router = express.Router();

// Helper functions and sample data
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

// Endpoint: Horoskop
router.get('/horoskop', (req, res) => {
    const horoscopes = [
        "Danas je odlican dan za ljubav, ali pazite se prehlade.",
        "Danas je dan za opustanje i uzivanje u prirodi.",
        "Danas je dan za rad i trud, ali ne zaboravite na odmor.",
    ];
    res.json(randomItem(horoscopes));
});

// Endpoint: Furijeov niz
router.get('/furijeov-niz', (req, res) => {
    const broj = parseInt(req.query.broj, 10);
    if (isNaN(broj) || broj < 2) {
        return res.status(400).json({ error: "Provide a valid number greater than 1." });
    }
    const series = [1, 1];
    for (let i = 2; i < broj; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }
    res.json(series);
});

// Endpoint: Free software
router.get('/free-softver', (req, res) => {
    const description = req.query.opis || '';
    const freeSoftwares = [
        { name: "GIMP", description: "Image editor.", link: "https://www.gimp.org/" },
        { name: "LibreOffice", description: "Office suite.", link: "https://www.libreoffice.org/" },
    ];
    const result = freeSoftwares.filter(s => s.description.includes(description));
    res.json(result);
});

// Endpoint: Articles
router.get('/clanci', (req, res) => {
    const articles = [
        "Kako napraviti web sajt u 10 koraka",
        "Kako napraviti web aplikaciju u 10 koraka",
    ];
    res.json(randomItem(articles));
});

// Endpoint: Translation
router.get('/prevod', (req, res) => {
    const word = req.query.rec;
    const lang = req.query.jezik;
    const translations = { kuca: "house", automobil: "car" };

    if (lang === "srpski") {
        res.json(translations[word]);
    } else if (lang === "engleski") {
        res.json(Object.keys(translations).find(key => translations[key] === word));
    } else {
        res.status(400).json({ error: "Invalid language." });
    }
});

// Endpoint: Quadratic equation
router.get('/kvadratna-jednacina', (req, res) => {
    const { a, b, c } = req.query;
    const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c);
    const discriminant = B * B - 4 * A * C;
    if (discriminant < 0) return res.json({ error: "No real solutions." });

    const x1 = (-B + Math.sqrt(discriminant)) / (2 * A);
    const x2 = (-B - Math.sqrt(discriminant)) / (2 * A);
    res.json({ x1, x2 });
});

// Endpoint: Prime number check
router.get('/prost-broj', (req, res) => {
    const broj = parseInt(req.query.broj, 10);
    if (broj < 2) return res.json(false);
    for (let i = 2; i <= Math.sqrt(broj); i++) {
        if (broj % i === 0) return res.json(false);
    }
    res.json(true);
});

// Endpoint: Normalization
router.get('/normalizacija', (req, res) => {
    const niz = (req.query.niz || '').split(',').map(Number);
    const min = Math.min(...niz);
    const max = Math.max(...niz);
    const normalized = niz.map(x => (x - min) / (max - min));
    res.json(normalized);
});

// Endpoint: Z-score normalization
router.get('/z-skor', (req, res) => {
    const niz = (req.query.niz || '').split(',').map(Number);
    const mean = niz.reduce((sum, x) => sum + x, 0) / niz.length;
    const stdDev = Math.sqrt(niz.map(x => (x - mean) ** 2).reduce((a, b) => a + b, 0) / niz.length);
    const zScores = niz.map(x => (x - mean) / stdDev);
    res.json(zScores);
});

// Other endpoints can be added similarly...
module.exports = router;
