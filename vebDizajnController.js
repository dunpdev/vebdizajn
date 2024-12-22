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
        { name: "Audacity", description: "Audio editor.", link: "https://www.audacityteam.org/" },
        { name: "VLC", description: "Media player.", link: "https://www.videolan.org/vlc/index.html" },
        { name: "Blender", description: "3D creation suite.", link: "https://www.blender.org/" },
        { name: "Inkscape", description: "Vector graphics editor.", link: "https://inkscape.org/" }
    ];
    const result = freeSoftwares.filter(s => s.description.includes(description));
    res.json(result);
});

// Endpoint: Articles
router.get('/clanci', (req, res) => {
    const articles = [
        "Kako napraviti web sajt u 10 koraka",
        "Kako napraviti web aplikaciju u 10 koraka",
        "Kako napraviti mobilnu aplikaciju u 10 koraka",
        "Kako napraviti desktop aplikaciju u 10 koraka",
        "Kako napraviti igricu u 10 koraka",
        "Kako napraviti web sajt u 10 koraka",

    ];
    res.json(randomItem(articles));
});

// Endpoint: Translation
router.get('/prevod', (req, res) => {
    const rec = req.query.rec;
    const jezik = req.query.jezik;

    // kreiraj recnik sa prevodima
    const prevodi = {
        "kuca": "house",
        "automobil": "car",
        "voz": "train",
        "avion": "plane",
        "brod": "ship",
        "advokat": "lawyer",
        "doktor": "doctor",
        "profesor": "professor",
        "ucitelj": "teacher",
        "student": "student",
        "grad": "city",
        "selo": "village",
        "drvo": "tree",
        "biljka": "plant",
        "cvet": "flower",
        "zivotinja": "animal",
        "riba": "fish",
        "ptica": "bird",
        "kornjaca": "turtle",
        "pas": "dog",
        "macka": "cat",
        "konj": "horse",
        "slon": "elephant",
        "tigar": "tiger",
        "lav": "lion",
        "medved": "bear",
        "majmun": "monkey",
        "zirafa": "giraffe",
        "zebra": "zebra",
        "pingvin": "penguin",
        "delfin": "dolphin",
        "kit": "whale",
        "zmija": "snake",
        "pauk": "spider",
        "mrav": "ant",
        "osa": "wasp",
        "pcela": "bee",
        "skakavac": "grasshopper",
        "cvrcak": "cricket"
    };

    if (jezik === "srpski") {
        // vrati prevod za zadatu rec
        res.send(prevodi[rec]);
    } else if (jezik === "engleski") {
        // vrati prevod za zadatu rec
        const key = Object.keys(prevodi).find(key => prevodi[key] === rec);
        res.send(key);
    } else {
        // vrati prevod za zadatu rec
        res.send(prevodi[rec]);
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

router.get('/friends', (req, res) => {
    const zanimljivosti = [
        "Friends was filmed in front of a live audience — except for cliffhangers.",
        "The cast had a huddle before filming each episode.",
        "The cast had a group huddle before filming each episode."
    ];
    res.json(zanimljivosti);
});

router.get('/the-big-bang-theory', (req, res) => {
    const zanimljivosti = [
        "Pre nego što su je nazvali \"The big bang theory\", producenti su seriji dali ime \"Peni, Leni i Keni\"",
        "Pre nekoliko godina, jedna vrsta pčele dobila je ime po Šeldonovoj omiljenoj fori.",
        "Glumci su hteli studiozno da pristupe svojim ulogama, pa je Majim Bialik zaista naučila da svira harfu za potrebe svog lika, Ejmi Fare Fauler.",
        "Kada je serija počela sa emitovanjem, Džimi Parsons je imao 33 godine, a Džoni Galakići 32. Keli Kuoko je bila najmlađa od glavnih glumaca, imala je 21 godinu.",
        "Keli Kuoko je bila najmlađa od glavnih glumaca, imala je 21 godinu."
    ];
    res.json(zanimljivosti);
});

router.get('/knjige', (req, res) => {
    const knjige = [
        { Id: 1, Autor: "Dan Brown", Opis: "Robert Langdon, profesor simbologije, budi se u bolnici sa prostrelom glavom i bez sećanja na prethodne događaje. Ubrzo shvata da je upleten u zavere, misterije i tajne.", GodinaIzdanja: 2003 },
        { Id: 2, Autor: "J. K. Rowling", Opis: "Harry Potter je serija od sedam romana koje je napisala britanska spisateljica Džoan Ketlin Rouling. Prati život mladog čarobnjaka Harija Potera i njegovih prijatelja Hermione Granger i Rona Vizlija, koji su studenti u Hogvortsu.", GodinaIzdanja: 1997 },
        { Id: 3, Autor: "Paulo Coelho", Opis: "Alhemičar je roman brazilskog pisca Paula Koelja. Roman je prvi put objavljen 1988. godine, a do 2008. godine preveden je na 67 jezika i prodat u više od 65 miliona primeraka.", GodinaIzdanja: 1988 },
        { Id: 4, Autor: "Agatha Christie", Opis: "Ubistvo u Orijent ekspresu je roman Agathe Christie, objavljen 1934. godine. To je jedan od najpoznatijih romana o detektivu Herkulu Poaroa.", GodinaIzdanja: 1934 },
        { Id: 5, Autor: "George Orwell", Opis: "Životinjska farma je satirič" }
    ];
    res.json(knjige);
});

router.get('/filmovi', (req, res) => {
    const naziv = req.query.naziv;
    let filmovi = [
        { Id: 1, Naziv: "The Shawshank Redemption", Opis: "Two imprisoned" },
        { Id: 2, Naziv: "The Godfather", Opis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", GodinaIzdanja: 1972 },
        { Id: 3, Naziv: "The Dark Knight", Opis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept" },
        { Id: 4, Naziv: "12 Angry", Opis: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence." },
        { Id: 5, Naziv: "Schindler's List", Opis: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their" },
        { Id: 6, Naziv: "The Lord of the Rings: The Return of the King", Opis: "Gandalf and Aragorn lead the World" },
        { Id: 7, Naziv: "Pulp Fiction", Opis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", GodinaIzdanja: 1994 },
        { Id: 8, Naziv: "The Lord of the Rings: The Fellowship of the Ring", Opis: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", GodinaIzdanja: 2001 },
        { Id: 9, Naziv: "Forrest Gump", Opis: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective" },
        { Id: 10, Naziv: "Inception", Opis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", GodinaIzdanja: 2010 }
    ];
    if (naziv) {
        filmovi = filmovi.filter(film => film.Naziv.includes(naziv));
    }
    res.json(filmovi);
});

router.get('/kompozicije', (req, res) => {
    const kompozicija = req.query.kompozicija;
    const kompozicijeNote = {
        "Beethoven - Symphony No. 9": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Mozart - Requiem": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Bach - Toccata and Fugue in D minor": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Vivaldi - The Four Seasons": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Beethoven - Symphony No. 5": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Mozart - Symphony No. 40": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Bach - Brandenburg Concertos": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Vivaldi - Gloria": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Beethoven - Symphony No. 6": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Mozart - Piano Concerto No. 21": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg"
    };
    res.json(kompozicijeNote[kompozicija] || null);
});

router.get('/vreme-za-molitvu', (req, res) => {
    const lokacija = req.query.lokacija;
    const vremeZaMolitvu = {
        "Beograd": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Novi Sad": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Niš": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Kragujevac": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Subotica": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Zrenjanin": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Pančevo": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Šabac": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Kraljevo": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Smederevo": "05:00, 13:00, 17:00, 20:00, 22:00"
    };
    res.json(vremeZaMolitvu[lokacija] || null);
});

router.get('/azil-za-pse', (req, res) => {
    const psi = [
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/"
    ];
    res.json(psi);
});

router.get('/plan-ishrane', (req, res) => {
    const planIshrane = [
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća"
    ];
    res.json(planIshrane);
});

router.get('/letovi', (req, res) => {
    const datum = req.query.datum;
    const letovi = [
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid"
    ];
    res.json(letovi);
});

router.get('/internet-usluge', (req, res) => {
    const internetUsluge = [
        "Paket 1: 100mbps - 1000din",
        "Paket 2: 200mbps - 2000din",
        "Paket 3: 300mbps - 3000din",
        "Paket 4: 400mbps - 4000din",
        "Paket 5: 500mbps - 5000din",
        "Paket 6: 600mbps - 6000din",
        "Paket 7: 700mbps - 7000din",
        "Paket 8: 800mbps - 8000din",
        "Paket 9: 900mbps - 9000din",
        "Paket 10: 1000mbps - 10000din",
        "Paket 11: 1100mbps - 11000din",
        "Paket 12: 1200mbps - 12000din",
        "Paket 13: 1300mbps - 13000din",
        "Paket 14: 1400mbps - 14000din",
        "Paket 15: 1500mbps - 15000din",
        "Paket 16: 1600mbps - 16000din",
        "Paket 17: 1700mbps - 17000din",
        "Paket 18: 1800mbps - 18000din",
        "Paket 19: 1900mbps - 19000din",
        "Paket 20: 2000mbps - 20000din",
        "Paket 21: 2100mbps - 21000din",
        "Paket 22: 2200mbps - 22000din",
        "Paket 23: 2300mbps - 23000din",
        "Paket 24: 2400mbps - 24000din",
        "Paket 25: 2500mbps - 25000din",
        "Paket 26: 2600mbps - 26000din"
    ];
    res.json(internetUsluge);
});

router.get('/ucenje-engleskog', (req, res) => {
    const kartice = [
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/"
    ];
    res.json(kartice);
});


router.get('/friends', (req, res) => {
    const zanimljivosti = [
        "Friends was filmed in front of a live audience — except for cliffhangers.",
        "The cast had a huddle before filming each episode.",
        "The cast had a group huddle before filming each episode."
    ];
    res.json(zanimljivosti);
});

router.get('/the-big-bang-theory', (req, res) => {
    const zanimljivosti = [
        "Pre nego što su je nazvali \"The big bang theory\", producenti su seriji dali ime \"Peni, Leni i Keni\"",
        "Pre nekoliko godina, jedna vrsta pčele dobila je ime po Šeldonovoj omiljenoj fori.",
        "Glumci su hteli studiozno da pristupe svojim ulogama, pa je Majim Bialik zaista naučila da svira harfu za potrebe svog lika, Ejmi Fare Fauler.",
        "Kada je serija počela sa emitovanjem, Džimi Parsons je imao 33 godine, a Džoni Galakići 32. Keli Kuoko je bila najmlađa od glavnih glumaca, imala je 21 godinu.",
        "Keli Kuoko je bila najmlađa od glavnih glumaca, imala je 21 godinu."
    ];
    res.json(zanimljivosti);
});

router.get('/knjige', (req, res) => {
    const knjige = [
        { Id: 1, Autor: "Dan Brown", Opis: "Robert Langdon, profesor simbologije, budi se u bolnici sa prostrelom glavom i bez sećanja na prethodne događaje. Ubrzo shvata da je upleten u zavere, misterije i tajne.", GodinaIzdanja: 2003 },
        { Id: 2, Autor: "J. K. Rowling", Opis: "Harry Potter je serija od sedam romana koje je napisala britanska spisateljica Džoan Ketlin Rouling. Prati život mladog čarobnjaka Harija Potera i njegovih prijatelja Hermione Granger i Rona Vizlija, koji su studenti u Hogvortsu.", GodinaIzdanja: 1997 },
        { Id: 3, Autor: "Paulo Coelho", Opis: "Alhemičar je roman brazilskog pisca Paula Koelja. Roman je prvi put objavljen 1988. godine, a do 2008. godine preveden je na 67 jezika i prodat u više od 65 miliona primeraka.", GodinaIzdanja: 1988 },
        { Id: 4, Autor: "Agatha Christie", Opis: "Ubistvo u Orijent ekspresu je roman Agathe Christie, objavljen 1934. godine. To je jedan od najpoznatijih romana o detektivu Herkulu Poaroa.", GodinaIzdanja: 1934 },
        { Id: 5, Autor: "George Orwell", Opis: "Životinjska farma je satirič" }
    ];
    res.json(knjige);
});

router.get('/filmovi', (req, res) => {
    const naziv = req.query.naziv;
    let filmovi = [
        { Id: 1, Naziv: "The Shawshank Redemption", Opis: "Two imprisoned" },
        { Id: 2, Naziv: "The Godfather", Opis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", GodinaIzdanja: 1972 },
        { Id: 3, Naziv: "The Dark Knight", Opis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept" },
        { Id: 4, Naziv: "12 Angry", Opis: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence." },
        { Id: 5, Naziv: "Schindler's List", Opis: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their" },
        { Id: 6, Naziv: "The Lord of the Rings: The Return of the King", Opis: "Gandalf and Aragorn lead the World" },
        { Id: 7, Naziv: "Pulp Fiction", Opis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", GodinaIzdanja: 1994 },
        { Id: 8, Naziv: "The Lord of the Rings: The Fellowship of the Ring", Opis: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", GodinaIzdanja: 2001 },
        { Id: 9, Naziv: "Forrest Gump", Opis: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective" },
        { Id: 10, Naziv: "Inception", Opis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", GodinaIzdanja: 2010 }
    ];
    if (naziv) {
        filmovi = filmovi.filter(film => film.Naziv.includes(naziv));
    }
    res.json(filmovi);
});

router.get('/kompozicije', (req, res) => {
    const kompozicija = req.query.kompozicija;
    const kompozicijeNote = {
        "Beethoven - Symphony No. 9": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Mozart - Requiem": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Bach - Toccata and Fugue in D minor": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Vivaldi - The Four Seasons": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Beethoven - Symphony No. 5": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Mozart - Symphony No. 40": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Bach - Brandenburg Concertos": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Vivaldi - Gloria": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Beethoven - Symphony No. 6": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg",
        "Mozart - Piano Concerto No. 21": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Beethoven_Symphony_9_first_page.jpg"
    };
    res.json(kompozicijeNote[kompozicija] || null);
});

router.get('/vreme-za-molitvu', (req, res) => {
    const lokacija = req.query.lokacija;
    const vremeZaMolitvu = {
        "Beograd": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Novi Sad": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Niš": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Kragujevac": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Subotica": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Zrenjanin": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Pančevo": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Šabac": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Kraljevo": "05:00, 13:00, 17:00, 20:00, 22:00",
        "Smederevo": "05:00, 13:00, 17:00, 20:00, 22:00"
    };
    res.json(vremeZaMolitvu[lokacija] || null);
});

router.get('/azil-za-pse', (req, res) => {
    const psi = [
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/"
    ];
    res.json(psi);
});

router.get('/plan-ishrane', (req, res) => {
    const planIshrane = [
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća",
        "Doručak: 2 jaja, 2 kriške hleba, 1 paradajz, 1 krastavac, 1 šolja jogurta",
        "Ručak: 100g piletine, 100g pirinča, 1 šolja salate",
        "Večera: 100g lososa, 100g krompira, 1 šolja spanaća"
    ];
    res.json(planIshrane);
});

router.get('/letovi', (req, res) => {
    const datum = req.query.datum;
    const letovi = [
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid",
        "Beograd - Pariz",
        "Beograd - London",
        "Beograd - Rim",
        "Beograd - Berlin",
        "Beograd - Madrid"
    ];
    res.json(letovi);
});

router.get('/internet-usluge', (req, res) => {
    const internetUsluge = [
        "Paket 1: 100mbps - 1000din",
        "Paket 2: 200mbps - 2000din",
        "Paket 3: 300mbps - 3000din",
        "Paket 4: 400mbps - 4000din",
        "Paket 5: 500mbps - 5000din",
        "Paket 6: 600mbps - 6000din",
        "Paket 7: 700mbps - 7000din",
        "Paket 8: 800mbps - 8000din",
        "Paket 9: 900mbps - 9000din",
        "Paket 10: 1000mbps - 10000din",
        "Paket 11: 1100mbps - 11000din",
        "Paket 12: 1200mbps - 12000din",
        "Paket 13: 1300mbps - 13000din",
        "Paket 14: 1400mbps - 14000din",
        "Paket 15: 1500mbps - 15000din",
        "Paket 16: 1600mbps - 16000din",
        "Paket 17: 1700mbps - 17000din",
        "Paket 18: 1800mbps - 18000din",
        "Paket 19: 1900mbps - 19000din",
        "Paket 20: 2000mbps - 20000din",
        "Paket 21: 2100mbps - 21000din",
        "Paket 22: 2200mbps - 22000din",
        "Paket 23: 2300mbps - 23000din",
        "Paket 24: 2400mbps - 24000din",
        "Paket 25: 2500mbps - 25000din",
        "Paket 26: 2600mbps - 26000din"
    ];
    res.json(internetUsluge);
});

router.get('/ucenje-engleskog', (req, res) => {
    const kartice = [
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/",
        "https://www.pexels.com/photo/short-coated-tan-dog-33534/"
    ];
    res.json(kartice);
});

router.get('/racun-za-struju', (req, res) => {
    const skupaStruja = parseFloat(req.query.skupaStruja);
    const jeftinaStruja = parseFloat(req.query.jeftinaStruja);
    const racun = skupaStruja * 0.5 + jeftinaStruja * 0.3;
    res.json({ racun });
});

router.get('/recepti', (req, res) => {
    const recepti = [
        {
            Naziv: "Teleca corba",
            Sastojci: "Telece meso, krompir, so, biber, persun",
            Priprema: "Telece meso skuvati u vodi, dodati krompir, so, biber, persun",
            Kategorija: "slano"
        },
        {
            Naziv: "Pita sa sirom",
            Sastojci: "Kora za pitu, sir, jaja, so, biber",
            Priprema: "Napraviti fil od sira, jaja, soli i bibera, staviti fil na koru za pitu, uviti pitu",
            Kategorija: "slano"
        },
        {
            Naziv: "Torta sa jagodama",
            Sastojci: "Biskvit, jagode, slag, secer",
            Priprema: "Napraviti biskvit, dodati jagode, slag, secer",
            Kategorija: "slatko"
        },
        {
            Naziv: "Palacinke sa nutelom",
            Sastojci: "Palacinke, nutela, slag",
            Priprema: "Napraviti palacinke, dodati nutelu, slag",
            Kategorija: "slatko"
        },
        {
            Naziv: "Pita sa mesom",
            Sastojci: "Kora za pitu, mleveno meso, so, biber",
            Priprema: "Napraviti fil od mesa, soli i bibera, staviti fil na koru za pitu, uviti pitu",
            Kategorija: "slano"
        },
        {
            Naziv: "Torta sa malinama",
            Sastojci: "Biskvit, maline, slag, secer",
            Priprema: "Napraviti biskvit, dodati maline, slag, secer",
            Kategorija: "slatko"
        },
        {
            Naziv: "Palacinke sa dzemom",
            Sastojci: "Palacinke, dzem, slag",
            Priprema: "Napraviti palacinke, dodati dzem, slag",
            Kategorija: "slatko"
        }
    ];
    res.json(recepti);
});

router.get('/zastita-zivotne-sredine', (req, res) => {
    const najzagadjenijiGradovi = [
        "Delhi", "Beijing", "Karachi", "Shanghai", "Istanbul", "Tokyo", "Moscow", "Sao Paulo", "Lahore", "Cairo",
        "Dhaka", "Mumbai", "Jakarta", "Chongqing", "Lima", "Bangkok", "Seoul", "Bogota", "London", "Los Angeles",
        "New York", "Paris", "Berlin", "Rome", "Madrid", "Vienna", "Warsaw", "Athens", "Stockholm", "Oslo",
        "Helsinki", "Copenhagen", "Amsterdam", "Brussels", "Dublin", "Prague", "Budapest", "Lisbon", "Zurich",
        "Geneva", "Luxembourg", "Monaco", "Vatican City", "San Marino", "Andorra la Vella", "Sarajevo", "Belgrade",
        "Podgorica", "Tirana", "Skopje", "Sofia", "Bucharest", "Chisinau", "Kiev", "Minsk", "Vilnius", "Riga",
        "Tallinn", "Helsinki", "Stockholm", "Oslo", "Copenhagen", "Amsterdam", "Brussels", "Dublin", "Prague",
        "Budapest", "Lisbon", "Zurich", "Geneva", "Luxembourg", "Monaco", "Vatican City", "San Marino", "Andorra la Vella",
        "Sarajevo", "Belgrade", "Podgorica", "Tirana", "Skopje", "Sofia", "Bucharest", "Chisina"
    ];
    const savetiZaOcuvanje = [
        "Koristite manje plastike", "Reciklirajte", "Koristite javni prevoz", "Koristite bicikl", "Koristite manje vode",
        "Koristite manje struje", "Koristite manje papira", "Sadite drvece", "Koristite manje plastike", "Reciklirajte",
        "Koristite javni prevoz", "Koristite bicikl", "Koristite manje vode", "Koristite manje struje", "Koristite manje papira",
        "Sadite drvece", "Koristite manje plastike", "Reciklirajte", "Koristite javni prevoz", "Koristite bicikl",
        "Koristite manje vode", "Koristite manje struje", "Koristite manje papira", "Sadite drvece", "Koristite manje plastike",
        "Reciklirajte", "Koristite javni prevoz", "Koristite bicikl", "Koristite manje vode", "Koristite manje struje",
        "Koristite manje papira", "Sadite drvece", "Koristite manje plastike", "Reciklirajte", "Koristite javni prevoz",
        "Koristite bicikl", "Koristite manje vode", "Koristite manje struje", "Koristite manje papira", "Sadite drvece",
        "Koristite manje plastike", "Reciklirajte", "Koristite javni prevoz", "Koristite bicikl", "Koristite manje vode",
        "Koristite manje struje", "Koristite manje papira", "Sadite drvece"
    ];
    res.json({ najzagadjenijiGradovi, savetiZaOcuvanje });
});

router.get('/pisanje-knjige', (req, res) => {
    const savetiZaPisanjeKnjige = [
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno",
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno",
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno",
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno",
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno",
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno",
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno",
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno",
        "Pisite svaki dan", "Postavite cilj", "Napravite plan", "Istrazujte", "Pisite prvo ruzno"
    ];
    res.json(savetiZaPisanjeKnjige);
});

router.get('/ekstremni-sportovi', (req, res) => {
    const ekstremniSportovi = [
        "Planinarenje", "Slobodno penjanje", "Biciklizam", "Padobranstvo", "Skakanje sa padobranom",
        "Planinarenje", "Slobodno penjanje", "Biciklizam", "Padobranstvo", "Skakanje sa padobranom",
        "Planinarenje", "Slobodno penjanje", "Biciklizam", "Padobranstvo", "Skakanje sa padobranom",
        "Planinarenje", "Slobodno penjanje", "Biciklizam", "Padobranstvo", "Skakanje sa padobranom",
        "Planinarenje", "Slobodno penjanje", "Biciklizam", "Padobranstvo", "Skakanje sa padobranom",
        "Planinarenje", "Slobodno penjanje", "Biciklizam", "Padobranstvo", "Skakanje sa padobranom",
        "Planinarenje", "Slobodno penjanje", "Biciklizam", "Padobranstvo", "Skakanje sa padobranom",
        "Planinarenje", "Slobodno penjanje", "Biciklizam", "Padobranstvo", "Skakanje sa padobranom"
    ];
    res.json(ekstremniSportovi);
});

router.get('/bastovanstvo', (req, res) => {
    const savetiZaBastovanstvo = [
        {
            Naziv: "Paradajz",
            Opis: "Paradajz je povrce koje se najcesce gaji u bastama. Potrebno je redovno zalivanje i prihranjivanje.",
            VremeSadnje: "Mart",
            VremeBerbe: "Jun",
            Odrzavanje: "Redovno zalivanje i prihranjivanje"
        },
        {
            Naziv: "Krompir",
            Opis: "Krompir je povrce koje se najcesce gaji u bastama. Potrebno je redovno zalivanje i prihranjivanje.",
            VremeSadnje: "Mart",
            VremeBerbe: "Jun",
            Odrzavanje: "Redovno zalivanje i prihranjivanje"
        },
        {
            Naziv: "Jagode",
            Opis: "Jagode su vocne sadnice koje se najcesce gaje u bastama. Potrebno je redovno zalivanje i prihranjivanje.",
            VremeSadnje: "Mart",
            VremeBerbe: "Jun",
            Odrzavanje: "Redovno zalivanje i prihranjivanje"
        },
        {
            Naziv: "Maline",
            Opis: "Maline su vocne sadnice koje se najcesce gaje u bastama. Potrebno je redovno zalivanje i prihranjivanje.",
            VremeSadnje: "Mart",
            VremeBerbe: "Jun",
            Odrzavanje: "Redovno zalivanje i prihranjivanje"
        },
        {
            Naziv: "Kupine",
            Opis: "Kupine su vocne sadnice koje se najcesce gaje u bastama. Potrebno je redovno zalivanje i prihranjivanje.",
            VremeSadnje: "Mart",
            VremeBerbe: "Jun",
            Odrzavanje: "Redovno zalivanje i prihranjivanje"
        }
    ];
    res.json(savetiZaBastovanstvo);
});

router.get('/volontiranje', (req, res) => {
    const humanitarneAkcije = [
        "Pomoc starima", "Pomoc deci", "Pomoc bolesnima", "Pomoc siromasnim",
        "Pomoc starima", "Pomoc deci", "Pomoc bolesnima", "Pomoc siromasnim",
        "Pomoc starima", "Pomoc deci", "Pomoc bolesnima", "Pomoc siromasnim",
        "Pomoc starima", "Pomoc deci", "Pomoc bolesnima", "Pomoc siromasnim",
        "Pomoc starima", "Pomoc deci", "Pomoc bolesnima", "Pomoc siromasnim",
        "Pomoc starima", "Pomoc deci", "Pomoc bolesnima", "Pomoc siromasnim",
        "Pomoc starima", "Pomoc deci", "Pomoc bolesnima", "Pomoc siromasnim",
        "Pomoc starima", "Pomoc deci", "Pomoc bolesnima", "Pomoc siromasnim"
    ];
    res.json(humanitarneAkcije);
});

router.get('/digimoni', (req, res) => {
    const digimoni = [
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon",
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon",
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon",
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon",
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon"
    ];
    res.json(digimoni);
});

router.get('/yu-gi-oh', (req, res) => {
    const karte = {
        "Dark Magician": "https://vignette.wikia.nocookie.net/yugioh/images/0/0d/DarkMagician-TF04-JP-VG.jpg/revision/latest/scale-to-width-down/340?cb=20120419163457",
        "Blue-Eyes White Dragon": "https://vignette.wikia.nocookie.net/yugioh/images/0/0d/DarkMagician-TF04-JP-VG.jpg/revision/latest/scale-to-width-down/340?cb=20120419163457",
        "Red-Eyes Black Dragon": "https://vignette.wikia.nocookie.net/yugioh/images/0/0d/DarkMagician-TF04-JP-VG.jpg/revision/latest/scale-to-width-down/340?cb=20120419163457",
        "Exodia the Forbidden One": "https://vignette.wikia.nocookie.net/yugioh/images/0/0d/DarkMagician-TF04-JP-VG.jpg/revision/latest/scale-to-width-down/340?cb=20120419163457"
    };
    res.json(karte);
});

router.get('/nastavnici', (req, res) => {
    const program = req.query.program;
    let nastavnici = [
        { Id: 1, Ime: "Edin Dolicanin", Predmet: "Programiranje", Konsultacije: "Ponedeljak 10:00-12:00", Program: "Softversko inzenjerstvo" },
        { Id: 2, Ime: "Nedzad Mehic", Predmet: "Baze podataka", Konsultacije: "Utorak 10:00-12:00", Program: "Softversko inzenjerstvo" },
        { Id: 3, Ime: "Nedim Omerovic", Predmet: "Matematika", Konsultacije: "Srijeda 10:00-12:00", Program: "Matematika" },
        { Id: 4, Ime: "Nazim Manic", Predmet: "Statika", Konsultacije: "Ponedeljak 10:00-12:00", Program: "Gradjenivarstvo" }
    ];
    if (program) {
        nastavnici = nastavnici.filter(n => n.Program === program);
    }
    res.json(nastavnici);
});

router.get('/algoritmi', (req, res) => {
    const lista = {
        "Sudoku": "https://www.sudoku-solutions.com/",
        "Rubikova kocka": "https://www.youcandothecube.com/solve-it/3x3-solution",
        "Klondike": "https://www.youtube.com/watch?v=Hd8ZQJ3nqyY"
    };
    res.json(lista);
});

router.get('/cezarova-sifra', (req, res) => {
    const tekst = req.query.tekst;
    const korak = parseInt(req.query.korak);
    let sifrat = "";
    for (const slovo of tekst) {
        sifrat += String.fromCharCode(slovo.charCodeAt(0) + korak);
    }
    res.json(sifrat);
});

router.get('/transpozicioni-sifra', (req, res) => {
    const tekst = req.query.tekst;
    const kljuc = parseInt(req.query.kljuc);
    let sifrat = "";
    for (let i = 0; i < tekst.length; i += kljuc) {
        sifrat += tekst.substring(i, i + kljuc);
    }
    res.json(sifrat);
});

router.get('/stanovi', (req, res) => {
    const grad = req.query.grad;
    let stans = {
        "Beograd": "Stan 1, ulica Vojvode Stepe 100m2 0604446655",
        "Novi Sad": "Stan 2, ulica Bulevar Oslobodjenja 80m2 0604446655",
        "Nis": "Stan 3, ulica Cara Dusana 60m2 0604446655",
        "Kragujevac": "Stan 4, ulica Kneza Milosa 70m2 0604446655",
        "Subotica": "Stan 5, ulica Jovana Mikića 90m2 0604446655",
        "Beograd": "Stan 6, ulica Vojvode Stepe 100m2 0604446655",
        "Novi Sad": "Stan 7, ulica Bulevar Oslobodjenja 80m2 0604446655",
        "Nis": "Stan 8, ulica Cara Dusana 60m2 0604446655",
        "Kragujevac": "Stan 9, ulica Kneza Milosa 70m2 0604446655",
        "Subotica": "Stan 10, ulica Jovana Mikića 90m2 0604446655",
        "Beograd": "Stan 11, ulica Vojvode Stepe 100m2 0604446655",
        "Novi Sad": "Stan 12, ulica Bulevar Oslobodjenja 80m2 0604446655",
        "Nis": "Stan 13, ulica Cara Dusana 60m2 0604446655",
        "Kragujevac": "Stan 14, ulica Kneza Milosa 70m2 0604446655",
        "Subotica": "Stan 15, ulica Jovana Mikića 90m2 0604446655",
        "Beograd": "Stan 16, ulica Vojvode Stepe 100m2 0604446655",
        "Novi Sad": "Stan 17, ulica Bulevar Oslobodjenja 80m2 0604446655",
        "Nis": "Stan 18, ulica Cara Dusana 60m2 0604446655",
        "Kragujevac": "Stan 19, ulica Kneza Milosa 70m2 0604446655",
        "Subotica": "Stan 20, ulica Jovana Mikića 90m2 0604446655",
        "Beograd": "Stan 21, ulica Vojvode Stepe 100m2 0604446655"
    };
    if (grad) {
        stans = Object.fromEntries(Object.entries(stans).filter(([key]) => key === grad));
    }
    res.json(stans);
});

router.get('/posiljke', (req, res) => {
    const brojPosiljke = req.query.brojPosiljke;
    let posiljke = [
        { BrojPosiljke: "123", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "124", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "125", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "126", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "127", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "128", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "129", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" }
    ];
    if (brojPosiljke) {
        posiljke = posiljke.filter(p => p.BrojPosiljke === brojPosiljke);
    }
    res.json(posiljke);
});

router.get('/frizer', (req, res) => {
    const datum = req.query.datum;
    let termini = {
        "01.05.2024": ["10:00", "11:00", "12:30", "14:00", "16:00"],
        "02.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "03.05.2024": ["9:00", "10:30", "12:00", "13:30"],
        "04.05.2024": ["10:00", "11:00", "12:30", "14:00", "16:00"],
        "05.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "06.05.2024": ["10:30", "12:00", "13:30"],
        "07.05.2024": ["11:00", "12:30", "14:00", "16:00"],
        "08.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "09.05.2024": ["9:00", "10:30", "12:00", "13:30"],
        "10.05.2024": ["10:00", "11:00", "12:30", "14:00", "16:00"],
        "11.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "12.05.2024": ["9:00", "10:30", "12:00", "13:30"],
        "13.05.2024": ["10:00", "11:00", "12:30", "14:00", "16:00"],
        "14.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "15.05.2024": ["10:30", "12:00", "13:30"]
    };
    if (datum) {
        termini = { [datum]: termini[datum] };
    }
    res.json(termini);
});

router.get('/kafa', (req, res) => {
    const kafe = [
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija"
    ];
    res.json(kafe);
});

router.get('/olimpijske-igre', (req, res) => {
    const godina = parseInt(req.query.godina);
    const rekordi = {
        2000: "Skok u vis - 2.45m, Skok u dalj - 8.95m, Sprint na 100m - 9.58s",
        2004: "Skok u vis - 2.50m, Skok u dalj - 9.00m, Sprint na 100m - 9.50s",
        2008: "Skok u vis - 2.55m, Skok u dalj - 9.05m, Sprint na 100m - 9.45s",
        2012: "Skok u vis - 2.60m, Skok u dalj - 9.10m, Sprint na 100m - 9.40s",
        2016: "Skok u vis - 2.65m, Skok u dalj - 9.15m, Sprint na 100m - 9.35s",
        2020: "Skok u vis - 2.70m, Skok u dalj - 9.20m, Sprint na 100m - 9.30s"
    };
    if (rekordi[godina]) {
        res.json(rekordi[godina]);
    } else {
        res.status(404).send('Not Found');
    }
});

router.get('/biciklizam', (req, res) => {
    const grad = req.query.grad;
    let rute = [
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić"
    ];
    if (grad) {
        rute = rute.filter(r => r.includes(grad));
    }
    res.json(rute);
});

router.get('/okeani', (req, res) => {
    const okean = req.query.okean;
    let vrste = {
        "Atlantski okean": "Kitovi, Ajkule, Delfini",
        "Tihii okean": "Kitovi, Ajkule, Delfini",
        "Indijski okean": "Kitovi, Ajkule, Delfini",
        "Severni Ledni okean": "Kitovi, Ajkule, Delfini",
        "Juzni Ledni okean": "Kitovi, Ajkule, Delfini"
    };
    if (okean) {
        vrste = { [okean]: vrste[okean] };
    }
    res.json(vrste);
});

router.get('/kozmetika', (req, res) => {
    const naziv = req.query.naziv;
    let recenzije = {
        "Loreal": "Odlican proizvod, preporucujem",
        "Nivea": "Odlican proizvod, preporucujem",
        "Dove": "Odlican proizvod, preporucujem",
        "Palmolive": "Odlican proizvod, preporucujem"
    };
    if (naziv) {
        recenzije = { [naziv]: recenzije[naziv] };
    }
    res.json(recenzije);
});
router.get('/digimoni', (req, res) => {
    const digimoni = [
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon",
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon",
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon",
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon",
        "Agumon - Greymon",
        "Gabumon - Garurumon",
        "Biyomon - Birdramon",
        "Tentomon - Kabuterimon",
        "Palmon - Togemon",
        "Gomamon - Ikkakumon",
        "Patamon - Angemon",
        "Gatomon - Angewomon"
    ];
    res.json(digimoni);
});

router.get('/yu-gi-oh', (req, res) => {
    const karte = {
        "Dark Magician": "https://vignette.wikia.nocookie.net/yugioh/images/0/0d/DarkMagician-TF04-JP-VG.jpg/revision/latest/scale-to-width-down/340?cb=20120419163457",
        "Blue-Eyes White Dragon": "https://vignette.wikia.nocookie.net/yugioh/images/0/0d/DarkMagician-TF04-JP-VG.jpg/revision/latest/scale-to-width-down/340?cb=20120419163457",
        "Red-Eyes Black Dragon": "https://vignette.wikia.nocookie.net/yugioh/images/0/0d/DarkMagician-TF04-JP-VG.jpg/revision/latest/scale-to-width-down/340?cb=20120419163457",
        "Exodia the Forbidden One": "https://vignette.wikia.nocookie.net/yugioh/images/0/0d/DarkMagician-TF04-JP-VG.jpg/revision/latest/scale-to-width-down/340?cb=20120419163457"
    };
    res.json(karte);
});

router.get('/nastavnici', (req, res) => {
    const program = req.query.program;
    let nastavnici = [
        { Id: 1, Ime: "Edin Dolicanin", Predmet: "Programiranje", Konsultacije: "Ponedeljak 10:00-12:00", Program: "Softversko inzenjerstvo" },
        { Id: 2, Ime: "Nedzad Mehic", Predmet: "Baze podataka", Konsultacije: "Utorak 10:00-12:00", Program: "Softversko inzenjerstvo" },
        { Id: 3, Ime: "Nedim Omerovic", Predmet: "Matematika", Konsultacije: "Srijeda 10:00-12:00", Program: "Matematika" },
        { Id: 4, Ime: "Nazim Manic", Predmet: "Statika", Konsultacije: "Ponedeljak 10:00-12:00", Program: "Gradjenivarstvo" }
    ];
    if (program) {
        nastavnici = nastavnici.filter(n => n.Program === program);
    }
    res.json(nastavnici);
});

router.get('/algoritmi', (req, res) => {
    const lista = {
        "Sudoku": "https://www.sudoku-solutions.com/",
        "Rubikova kocka": "https://www.youcandothecube.com/solve-it/3x3-solution",
        "Klondike": "https://www.youtube.com/watch?v=Hd8ZQJ3nqyY"
    };
    res.json(lista);
});

router.get('/cezarova-sifra', (req, res) => {
    const tekst = req.query.tekst;
    const korak = parseInt(req.query.korak);
    let sifrat = "";
    for (const slovo of tekst) {
        sifrat += String.fromCharCode(slovo.charCodeAt(0) + korak);
    }
    res.json(sifrat);
});

router.get('/transpozicioni-sifra', (req, res) => {
    const tekst = req.query.tekst;
    const kljuc = parseInt(req.query.kljuc);
    let sifrat = "";
    for (let i = 0; i < tekst.length; i += kljuc) {
        sifrat += tekst.substring(i, i + kljuc);
    }
    res.json(sifrat);
});

router.get('/stanovi', (req, res) => {
    const grad = req.query.grad;
    let stans = {
        "Beograd": "Stan 1, ulica Vojvode Stepe 100m2 0604446655",
        "Novi Sad": "Stan 2, ulica Bulevar Oslobodjenja 80m2 0604446655",
        "Nis": "Stan 3, ulica Cara Dusana 60m2 0604446655",
        "Kragujevac": "Stan 4, ulica Kneza Milosa 70m2 0604446655",
        "Subotica": "Stan 5, ulica Jovana Mikića 90m2 0604446655",
        "Beograd": "Stan 6, ulica Vojvode Stepe 100m2 0604446655",
        "Novi Sad": "Stan 7, ulica Bulevar Oslobodjenja 80m2 0604446655",
        "Nis": "Stan 8, ulica Cara Dusana 60m2 0604446655",
        "Kragujevac": "Stan 9, ulica Kneza Milosa 70m2 0604446655",
        "Subotica": "Stan 10, ulica Jovana Mikića 90m2 0604446655",
        "Beograd": "Stan 11, ulica Vojvode Stepe 100m2 0604446655",
        "Novi Sad": "Stan 12, ulica Bulevar Oslobodjenja 80m2 0604446655",
        "Nis": "Stan 13, ulica Cara Dusana 60m2 0604446655",
        "Kragujevac": "Stan 14, ulica Kneza Milosa 70m2 0604446655",
        "Subotica": "Stan 15, ulica Jovana Mikića 90m2 0604446655",
        "Beograd": "Stan 16, ulica Vojvode Stepe 100m2 0604446655",
        "Novi Sad": "Stan 17, ulica Bulevar Oslobodjenja 80m2 0604446655",
        "Nis": "Stan 18, ulica Cara Dusana 60m2 0604446655",
        "Kragujevac": "Stan 19, ulica Kneza Milosa 70m2 0604446655",
        "Subotica": "Stan 20, ulica Jovana Mikića 90m2 0604446655",
        "Beograd": "Stan 21, ulica Vojvode Stepe 100m2 0604446655"
    };
    if (grad) {
        stans = Object.fromEntries(Object.entries(stans).filter(([key]) => key === grad));
    }
    res.json(stans);
});

router.get('/posiljke', (req, res) => {
    const brojPosiljke = req.query.brojPosiljke;
    let posiljke = [
        { BrojPosiljke: "123", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "124", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "125", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "126", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "127", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "128", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" },
        { BrojPosiljke: "129", Stanje: "Na putu", Istorija: "Posiljka je poslata iz Beograda za Novi Sad" }
    ];
    if (brojPosiljke) {
        posiljke = posiljke.filter(p => p.BrojPosiljke === brojPosiljke);
    }
    res.json(posiljke);
});

router.get('/frizer', (req, res) => {
    const datum = req.query.datum;
    let termini = {
        "01.05.2024": ["10:00", "11:00", "12:30", "14:00", "16:00"],
        "02.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "03.05.2024": ["9:00", "10:30", "12:00", "13:30"],
        "04.05.2024": ["10:00", "11:00", "12:30", "14:00", "16:00"],
        "05.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "06.05.2024": ["10:30", "12:00", "13:30"],
        "07.05.2024": ["11:00", "12:30", "14:00", "16:00"],
        "08.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "09.05.2024": ["9:00", "10:30", "12:00", "13:30"],
        "10.05.2024": ["10:00", "11:00", "12:30", "14:00", "16:00"],
        "11.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "12.05.2024": ["9:00", "10:30", "12:00", "13:30"],
        "13.05.2024": ["10:00", "11:00", "12:30", "14:00", "16:00"],
        "14.05.2024": ["9:30", "11:00", "12:30", "14:00"],
        "15.05.2024": ["10:30", "12:00", "13:30"]
    };
    if (datum) {
        termini = { [datum]: termini[datum] };
    }
    res.json(termini);
});

router.get('/kafa', (req, res) => {
    const kafe = [
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija",
        "Espresso - Italija",
        "Americano - SAD",
        "Cappuccino - Italija",
        "Latte - Italija",
        "Macchiato - Italija"
    ];
    res.json(kafe);
});

router.get('/olimpijske-igre', (req, res) => {
    const godina = parseInt(req.query.godina);
    const rekordi = {
        2000: "Skok u vis - 2.45m, Skok u dalj - 8.95m, Sprint na 100m - 9.58s",
        2004: "Skok u vis - 2.50m, Skok u dalj - 9.00m, Sprint na 100m - 9.50s",
        2008: "Skok u vis - 2.55m, Skok u dalj - 9.05m, Sprint na 100m - 9.45s",
        2012: "Skok u vis - 2.60m, Skok u dalj - 9.10m, Sprint na 100m - 9.40s",
        2016: "Skok u vis - 2.65m, Skok u dalj - 9.15m, Sprint na 100m - 9.35s",
        2020: "Skok u vis - 2.70m, Skok u dalj - 9.20m, Sprint na 100m - 9.30s"
    };
    if (rekordi[godina]) {
        res.json(rekordi[godina]);
    } else {
        res.status(404).send('Not Found');
    }
});

router.get('/biciklizam', (req, res) => {
    const grad = req.query.grad;
    let rute = [
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić",
        "Beograd - Ada Ciganlija",
        "Novi Sad - Strand",
        "Nis - Bubanj",
        "Kragujevac - Sumarice",
        "Subotica - Palić"
    ];
    if (grad) {
        rute = rute.filter(r => r.includes(grad));
    }
    res.json(rute);
});

router.get('/okeani', (req, res) => {
    const okean = req.query.okean;
    let vrste = {
        "Atlantski okean": "Kitovi, Ajkule, Delfini",
        "Tihii okean": "Kitovi, Ajkule, Delfini",
        "Indijski okean": "Kitovi, Ajkule, Delfini",
        "Severni Ledni okean": "Kitovi, Ajkule, Delfini",
        "Juzni Ledni okean": "Kitovi, Ajkule, Delfini"
    };
    if (okean) {
        vrste = { [okean]: vrste[okean] };
    }
    res.json(vrste);
});


router.get('/projektni-obrasci', (req, res) => {
    const naziv = req.query.naziv;
    let obrasci = {
        "Singleton": "https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm",
        "Factory": "https://www.tutorialspoint.com/design_pattern/factory_pattern.htm",
        "Builder": "https://www.tutorialspoint.com/design_pattern/builder_pattern.htm",
        "Adapter": "https://www.tutorialspoint.com/design_pattern/adapter_pattern.htm"
    };
    if (naziv) {
        obrasci = { [naziv]: obrasci[naziv] };
    }
    res.json(obrasci);
});

router.get('/sortiranje', (req, res) => {
    const naziv = req.query.naziv;
    let algoritmi = {
        "Bubble sort": "https://www.geeksforgeeks.org/bubble-sort/",
        "Selection sort": "https://www.geeksforgeeks.org/selection-sort/",
        "Insertion sort": "https://www.geeksforgeeks.org/insertion-sort/",
        "Quick sort": "https://www.geeksforgeeks.org/quick-sort/"
    };
    if (naziv) {
        algoritmi = { [naziv]: algoritmi[naziv] };
    }
    res.json(algoritmi);
});

router.get('/imenik', (req, res) => {
    const ime = req.query.ime;
    let imenik = {
        "Nedzad": "0604446655",
        "Nedim": "0604446656",
        "Nazim": "0604446657"
    };
    if (ime) {
        imenik = { [ime]: imenik[ime] };
    }
    res.json(imenik);
});

router.get('/oglasi', (req, res) => {
    const pozicija = req.query.pozicija;
    let oglasi = {
        "Programer": "Potreban programer sa iskustvom",
        "Dizajner": "Potreban dizajner sa iskustvom",
        "Menadzer": "Potreban menadzer sa iskustvom"
    };
    if (pozicija) {
        oglasi = { [pozicija]: oglasi[pozicija] };
    }
    res.json(oglasi);
});

router.get('/aranzmani', (req, res) => {
    const destinacija = req.query.destinacija;
    let aranzmani = {
        "Grcka": "Aranzman 1 - 100e, Aranzman 2 - 200e, Aranzman 3 - 300e",
        "Turska": "Aranzman 4 - 400e, Aranzman 5 - 500e, Aranzman 6 - 600e",
        "Spanija": "Aranzman 7 - 700e, Aranzman 8 - 800e, Aranzman 9 - 900e",
        "Italija": "Aranzman 10 - 1000e, Aranzman 11 - 1100e, Aranzman 12 - 1200e",
        "Francuska": "Aranzman 13 - 1300e, Aranzman 14 - 1400e, Aranzman 15 - 1500e"
    };
    if (destinacija) {
        aranzmani = { [destinacija]: aranzmani[destinacija] };
    }
    res.json(aranzmani);
});

router.get('/autoskola', (req, res) => {
    let znaci = {
        "Znak 1": "Opis znaka 1",
        "Znak 2": "Opis znaka 2",
        "Znak 3": "Opis znaka 3",
        "Znak 4": "Opis znaka 4",
        "Znak 5": "Opis znaka 5",
        "Znak 6": "Opis znaka 6",
        "Znak 7": "Opis znaka 7",
        "Znak 8": "Opis znaka 8",
        "Znak 9": "Opis znaka 9",
        "Znak 10": "Opis znaka 10"
    };
    res.json(znaci);
});

router.get('/vestacka-inteligencija', (req, res) => {
    let algoritmi = {
        "DFS": "Opis algoritma DFS, Pseudo kod",
        "BFS": "Opis algoritma BFS, Pseudo kod",
        "Dijkstra": "Opis algoritma Dijkstra, Pseudo kod",
        "A*": "Opis algoritma A*, Pseudo kod"
    };
    res.json(algoritmi);
});

router.get('/suncev-sistem', (req, res) => {
    let tela = {
        "Sunce": "Opis Sunca",
        "Merkur": "Opis Merkura",
        "Venera": "Opis Venere",
        "Zemlja": "Opis Zemlje",
        "Mars": "Opis Marsa",
        "Jupiter": "Opis Jupitera",
        "Saturn": "Opis Saturna",
        "Uran": "Opis Urana",
        "Neptun": "Opis Neptuna",
        "Pluton": "Opis Plutona"
    };
    res.json(tela);
});

// Other endpoints can be added similarly...
module.exports = router;
