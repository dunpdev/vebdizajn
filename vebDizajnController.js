const express = require('express');
const router = express.Router();

// Helper functions and sample data
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
var users = [
    {username:"inas", password:"hh21312321321"}
];
router.post('/register', (req, res) =>{
    const {username, password} = req.body;
    users.push({username, password});
    res.json({success: true}); 
});
router.post('/login', (req, res) =>
    {
        const {username, password} = req.body;
        const user = users.find(user => user.username === username);
        if(!user) return res.json({success: false, message: "User not found"});
        if(user.password !== password) return res.json({success: false, message: "Wrong password"});
        res.json({success: true, message: "Welcome back, " + username});
    });

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
    const letovi = 
       [
        {
        vreme: "08:00",
        destinacija: "Beograd - Pariz",
        let: "JU 365",
        status: "Na vreme",
        datum: "20.1.2025"
       },
        {
          vreme: "10:00",
          destinacija: "Beograd - London",
          let: "JU 367",
          status: "Na vreme",
          datum: "20.1.2025"
        },
        {
          vreme: "12:00",
          destinacija: "Beograd - Rim",
          let: "JU 369",
          status: "Na vreme",
          datum: "20.1.2025"
        },
        {
          vreme: "14:00",
          destinacija: "Beograd - Berlin",
          let: "JU 371",
          status: "Na vreme",
          datum: "20.1.2025"
        },
        {
          vreme: "16:00",
          destinacija: "Beograd - Madrid",
          let: "JU 373",
          status: "Na vreme",
          datum: "20.1.2025"
        },
        {
          vreme: "18:00",
          destinacija: "Beograd - Istanbul",
          let: "JU 375",
          status: "Na vreme",
          datum: "20.1.2025"
        },
        {
          vreme: "20:00",
          destinacija: "Beograd - Moskva",
          let: "JU 377",
          status: "Na vreme",
          datum: "20.1.2025"
        },
        {
          vreme: "22:00",
          destinacija: "Beograd - Atina",
          let: "JU 379",
          status: "Na vreme",
          datum: "20.1.2025"
        },
        {
          vreme: "08:00",
          destinacija: "Beograd - Ljubljana",
          let: "JU 381",
          status: "Kasni 30 minuta",
          datum: "21.1.2025"
        },
        {
          vreme: "10:00",
          destinacija: "Beograd - Zagreb",
          let: "JU 383",
          status: "Kasni 30 minuta",
          datum: "21.1.2025"
        },
        {
          vreme: "12:00",
          destinacija: "Beograd - Sarajevo",
          let: "JU 385",
          status: "Kasni 30 minuta",
          datum: "21.1.2025"
        },
        {
          vreme: "14:00",
          destinacija: "Beograd - Podgorica",
          let: "JU 387",
          status: "Kasni 30 minuta",
          datum: "21.1.2025"
        },
        {
          vreme: "16:00",
          destinacija: "Beograd - Tirana",
          let: "JU 389",
          status: "Kasni 30 minuta",
          datum: "21.1.2025"
        },
        {
          vreme: "18:00",
          destinacija: "Beograd - Skoplje",
          let: "JU 391",
          status: "Kasni 30 minuta",
          datum: "21.1.2025"
        },
        {
          vreme: "20:00",
          destinacija: "Beograd - Sofija",
          let: "JU 393",
          status: "Kasni 30 minuta",
          datum: "21.1.2025"
        },
        {
          vreme: "22:00",
          destinacija: "Beograd - Budimpešta",
          let: "JU 395",
          status: "Kasni 30 minuta",
          datum: "21.1.2025"
        },
        {
          vreme: "08:00",
          destinacija: "Beograd - Bec",
          let: "JU 397",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "10:00",
          destinacija: "Beograd - Cirih",
          let: "JU 399",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "12:00",
          destinacija: "Beograd - Minhen",
          let: "JU 401",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "14:00",
          destinacija: "Beograd - Frankfurt",
          let: "JU 403",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "16:00",
          destinacija: "Beograd - Pariz",
          let: "JU 405",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "18:00",
          destinacija: "Beograd - London",
          let: "JU 407",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "20:00",
          destinacija: "Beograd - Rim",
          let: "JU 409",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "22:00",
          destinacija: "Beograd - Berlin",
          let: "JU 411",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "08:00",
          destinacija: "Beograd - Madrid",
          let: "JU 413",
          status: "Otkazan",
          datum: "22.1.2025"
        },
        {
          vreme: "10:00",
          destinacija: "Beograd - Istanbul",
          let: "JU 415",
          status: "Otkazan",
          datum: "22.1.2025"
        }
       ];
      
    res.json(letovi);
});

router.get('/internet-usluge', (req, res) => {
    const internetUsluge = {
      "SOLO": [
        {
          "name": "Starter",
          "speed": "100 Mbps",
          "price": "1,299 RSD / mesečno"
        },
        {
          "name": "Plus",
          "speed": "300 Mbps",
          "price": "1,499 RSD / mesečno"
        },
        {
          "name": "Premium",
          "speed": "500 Mbps",
          "price": "1,999 RSD / mesečno"
        }
      ],
      "DUO": [
        {
          "name": "Starter",
          "speed": "300 Mbps",
          "tv_channels": "300",
          "price": "1,999 RSD / mesečno"
        },
        {
          "name": "Plus",
          "speed": "500 Mbps",
          "tv_channels": "500",
          "price": "2,499 RSD / mesečno"
        },
        {
          "name": "Premium",
          "speed": "750 Mbps",
          "tv_channels": "750",
          "price": "2,999 RSD / mesečno"
        }
      ],
      "TRIO": [
        {
          "name": "Starter",
          "speed": "500 Mbps",
          "tv_channels": "500",
          "minutes": "500",
          "price": "2,999 RSD / mesečno"
        },
        {
          "name": "Plus",
          "speed": "750 Mbps",
          "tv_channels": "750",
          "minutes": "1000",
          "price": "3,499 RSD / mesečno"
        },
        {
          "name": "Premium",
          "speed": "1 Gbps",
          "tv_channels": "1000",
          "minutes": "Neograničeno",
          "price": "3,999 RSD / mesečno"
        }
      ]
    };
    res.json(internetUsluge);
});

router.get('/ucenje-engleskog', (req, res) => {
    const kartice = [
        {"word":"apple","image":"https://previews.123rf.com/images/blueringmedia/blueringmedia2204/blueringmedia220402555/184758767-education-word-card-of-english-opposites-word-illustration.jpg"},
        {"word":"coffee","image":"https://img.freepik.com/free-vector/education-word-card-english-opposites-word_1308-96997.jpg"},
        {"word":"jump","image":"https://img.freepik.com/free-vector/education-word-card-english-opposites-word_1308-111677.jpg"}
    ];
    res.json(kartice);
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
        "puzzles": {
          "english": [
            {
              "name": "Rubik's Cube",
              "main_image": "https://images.pexels.com/photos/6254929/pexels-photo-6254929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "A 3D combination puzzle where each face of the cube is a different color. The objective is to align the colors so that each face becomes a uniform color. Variations include different sizes and shapes, such as Pyraminx and Mirror Cube. Popular variations include 2x2x2 (Mini Cube), 4x4x4 (Rubik's Revenge), and 5x5x5 (Professor's Cube).",
              "variations": [
                {
                  "name": "2x2x2 (Mini Cube)",
                  "description": "Simpler version of the Rubik's Cube with no middle pieces, making it ideal for beginners.",
                  "difficulty": "Beginner",
                  "popularity": 4.5,
                  "image": "https://cdn.prod.website-files.com/6595ca03bcd68f311fd41872/65b129cad7f1ec360b69df99_659edd5970304acf99d9fd25_product__MINI_main.png",
                  "video": "https://www.youtube.com/watch?v=GANnG5a19kg&ab_channel=JPerm"
                },
                {
                  "name": "4x4x4 (Rubik's Revenge)",
                  "description": "Adds more complexity with centers that can move independently and parity errors.",
                  "difficulty": "Intermediate",
                  "popularity": 4.0,
                  "image": "https://cdn.prod.website-files.com/6595ca03bcd68f311fd41872/673cc25c8154cdc74cf26fae_product__MASTER_main-p-500.jpg",
                  "video" : "https://www.youtube.com/watch?v=KWOZHbDdOeo&ab_channel=JPerm"
                },
                {
                  "name": "5x5x5 (Professor's Cube)",
                  "description": "Even more challenging with additional edge and center pieces, offering a real test of patience and skill.",
                  "difficulty": "Advanced",
                  "popularity": 3.8,
                  "image": "https://www.grubiks.com/images/puzzles/19/small.png",
                  "video": "https://www.youtube.com/watch?v=d1I-jJlVwB4&ab_channel=JPerm"
                },
                {
                  "name": "Pyraminx",
                  "description": "A pyramid-shaped version of the cube puzzle that is easier than it looks.",
                  "difficulty": "Beginner",
                  "popularity": 4.3,
                  "image": "https://cdn.prod.website-files.com/6595ca03bcd68f311fd41872/65b129cbd4a1a1cd96e12422_659ee0ea0a2f977cbd4f737d_product__PYRAMID_main.png",
                  "video":"https://www.youtube.com/watch?v=pHBj8hixTfE&ab_channel=NOBLECUBES"
                },
                {
                  "name": "Mirror Cube",
                  "description": "A cube where pieces differ by shape instead of color, providing a visual and spatial challenge.",
                  "difficulty": "Advanced",
                  "popularity": 4.7,
                  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_HLHvxmxguBjmAtdXqKAS-JzX2vjc5suIg&s",
                  "video":"https://www.youtube.com/watch?v=asaVCDvLfRE&ab_channel=TheSimonShi"
                }
              ],
              "main_video": "https://www.youtube.com/embed/F-zMjsRgJws",
              "fun_fact": "The world record for solving a 3x3x3 Rubik's Cube is under 3.5 seconds as of 2023!",
              "history": {
                "inventor": "Ernő Rubik",
                "year_invented": 1974,
                "original_name": "Magic Cube",
                "milestone": "Became a global phenomenon in the 1980s."
              },
              "historical_fact": "The Rubik's Cube was invented in 1974 by Ernő Rubik, a Hungarian architect, as a teaching tool to help explain three-dimensional geometry.",
              "advanced_strategies": [
                "CFOP Method: Combines Cross, F2L (First Two Layers), OLL (Orientation of Last Layer), and PLL (Permutation of Last Layer).",
                "Roux Method: Focuses on block-building and solving edges in a minimalist way.",
                "ZZ Method: Optimizes edge orientation early in the solution for efficiency.",
                "FMC (Fewest Moves Challenge): Solves the cube in the least number of moves."
              ],
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "The standard Rubik's Cube can be solved in six steps: solving the white cross, solving the white corners, solving the middle layer edges, solving the yellow cross, orienting the yellow corners, and finally permuting the last layer. Variations like the 4x4x4 require additional steps to solve centers and parity errors."
                  },
                  {
                    "type": "video",
                    "title": "How to Solve a Rubik's Cube",
                    "url": "https://www.youtube.com/embed/R-R0KrXvWbc"
                  },
                  {
                    "type": "link",
                    "title": "Step-by-Step Rubik's Cube Guide",
                    "url": "https://www.rubiks.com/solution-guides"
                  },
                  {
                    "type": "article",
                    "title": "Speedcubing: Advanced Techniques and Competitions",
                    "url": "https://www.worldcubeassociation.org/"
                  }
                ],
                "tips": [
                  "Start by learning the notation: U (up), D (down), L (left), R (right), F (front), B (back).",
                  "Practice solving one face first before tackling the entire cube.",
                  "Learn the basic algorithms for common patterns like the T-perm and Y-perm.",
                  "For larger cubes, solve the centers and edges first before combining them to form a 3x3x3 cube solution.",
                  "Explore speed-solving techniques like F2L (First Two Layers), OLL (Orientation of Last Layer), and PLL (Permutation of Last Layer).",
                  "Use timer apps to track your progress and improve your solving speed."
                ],
                "related_facts": [
                  "There are over 43 quintillion possible configurations of a standard 3x3 Rubik's Cube.",
                  "The world record for solving a 3x3 Rubik's Cube is under 4 seconds.",
                  "Rubik's Cubes have been used in therapy to improve cognitive and motor skills.",
                  "The largest functional Rubik's Cube ever made was a 17x17x17 cube."
                ],
                "resources": {
                  "apps": [
                    {
                      "name": "Cube Solver",
                      "url": "https://www.cube-solver.com/",
                      "description": "An interactive solver for various cube puzzles."
                    },
                    {
                      "name": "Rubik's Cube Timer",
                      "url": "https://cubetimer.com/",
                      "description": "Track your solving time and compete with friends."
                    }
                  ],
                  "communities": [
                    {
                      "name": "SpeedSolving Forum",
                      "url": "https://www.speedsolving.com/",
                      "description": "Join a global community of cubers and exchange tips and techniques."
                    },
                    {
                      "name": "Reddit Rubik's Cube",
                      "url": "https://www.reddit.com/r/Cubers/",
                      "description": "Discuss puzzles, share solves, and participate in challenges."
                    }
                  ]
                }
              }
            },
            {
              "name": "Sudoku",
              "main_image": "https://images.pexels.com/photos/25596343/pexels-photo-25596343/free-photo-of-person-playing-sudoku-on-the-train.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "A logic-based number-placement puzzle where you fill a 9x9 grid so that each row, column, and 3x3 sub-grid contains the digits 1 through 9. Variations include Mini Sudoku (6x6), Killer Sudoku, and Samurai Sudoku, offering unique challenges to players of all skill levels.",
              "variations": [
                {
                  "name": "Mini Sudoku",
                  "description": "Smaller grids like 6x6 or 4x4 for quicker challenges, ideal for beginners or a short mental workout.",
                  "difficulty": "Beginner",
                  "popularity": 4.2,
                  "image": "https://ecdn.teacherspayteachers.com/thumbitem/480-Mini-Sudoku-Puzzles-for-Printing-4x4-and-6x6-grids-7079523-1656584443/original-7079523-4.jpg",
                  "video":"https://www.youtube.com/watch?v=qZOQHMGXaz4&ab_channel=SimpleTeachingbyHarry"          },
                {
                  "name": "Killer Sudoku",
                  "description": "Combines Sudoku with arithmetic cage constraints, adding a layer of math to the classic puzzle.",
                  "difficulty": "Intermediate",
                  "popularity": 4.5,
                  "image": "https://sarahrubinbooks.com/wp-content/uploads/2016/05/killer-sudoku-2.jpg?w=584",
                  "video": "https://www.youtube.com/watch?v=COsAC5y9gS4&ab_channel=dkmgames"
                },
                {
                  "name": "Samurai Sudoku",
                  "description": "Interconnected Sudoku grids that require solving multiple puzzles simultaneously, offering a truly complex challenge.",
                  "difficulty": "Advanced",
                  "popularity": 3.9,
                  "image": "https://www.researchgate.net/publication/264572734/figure/fig4/AS:669536953065484@1536641457567/Samurai-Sudoku-Example-135.jpg",
                  "video": "https://www.youtube.com/watch?v=EbZQizycDzM&ab_channel=MindDefiner"
                },
                {
                  "name": "Hyper Sudoku",
                  "description": "A twist where additional overlapping regions must also follow Sudoku rules.",
                  "difficulty": "Intermediate",
                  "popularity": 4.3,
                  "image": "https://d3p4ev2sxj7kns.cloudfront.net/assets/images/help/hyper1.png",
                  "video": "https://www.youtube.com/watch?v=GPbdSaFkMfo&ab_channel=SudokuSolver"
                }
              ],
              "main_video": "https://www.youtube.com/embed/kvU9_MVAiE0",
              "historical_fact": "Sudoku was inspired by an 18th-century mathematical concept known as Latin Squares and gained global popularity after being published in Japanese puzzle magazines in the 1980s.",
              "advanced_strategies": [
                "X-Wing: Identifies patterns that limit number placement across multiple rows and columns.",
                "Swordfish: Similar to X-Wing but involves three rows or columns.",
                "XYZ-Wing: A tactic used to eliminate possibilities based on shared candidate numbers.",
                "Jellyfish: Extends the Swordfish technique to four rows or columns."
              ],
              "history": {
                "Inventor": "Howard Garns",
                "Year Invented": "1979",
                "Original Name": "Number Place",
                "Milestone": "Became a worldwide phenomenon in the 2000s."
              },
              "fun_fact": "The largest Sudoku puzzle ever created had 666 grids interconnected and took players months to solve!",
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Start with the easiest numbers, usually those that appear most frequently in the grid. Use the process of elimination to deduce where numbers go. In Killer Sudoku, use the sum of cage clues to narrow down possibilities. Samurai Sudoku requires treating each grid as part of the whole puzzle."
                  },
                  {
                    "type": "video",
                    "title": "Sudoku Solving Techniques for Beginners",
                    "url": "https://www.youtube.com/embed/0-lMea8hF9s"
                  },
                  {
                    "type": "video",
                    "title": "Mastering Killer Sudoku",
                    "url": "https://www.youtube.com/embed/G4rRUtPx7Yg"
                  },
                  {
                    "type": "link",
                    "title": "Online Sudoku Solver and Tips",
                    "url": "https://www.sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/"
                  },
                  {
                    "type": "link",
                    "title": "Advanced Sudoku Techniques",
                    "url": "https://www.sudokuwiki.org/sudoku.htm"
                  }
                ],
                "tips": [
                  "Focus on rows, columns, or boxes that have the most numbers filled in.",
                  "Use pencil marks to keep track of possible numbers for each cell.",
                  "Look for hidden singles, where a number can only fit in one place within a row, column, or box.",
                  "In Killer Sudoku, prioritize solving cages with the smallest or largest sums.",
                  "Samurai Sudoku requires solving overlapping grids systematically, treating them as interconnected puzzles.",
                  "For Hyper Sudoku, identify overlapping regions early and ensure they adhere to Sudoku rules."
                ],
                "related_facts": [
                  "The modern Sudoku puzzle was popularized by Japanese publisher Nikoli in 1986.",
                  "The name 'Sudoku' is short for a Japanese phrase meaning 'single number.'",
                  "Sudoku puzzles are not math problems; they require logic and pattern recognition.",
                  "The largest Sudoku puzzle, consisting of 667 interconnected grids, was created in 2010."
                ],
                "resources": {
                  "apps": [
                    {
                      "name": "Sudoku.com",
                      "url": "https://www.sudoku.com/",
                      "description": "Play Sudoku online with difficulty levels and various challenges."
                    },
                    {
                      "name": "Killer Sudoku by Sudoku",
                      "url": "https://sudoku.com/killer/",
                      "description": "An app dedicated to solving Killer Sudoku puzzles."
                    }
                  ],
                  "communities": [
                    {
                      "name": "Reddit Sudoku",
                      "url": "https://www.reddit.com/r/Sudoku/",
                      "description": "Discuss Sudoku strategies, share puzzles, and get tips from a global community."
                    },
                    {
                      "name": "Sudoku Solver Forum",
                      "url": "http://forum.enjoysudoku.com/",
                      "description": "Dive deep into advanced solving techniques with other enthusiasts."
                    }
                  ]
                }
              }
            },
            {
              "name": "Crossword Puzzle",
              "main_image": "https://images.pexels.com/photos/6939467/pexels-photo-6939467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "A word puzzle where you fill in the blanks based on given clues. Variations include cryptic crosswords, themed puzzles, and crossnumber puzzles, each offering unique challenges to word enthusiasts.",
              "variations": [
                {
                  "name": "Cryptic Crossword",
                  "description": "Clues involve wordplay, anagrams, and double meanings that require lateral thinking.",
                  "difficulty": "Advanced",
                  "popularity": 4.5,
                  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/British_crossword.svg/1200px-British_crossword.svg.png",
                  "video": "https://www.youtube.com/watch?v=c9ZtJMAVqqY&ab_channel=DoctorAzmain"
                },
                {
                  "name": "Themed Crossword",
                  "description": "All clues or answers revolve around a central theme, making it perfect for fans of specific topics.",
                  "difficulty": "Intermediate",
                  "popularity": 4.3,
                  "image": "https://alexbajcz.wordpress.com/wp-content/uploads/2018/04/puzzle.png?w=676",
                  "video":"https://www.puzzlesociety.com/the-solutionist/what-are-crossword-themes"
                },
                {
                  "name": "Crossnumber Puzzle",
                  "description": "Uses numbers instead of words in the grid, creating a mathematical twist.",
                  "difficulty": "Intermediate",
                  "popularity": 3.8,
                  "image": "https://www.rfcafe.com/references/popular-electronics/images7/crossnumber-puzzle-popular-electronics-august-1958-1.jpg",
                  "video":"https://www.youtube.com/watch?v=9MbYtaA76rk&pp=ygUOI3B1enpsZV9jbGFzczI%3D"
                      },
                {
                  "name": "Mini Crossword",
                  "description": "A smaller grid for quick and casual solving, typically with simpler clues.",
                  "difficulty": "Beginner",
                  "popularity": 4.7,
                  "image": "https://images.squarespace-cdn.com/content/v1/52711462e4b0932c24aa05ae/1562237345181-1JDQ1ZEA8N14MZPNFGZL/MiniCryptics1.png",
                  "video": "https://www.youtube.com/watch?v=wW4-zhPzDPY"
                },
                {
                  "name": "Diagramless Crossword",
                  "description": "Players must figure out the grid layout as they solve, adding an extra layer of challenge.",
                  "difficulty": "Expert",
                  "popularity": 3.9,
                  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/CrosswordUSA.svg/640px-CrosswordUSA.svg.png",
                  "video": "https://www.puzzazz.com/how-to/diagramless-crosswords"
                }
              ],
              "main_video": "https://www.youtube.com/embed/edgpOYJKxfw",
              "historical_fact": "The first modern crossword puzzle was created by journalist Arthur Wynne and published in the New York World on December 21, 1913.",
              "advanced_strategies": [
                "Pattern Recognition: Use known letters to infer words and fill intersecting spaces.",
                "Themed Clues: Identify overarching themes in the puzzle to guide guesses.",
                "Word Stemming: Consider common prefixes, suffixes, and roots.",
                "Reverse Solving: Work backward from confirmed answers to deduce others."
              ],
              "tips": [
                "Start with short or frequently intersecting words to build momentum.",
                "For cryptic clues, think laterally; they often involve puns or wordplay.",
                "Use a dictionary or thesaurus to expand your vocabulary while solving.",
                "In themed puzzles, focus on clues that align with the central theme.",
                "Crossnumber puzzles benefit from familiarity with basic arithmetic or number sequences."
              ],
              "fun_fact": "The New York Times Crossword is considered the 'gold standard' of puzzles, with Monday being the easiest and Sunday the hardest.",
              "history": {
                "Inventor": "Arthur Wynne",
                "Year Invented": "1913",
                "Original Name": "Word-Cross",
                "Milestone": "Became a popular daily feature in newspapers worldwide."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Start with the shortest words and fill in the blanks based on the clues. Use intersecting letters to narrow down possibilities. Cryptic crosswords require interpreting clues with double meanings, such as anagrams or puns."
                  },
                  {
                    "type": "video",
                    "title": "Crossword Solving Strategies",
                    "url": "https://www.youtube.com/embed/dF2HkE6NxUo"
                  },
                  {
                    "type": "link",
                    "title": "How to Master Cryptic Crosswords",
                    "url": "https://www.theguardian.com/lifeandstyle/series/learn-how-to-solve-cryptic-crosswords"
                  },
                  {
                    "type": "link",
                    "title": "Printable Crossword Puzzles for All Levels",
                    "url": "https://www.crosswordpuzzles.com/"
                  }
                ],
                "tips": [
                  "Look for plural clues that end in 's' and see if they match the grid.",
                  "Fill in the easiest clues first and build on them.",
                  "Consider common prefixes or suffixes when guessing words.",
                  "In cryptic crosswords, look for anagrams, hidden words, or wordplay in the clues.",
                  "Use themed puzzles as a fun way to expand vocabulary on specific topics."
                ],
                "related_facts": [
                  "Crosswords first appeared in a New York newspaper in 1913 and became an instant hit.",
                  "The largest crossword puzzle ever created had over 91,000 squares!",
                  "Crosswords are scientifically proven to help maintain cognitive health and delay the onset of dementia."
                ],
                "resources": {
                  "apps": [
                    {
                      "name": "NYT Crossword App",
                      "url": "https://www.nytimes.com/crosswords",
                      "description": "Solve daily crosswords with difficulty levels ranging from easy to expert."
                    },
                    {
                      "name": "Crossword Solver by AppyNation",
                      "url": "https://apps.apple.com/crossword-solver",
                      "description": "An app to solve and create crosswords for enthusiasts."
                    }
                  ],
                  "communities": [
                    {
                      "name": "Reddit Crossword",
                      "url": "https://www.reddit.com/r/crossword/",
                      "description": "Join discussions, share puzzles, and find help with tough clues."
                    },
                    {
                      "name": "Crossword Puzzle Forum",
                      "url": "https://www.crosswordsolver.org/forum/",
                      "description": "Discuss solving techniques, share custom grids, and explore advanced tips."
                    }
                  ]
                }
              }
            },
              {
                "name": "Jigsaw Puzzle",
                "main_image": "https://images.pexels.com/photos/7417514/pexels-photo-7417514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "description": "A tiling puzzle where you assemble interlocking pieces to form a complete image. Variations include 3D puzzles, double-sided puzzles, and gradient puzzles, each offering unique challenges and experiences.",
                "variations": [
                  {
                    "name": "3D Puzzle",
                    "description": "Pieces form three-dimensional structures like famous landmarks or sculptures.",
                    "difficulty": "Intermediate",
                    "popularity": 4.7,
                    "image": "https://jokomisiada.pl/eng_pl_30-piece-3D-puzzle-London-Big-Ben-ZA3802-16991_7.jpg",
                    "video":"https://www.youtube.com/watch?v=0WYmoX6RKko"
                  },
                  {
                    "name": "Double-Sided Puzzle",
                    "description": "Features two distinct puzzles on either side of the pieces, doubling the challenge.",
                    "difficulty": "Advanced",
                    "popularity": 4.3,
                    "image": "https://i5.walmartimages.com/seo/Keith-Haring-2-Sided-500-Piece-Puzzle-Other_a4eadfd7-3969-40a9-a04d-cdaf3ba969e3.1b2732cbe5ce0530596d731af0fd6d00.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
                    "video": "https://www.youtube.com/watch?v=xwzuimWUh6s&ab_channel=KarenPuzzles"
                  },
                  {
                    "name": "Gradient Puzzle",
                    "description": "A puzzle with subtle color gradients, requiring keen attention to shades.",
                    "difficulty": "Expert",
                    "popularity": 4.0,
                    "image": "https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-clementoni-2000-pieces-gradient-puzzle-2000.webp",
                    "video": "https://www.youtube.com/watch?app=desktop&v=Zay0ndBMVGU&t=0s"
                  },
                  {
                    "name": "Mystery Puzzle",
                    "description": "Solve the puzzle without knowing the final image in advance.",
                    "difficulty": "Intermediate",
                    "popularity": 4.2,
                    "image": "https://www.holdson.com/images/thumbs/0013738_holdson-puzzle-wasgij-retro-mystery-4-500xl-pc-live-entertainment_625.jpeg",
                    "video": "https://www.youtube.com/watch?v=XRHglREeX20&ab_channel=PuzzleWithEmilia"
                  },
                  {
                    "name": "Custom Photo Puzzle",
                    "description": "Create a puzzle using your favorite photo, adding a personal touch.",
                    "difficulty": "Varies",
                    "popularity": 4.8,
                    "image": "https://assets.cdn-shop.com/picanova2-com/assets/img/products/photo-gifts/puzzle/custom-puzzle-complete-view-2ad8c7cb92.webp"
                  }
                ],
                "main_video": "https://www.youtube.com/embed/oRlCNXdcMc0",
                "historical_fact": "Jigsaw puzzles were invented around 1760 by John Spilsbury, a London cartographer, who used them to teach geography.",
                "advanced_strategies": [
                  "Edge Sorting: Assemble the border pieces first to establish the puzzle frame.",
                  "Color Sorting: Group pieces by color or pattern for faster assembly.",
                  "Pattern Recognition: Focus on recurring shapes or designs within the puzzle.",
                  "Chunk Building: Work on smaller sections and then combine them."
                ],
                "fun_fact": "The largest jigsaw puzzle ever created consists of over 551,000 pieces and measures 48 feet long!",
                "history": {
                  "Inventor": "John Spilsbury",
                  "Year Invented": "1767",
                  "Original Name": "Dissected Map",
                  "Milestone": "Became popular as a pastime in the 20th century."
                },
                "content": {
                  "tutorials": [
                    {
                      "type": "text",
                      "content": "Sort the pieces by edge, color, or pattern. Assemble the border first to define the puzzle's structure. For 3D puzzles, build the base before adding vertical layers."
                    },
                    {
                      "type": "video",
                      "title": "Jigsaw Puzzle Tips for Beginners",
                      "url": "https://www.youtube.com/embed/SV12puKJCQw"
                    },
                    {
                      "type": "link",
                      "title": "Advanced Jigsaw Puzzle Solving Strategies",
                      "url": "https://www.jigsawjunkies.com/advanced-tips/"
                    }
                  ],
                  "tips": [
                    "Sort pieces into edge pieces, corner pieces, and middle pieces for better organization.",
                    "Focus on unique patterns or distinct sections of the image to make faster progress.",
                    "Use sorting trays, boards, or mats to organize and move pieces efficiently.",
                    "Work under good lighting to distinguish subtle color differences.",
                    "For large puzzles, assemble sections separately and connect them later."
                  ],
                  "related_facts": [
                    "Jigsaw puzzles originated in the 18th century when maps were cut into pieces for educational purposes.",
                    "The term 'jigsaw' comes from the saw used to cut early puzzles.",
                    "Solving puzzles improves cognitive skills and is known to reduce stress."
                  ],
                  "resources": {
                    "online_stores": [
                      {
                        "name": "Puzzle Warehouse",
                        "url": "https://www.puzzlewarehouse.com/",
                        "description": "A wide selection of jigsaw puzzles for all skill levels and interests."
                      },
                      {
                        "name": "Ravensburger Puzzles",
                        "url": "https://www.ravensburger.com/",
                        "description": "High-quality puzzles with beautiful designs, including 3D puzzles."
                      }
                    ],
                    "communities": [
                      {
                        "name": "Jigsaw Puzzle Reddit Community",
                        "url": "https://www.reddit.com/r/Jigsawpuzzles/",
                        "description": "Discuss puzzles, share tips, and showcase completed works."
                      },
                      {
                        "name": "Puzzle Hobby",
                        "url": "https://en.tripadvisor.com.hk/ShowTopic-g1-i49577-k14218347-o10-Jigsaw_puzzles-The_Layover_Lounge.html",
                        "description": "A blog and forum dedicated to puzzle enthusiasts."
                      }
                    ]
                  }
                }
              },
            {
              "name": "Tower of Hanoi",
              "main_image": "https://media.hackerearth.com/blog/wp-content/uploads/2016/12/Cover_v2.png",
              "description": "A mathematical puzzle where you move a stack of disks from one rod to another, following specific rules. The objective is to transfer all disks to the target rod in the minimum number of moves. Variations include multi-peg setups, reversed rules, and time-based challenges.",
              "variations": [
                {
                  "name": "Classic Tower of Hanoi",
                  "description": "Standard 3-rod version with increasing disk counts.",
                  "difficulty": "Beginner to Intermediate",
                  "popularity": 4.8,
                  "image": "https://m.media-amazon.com/images/I/71YBCoqpvLL._AC_UF1000,1000_QL80_.jpg",
                  "video": "https://www.youtube.com/watch?v=LgxihOe9ObI&ab_channel=LockPickingCuber"
                },
                {
                  "name": "Multi-Peg Tower",
                  "description": "Adds extra rods, increasing complexity and strategy.",
                  "difficulty": "Advanced",
                  "popularity": 4.5,
                  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSto8sfJglJzEOdXhmgw_SOO2bhr8Z-y7mDNL-AMTO0XDTYNm1UktX-BlYTvWpV9krquP4&usqp=CAU"
                  ,"video": "https://www.tandfonline.com/doi/pdf/10.4169/college.math.j.44.2.110"
                },
                {
                  "name": "Reversed Rules Tower",
                  "description": "Reverse the process by starting from the final configuration and planning backward.",
                  "difficulty": "Intermediate",
                  "popularity": 4.2,
                  "image": "https://brownliving.in/cdn/shop/products/wooden-9-rings-tower-of-hanoi-puzzle-game-handmade-036-01947-1090-learning-educational-toys-brown-living-272053.jpg?v=1682969919"
                },
                {
                  "name": "Timed Tower",
                  "description": "Solve the puzzle within a set time limit, adding urgency.",
                  "difficulty": "Variable",
                  "popularity": 4.3,
                  "image": "https://cruxpuzzles.co.uk/cdn/shop/files/CCH-Hanoi-Tower-9R-3.jpg?v=1708610760&width=2048"
                }
              ],
              "main_video": "https://www.youtube.com/embed/_bWLwz_PquI",
              "historical_fact": "The Tower of Hanoi puzzle was invented in 1883 by French mathematician Édouard Lucas and is based on an ancient legend involving monks moving golden discs.",
              "advanced_strategies": [
                "Recursive Decomposition: Solve smaller sub-problems by moving n-1 discs.",
                "Binary Representation: Map the solution to binary numbers for efficient planning.",
                "Iterative Solution: Use an algorithm to systematically move the discs without recursion.",
                "Pattern Recognition: Identify repeating movement sequences across disc sizes."
              ],
              "fun_fact": "The Tower of Hanoi puzzle was invented in 1883 by French mathematician Édouard Lucas and was inspired by a legend about a temple with a large version of the puzzle.",
              "history": {
                "Inventor": "Édouard Lucas",
                "Year Invented": "1883",
                "Original Name": "The Tower of Brahma",
                "Milestone": "Became a popular mathematical puzzle and a symbol of recursive algorithms."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Move the disks one at a time, ensuring no larger disk is placed on top of a smaller one. Use the auxiliary rod strategically to hold disks temporarily. For multi-peg variations, plan moves carefully to optimize the use of additional rods."
                  },
                  {
                    "type": "video",
                    "title": "How to Solve the Tower of Hanoi",
                    "url": "https://www.youtube.com/embed/2SUvWfNJSsM"
                  },
                  {
                    "type": "link",
                    "title": "Interactive Tower of Hanoi Solver",
                    "url": "https://www.mathsisfun.com/games/towerofhanoi.html"
                  }
                ],
                "tips": [
                  "Start by moving the smallest disk to the target rod and build the solution step-by-step.",
                  "The minimum number of moves required is 2^n - 1, where n is the number of disks.",
                  "Break the problem into subproblems: solve for n-1 disks, then move the largest disk, and finally solve for the remaining disks.",
                  "In multi-peg variations, explore algorithms like the Frame-Stewart algorithm for optimized moves.",
                  "Practice visualizing moves in advance to develop a clear strategy."
                ],
                "related_facts": [
                  "The puzzle is often used to teach recursion in computer science.",
                  "If a Tower of Hanoi puzzle with 64 disks were solved at one move per second, it would take 585 billion years to complete!"
                ],
                "resources": {
                  "online_simulators": [
                    {
                      "name": "Tower of Hanoi Online Solver",
                      "url": "https://www.cut-the-knot.org/recurrence/hanoi.shtml",
                      "description": "Simulate and solve the Tower of Hanoi puzzle interactively."
                    }
                  ],
                  "related_games": [
                    {
                      "name": "Hanoi Redux",
                      "url": "https://www.igdb.com/games/tower-of-hanoi-puzzle/similar",
                      "description": "A modern twist on the classic Tower of Hanoi game with additional features."
                    }
                  ]
                }
              }
            },
            {
              "name": "15 Puzzle",
              "main_image": "https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "A sliding puzzle consisting of a 4x4 grid with 15 numbered tiles and one empty space. The goal is to rearrange the tiles into numerical order by sliding them around. Variations include 3x3, 5x5, and even larger grids for more challenging puzzles.",
              "variations": [
                {
                  "name": "Classic 15 Puzzle",
                  "description": "The standard 4x4 grid with 15 numbered tiles.",
                  "difficulty": "Intermediate",
                  "popularity": 4.7,
                  "image": "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/10/b4/53/10b45351-990e-a1b4-7944-b201fb486368/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png"
                ,"video":"https://www.google.com/search?q=how+to+solve+15+puzzle&rlz=1C1SQJL_enRS1047RS1047&oq=how+to+solve+15+puzzle&gs_lcrp=EgZjaHJvbWUqCwgAEAAYDRgTGIAEMgsIABAAGA0YExiABDILCAEQABgNGBMYgAQyCggCEAAYExgWGB4yCggDEAAYExgWGB4yCggEEAAYExgWGB4yCggFEAAYExgWGB4yCggGEAAYExgWGB4yCggHEAAYExgWGB4yCggIEAAYExgWGB4yCggJEAAYgAQYogTSAQg0NDI5ajBqOagCALACAQ&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:b298a005,vid:6uBl7WDVIic,st:0"
                },
                {
                  "name": "3x3 Puzzle",
                  "description": "A smaller, 3x3 version with 8 tiles and a single empty space for faster challenges.",
                  "difficulty": "Beginner",
                  "popularity": 4.5,
                  "image": "https://www.galliardgames.com/cdn/shop/products/3193774192006.GalliardGamesSlidePuzzle-6_1024x1024@2x.jpg?v=1648792434"
                ,"video":"https://www.youtube.com/watch?v=kF5fT7Um5bE"
                },
                {
                  "name": "5x5 Puzzle",
                  "description": "A larger, 5x5 version with 24 tiles, offering more complexity and strategic depth.",
                  "difficulty": "Advanced",
                  "popularity": 4.8,
                  "image": "https://m.media-amazon.com/images/I/91pXaae2QvL.jpg"
                ,"video": "https://www.youtube.com/watch?v=vKxenJMHurM&ab_channel=Quakelord1991"
                },
                {
                  "name": "Hexagonal Puzzle",
                  "description": "A variant of the 15 Puzzle with hexagonal pieces instead of square tiles.",
                  "difficulty": "Expert",
                  "popularity": 4.2,
                  "image": "https://m.media-amazon.com/images/I/713pvxAE4xL._AC_UF894,1000_QL80_.jpg",           "video": "https://devpost.com/software/the-hexagonal-puzzle"
                },
                {
                  "name": "Non-Square Grid Puzzle",
                  "description": "The puzzle is based on irregular grids, offering a unique challenge in arranging the tiles.",
                  "difficulty": "Expert",
                  "popularity": 4.3,
                  "image": "https://m.media-amazon.com/images/I/61oiez2MMoL.jpg"
                }
              ],
              "main_video": "https://www.youtube.com/embed/NWt0wd8hPUE",
              "historical_fact": "The 15 Puzzle was invented by Noyes Chapman in 1874 and became a global craze in the late 19th century.",
              "advanced_strategies": [
                "Row by Row Solving: Solve the top rows first and move sequentially downward.",
                "Corner Strategies: Position corner pieces early to reduce complexity.",
                "Pattern Analysis: Recognize key patterns to minimize unnecessary moves.",
                "Parity Correction: Plan moves to resolve situations with unreachable states."
              ],
              "fun_fact": "The 15 Puzzle was originally sold as a toy in the late 19th century and was a popular pastime in the United States and Europe. It's also known for being a challenging puzzle that helped inspire algorithms in computer science.",
              "history": {
                "Inventor": "Noyes Chapman",
                "Year Invented": "1874",
                "Original Name": "Gem Puzzle",
                "Milestone": "Became a popular puzzle after being featured in the New York Times in the 20th century."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Start by solving the first row and first column, then work on the remaining sections. Focus on small areas like corners and edges to simplify the process. For larger grids like the 5x5 puzzle, breaking it down into smaller subgrids can help."
                  },
                  {
                    "type": "video",
                    "title": "15 Puzzle Solving Techniques",
                    "url": "https://www.youtube.com/embed/aZvu2aTcn5s"
                  },
                  {
                    "type": "link",
                    "title": "Interactive 15 Puzzle Solver",
                    "url": "https://www.puzzle-solver.com/15-puzzle/"
                  }
                ],
                "tips": [
                  "Work on positioning tiles in small sections rather than moving each tile individually.",
                  "Use the empty space strategically to shuffle tiles and create room for movement.",
                  "Always focus on the first row and column before solving the middle section.",
                  "In larger variations, prioritize solving the corners and edges first before tackling the inner tiles.",
                  "Memorize common patterns (e.g., corner and edge configurations) to reduce trial and error when solving."
                ],
                "related_facts": [
                  "The puzzle has been studied mathematically, and it's known that not all random tile configurations are solvable.",
                  "The 15 Puzzle was popularized by a promotional game in 1878 where players would attempt to solve the puzzle in a race against time."
                ],
                "resources": {
                  "online_simulators": [
                    {
                      "name": "15 Puzzle Online Solver",
                      "url": "https://alternativeto.net/software/fifteen-puzzle-x/",
                      "description": "Solve the 15 Puzzle interactively with a customizable grid size."
                    }
                  ],
                  "related_games": [
                    {
                      "name": "Sliding Puzzle",
                      "url": "https://www.puzzle-games.com/sliding-puzzle/",
                      "description": "Some puzzles that are familiar with the classic 15 puzzle."
                    },
                    {
                      "name": "Super Sliding Puzzle",
                      "url": "https://play.google.com/store/apps/details?id=com.supradendev.a15puzzle",
                      "description": "Download some of these games from the apple store."
                    }
                  ]
                }
              }
            },
            {
              "name": "Logic Grid Puzzles",
              "main_image": "https://images.pexels.com/photos/7296627/pexels-photo-7296627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "Logic grid puzzles challenge you to use clues to fill in a grid and deduce relationships between different categories. Variations include themed grids, multi-level logic challenges, and puzzles with different complexity levels.",
              "variations": [
                {
                  "name": "Classic Logic Grid",
                  "description": "The standard version where you fill in a grid using logical deduction from a set of clues.",
                  "difficulty": "Intermediate",
                  "popularity": 4.6,
                  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePmfrjnletGbq5ZY0B3ykb6dgWDeDCmLibg&s"
                ,"video":"https://www.google.com/search?q=how+to+solve+logic+grid+puzzles&rlz=1C1SQJL_enRS1047RS1047&oq=how+to+solve+glogic+grid+puz&gs_lcrp=EgZjaHJvbWUqCwgBEAAYDRgTGIAEMgYIABBFGDkyCwgBEAAYDRgTGIAEMgoIAhAAGBMYFhgeMgcIAxAAGO8FMgoIBBAAGIAEGKIEMgcIBRAAGO8FMgcIBhAAGO8FMgcIBxAAGO8F0gEINDg4MGowajSoAgCwAgE&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:9db97b2c,vid:CNxfZwvaQ-k,st:0"
                },
                {
                  "name": "Themed Logic Grid",
                  "description": "A variation where the grid involves a specific theme (e.g., animals, professions, countries) that provides additional clues.",
                  "difficulty": "Advanced",
                  "popularity": 4.7,
                  "image": "https://i.etsystatic.com/17614238/r/il/32ec82/4085984585/il_570xN.4085984585_9oez.jpg"
                },
                {
                  "name": "Multi-Level Logic Puzzle",
                  "description": "Multiple interconnected logic grids that require you to solve smaller puzzles and combine their results.",
                  "difficulty": "Expert",
                  "popularity": 4.8,
                  "image": "https://logic.puzzlebaron.com/images/example.gif"
                },
                {
                  "name": "Numeric Logic Grid",
                  "description": "A variation that involves numbers instead of words, requiring mathematical reasoning to deduce relationships.",
                  "difficulty": "Advanced",
                  "popularity": 4.5,
                  "image": "https://images.squarespace-cdn.com/content/v1/52711462e4b0932c24aa05ae/1591610275834-4KJC93MLPRVGB1D26E8X/GCShikaku001grid.png?format=1500w"
                }
              ],
              "main_video": "https://www.youtube.com/embed/cUL9aLBeAuc",
              "historical_fact": "Logic grid puzzles gained prominence in the 20th century and are often associated with the works of Raymond Smullyan, a logician and puzzle creator.",
              "advanced_strategies": [
                "Elimination Method: Systematically rule out impossible options in the grid.",
                "Deductive Chains: Use a series of logical deductions to fill in gaps.",
                "Clue Integration: Cross-reference multiple clues for consistency.",
                "Grouping Techniques: Organize similar clues together for faster solving."
              ],
              "fun_fact": "Logic Grid Puzzles originated in the 1980s as a way to combine deductive reasoning with puzzle-solving skills. They are sometimes called 'Einstein Puzzles' due to their challenging nature.",
              "history": {
                "Inventor": "Unknown",
                "Year Invented": "Late 20th century",
                "Original Name": "Logic Puzzles",
                "Milestone": "Became popular in newspapers and puzzle books in the 2000s."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Read all clues carefully and start filling in the grid with definitive information. Use a process of elimination to fill in the rest. In multi-level puzzles, solve smaller grids first and combine results for the final solution."
                  },
                  {
                    "type": "video",
                    "title": "How to Solve Logic Grid Puzzles",
                    "url": "https://www.youtube.com/embed/UDnyduf4YTM"
                  },
                  {
                    "type": "link",
                    "title": "Interactive Logic Grid Puzzle Solver",
                    "url": "https://www.logicgridpuzzles.com/solver/"
                  }
                ],
                "tips": [
                  "Use a grid to organize possible and impossible relationships. Mark off impossible connections to narrow down options.",
                  "Look for clues that establish direct relationships between items. These clues are often easier to process.",
                  "Deduction is key—start with the most certain information and work your way through the puzzle.",
                  "In themed grids, apply your knowledge of the subject to solve clues faster. For example, knowing the names of popular animals can help you with a themed puzzle.",
                  "For multi-level puzzles, solve each individual grid first. Once you have answers for all levels, combine them logically to reach the final solution."
                ],
                "related_facts": [
                  "It is said that Albert Einstein created one of the first logic grid puzzles in the early 20th century, and only 2% of the population could solve it.",
                  "Many modern logic grid puzzles are now available in app format, making them easier to access and solve on the go."
                ],
                "resources": {
                  "online_simulators": [
                    {
                      "name": "Logic Grid Puzzle Online",
                      "url": "https://logic.puzzlebaron.com/",
                      "description": "A website offering interactive logic grid puzzles with varying levels of difficulty."
                    }
                  ],
                  "related_games": [
                    {
                      "name": "Similar Puzzles",
                      "url": "https://steampeek.hu/?appid=3192940",
                      "description": "A reddit forum that talks about similar games."
                    },
                    {
                      "name": "Brainzilla",
                      "url": "https://www.brainzilla.com/logic/",
                      "description": "A website that talks about logic puzzles."
                    }
                  ]
                }
              }
            }
          ],
          "srpski": [
            {
              "name": "Рубиков куб",
              "main_image": "https://images.pexels.com/photos/6254929/pexels-photo-6254929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "3D комбинациони слагалица где је свако лице куба различите боје. Циљ је да се боје поређају тако да свако лице постане униформна боја. Различите варијације укључују различите величине и облике, као што су Пираминкс и Мирор куб. Популарне варијације укључују 2x2x2 (Мини куб), 4x4x4 (Рубиково осветљење), и 5x5x5 (Професорски куб).",
              "variations": [
                {
                  "name": "2x2x2 (Мини куб)",
                  "description": "Једноставнија верзија Рубиковог куба без средњих делова, идеална за почетнике.",
                  "difficulty": "Почетник",
                  "popularity": 4.5,
                  "image": "https://cdn.prod.website-files.com/6595ca03bcd68f311fd41872/65b129cad7f1ec360b69df99_659edd5970304acf99d9fd25_product__MINI_main.png",
                  "video": "https://www.youtube.com/watch?v=GANnG5a19kg&ab_channel=JPerm"
                },
                {
                  "name": "4x4x4 (Рубиково осветљење)",
                  "description": "Додаје више комплексности са центрима који могу да се крећу независно и паритетним грешкама.",
                  "difficulty": "Интермедијар",
                  "popularity": 4.0,
                  "image": "https://cdn.prod.website-files.com/6595ca03bcd68f311fd41872/673cc25c8154cdc74cf26fae_product__MASTER_main-p-500.jpg",
                  "video": "https://www.youtube.com/watch?v=KWOZHbDdOeo&ab_channel=JPerm"
                },
                {
                  "name": "5x5x5 (Професорски куб)",
                  "description": "Још сложеније са додатним ивичним и централним деловима, пружа прави тест стрпљења и вештине.",
                  "difficulty": "Напредни",
                  "popularity": 3.8,
                  "image": "https://www.grubiks.com/images/puzzles/19/small.png",
                  "video": "https://www.youtube.com/watch?v=d1I-jJlVwB4&ab_channel=JPerm"
                },
                {
                  "name": "Пираминкс",
                  "description": "Куб у облику пирамиде који је лакши него што изгледа.",
                  "difficulty": "Почетник",
                  "popularity": 4.3,
                  "image": "https://cdn.prod.website-files.com/6595ca03bcd68f311fd41872/65b129cbd4a1a1cd96e12422_659ee0ea0a2f977cbd4f737d_product__PYRAMID_main.png",
                  "video": "https://www.youtube.com/watch?v=pHBj8hixTfE&ab_channel=NOBLECUBES"
                },
                {
                  "name": "Мирор куб",
                  "description": "Куб чији се делови разликују по облику уместо по боји, пружајући визуелни и просторни изазов.",
                  "difficulty": "Напредни",
                  "popularity": 4.7,
                  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_HLHvxmxguBjmAtdXqKAS-JzX2vjc5suIg&s",
                  "video": "https://www.youtube.com/watch?v=asaVCDvLfRE&ab_channel=TheSimonShi"
                }
              ],
              "main_video": "https://www.youtube.com/embed/F-zMjsRgJws",
              "fun_fact": "Свetsки рекорд за решавање Рубиковог куба 3x3x3 је испод 3,5 секунде од 2023. године!",
              "history": {
                "inventor": "Ерно Рубик",
                "year_invented": 1974,
                "original_name": "Магични куб",
                "milestone": "Постала глобална појава 1980-их."
              },
              "historical_fact": "Рубиков куб је изумео 1974. године Ерно Рубик, мађарски архитекта, као наставни алат за објашњавање тродимензионалне геометрије.",
              "advanced_strategies": [
                "CFOP метод: Комбинује Cross, F2L (Прва два слоја), OLL (Оријентација последњег слоја) и PLL (Пермутација последњег слоја).",
                "Роук метод: Фокусира се на прављење блокова и решавање ивица на минималистички начин.",
                "ZZ метод: Оптимизује оријентацију ивица рано у решењу ради ефикасности.",
                "FMC (Изазов са најмање потеза): Решава куб са што мање потеза."
              ],
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Стандардни Рубиков куб може да се реши у шест корака: решавање белог крста, решавање белих углова, решавање ивица средњег слоја, решавање жутог крста, оријентација жутих углова и на крају пермутација последњег слоја. Варијације као што је 4x4x4 захтевају додатне кораке за решавање центара и паритетних грешака."
                  },
                  {
                    "type": "video",
                    "title": "Како решити Рубиков куб",
                    "url": "https://www.youtube.com/embed/R-R0KrXvWbc"
                  },
                  {
                    "type": "link",
                    "title": "Упутство за решавање Рубиковог куба корак по корак",
                    "url": "https://www.rubiks.com/solution-guides"
                  },
                  {
                    "type": "article",
                    "title": "Спидкубинг: Напредне технике и такмичења",
                    "url": "https://www.worldcubeassociation.org/"
                  }
                ],
                "tips": [
                  "Почните са учењем нотације: U (горе), D (доле), L (лево), R (десно), F (предње), B (задње).",
                  "Практикујте решавање једне површине пре него што решавате цео куб.",
                  "Учење основних алгоритама за честа патерна као што су T-перм и Y-перм.",
                  "За веће кубове решите центре и ивице прво пре него што их комбинујете да бисте решили 3x3x3 куб.",
                  "Истражите технике за брзо решавање као што су F2L (Прва два слоја), OLL (Оријентација последњег слоја) и PLL (Пермутација последњег слоја).",
                  "Користите апликације за тајмере како бисте пратили свој напредак и побољшали брзину решавања."
                ],
                "related_facts": [
                  "Постоји преко 43 квинтилиона могућих конфигурација стандардног Рубиковог куба 3x3.",
                  "Свetsки рекорд за решавање Рубиковог куба 3x3 је испод 4 секунде.",
                  "Рубикови кубови су коришћени у терапији за побољшање когнитивних и моторичких вештина.",
                  "Највећи функционални Рубиков куб икада направљен био је 17x17x17 куб."
                ],
                "resources": {
                  "apps": [
                    {
                      "name": "Cube Solver",
                      "url": "https://www.cube-solver.com/",
                      "description": "Интерактивни решавач за разне кубове."
                    },
                    {
                      "name": "Рубиков куб тајмер",
                      "url": "https://cubetimer.com/",
                      "description": "Пратите своје време решавања и такмичите се са пријатељима."
                    }
                  ],
                  "communities": [
                    {
                      "name": "SpeedSolving Форум",
                      "url": "https://www.speedsolving.com/",
                      "description": "Придружите се глобалној заједници кубера и размењујте савете и технике."
                    },
                    {
                      "name": "Реддит Рубиков куб",
                      "url": "https://www.reddit.com/r/Cubers/",
                      "description": "Разговарајте о слагалицама, делите решења и учествујте у изазовима."
                    }
                  ]
                }
              }
            },
            {
              "name": "Судоку",
              "main_image": "https://images.pexels.com/photos/25596343/pexels-photo-25596343/free-photo-of-person-playing-sudoku-on-the-train.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "Логичка игра са распоређивањем бројева у којој попуњавате 9x9 мрежу тако да сваки ред, колона и 3x3 подмрежа садрже цифре од 1 до 9. Варијације укључују Мини Судоку (6x6), Килер Судоку и Самурај Судоку, које нуде јединствене изазове за играче свих нивоа вештина.",
              "variations": [
                {
                  "name": "Мини Судоку",
                  "description": "Мале мреже као што су 6x6 или 4x4 за брже изазове, идеално за почетнике или кратку менталну вежбу.",
                  "difficulty": "Почетник",
                  "popularity": 4.2,
                  "image": "https://ecdn.teacherspayteachers.com/thumbitem/480-Mini-Sudoku-Puzzles-for-Printing-4x4-and-6x6-grids-7079523-1656584443/original-7079523-4.jpg",
                  "video": "https://www.youtube.com/watch?v=qZOQHMGXaz4&ab_channel=SimpleTeachingbyHarry"
                },
                {
                  "name": "Килер Судоку",
                  "description": "Комбинује Судоку са аритметским ограничењима у кавезима, додајући слој математике класичној загонетци.",
                  "difficulty": "Средњи",
                  "popularity": 4.5,
                  "image": "https://sarahrubinbooks.com/wp-content/uploads/2016/05/killer-sudoku-2.jpg?w=584",
                  "video": "https://www.youtube.com/watch?v=COsAC5y9gS4&ab_channel=dkmgames"
                },
                {
                  "name": "Самурај Судоку",
                  "description": "Међусобно повезане Судоку мреже које захтевају решавање више загонетки истовремено, нудећи заиста комплексни изазов.",
                  "difficulty": "Напредни",
                  "popularity": 3.9,
                  "image": "https://www.researchgate.net/publication/264572734/figure/fig4/AS:669536953065484@1536641457567/Samurai-Sudoku-Example-135.jpg",
                  "video": "https://www.youtube.com/watch?v=EbZQizycDzM&ab_channel=MindDefiner"
                },
                {
                  "name": "Хипер Судоку",
                  "description": "Обрт где додатне преклапајуће области такође морају да прате правила Судоку.",
                  "difficulty": "Средњи",
                  "popularity": 4.3,
                  "image": "https://d3p4ev2sxj7kns.cloudfront.net/assets/images/help/hyper1.png",
                  "video": "https://www.youtube.com/watch?v=GPbdSaFkMfo&ab_channel=SudokuSolver"
                }
              ],
              "main_video": "https://www.youtube.com/embed/kvU9_MVAiE0",
              "historical_fact": "Судоку је инспирисан математичким концептом из 18. века познатим као Латински квадрат, а постао је глобално популаран након што је објављен у јапанским часописима за загонетке 1980-их.",
              "advanced_strategies": [
                "X-Wing: Идентификује обрасце који ограничавају распоред бројева преко више редова и колона.",
                "Swordfish: Слично као X-Wing, али укључује три реда или колоне.",
                "XYZ-Wing: Тактика која се користи за елиминисање могућности на основу заједничких кандидата бројева.",
                "Јеллифиш: Продужује технику Swordfish на четири реда или колоне."
              ],
              "history": {
                "Inventor": "Хауард Гарнс",
                "Year Invented": "1979",
                "Original Name": "Бројно место",
                "Milestone": "Постала глобални феномен 2000-их."
              },
              "fun_fact": "Највећа Судоку загонетка икада створена имала је 666 повезаних мрежа и играчима је било потребно месецима да је реше!",
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Почните са најлакшим бројевима, обично онима који се најчешће појављују у мрежи. Користите процес елиминације да бисте закључили где бројеvi иду. У Килер Судоку користите збир индикација кавеза да сужавате могућности. Самурај Судоку захтева да свака мрежа буде третирана као део целе загонетке."
                  },
                  {
                    "type": "video",
                    "title": "Технике решавања Судоку за почетнике",
                    "url": "https://www.youtube.com/embed/0-lMea8hF9s"
                  },
                  {
                    "type": "video",
                    "title": "Мајсторско решавање Килер Судоку",
                    "url": "https://www.youtube.com/embed/G4rRUtPx7Yg"
                  },
                  {
                    "type": "link",
                    "title": "Онлајн Судоку решавалац и савети",
                    "url": "https://www.sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/"
                  },
                  {
                    "type": "link",
                    "title": "Напредне Судоку технике",
                    "url": "https://www.sudokuwiki.org/sudoku.htm"
                  }
                ],
                "tips": [
                  "Фокусирајте се на редове, колоне или кутије које имају највише попуњених бројева.",
                  "Користите оловне ознаке да бисте пратили могуће бројеве за сваку ћелију.",
                  "Тражите скривене јединице, где број може да стане само на једно место у реду, колони или кутији.",
                  "У Килер Судоку, дајте приоритет решавању кавеза са најмањим или највећим збиром.",
                  "Самурај Судоку захтева решавање преклапајућих мрежа систематски, третирајући их као повезане загонетке.",
                  "За Хипер Судоку, рано идентификујте преклапајуће области и осигуравајте да се придржавају правила Судоку."
                ],
                "related_facts": [
                  "Модерну Судоку загонетку је популаризовао јапански издавач Николи 1986. године.",
                  "Назив 'Судоку' је скраћеница од јапанске фразе која значи 'један број.'",
                  "Судоку загонетке нису математички проблеми; оне захтевају логичко размишљање и препознавање образаца.",
                  "Највећа Судоку загонетка, која се састојала од 667 повезаних мрежа, створена је 2010. године."
                ],
                "resources": {
                  "apps": [
                    {
                      "name": "Sudoku.com",
                      "url": "https://www.sudoku.com/",
                      "description": "Играјте Судоку онлајн са различитим нивоима тежине и разним изазовима."
                    },
                    {
                      "name": "Килер Судоку од Судоку",
                      "url": "https://sudoku.com/killer/",
                      "description": "Апликација посвећена решавању Килер Судоку загонетки."
                    }
                  ],
                  "communities": [
                    {
                      "name": "Реддит Судоку",
                      "url": "https://www.reddit.com/r/Sudoku/",
                      "description": "Дискусујте стратегије за Судоку, делите загонетке и добијте савете од глобалне заједнице."
                    },
                    {
                      "name": "Форуми за Судоку решавање",
                      "url": "http://forum.enjoysudoku.com/",
                      "description": "Проучите напредне технике решавања уз друге ентузијасте."
                    }
                  ]
                }
              }
            },
            {
              "name": "Кросворд Пазл",
              "main_image": "https://images.pexels.com/photos/6939467/pexels-photo-6939467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "Речни загонетка у којој попуњавате празнине на основу датих траговима. Варијације укључују криптичне кросвордове, тематске загонетке и кросбројне загонетке, свака од њих нуди јединствене изазове за љубитеље речи.",
              "variations": [
                {
                  "name": "Криптични Кросворд",
                  "description": "Трагови укључују игру са речима, анаграме и двојна значења која захтевају латерално размишљање.",
                  "difficulty": "Напредно",
                  "popularity": 4.5,
                  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/British_crossword.svg/1200px-British_crossword.svg.png",
                  "video": "https://www.youtube.com/watch?v=c9ZtJMAVqqY&ab_channel=DoctorAzmain"
                },
                {
                  "name": "Тематски Кросворд",
                  "description": "Сви трагови или одговори се односе на централну тему, што га чини идеалним за обожаваоце специфичних тема.",
                  "difficulty": "Средње",
                  "popularity": 4.3,
                  "image": "https://alexbajcz.wordpress.com/wp-content/uploads/2018/04/puzzle.png?w=676",
                  "video": "https://www.puzzlesociety.com/the-solutionist/what-are-crossword-themes"
                },
                {
                  "name": "Кросбројна Загонетка",
                  "description": "Коришћење бројева уместо речи у решавању, ствара математички обрт.",
                  "difficulty": "Средње",
                  "popularity": 3.8,
                  "image": "https://www.rfcafe.com/references/popular-electronics/images7/crossnumber-puzzle-popular-electronics-august-1958-1.jpg",
                  "video": "https://www.youtube.com/watch?v=9MbYtaA76rk&pp=ygUOI3B1enpsZV9jbGFzczI%3D"
                },
                {
                  "name": "Мини Кросворд",
                  "description": "Мања решавачка мрежа за брзо и лака решавања, обично са једноставнијим траговима.",
                  "difficulty": "Почетник",
                  "popularity": 4.7,
                  "image": "https://images.squarespace-cdn.com/content/v1/52711462e4b0932c24aa05ae/1562237345181-1JDQ1ZEA8N14MZPNFGZL/MiniCryptics1.png",
                  "video": "https://www.youtube.com/watch?v=wW4-zhPzDPY"
                },
                {
                  "name": "Дијаграмски Кросворд",
                  "description": "Играчима је потребно да открију изглед мреже док решавају, што додаје додатни ниво изазова.",
                  "difficulty": "Стручњак",
                  "popularity": 3.9,
                  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/CrosswordUSA.svg/640px-CrosswordUSA.svg.png",
                  "video": "https://www.puzzazz.com/how-to/diagramless-crosswords"
                }
              ],
              "main_video": "https://www.youtube.com/embed/edgpOYJKxfw",
              "historical_fact": "Први савремени кросворд је створио новинар Артур Вин и објављен је у Њујорк Ворлду 21. децембра 1913. године.",
              "advanced_strategies": [
                "Препознавање Шема: Користите познате слова да изведете речи и попуните пресекне просторе.",
                "Тематски Трагови: Препознајте свеобухватне теме у загонетки како бисте усмерили претпоставке.",
                "Корени Речи: Размотрите уобичајене префиксе, суфиксе и корене.",
                "Решавање уназад: Радите уназад од потврђених одговора да бисте извели друге."
              ],
              "tips": [
                "Започните са кратким или често пресеченим речима како бисте започели решавање.",
                "За криптичне трагове, размишљајте латерално; често укључују игре са речима или анаграме.",
                "Користите речник или тезаурус како бисте проширили свој вокабулар током решавања.",
                "У тематским загонеткама, усмерите се на трагове који се повезују са централном темом.",
                "Кросбројне загонетке користе основну аритметику и бројне секвенце."
              ],
              "fun_fact": "Њујорк Тајмс кросворд се сматра 'златним стандардом' загонетки, са понеделком као најлакшим и недељом као најтежим.",
              "history": {
                "Inventor": "Артур Вин",
                "Year Invented": "1913",
                "Original Name": "Word-Cross",
                "Milestone": "Постао популаран дневни додатак у новинама широм света."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Започните са најкраћим речима и попуните празнине на основу трагова. Користите слова која се пресекују да сузите могућности. Криптични кросвордови захтевају тумачење трагова са двојним значењима, као што су анаграми или игре са речима."
                  },
                  {
                    "type": "video",
                    "title": "Стратегије за Решевање Кросворда",
                    "url": "https://www.youtube.com/embed/dF2HkE6NxUo"
                  },
                  {
                    "type": "link",
                    "title": "Како Савладати Криптичне Кросвордове",
                    "url": "https://www.theguardian.com/lifeandstyle/series/learn-how-to-solve-cryptic-crosswords"
                  },
                  {
                    "type": "link",
                    "title": "Печатељни Кросвордови за Све Нивое",
                    "url": "https://www.crosswordpuzzles.com/"
                  }
                ],
                "tips": [
                  "Погледајте трагове који су у множини и видите да ли се уклапају у мрежу.",
                  "Попуните најлакше трагове прво и градите на њима.",
                  "Размотрите уобичајене префиксе или суфиксе при погодбама за речи.",
                  "У криптичним кросвордовима, потражите анаграме, скривене речи или игре са речима у траговима.",
                  "Користите тематске загонетке као забаван начин да проширите свој вокабулар о специфичним темама."
                ],
                "related_facts": [
                  "Кросвордови су први пут објављени у Њујорк новинама 1913. године и одмах постали хит.",
                  "Највећа кросворд загонетка икада направљена имала је преко 91.000 квадратних метара!",
                  "Кросвордови су научно доказани као средство за одржавање когнитивног здравља и одлагање појаве деменције."
                ],
                "resources": {
                  "apps": [
                    {
                      "name": "NYT Кросворд Апликација",
                      "url": "https://www.nytimes.com/crosswords",
                      "description": "Решавајте дневне кросвордове са нивоима тежине од лаког до стручног."
                    },
                    {
                      "name": "Кросворд Решевац од AppyNation",
                      "url": "https://apps.apple.com/crossword-solver",
                      "description": "Апликација за решавање и прављење кросвордова за ентузијасте."
                    }
                  ],
                  "communities": [
                    {
                      "name": "Реддит Кросворд",
                      "url": "https://www.reddit.com/r/crossword/",
                      "description": "Придружите се дискусијама, делите загонетке и нађите помоћ са тешким траговима."
                    },
                    {
                      "name": "Форум за Кросворд Пазле",
                      "url": "https://www.crosswordsolver.org/forum/",
                      "description": "Разговарајте о техникама решавања, делите прилагођене мреже и истражите напредне савете."
                    }
                  ]
                }
              }
            },
            {
              "name": "Слагалица",
              "main_image": "https://images.pexels.com/photos/7417514/pexels-photo-7417514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "Слагалица у којој састављате међусобно уклапајуће делове како бисте формирали потпуну слику. Варијације укључују 3D слагалице, двостране слагалице и градијентне слагалице, које свака нуде јединствене изазове и искуства.",
              "variations": [
                {
                  "name": "3D Слагалица",
                  "description": "Делови формирају тродимензионалне структуре попут познатих знаменитости или скулптура.",
                  "difficulty": "Средњи",
                  "popularity": 4.7,
                  "image": "https://jokomisiada.pl/eng_pl_30-piece-3D-puzzle-London-Big-Ben-ZA3802-16991_7.jpg",
                  "video": "https://www.youtube.com/watch?v=0WYmoX6RKko"
                },
                {
                  "name": "Двострана Слагалица",
                  "description": "Поседује две различите слагалице на свакој страни делова, удвостручујући изазов.",
                  "difficulty": "Напредно",
                  "popularity": 4.3,
                  "image": "https://i5.walmartimages.com/seo/Keith-Haring-2-Sided-500-Piece-Puzzle-Other_a4eadfd7-3969-40a9-a04d-cdaf3ba969e3.1b2732cbe5ce0530596d731af0fd6d00.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
                  "video": "https://www.youtube.com/watch?v=xwzuimWUh6s&ab_channel=KarenPuzzles"
                },
                {
                  "name": "Градијентна Слагалица",
                  "description": "Слагалица са суptилним градијентима боја, која захтева велику пажњу на нијансе.",
                  "difficulty": "Стручњак",
                  "popularity": 4.0,
                  "image": "https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-clementoni-2000-pieces-gradient-puzzle-2000.webp",
                  "video": "https://www.youtube.com/watch?app=desktop&v=Zay0ndBMVGU&t=0s"
                },
                {
                  "name": "Тајна Слагалица",
                  "description": "Решите слагалицу без да знате коначну слику унапред.",
                  "difficulty": "Средњи",
                  "popularity": 4.2,
                  "image": "https://www.holdson.com/images/thumbs/0013738_holdson-puzzle-wasgij-retro-mystery-4-500xl-pc-live-entertainment_625.jpeg",
                  "video": "https://www.youtube.com/watch?v=XRHglREeX20&ab_channel=PuzzleWithEmilia"
                },
                {
                  "name": "Прилагођена Фото Слагалица",
                  "description": "Направите слагалицу користећи своју омиљену фотографију, додајући лични печат.",
                  "difficulty": "Различито",
                  "popularity": 4.8,
                  "image": "https://assets.cdn-shop.com/picanova2-com/assets/img/products/photo-gifts/puzzle/custom-puzzle-complete-view-2ad8c7cb92.webp"
                }
              ],
              "main_video": "https://www.youtube.com/embed/oRlCNXdcMc0",
              "historical_fact": "Слагалице су изумљене око 1760. године од стране Џона Спилсберија, лондонског картографа, који их је користио за подучавање географије.",
              "advanced_strategies": [
                "Сортирање ивица: Прво саставите делове који чине ивицу како бисте успоставили оквир слагалице.",
                "Сортирање по бојама: Групишите делове по бојама или узорцима ради бржег састављања.",
                "Препознавање узорака: Фокусирајте се на поновљене облике или дизајне унутар слагалице.",
                "Изградња сегмената: Радите на мањим деловима, а затим их спојите."
              ],
              "fun_fact": "Највећа слагалица икада направљена има преко 551.000 делова и дуга је 48 метара!",
              "history": {
                "Inventor": "Џон Спилсбери",
                "Year Invented": "1767",
                "Original Name": "Исечена карта",
                "Milestone": "Постала популарна као забава у 20. веку."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Сортирајте делове по ивици, боји или узорку. Прво саставите ивицу како бисте дефинисали структуру слагалице. За 3D слагалице, израдите базу пре додавања вертикалних слојева."
                  },
                  {
                    "type": "video",
                    "title": "Савети за слагање слагалица за почетнике",
                    "url": "https://www.youtube.com/embed/SV12puKJCQw"
                  },
                  {
                    "type": "link",
                    "title": "Напредне стратегије за решавање слагалица",
                    "url": "https://www.jigsawjunkies.com/advanced-tips/"
                  }
                ],
                "tips": [
                  "Сортирајте делове у ивичне, угловне и средишње делове ради боље организације.",
                  "Фокусирајте се на јединствене узорке или одређене делове слике како бисте напредовали брже.",
                  "Користите подлошке, плоче или подлоге за сортирање и лакше померање делова.",
                  "Радите под добрим осветљењем како бисте разликовали суптилне разлике у бојама.",
                  "За велике слагалице, саставите делове одвојено, а затим их повежите."
                ],
                "related_facts": [
                  "Слагалице су настале у 18. веку када су карте сечене на делове у образовне сврхе.",
                  "Термин 'слагалица' потиче од тестере која је коришћена за сечење раних слагалица.",
                  "Решавање слагалица побољшава когнитивне вештине и познато је да смањује стрес."
                ],
                "resources": {
                  "online_stores": [
                    {
                      "name": "Пазл Вarehouse",
                      "url": "https://www.puzzlewarehouse.com/",
                      "description": "Широк избор слагалица за све нивое вештина и интересовања."
                    },
                    {
                      "name": "Равенсбургер Пазлс",
                      "url": "https://www.ravensburger.com/",
                      "description": "Висококвалитетне слагалице са лепим дизајном, укључујући 3D слагалице."
                    }
                  ],
                  "communities": [
                    {
                      "name": "Реддит заједница слагалица",
                      "url": "https://www.reddit.com/r/Jigsawpuzzles/",
                      "description": "Разговарајте о слагалицама, делите савете и показујте завршене радове."
                    },
                    {
                      "name": "Пазл Хоби",
                      "url": "https://en.tripadvisor.com.hk/ShowTopic-g1-i49577-k14218347-o10-Jigsaw_puzzles-The_Layover_Lounge.html",
                      "description": "Блог и форум посвећен ентузијастима слагалица."
                    }
                  ]
                }
              }
            },
            {
              "name": "Торањ Ханоја",
              "main_image": "https://media.hackerearth.com/blog/wp-content/uploads/2016/12/Cover_v2.png",
              "description": "Математичка слагалица у којој померате стек дискова са једне шипке на другу, пратећи одређена правила. Циљ је пренос свих дискова на циљну шипку у минималном броју потеза. Варијације укључују подешавања са више шипки, обрнута правила и изазове са временским ограничењем.",
              "variations": [
                {
                  "name": "Класични Торањ Ханоја",
                  "description": "Стандардна верзија са 3 шипке са повећањем броја дискова.",
                  "difficulty": "Почетник до Средњи",
                  "popularity": 4.8,
                  "image": "https://m.media-amazon.com/images/I/71YBCoqpvLL._AC_UF1000,1000_QL80_.jpg",
                  "video": "https://www.youtube.com/watch?v=LgxihOe9ObI&ab_channel=LockPickingCuber"
                },
                {
                  "name": "Торањ са више шипки",
                  "description": "Додаје додатне шипке, повећавајући сложеност и стратегију.",
                  "difficulty": "Напредно",
                  "popularity": 4.5,
                  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSto8sfJglJzEOdXhmgw_SOO2bhr8Z-y7mDNL-AMTO0XDTYNm1UktX-BlYTvWpV9krquP4&usqp=CAU",
                  "video": "https://www.tandfonline.com/doi/pdf/10.4169/college.math.j.44.2.110"
                },
                {
                  "name": "Торањ са обрнутим правилима",
                  "description": "Окрените процес тако што ћете почети од коначне конфигурације и планирати уназад.",
                  "difficulty": "Средњи",
                  "popularity": 4.2,
                  "image": "https://brownliving.in/cdn/shop/products/wooden-9-rings-tower-of-hanoi-puzzle-game-handmade-036-01947-1090-learning-educational-toys-brown-living-272053.jpg?v=1682969919"
                },
                {
                  "name": "Торањ са временским ограничењем",
                  "description": "Решите слагалицу у задааном временском ограничењу, додајући хитност.",
                  "difficulty": "Различито",
                  "popularity": 4.3,
                  "image": "https://cruxpuzzles.co.uk/cdn/shop/files/CCH-Hanoi-Tower-9R-3.jpg?v=1708610760&width=2048"
                }
              ],
              "main_video": "https://www.youtube.com/embed/_bWLwz_PquI",
              "historical_fact": "Слагалицу Торањ Ханоја је изумео француски математичар Едвард Лукас 1883. године и заснована је на древној легенди о монасима који померају златне дискове.",
              "advanced_strategies": [
                "Рекурзивна декомпозиција: Решите мање под-проблеме премештањем n-1 дискова.",
                "Бинарна репрезентација: Мапирајте решење на бинарне бројеве за ефикасно планирање.",
                "Итеративно решење: Користите алгоритам да систематски померате дискове без рекурзије.",
                "Препознавање узорака: Идентификујте понављајуће секвенце померања у зависности од величине дискова."
              ],
              "fun_fact": "Слагалица Торањ Ханоја је изумљена 1883. године од стране француског математичара Едварда Лукаса и била је инспирисана легендом о храму са великом верзијом слагалице.",
              "history": {
                "Inventor": "Едвард Лукас",
                "Year Invented": "1883",
                "Original Name": "Торањ Брахма",
                "Milestone": "Постала популарна математичка слагалица и симбол рекурзивних алгоритама."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Померите дискове један по један, осигуравајући да никада већи диск не буде стављен на мањи. Стратегијски користите помоћну шипку да привремено држите дискове. За варијације са више шипки, пажљиво планирајте потезе како бисте оптимизовали употребу додатних шипки."
                  },
                  {
                    "type": "video",
                    "title": "Како решити Торањ Ханоја",
                    "url": "https://www.youtube.com/embed/2SUvWfNJSsM"
                  },
                  {
                    "type": "link",
                    "title": "Интерактивни решавач Торања Ханоја",
                    "url": "https://www.mathsisfun.com/games/towerofhanoi.html"
                  }
                ],
                "tips": [
                  "Почните тако што ћете померити најмањи диск на циљну шипку и изградити решење корак по корак.",
                  "Минимални број потеза који је потребан је 2^n - 1, где је n број дискова.",
                  "Разбијте проблем на под-проблеме: решите за n-1 дискова, затим померите највећи диск и на крају решите за преостале дискове.",
                  "У варијацијама са више шипки, истражите алгоритме као што је Фрејм-Стјуарт алгоритам за оптимизоване потезе.",
                  "Практикујте визуализацију потеза унапред како бисте развили јасну стратегију."
                ],
                "related_facts": [
                  "Слагалица се често користи за учење рекурзије у рачунарским наукама.",
                  "Ако би слагалица Торањ Ханоја са 64 диска била решавана по један потез у секунди, требало би 585 милијарди година да се заврши!"
                ],
                "resources": {
                  "online_simulators": [
                    {
                      "name": "Интерактивни решавач Торања Ханоја",
                      "url": "https://www.cut-the-knot.org/recurrence/hanoi.shtml",
                      "description": "Симулирајте и решите слагалицу Торањ Ханоја интерактивно."
                    }
                  ],
                  "related_games": [
                    {
                      "name": "Ханој Редукс",
                      "url": "https://www.igdb.com/games/tower-of-hanoi-puzzle/similar",
                      "description": "Модернији приступ класичној слагалици Торањ Ханоја са додатним функцијама."
                    }
                  ]
                }
              }
            },
            {
              "name": "15 Пазл",
              "main_image": "https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "Пазл са клизањем који се састоји од 4x4 решетке са 15 нумерисаних плочица и једним празним местом. Циљ је да се плочице преместе у бројчаном редоследу померањем. Варијације укључују 3x3, 5x5, па чак и веће решетке за изазовније слагалице.",
              "variations": [
                {
                  "name": "Класични 15 Пазл",
                  "description": "Стандардна 4x4 решетка са 15 нумерисаних плочица.",
                  "difficulty": "Средњи",
                  "popularity": 4.7,
                  "image": "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/10/b4/53/10b45351-990e-a1b4-7944-b201fb486368/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png",
                  "video": "https://www.google.com/search?q=how+to+solve+15+puzzle&rlz=1C1SQJL_enRS1047RS1047&oq=how+to+solve+15+puzzle&gs_lcrp=EgZjaHJvbWUqCwgAEAAYDRgTGIAEMgsIABAAGA0YExiABDILCAEQABgNGBMYgAQyCggCEAAYExgWGB4yCggDEAAYExgWGB4yCggEEAAYExgWGB4yCggFEAAYExgWGB4yCggGEAAYExgWGB4yCggHEAAYExgWGB4yCggIEAAYExgWGB4yCggJEAAYgAQYogTSAQg0NDI5ajBqOagCALACAQ&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:b298a005,vid:6uBl7WDVIic,st:0"
                },
                {
                  "name": "3x3 Пазл",
                  "description": "Мала варијанта 3x3 са 8 плочица и једним празним местом за брже изазове.",
                  "difficulty": "Почетник",
                  "popularity": 4.5,
                  "image": "https://www.galliardgames.com/cdn/shop/products/3193774192006.GalliardGamesSlidePuzzle-6_1024x1024@2x.jpg?v=1648792434",
                  "video": "https://www.youtube.com/watch?v=kF5fT7Um5bE"
                },
                {
                  "name": "5x5 Пазл",
                  "description": "Већа варијанта 5x5 са 24 плочице, која нуди већу сложеност и стратегијску дубину.",
                  "difficulty": "Напредно",
                  "popularity": 4.8,
                  "image": "https://m.media-amazon.com/images/I/91pXaae2QvL.jpg",
                  "video": "https://www.youtube.com/watch?v=vKxenJMHurM&ab_channel=Quakelord1991"
                },
                {
                  "name": "Хексагонални Пазл",
                  "description": "Варијанта 15 Пазла са хексагоналним плочицама уместо квадратних.",
                  "difficulty": "Експерт",
                  "popularity": 4.2,
                  "image": "https://m.media-amazon.com/images/I/713pvxAE4xL._AC_UF894,1000_QL80_.jpg",
                  "video": "https://devpost.com/software/the-hexagonal-puzzle"
                },
                {
                  "name": "Пазл са не-правоугаоним решеткама",
                  "description": "Пазл се заснива на неправилним решеткама, нудећи јединствен изазов у уређивању плочица.",
                  "difficulty": "Експерт",
                  "popularity": 4.3,
                  "image": "https://m.media-amazon.com/images/I/61oiez2MMoL.jpg"
                }
              ],
              "main_video": "https://www.youtube.com/embed/NWt0wd8hPUE",
              "historical_fact": "15 Пазл је изумео Нојес Чапман 1874. године и постао је глобални феномен крајем 19. века.",
              "advanced_strategies": [
                "Решавање ред по ред: Почните са решавањем горњих редова и премештањем према доље.",
                "Стратегије за углове: Позиционирајте угловне плочице рано како бисте смањили сложеност.",
                "Анализа образаца: Препознајте кључне образце како бисте минимизирали непотребне потезе.",
                "Корекција паритета: Планирајте потезе како бисте решили ситуације са недостижним стањима."
              ],
              "fun_fact": "15 Пазл је оригинално продавао као играчку крајем 19. века и био је популаран у Сједињеним Државама и Европи. Такође је познат по томе што је изазовна слагалица која је помогла у инспирисању алгоритама у рачунарским наукама.",
              "history": {
                "Inventor": "Нојес Чапман",
                "Year Invented": "1874",
                "Original Name": "Гем Пазл",
                "Milestone": "Постала популарна слагалица након што је представљена у Њујорк Тајмсу у 20. веку."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Почните решавањем првог реда и прве колоне, затим радите на преосталим деловима. Фокусирајте се на мале области као што су углови и ивице како бисте поједноставили процес. За веће решетке као што је 5x5 пазл, раздвајање у мање под-решетке може помоћи."
                  },
                  {
                    "type": "video",
                    "title": "Технике решавања 15 Пазла",
                    "url": "https://www.youtube.com/embed/aZvu2aTcn5s"
                  },
                  {
                    "type": "link",
                    "title": "Интерактивни решавач 15 Пазла",
                    "url": "https://www.puzzle-solver.com/15-puzzle/"
                  }
                ],
                "tips": [
                  "Радите на позиционирању плочица у малим секцијама, уместо да померате сваку плочицу појединачно.",
                  "Користите празно место стратегијски да померате плочице и направите простора за померање.",
                  "Увек се фокусирајте на први ред и колону пре него што решите средњи део.",
                  "У већим варијацијама, дајте приоритет решавању углова и ивица пре него што се позабавите унутрашњим плочицама.",
                  "Запамтите уобичајене обрасце (нпр. конфигурације углова и ивица) како бисте смањили покушаје и грешке приликом решавања."
                ],
                "related_facts": [
                  "Пазл је математички проучаван, и познато је да нису све насумице конфигурације плочица решиве.",
                  "15 Пазл је постао популаран кроз промотивну игру из 1878. године у којој су играчи покушавали да реше пазл у трци против времена."
                ],
                "resources": {
                  "online_simulators": [
                    {
                      "name": "Интерактивни решавач 15 Пазла",
                      "url": "https://alternativeto.net/software/fifteen-puzzle-x/",
                      "description": "Решите 15 Пазл интерактивно са прилагодљивом величином решетке."
                    }
                  ],
                  "related_games": [
                    {
                      "name": "Сладећи Пазл",
                      "url": "https://www.puzzle-games.com/sliding-puzzle/",
                      "description": "Неколико пазлова који су слични класичном 15 Пазлу."
                    },
                    {
                      "name": "Супер Сладећи Пазл",
                      "url": "https://play.google.com/store/apps/details?id=com.supradendev.a15puzzle",
                      "description": "Преузмите неке од ових игара са Apple Store-а."
                    }
                  ]
                }
              }
            },
            {
              "name": "Логички матрични пазли",
              "main_image": "https://images.pexels.com/photos/7296627/pexels-photo-7296627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "description": "Логички матрични пазли изазивају вас да користите наговештаје како бисте попунили матрицу и изведели односе између различитих категорија. Варисације укључују тематске матрице, вишеслојне логичке изазове и пазле са различитим нивоима сложености.",
              "variations": [
                {
                  "name": "Класични логички матрични пазл",
                  "description": "Стандардна верзија где попуњавате матрицу користећи логичко закључивање из сета наговештаја.",
                  "difficulty": "Средњи",
                  "popularity": 4.6,
                  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePmfrjnletGbq5ZY0B3ykb6dgWDeDCmLibg&s",
                  "video": "https://www.google.com/search?q=how+to+solve+logic+grid+puzzles&rlz=1C1SQJL_enRS1047RS1047&oq=how+to+solve+glogic+grid+puz&gs_lcrp=EgZjaHJvbWUqCwgBEAAYDRgTGIAEMgYIABBFGDkyCwgBEAAYDRgTGIAEMgoIAhAAGBMYFhgeMgcIAxAAGO8FMgoIBBAAGIAEGKIEMgcIBRAAGO8FMgcIBhAAGO8FMgcIBxAAGO8F0gEINDg4MGowajSoAgCwAgE&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:9db97b2c,vid:CNxfZwvaQ-k,st:0"
                },
                {
                  "name": "Тематски логички матрични пазл",
                  "description": "Варијација у којој матрица укључује специфичну тему (нпр. животиње, професије, земље) која пружа додатне наговештаје.",
                  "difficulty": "Напредни",
                  "popularity": 4.7,
                  "image": "https://i.etsystatic.com/17614238/r/il/32ec82/4085984585/il_570xN.4085984585_9oez.jpg"
                },
                {
                  "name": "Вишеслојна логичка загонетка",
                  "description": "Вишеструке повезане логичке матрице које захтевају решавање мањих загонетки и комбиновати њихове резултате.",
                  "difficulty": "Експерт",
                  "popularity": 4.8,
                  "image": "https://logic.puzzlebaron.com/images/example.gif"
                },
                {
                  "name": "Нумерички логички матрични пазл",
                  "description": "Варијација која укључује бројеве уместо речи, захтевајући математичко разматрање за извођење односа.",
                  "difficulty": "Напредни",
                  "popularity": 4.5,
                  "image": "https://images.squarespace-cdn.com/content/v1/52711462e4b0932c24aa05ae/1591610275834-4KJC93MLPRVGB1D26E8X/GCShikaku001grid.png?format=1500w"
                }
              ],
              "main_video": "https://www.youtube.com/embed/cUL9aLBeAuc",
              "historical_fact": "Логички матрични пазли су постали популарни током 20. века и често се повезују са радовима Ремонда Смолијана, логичара и аутора загонетки.",
              "advanced_strategies": [
                "Метода елиминације: Систематски искључите немогуће опције у матрици.",
                "Дедуктивни ланци: Користите серију логичких дедукција да попуните празнине.",
                "Интеграција наговештаја: Прекрижите више наговештаја ради доследности.",
                "Технике груписања: Организујте сличне наговештаје за брже решавање."
              ],
              "fun_fact": "Логички матрични пазли су настали 1980-их као начин да се комбинује дедуктивно разматрање са вештинама решавања загонетки. Често се називају 'Ајнштајнове загонетке' због своје изазовне природе.",
              "history": {
                "Inventor": "Непознато",
                "Year Invented": "Крај 20. века",
                "Original Name": "Логичке загонетке",
                "Milestone": "Постале популарне у новинама и књигама загонетки 2000-их."
              },
              "content": {
                "tutorials": [
                  {
                    "type": "text",
                    "content": "Пажљиво прочитајте све наговештаје и започните попуњавање матрице са дефинитивним информацијама. Користите процес елиминације да попуните остатак. У вишеслојним загонеткама решите мање матрице прве и комбинујте резултате за коначна решења."
                  },
                  {
                    "type": "video",
                    "title": "Како решити логичке матричне загонетке",
                    "url": "https://www.youtube.com/embed/UDnyduf4YTM"
                  },
                  {
                    "type": "link",
                    "title": "Интерактивни логички матрични решавач загонетки",
                    "url": "https://www.logicgridpuzzles.com/solver/"
                  }
                ],
                "tips": [
                  "Користите матрицу да организујете могуће и немогуће односе. Ознака немогућих веза сужава опције.",
                  "Тражите наговештаје који утврђују директне односе између ставки. Ови наговештаји су често лакши за обраду.",
                  "Дедукција је кључ—започните са најсигурнијим информацијама и радите путем загонетке.",
                  "У тематским матрицама, примените своје знање о теми да брже решите наговештаје. На пример, познавање имена популарних животиња може вам помоћи са тематским пазлом.",
                  "За вишеслојне загонетке решите сваку појединачну матрицу прво. Када имате одговоре за све нивое, логички их комбинујте за коначни резултат."
                ],
                "related_facts": [
                  "Тврди се да је Алберт Ајнштајн створио једну од првих логичких матричних загонетки почетком 20. века, коју је само 2% становништва могло да реши.",
                  "Многе савремене логичке матричне загонетке су сада доступне у апликацијама, што их чини лакшим за приступ и решавање у покрету."
                ],
                "resources": {
                  "online_simulators": [
                    {
                      "name": "Логички матрични пазл на мрежи",
                      "url": "https://logic.puzzlebaron.com/",
                      "description": "Веб сајт који нуди интерактивне логичке матричне загонетке са различитим нивоима сложености."
                    }
                  ],
                  "related_games": [
                    {
                      "name": "Сличне загонетке",
                      "url": "https://steampeek.hu/?appid=3192940",
                      "description": "Форум на Редиту који разговара о сличним играма."
                    },
                    {
                      "name": "Brainzilla",
                      "url": "https://www.brainzilla.com/logic/",
                      "description": "Веб сајт који се бави логичким загонеткама."
                    }
                  ]
                }
              }
            }
               
          ]
        }
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

router.get('/vak', (req, res) => {
  let vaktija = {
    "id": 116,
    "lokacija": "Sjenica",
    "godina": 2025,
    "mjesec": [
      {
        "dan": [
          {
            "vakat": [
              "5:32",
              "7:10",
              "11:45",
              "13:54",
              "16:18",
              "17:45"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:10",
              "11:45",
              "13:55",
              "16:19",
              "17:45"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:11",
              "11:46",
              "13:56",
              "16:20",
              "17:46"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:11",
              "11:46",
              "13:57",
              "16:21",
              "17:47"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:11",
              "11:47",
              "13:58",
              "16:22",
              "17:48"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:10",
              "11:47",
              "13:59",
              "16:23",
              "17:49"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:10",
              "11:48",
              "13:59",
              "16:24",
              "17:50"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:10",
              "11:48",
              "14:00",
              "16:25",
              "17:51"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:10",
              "11:49",
              "14:01",
              "16:26",
              "17:52"
            ]
          },
          {
            "vakat": [
              "5:32",
              "7:09",
              "11:49",
              "14:02",
              "16:27",
              "17:53"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:09",
              "11:49",
              "14:03",
              "16:28",
              "17:53"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:09",
              "11:50",
              "14:04",
              "16:29",
              "17:54"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:08",
              "11:50",
              "14:05",
              "16:30",
              "17:56"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:08",
              "11:50",
              "14:06",
              "16:32",
              "17:57"
            ]
          },
          {
            "vakat": [
              "5:30",
              "7:07",
              "11:51",
              "14:07",
              "16:33",
              "17:58"
            ]
          },
          {
            "vakat": [
              "5:30",
              "7:07",
              "11:51",
              "14:08",
              "16:34",
              "17:59"
            ]
          },
          {
            "vakat": [
              "5:30",
              "7:06",
              "11:51",
              "14:09",
              "16:36",
              "18:00"
            ]
          },
          {
            "vakat": [
              "5:29",
              "7:06",
              "11:52",
              "14:11",
              "16:37",
              "18:01"
            ]
          },
          {
            "vakat": [
              "5:29",
              "7:05",
              "11:52",
              "14:12",
              "16:38",
              "18:02"
            ]
          },
          {
            "vakat": [
              "5:28",
              "7:04",
              "11:52",
              "14:13",
              "16:39",
              "18:03"
            ]
          },
          {
            "vakat": [
              "5:28",
              "7:03",
              "11:53",
              "14:14",
              "16:40",
              "18:04"
            ]
          },
          {
            "vakat": [
              "5:27",
              "7:03",
              "11:53",
              "14:15",
              "16:41",
              "18:05"
            ]
          },
          {
            "vakat": [
              "5:27",
              "7:02",
              "11:53",
              "14:16",
              "16:42",
              "18:06"
            ]
          },
          {
            "vakat": [
              "5:26",
              "7:01",
              "11:53",
              "14:17",
              "16:44",
              "18:08"
            ]
          },
          {
            "vakat": [
              "5:25",
              "7:00",
              "11:54",
              "14:18",
              "16:45",
              "18:09"
            ]
          },
          {
            "vakat": [
              "5:25",
              "6:59",
              "11:54",
              "14:19",
              "16:47",
              "18:10"
            ]
          },
          {
            "vakat": [
              "5:24",
              "6:58",
              "11:54",
              "14:21",
              "16:48",
              "18:11"
            ]
          },
          {
            "vakat": [
              "5:23",
              "6:58",
              "11:54",
              "14:22",
              "16:50",
              "18:12"
            ]
          },
          {
            "vakat": [
              "5:22",
              "6:57",
              "11:54",
              "14:23",
              "16:51",
              "18:13"
            ]
          },
          {
            "vakat": [
              "5:21",
              "6:56",
              "11:55",
              "14:24",
              "16:52",
              "18:15"
            ]
          },
          {
            "vakat": [
              "5:21",
              "6:55",
              "11:55",
              "14:25",
              "16:54",
              "18:16"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "5:20",
              "6:54",
              "11:55",
              "14:27",
              "16:56",
              "18:18"
            ]
          },
          {
            "vakat": [
              "5:19",
              "6:53",
              "11:55",
              "14:28",
              "16:58",
              "18:19"
            ]
          },
          {
            "vakat": [
              "5:18",
              "6:51",
              "11:55",
              "14:29",
              "16:59",
              "18:20"
            ]
          },
          {
            "vakat": [
              "5:17",
              "6:50",
              "11:55",
              "14:30",
              "17:01",
              "18:22"
            ]
          },
          {
            "vakat": [
              "5:16",
              "6:49",
              "11:55",
              "14:32",
              "17:02",
              "18:23"
            ]
          },
          {
            "vakat": [
              "5:15",
              "6:48",
              "11:55",
              "14:33",
              "17:04",
              "18:24"
            ]
          },
          {
            "vakat": [
              "5:14",
              "6:46",
              "11:56",
              "14:35",
              "17:05",
              "18:25"
            ]
          },
          {
            "vakat": [
              "5:13",
              "6:45",
              "11:56",
              "14:36",
              "17:06",
              "18:26"
            ]
          },
          {
            "vakat": [
              "5:11",
              "6:44",
              "11:56",
              "14:37",
              "17:08",
              "18:28"
            ]
          },
          {
            "vakat": [
              "5:10",
              "6:42",
              "11:56",
              "14:38",
              "17:09",
              "18:29"
            ]
          },
          {
            "vakat": [
              "5:09",
              "6:41",
              "11:56",
              "14:39",
              "17:10",
              "18:30"
            ]
          },
          {
            "vakat": [
              "5:08",
              "6:39",
              "11:56",
              "14:39",
              "17:11",
              "18:31"
            ]
          },
          {
            "vakat": [
              "5:06",
              "6:38",
              "11:56",
              "14:40",
              "17:12",
              "18:33"
            ]
          },
          {
            "vakat": [
              "5:05",
              "6:37",
              "11:56",
              "14:41",
              "17:14",
              "18:34"
            ]
          },
          {
            "vakat": [
              "5:04",
              "6:35",
              "11:56",
              "14:42",
              "17:15",
              "18:35"
            ]
          },
          {
            "vakat": [
              "5:03",
              "6:34",
              "11:56",
              "14:43",
              "17:17",
              "18:36"
            ]
          },
          {
            "vakat": [
              "5:01",
              "6:32",
              "11:55",
              "14:44",
              "17:18",
              "18:37"
            ]
          },
          {
            "vakat": [
              "5:00",
              "6:31",
              "11:55",
              "14:45",
              "17:19",
              "18:39"
            ]
          },
          {
            "vakat": [
              "4:58",
              "6:30",
              "11:55",
              "14:46",
              "17:21",
              "18:40"
            ]
          },
          {
            "vakat": [
              "4:57",
              "6:28",
              "11:55",
              "14:47",
              "17:22",
              "18:41"
            ]
          },
          {
            "vakat": [
              "4:55",
              "6:27",
              "11:55",
              "14:48",
              "17:24",
              "18:42"
            ]
          },
          {
            "vakat": [
              "4:54",
              "6:25",
              "11:55",
              "14:49",
              "17:25",
              "18:44"
            ]
          },
          {
            "vakat": [
              "4:52",
              "6:23",
              "11:55",
              "14:50",
              "17:26",
              "18:45"
            ]
          },
          {
            "vakat": [
              "4:51",
              "6:22",
              "11:55",
              "14:51",
              "17:28",
              "18:46"
            ]
          },
          {
            "vakat": [
              "4:49",
              "6:20",
              "11:55",
              "14:52",
              "17:29",
              "18:47"
            ]
          },
          {
            "vakat": [
              "4:48",
              "6:18",
              "11:54",
              "14:53",
              "17:30",
              "18:49"
            ]
          },
          {
            "vakat": [
              "4:46",
              "6:17",
              "11:54",
              "14:54",
              "17:31",
              "18:50"
            ]
          },
          {
            "vakat": [
              "4:44",
              "6:15",
              "11:54",
              "14:55",
              "17:32",
              "18:51"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "4:42",
              "6:12",
              "11:54",
              "14:57",
              "17:34",
              "18:53"
            ]
          },
          {
            "vakat": [
              "4:40",
              "6:10",
              "11:54",
              "14:58",
              "17:35",
              "18:54"
            ]
          },
          {
            "vakat": [
              "4:38",
              "6:09",
              "11:53",
              "14:58",
              "17:36",
              "18:55"
            ]
          },
          {
            "vakat": [
              "4:37",
              "6:07",
              "11:53",
              "14:59",
              "17:38",
              "18:56"
            ]
          },
          {
            "vakat": [
              "4:35",
              "6:05",
              "11:53",
              "15:01",
              "17:39",
              "18:58"
            ]
          },
          {
            "vakat": [
              "4:33",
              "6:03",
              "11:53",
              "15:02",
              "17:40",
              "18:59"
            ]
          },
          {
            "vakat": [
              "4:31",
              "6:02",
              "11:53",
              "15:03",
              "17:42",
              "19:00"
            ]
          },
          {
            "vakat": [
              "4:30",
              "6:01",
              "11:52",
              "15:04",
              "17:43",
              "19:01"
            ]
          },
          {
            "vakat": [
              "4:28",
              "5:59",
              "11:52",
              "15:04",
              "17:44",
              "19:03"
            ]
          },
          {
            "vakat": [
              "4:26",
              "5:57",
              "11:52",
              "15:05",
              "17:46",
              "19:04"
            ]
          },
          {
            "vakat": [
              "4:24",
              "5:55",
              "11:52",
              "15:06",
              "17:47",
              "19:05"
            ]
          },
          {
            "vakat": [
              "4:22",
              "5:53",
              "11:51",
              "15:06",
              "17:48",
              "19:07"
            ]
          },
          {
            "vakat": [
              "4:21",
              "5:52",
              "11:51",
              "15:06",
              "17:50",
              "19:08"
            ]
          },
          {
            "vakat": [
              "4:19",
              "5:50",
              "11:51",
              "15:07",
              "17:51",
              "19:09"
            ]
          },
          {
            "vakat": [
              "4:17",
              "5:48",
              "11:50",
              "15:08",
              "17:52",
              "19:11"
            ]
          },
          {
            "vakat": [
              "4:15",
              "5:46",
              "11:50",
              "15:09",
              "17:53",
              "19:12"
            ]
          },
          {
            "vakat": [
              "4:13",
              "5:44",
              "11:50",
              "15:10",
              "17:54",
              "19:13"
            ]
          },
          {
            "vakat": [
              "4:11",
              "5:42",
              "11:50",
              "15:11",
              "17:55",
              "19:15"
            ]
          },
          {
            "vakat": [
              "4:09",
              "5:40",
              "11:49",
              "15:11",
              "17:56",
              "19:16"
            ]
          },
          {
            "vakat": [
              "4:07",
              "5:38",
              "11:49",
              "15:12",
              "17:58",
              "19:17"
            ]
          },
          {
            "vakat": [
              "4:05",
              "5:37",
              "11:49",
              "15:13",
              "17:59",
              "19:19"
            ]
          },
          {
            "vakat": [
              "4:03",
              "5:35",
              "11:48",
              "15:14",
              "18:00",
              "19:20"
            ]
          },
          {
            "vakat": [
              "4:01",
              "5:33",
              "11:48",
              "15:14",
              "18:02",
              "19:21"
            ]
          },
          {
            "vakat": [
              "3:59",
              "5:31",
              "11:48",
              "15:15",
              "18:03",
              "19:23"
            ]
          },
          {
            "vakat": [
              "3:57",
              "5:30",
              "11:47",
              "15:15",
              "18:04",
              "19:24"
            ]
          },
          {
            "vakat": [
              "3:55",
              "5:28",
              "11:47",
              "15:16",
              "18:05",
              "19:25"
            ]
          },
          {
            "vakat": [
              "3:53",
              "5:26",
              "11:47",
              "15:16",
              "18:07",
              "19:27"
            ]
          },
          {
            "vakat": [
              "3:51",
              "5:25",
              "11:47",
              "15:17",
              "18:08",
              "19:28"
            ]
          },
          {
            "vakat": [
              "3:49",
              "5:23",
              "11:46",
              "15:17",
              "18:09",
              "19:30"
            ]
          },
          {
            "vakat": [
              "4:47",
              "6:21",
              "12:46",
              "16:18",
              "19:10",
              "20:31"
            ]
          },
          {
            "vakat": [
              "4:45",
              "6:19",
              "12:46",
              "16:18",
              "19:12",
              "20:32"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "4:42",
              "6:16",
              "12:45",
              "16:19",
              "19:13",
              "20:34"
            ]
          },
          {
            "vakat": [
              "4:39",
              "6:14",
              "12:45",
              "16:19",
              "19:14",
              "20:35"
            ]
          },
          {
            "vakat": [
              "4:37",
              "6:12",
              "12:45",
              "16:19",
              "19:15",
              "20:37"
            ]
          },
          {
            "vakat": [
              "4:35",
              "6:10",
              "12:44",
              "16:19",
              "19:16",
              "20:38"
            ]
          },
          {
            "vakat": [
              "4:33",
              "6:08",
              "12:44",
              "16:20",
              "19:17",
              "20:40"
            ]
          },
          {
            "vakat": [
              "4:31",
              "6:07",
              "12:44",
              "16:21",
              "19:18",
              "20:41"
            ]
          },
          {
            "vakat": [
              "4:29",
              "6:05",
              "12:44",
              "16:22",
              "19:19",
              "20:43"
            ]
          },
          {
            "vakat": [
              "4:27",
              "6:03",
              "12:43",
              "16:22",
              "19:21",
              "20:44"
            ]
          },
          {
            "vakat": [
              "4:25",
              "6:01",
              "12:43",
              "16:23",
              "19:22",
              "20:46"
            ]
          },
          {
            "vakat": [
              "4:23",
              "5:59",
              "12:43",
              "16:24",
              "19:23",
              "20:47"
            ]
          },
          {
            "vakat": [
              "4:20",
              "5:58",
              "12:42",
              "16:24",
              "19:25",
              "20:49"
            ]
          },
          {
            "vakat": [
              "4:18",
              "5:57",
              "12:42",
              "16:25",
              "19:26",
              "20:50"
            ]
          },
          {
            "vakat": [
              "4:16",
              "5:55",
              "12:42",
              "16:25",
              "19:27",
              "20:52"
            ]
          },
          {
            "vakat": [
              "4:14",
              "5:53",
              "12:42",
              "16:25",
              "19:28",
              "20:53"
            ]
          },
          {
            "vakat": [
              "4:12",
              "5:51",
              "12:41",
              "16:25",
              "19:30",
              "20:55"
            ]
          },
          {
            "vakat": [
              "4:10",
              "5:50",
              "12:41",
              "16:26",
              "19:31",
              "20:57"
            ]
          },
          {
            "vakat": [
              "4:08",
              "5:48",
              "12:41",
              "16:26",
              "19:32",
              "20:58"
            ]
          },
          {
            "vakat": [
              "4:05",
              "5:46",
              "12:41",
              "16:26",
              "19:33",
              "21:00"
            ]
          },
          {
            "vakat": [
              "4:03",
              "5:45",
              "12:40",
              "16:27",
              "19:34",
              "21:01"
            ]
          },
          {
            "vakat": [
              "4:01",
              "5:43",
              "12:40",
              "16:27",
              "19:35",
              "21:03"
            ]
          },
          {
            "vakat": [
              "3:59",
              "5:41",
              "12:40",
              "16:28",
              "19:36",
              "21:05"
            ]
          },
          {
            "vakat": [
              "3:57",
              "5:39",
              "12:40",
              "16:29",
              "19:37",
              "21:06"
            ]
          },
          {
            "vakat": [
              "3:55",
              "5:38",
              "12:40",
              "16:29",
              "19:39",
              "21:08"
            ]
          },
          {
            "vakat": [
              "3:53",
              "5:36",
              "12:39",
              "16:30",
              "19:40",
              "21:09"
            ]
          },
          {
            "vakat": [
              "3:50",
              "5:35",
              "12:39",
              "16:30",
              "19:41",
              "21:11"
            ]
          },
          {
            "vakat": [
              "3:48",
              "5:33",
              "12:39",
              "16:30",
              "19:42",
              "21:13"
            ]
          },
          {
            "vakat": [
              "3:46",
              "5:32",
              "12:39",
              "16:31",
              "19:44",
              "21:14"
            ]
          },
          {
            "vakat": [
              "3:44",
              "5:31",
              "12:39",
              "16:32",
              "19:45",
              "21:16"
            ]
          },
          {
            "vakat": [
              "3:42",
              "5:29",
              "12:39",
              "16:32",
              "19:46",
              "21:18"
            ]
          },
          {
            "vakat": [
              "3:40",
              "5:28",
              "12:38",
              "16:32",
              "19:47",
              "21:20"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "3:38",
              "5:26",
              "12:38",
              "16:34",
              "19:51",
              "21:23"
            ]
          },
          {
            "vakat": [
              "3:36",
              "5:25",
              "12:38",
              "16:35",
              "19:52",
              "21:25"
            ]
          },
          {
            "vakat": [
              "3:34",
              "5:23",
              "12:38",
              "16:35",
              "19:53",
              "21:27"
            ]
          },
          {
            "vakat": [
              "3:32",
              "5:22",
              "12:38",
              "16:35",
              "19:54",
              "21:28"
            ]
          },
          {
            "vakat": [
              "3:30",
              "5:20",
              "12:38",
              "16:35",
              "19:56",
              "21:30"
            ]
          },
          {
            "vakat": [
              "3:28",
              "5:19",
              "12:38",
              "16:36",
              "19:57",
              "21:32"
            ]
          },
          {
            "vakat": [
              "3:26",
              "5:18",
              "12:38",
              "16:36",
              "19:58",
              "21:33"
            ]
          },
          {
            "vakat": [
              "3:24",
              "5:16",
              "12:38",
              "16:36",
              "19:59",
              "21:35"
            ]
          },
          {
            "vakat": [
              "3:22",
              "5:15",
              "12:38",
              "16:37",
              "20:00",
              "21:37"
            ]
          },
          {
            "vakat": [
              "3:20",
              "5:14",
              "12:38",
              "16:37",
              "20:01",
              "21:39"
            ]
          },
          {
            "vakat": [
              "3:18",
              "5:12",
              "12:38",
              "16:38",
              "20:02",
              "21:40"
            ]
          },
          {
            "vakat": [
              "3:16",
              "5:11",
              "12:38",
              "16:38",
              "20:03",
              "21:42"
            ]
          },
          {
            "vakat": [
              "3:14",
              "5:10",
              "12:38",
              "16:39",
              "20:04",
              "21:44"
            ]
          },
          {
            "vakat": [
              "3:12",
              "5:09",
              "12:38",
              "16:40",
              "20:05",
              "21:45"
            ]
          },
          {
            "vakat": [
              "3:10",
              "5:08",
              "12:38",
              "16:40",
              "20:07",
              "21:47"
            ]
          },
          {
            "vakat": [
              "3:08",
              "5:07",
              "12:38",
              "16:41",
              "20:08",
              "21:49"
            ]
          },
          {
            "vakat": [
              "3:06",
              "5:06",
              "12:38",
              "16:41",
              "20:09",
              "21:51"
            ]
          },
          {
            "vakat": [
              "3:05",
              "5:05",
              "12:38",
              "16:41",
              "20:10",
              "21:52"
            ]
          },
          {
            "vakat": [
              "3:03",
              "5:04",
              "12:38",
              "16:42",
              "20:11",
              "21:54"
            ]
          },
          {
            "vakat": [
              "3:01",
              "5:03",
              "12:38",
              "16:42",
              "20:12",
              "21:55"
            ]
          },
          {
            "vakat": [
              "3:00",
              "5:02",
              "12:38",
              "16:42",
              "20:13",
              "21:57"
            ]
          },
          {
            "vakat": [
              "2:58",
              "5:01",
              "12:38",
              "16:42",
              "20:14",
              "21:59"
            ]
          },
          {
            "vakat": [
              "2:56",
              "5:00",
              "12:38",
              "16:42",
              "20:15",
              "22:00"
            ]
          },
          {
            "vakat": [
              "2:55",
              "5:00",
              "12:38",
              "16:42",
              "20:16",
              "22:02"
            ]
          },
          {
            "vakat": [
              "2:53",
              "4:59",
              "12:38",
              "16:43",
              "20:17",
              "22:03"
            ]
          },
          {
            "vakat": [
              "2:52",
              "4:58",
              "12:38",
              "16:43",
              "20:18",
              "22:05"
            ]
          },
          {
            "vakat": [
              "2:50",
              "4:57",
              "12:38",
              "16:43",
              "20:19",
              "22:06"
            ]
          },
          {
            "vakat": [
              "2:49",
              "4:56",
              "12:38",
              "16:43",
              "20:20",
              "22:08"
            ]
          },
          {
            "vakat": [
              "2:47",
              "4:56",
              "12:38",
              "16:44",
              "20:21",
              "22:09"
            ]
          },
          {
            "vakat": [
              "2:46",
              "4:55",
              "12:39",
              "16:45",
              "20:22",
              "22:11"
            ]
          },
          {
            "vakat": [
              "2:45",
              "4:54",
              "12:39",
              "16:45",
              "20:23",
              "22:12"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "2:43",
              "4:53",
              "12:39",
              "16:46",
              "20:24",
              "22:14"
            ]
          },
          {
            "vakat": [
              "2:41",
              "4:52",
              "12:39",
              "16:46",
              "20:25",
              "22:16"
            ]
          },
          {
            "vakat": [
              "2:40",
              "4:52",
              "12:39",
              "16:46",
              "20:25",
              "22:17"
            ]
          },
          {
            "vakat": [
              "2:39",
              "4:51",
              "12:39",
              "16:46",
              "20:26",
              "22:18"
            ]
          },
          {
            "vakat": [
              "2:38",
              "4:51",
              "12:40",
              "16:47",
              "20:27",
              "22:19"
            ]
          },
          {
            "vakat": [
              "2:37",
              "4:50",
              "12:40",
              "16:48",
              "20:28",
              "22:21"
            ]
          },
          {
            "vakat": [
              "2:36",
              "4:50",
              "12:40",
              "16:48",
              "20:28",
              "22:22"
            ]
          },
          {
            "vakat": [
              "2:36",
              "4:49",
              "12:40",
              "16:48",
              "20:29",
              "22:23"
            ]
          },
          {
            "vakat": [
              "2:35",
              "4:49",
              "12:40",
              "16:48",
              "20:30",
              "22:24"
            ]
          },
          {
            "vakat": [
              "2:34",
              "4:49",
              "12:41",
              "16:49",
              "20:30",
              "22:25"
            ]
          },
          {
            "vakat": [
              "2:34",
              "4:49",
              "12:41",
              "16:49",
              "20:31",
              "22:25"
            ]
          },
          {
            "vakat": [
              "2:33",
              "4:49",
              "12:41",
              "16:50",
              "20:31",
              "22:26"
            ]
          },
          {
            "vakat": [
              "2:33",
              "4:48",
              "12:41",
              "16:50",
              "20:32",
              "22:27"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:48",
              "12:41",
              "16:51",
              "20:33",
              "22:28"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:48",
              "12:42",
              "16:51",
              "20:33",
              "22:28"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:48",
              "12:42",
              "16:51",
              "20:33",
              "22:29"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:48",
              "12:42",
              "16:51",
              "20:34",
              "22:29"
            ]
          },
          {
            "vakat": [
              "2:31",
              "4:48",
              "12:42",
              "16:51",
              "20:34",
              "22:30"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:48",
              "12:42",
              "16:51",
              "20:35",
              "22:30"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:49",
              "12:43",
              "16:52",
              "20:35",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:49",
              "12:43",
              "16:52",
              "20:35",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:49",
              "12:43",
              "16:52",
              "20:35",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:32",
              "4:49",
              "12:43",
              "16:52",
              "20:35",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:33",
              "4:50",
              "12:43",
              "16:52",
              "20:35",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:33",
              "4:50",
              "12:43",
              "16:52",
              "20:36",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:34",
              "4:51",
              "12:44",
              "16:53",
              "20:36",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:34",
              "4:51",
              "12:44",
              "16:53",
              "20:36",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:35",
              "4:51",
              "12:44",
              "16:53",
              "20:36",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:36",
              "4:52",
              "12:44",
              "16:53",
              "20:35",
              "22:31"
            ]
          },
          {
            "vakat": [
              "2:37",
              "4:52",
              "12:44",
              "16:53",
              "20:35",
              "22:30"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "2:39",
              "4:53",
              "12:45",
              "16:53",
              "20:35",
              "22:30"
            ]
          },
          {
            "vakat": [
              "2:40",
              "4:54",
              "12:45",
              "16:53",
              "20:35",
              "22:29"
            ]
          },
          {
            "vakat": [
              "2:41",
              "4:55",
              "12:45",
              "16:53",
              "20:35",
              "22:29"
            ]
          },
          {
            "vakat": [
              "2:42",
              "4:55",
              "12:45",
              "16:53",
              "20:35",
              "22:28"
            ]
          },
          {
            "vakat": [
              "2:43",
              "4:56",
              "12:46",
              "16:53",
              "20:34",
              "22:28"
            ]
          },
          {
            "vakat": [
              "2:44",
              "4:56",
              "12:46",
              "16:53",
              "20:34",
              "22:27"
            ]
          },
          {
            "vakat": [
              "2:45",
              "4:57",
              "12:46",
              "16:53",
              "20:34",
              "22:26"
            ]
          },
          {
            "vakat": [
              "2:47",
              "4:58",
              "12:46",
              "16:53",
              "20:33",
              "22:25"
            ]
          },
          {
            "vakat": [
              "2:48",
              "4:58",
              "12:46",
              "16:53",
              "20:33",
              "22:24"
            ]
          },
          {
            "vakat": [
              "2:49",
              "4:59",
              "12:46",
              "16:54",
              "20:33",
              "22:23"
            ]
          },
          {
            "vakat": [
              "2:51",
              "5:00",
              "12:47",
              "16:54",
              "20:33",
              "22:22"
            ]
          },
          {
            "vakat": [
              "2:52",
              "5:01",
              "12:47",
              "16:54",
              "20:32",
              "22:21"
            ]
          },
          {
            "vakat": [
              "2:54",
              "5:02",
              "12:47",
              "16:54",
              "20:32",
              "22:20"
            ]
          },
          {
            "vakat": [
              "2:55",
              "5:03",
              "12:47",
              "16:54",
              "20:31",
              "22:19"
            ]
          },
          {
            "vakat": [
              "2:57",
              "5:04",
              "12:47",
              "16:53",
              "20:30",
              "22:18"
            ]
          },
          {
            "vakat": [
              "2:59",
              "5:04",
              "12:47",
              "16:53",
              "20:30",
              "22:17"
            ]
          },
          {
            "vakat": [
              "3:00",
              "5:05",
              "12:47",
              "16:53",
              "20:29",
              "22:15"
            ]
          },
          {
            "vakat": [
              "3:02",
              "5:06",
              "12:47",
              "16:53",
              "20:28",
              "22:14"
            ]
          },
          {
            "vakat": [
              "3:04",
              "5:07",
              "12:47",
              "16:53",
              "20:27",
              "22:13"
            ]
          },
          {
            "vakat": [
              "3:05",
              "5:08",
              "12:47",
              "16:53",
              "20:26",
              "22:11"
            ]
          },
          {
            "vakat": [
              "3:07",
              "5:09",
              "12:48",
              "16:53",
              "20:25",
              "22:10"
            ]
          },
          {
            "vakat": [
              "3:09",
              "5:10",
              "12:48",
              "16:53",
              "20:24",
              "22:09"
            ]
          },
          {
            "vakat": [
              "3:11",
              "5:11",
              "12:48",
              "16:53",
              "20:23",
              "22:07"
            ]
          },
          {
            "vakat": [
              "3:12",
              "5:13",
              "12:48",
              "16:53",
              "20:22",
              "22:05"
            ]
          },
          {
            "vakat": [
              "3:14",
              "5:14",
              "12:48",
              "16:52",
              "20:21",
              "22:04"
            ]
          },
          {
            "vakat": [
              "3:16",
              "5:15",
              "12:48",
              "16:52",
              "20:20",
              "22:02"
            ]
          },
          {
            "vakat": [
              "3:18",
              "5:16",
              "12:48",
              "16:51",
              "20:19",
              "22:01"
            ]
          },
          {
            "vakat": [
              "3:20",
              "5:16",
              "12:48",
              "16:51",
              "20:18",
              "21:59"
            ]
          },
          {
            "vakat": [
              "3:21",
              "5:17",
              "12:48",
              "16:50",
              "20:17",
              "21:57"
            ]
          },
          {
            "vakat": [
              "3:23",
              "5:18",
              "12:48",
              "16:50",
              "20:16",
              "21:56"
            ]
          },
          {
            "vakat": [
              "3:25",
              "5:19",
              "12:48",
              "16:49",
              "20:14",
              "21:54"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "3:27",
              "5:20",
              "12:47",
              "16:47",
              "20:12",
              "21:51"
            ]
          },
          {
            "vakat": [
              "3:29",
              "5:22",
              "12:47",
              "16:46",
              "20:11",
              "21:49"
            ]
          },
          {
            "vakat": [
              "3:31",
              "5:23",
              "12:47",
              "16:46",
              "20:10",
              "21:47"
            ]
          },
          {
            "vakat": [
              "3:32",
              "5:24",
              "12:47",
              "16:46",
              "20:09",
              "21:46"
            ]
          },
          {
            "vakat": [
              "3:34",
              "5:25",
              "12:47",
              "16:46",
              "20:08",
              "21:44"
            ]
          },
          {
            "vakat": [
              "3:36",
              "5:26",
              "12:47",
              "16:45",
              "20:07",
              "21:42"
            ]
          },
          {
            "vakat": [
              "3:38",
              "5:27",
              "12:47",
              "16:45",
              "20:05",
              "21:40"
            ]
          },
          {
            "vakat": [
              "3:40",
              "5:28",
              "12:47",
              "16:44",
              "20:04",
              "21:38"
            ]
          },
          {
            "vakat": [
              "3:41",
              "5:30",
              "12:47",
              "16:44",
              "20:03",
              "21:36"
            ]
          },
          {
            "vakat": [
              "3:43",
              "5:31",
              "12:47",
              "16:43",
              "20:01",
              "21:34"
            ]
          },
          {
            "vakat": [
              "3:45",
              "5:32",
              "12:46",
              "16:42",
              "20:00",
              "21:32"
            ]
          },
          {
            "vakat": [
              "3:47",
              "5:33",
              "12:46",
              "16:41",
              "19:58",
              "21:30"
            ]
          },
          {
            "vakat": [
              "3:48",
              "5:34",
              "12:46",
              "16:40",
              "19:56",
              "21:28"
            ]
          },
          {
            "vakat": [
              "3:50",
              "5:36",
              "12:46",
              "16:39",
              "19:55",
              "21:26"
            ]
          },
          {
            "vakat": [
              "3:52",
              "5:37",
              "12:46",
              "16:39",
              "19:54",
              "21:24"
            ]
          },
          {
            "vakat": [
              "3:54",
              "5:38",
              "12:46",
              "16:39",
              "19:52",
              "21:22"
            ]
          },
          {
            "vakat": [
              "3:55",
              "5:39",
              "12:45",
              "16:38",
              "19:50",
              "21:20"
            ]
          },
          {
            "vakat": [
              "3:57",
              "5:40",
              "12:45",
              "16:37",
              "19:49",
              "21:18"
            ]
          },
          {
            "vakat": [
              "3:59",
              "5:41",
              "12:45",
              "16:37",
              "19:47",
              "21:16"
            ]
          },
          {
            "vakat": [
              "4:00",
              "5:42",
              "12:45",
              "16:36",
              "19:45",
              "21:14"
            ]
          },
          {
            "vakat": [
              "4:02",
              "5:43",
              "12:44",
              "16:35",
              "19:44",
              "21:12"
            ]
          },
          {
            "vakat": [
              "4:04",
              "5:44",
              "12:44",
              "16:34",
              "19:42",
              "21:10"
            ]
          },
          {
            "vakat": [
              "4:05",
              "5:45",
              "12:44",
              "16:33",
              "19:41",
              "21:08"
            ]
          },
          {
            "vakat": [
              "4:07",
              "5:46",
              "12:44",
              "16:33",
              "19:39",
              "21:06"
            ]
          },
          {
            "vakat": [
              "4:09",
              "5:48",
              "12:43",
              "16:32",
              "19:38",
              "21:04"
            ]
          },
          {
            "vakat": [
              "4:10",
              "5:49",
              "12:43",
              "16:31",
              "19:36",
              "21:02"
            ]
          },
          {
            "vakat": [
              "4:12",
              "5:50",
              "12:43",
              "16:30",
              "19:35",
              "21:00"
            ]
          },
          {
            "vakat": [
              "4:14",
              "5:51",
              "12:43",
              "16:29",
              "19:33",
              "20:58"
            ]
          },
          {
            "vakat": [
              "4:15",
              "5:52",
              "12:42",
              "16:28",
              "19:31",
              "20:56"
            ]
          },
          {
            "vakat": [
              "4:17",
              "5:53",
              "12:42",
              "16:26",
              "19:29",
              "20:54"
            ]
          },
          {
            "vakat": [
              "4:18",
              "5:54",
              "12:42",
              "16:25",
              "19:27",
              "20:51"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "4:20",
              "5:55",
              "12:41",
              "16:22",
              "19:23",
              "20:47"
            ]
          },
          {
            "vakat": [
              "4:21",
              "5:56",
              "12:41",
              "16:21",
              "19:22",
              "20:45"
            ]
          },
          {
            "vakat": [
              "4:23",
              "5:57",
              "12:41",
              "16:20",
              "19:20",
              "20:43"
            ]
          },
          {
            "vakat": [
              "4:24",
              "5:58",
              "12:40",
              "16:19",
              "19:18",
              "20:41"
            ]
          },
          {
            "vakat": [
              "4:26",
              "6:00",
              "12:40",
              "16:18",
              "19:16",
              "20:39"
            ]
          },
          {
            "vakat": [
              "4:27",
              "6:01",
              "12:40",
              "16:17",
              "19:14",
              "20:37"
            ]
          },
          {
            "vakat": [
              "4:29",
              "6:02",
              "12:39",
              "16:16",
              "19:12",
              "20:35"
            ]
          },
          {
            "vakat": [
              "4:30",
              "6:03",
              "12:39",
              "16:15",
              "19:11",
              "20:33"
            ]
          },
          {
            "vakat": [
              "4:32",
              "6:04",
              "12:39",
              "16:14",
              "19:09",
              "20:31"
            ]
          },
          {
            "vakat": [
              "4:33",
              "6:06",
              "12:38",
              "16:13",
              "19:07",
              "20:29"
            ]
          },
          {
            "vakat": [
              "4:34",
              "6:07",
              "12:38",
              "16:11",
              "19:05",
              "20:27"
            ]
          },
          {
            "vakat": [
              "4:36",
              "6:08",
              "12:38",
              "16:10",
              "19:03",
              "20:25"
            ]
          },
          {
            "vakat": [
              "4:37",
              "6:09",
              "12:37",
              "16:08",
              "19:02",
              "20:22"
            ]
          },
          {
            "vakat": [
              "4:39",
              "6:10",
              "12:37",
              "16:07",
              "19:00",
              "20:20"
            ]
          },
          {
            "vakat": [
              "4:40",
              "6:12",
              "12:37",
              "16:06",
              "18:58",
              "20:18"
            ]
          },
          {
            "vakat": [
              "4:41",
              "6:13",
              "12:36",
              "16:05",
              "18:56",
              "20:16"
            ]
          },
          {
            "vakat": [
              "4:43",
              "6:14",
              "12:36",
              "16:04",
              "18:54",
              "20:14"
            ]
          },
          {
            "vakat": [
              "4:44",
              "6:15",
              "12:36",
              "16:03",
              "18:52",
              "20:12"
            ]
          },
          {
            "vakat": [
              "4:45",
              "6:16",
              "12:35",
              "16:02",
              "18:51",
              "20:10"
            ]
          },
          {
            "vakat": [
              "4:47",
              "6:17",
              "12:35",
              "16:01",
              "18:49",
              "20:08"
            ]
          },
          {
            "vakat": [
              "4:48",
              "6:18",
              "12:34",
              "15:59",
              "18:47",
              "20:06"
            ]
          },
          {
            "vakat": [
              "4:49",
              "6:19",
              "12:34",
              "15:57",
              "18:45",
              "20:04"
            ]
          },
          {
            "vakat": [
              "4:51",
              "6:20",
              "12:34",
              "15:56",
              "18:43",
              "20:02"
            ]
          },
          {
            "vakat": [
              "4:52",
              "6:21",
              "12:33",
              "15:55",
              "18:41",
              "20:00"
            ]
          },
          {
            "vakat": [
              "4:53",
              "6:23",
              "12:33",
              "15:54",
              "18:39",
              "19:58"
            ]
          },
          {
            "vakat": [
              "4:55",
              "6:24",
              "12:33",
              "15:53",
              "18:37",
              "19:56"
            ]
          },
          {
            "vakat": [
              "4:56",
              "6:25",
              "12:32",
              "15:51",
              "18:35",
              "19:55"
            ]
          },
          {
            "vakat": [
              "4:57",
              "6:26",
              "12:32",
              "15:50",
              "18:34",
              "19:53"
            ]
          },
          {
            "vakat": [
              "4:58",
              "6:28",
              "12:32",
              "15:49",
              "18:32",
              "19:51"
            ]
          },
          {
            "vakat": [
              "5:00",
              "6:29",
              "12:31",
              "15:48",
              "18:31",
              "19:49"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "5:02",
              "6:31",
              "12:31",
              "15:47",
              "18:29",
              "19:47"
            ]
          },
          {
            "vakat": [
              "5:03",
              "6:32",
              "12:31",
              "15:45",
              "18:27",
              "19:45"
            ]
          },
          {
            "vakat": [
              "5:04",
              "6:34",
              "12:30",
              "15:43",
              "18:25",
              "19:43"
            ]
          },
          {
            "vakat": [
              "5:06",
              "6:35",
              "12:30",
              "15:42",
              "18:23",
              "19:41"
            ]
          },
          {
            "vakat": [
              "5:07",
              "6:36",
              "12:30",
              "15:41",
              "18:21",
              "19:40"
            ]
          },
          {
            "vakat": [
              "5:08",
              "6:37",
              "12:30",
              "15:39",
              "18:19",
              "19:38"
            ]
          },
          {
            "vakat": [
              "5:09",
              "6:38",
              "12:29",
              "15:37",
              "18:18",
              "19:36"
            ]
          },
          {
            "vakat": [
              "5:11",
              "6:39",
              "12:29",
              "15:36",
              "18:16",
              "19:34"
            ]
          },
          {
            "vakat": [
              "5:12",
              "6:40",
              "12:29",
              "15:35",
              "18:14",
              "19:32"
            ]
          },
          {
            "vakat": [
              "5:13",
              "6:41",
              "12:28",
              "15:34",
              "18:12",
              "19:31"
            ]
          },
          {
            "vakat": [
              "5:14",
              "6:43",
              "12:28",
              "15:32",
              "18:10",
              "19:29"
            ]
          },
          {
            "vakat": [
              "5:15",
              "6:44",
              "12:28",
              "15:31",
              "18:09",
              "19:27"
            ]
          },
          {
            "vakat": [
              "5:17",
              "6:45",
              "12:28",
              "15:30",
              "18:07",
              "19:26"
            ]
          },
          {
            "vakat": [
              "5:18",
              "6:47",
              "12:27",
              "15:29",
              "18:05",
              "19:24"
            ]
          },
          {
            "vakat": [
              "5:19",
              "6:48",
              "12:27",
              "15:27",
              "18:03",
              "19:22"
            ]
          },
          {
            "vakat": [
              "5:20",
              "6:49",
              "12:27",
              "15:26",
              "18:02",
              "19:21"
            ]
          },
          {
            "vakat": [
              "5:21",
              "6:51",
              "12:27",
              "15:25",
              "18:01",
              "19:19"
            ]
          },
          {
            "vakat": [
              "5:23",
              "6:52",
              "12:27",
              "15:24",
              "17:59",
              "19:18"
            ]
          },
          {
            "vakat": [
              "5:24",
              "6:53",
              "12:26",
              "15:22",
              "17:57",
              "19:16"
            ]
          },
          {
            "vakat": [
              "5:25",
              "6:54",
              "12:26",
              "15:21",
              "17:56",
              "19:14"
            ]
          },
          {
            "vakat": [
              "5:26",
              "6:56",
              "12:26",
              "15:20",
              "17:54",
              "19:13"
            ]
          },
          {
            "vakat": [
              "5:27",
              "6:57",
              "12:26",
              "15:19",
              "17:52",
              "19:11"
            ]
          },
          {
            "vakat": [
              "5:28",
              "6:59",
              "12:26",
              "15:17",
              "17:51",
              "19:10"
            ]
          },
          {
            "vakat": [
              "5:30",
              "7:00",
              "12:26",
              "15:16",
              "17:49",
              "19:08"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:01",
              "12:25",
              "15:15",
              "17:48",
              "19:07"
            ]
          },
          {
            "vakat": [
              "4:32",
              "6:02",
              "11:25",
              "14:14",
              "16:46",
              "18:06"
            ]
          },
          {
            "vakat": [
              "4:33",
              "6:03",
              "11:25",
              "14:12",
              "16:45",
              "18:04"
            ]
          },
          {
            "vakat": [
              "4:34",
              "6:04",
              "11:25",
              "14:11",
              "16:43",
              "18:03"
            ]
          },
          {
            "vakat": [
              "4:35",
              "6:06",
              "11:25",
              "14:10",
              "16:42",
              "18:02"
            ]
          },
          {
            "vakat": [
              "4:37",
              "6:07",
              "11:25",
              "14:09",
              "16:40",
              "18:00"
            ]
          },
          {
            "vakat": [
              "4:38",
              "6:08",
              "11:25",
              "14:08",
              "16:39",
              "17:59"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "4:41",
              "6:11",
              "11:25",
              "14:06",
              "16:36",
              "17:57"
            ]
          },
          {
            "vakat": [
              "4:42",
              "6:13",
              "11:25",
              "14:04",
              "16:35",
              "17:56"
            ]
          },
          {
            "vakat": [
              "4:43",
              "6:14",
              "11:25",
              "14:03",
              "16:34",
              "17:54"
            ]
          },
          {
            "vakat": [
              "4:44",
              "6:16",
              "11:25",
              "14:02",
              "16:33",
              "17:53"
            ]
          },
          {
            "vakat": [
              "4:46",
              "6:17",
              "11:25",
              "14:01",
              "16:32",
              "17:52"
            ]
          },
          {
            "vakat": [
              "4:47",
              "6:18",
              "11:25",
              "14:00",
              "16:30",
              "17:51"
            ]
          },
          {
            "vakat": [
              "4:48",
              "6:20",
              "11:25",
              "13:59",
              "16:29",
              "17:50"
            ]
          },
          {
            "vakat": [
              "4:49",
              "6:21",
              "11:25",
              "13:58",
              "16:28",
              "17:49"
            ]
          },
          {
            "vakat": [
              "4:50",
              "6:23",
              "11:25",
              "13:57",
              "16:27",
              "17:48"
            ]
          },
          {
            "vakat": [
              "4:51",
              "6:24",
              "11:25",
              "13:56",
              "16:25",
              "17:47"
            ]
          },
          {
            "vakat": [
              "4:52",
              "6:25",
              "11:25",
              "13:55",
              "16:24",
              "17:46"
            ]
          },
          {
            "vakat": [
              "4:54",
              "6:27",
              "11:25",
              "13:54",
              "16:23",
              "17:45"
            ]
          },
          {
            "vakat": [
              "4:55",
              "6:28",
              "11:26",
              "13:54",
              "16:22",
              "17:44"
            ]
          },
          {
            "vakat": [
              "4:56",
              "6:29",
              "11:26",
              "13:54",
              "16:21",
              "17:43"
            ]
          },
          {
            "vakat": [
              "4:57",
              "6:30",
              "11:26",
              "13:53",
              "16:20",
              "17:43"
            ]
          },
          {
            "vakat": [
              "4:58",
              "6:31",
              "11:26",
              "13:52",
              "16:19",
              "17:42"
            ]
          },
          {
            "vakat": [
              "4:59",
              "6:33",
              "11:26",
              "13:51",
              "16:18",
              "17:41"
            ]
          },
          {
            "vakat": [
              "5:00",
              "6:34",
              "11:26",
              "13:50",
              "16:17",
              "17:40"
            ]
          },
          {
            "vakat": [
              "5:01",
              "6:35",
              "11:27",
              "13:50",
              "16:16",
              "17:40"
            ]
          },
          {
            "vakat": [
              "5:02",
              "6:37",
              "11:27",
              "13:49",
              "16:15",
              "17:39"
            ]
          },
          {
            "vakat": [
              "5:03",
              "6:38",
              "11:27",
              "13:48",
              "16:14",
              "17:39"
            ]
          },
          {
            "vakat": [
              "5:05",
              "6:39",
              "11:27",
              "13:47",
              "16:14",
              "17:38"
            ]
          },
          {
            "vakat": [
              "5:06",
              "6:41",
              "11:28",
              "13:47",
              "16:13",
              "17:37"
            ]
          },
          {
            "vakat": [
              "5:07",
              "6:42",
              "11:28",
              "13:47",
              "16:12",
              "17:37"
            ]
          },
          {
            "vakat": [
              "5:08",
              "6:43",
              "11:28",
              "13:46",
              "16:12",
              "17:37"
            ]
          },
          {
            "vakat": [
              "5:09",
              "6:44",
              "11:29",
              "13:46",
              "16:12",
              "17:36"
            ]
          },
          {
            "vakat": [
              "5:10",
              "6:46",
              "11:29",
              "13:46",
              "16:11",
              "17:36"
            ]
          },
          {
            "vakat": [
              "5:11",
              "6:47",
              "11:29",
              "13:45",
              "16:11",
              "17:35"
            ]
          },
          {
            "vakat": [
              "5:12",
              "6:48",
              "11:30",
              "13:45",
              "16:10",
              "17:35"
            ]
          },
          {
            "vakat": [
              "5:13",
              "6:49",
              "11:30",
              "13:44",
              "16:10",
              "17:35"
            ]
          }
        ]
      },
      {
        "dan": [
          {
            "vakat": [
              "5:13",
              "6:49",
              "11:30",
              "13:44",
              "16:09",
              "17:35"
            ]
          },
          {
            "vakat": [
              "5:14",
              "6:51",
              "11:30",
              "13:43",
              "16:09",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:14",
              "6:52",
              "11:31",
              "13:43",
              "16:09",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:15",
              "6:53",
              "11:31",
              "13:43",
              "16:09",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:16",
              "6:54",
              "11:32",
              "13:43",
              "16:08",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:17",
              "6:55",
              "11:32",
              "13:43",
              "16:08",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:18",
              "6:56",
              "11:33",
              "13:43",
              "16:08",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:19",
              "6:57",
              "11:33",
              "13:43",
              "16:08",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:20",
              "6:58",
              "11:34",
              "13:43",
              "16:07",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:20",
              "6:59",
              "11:34",
              "13:43",
              "16:07",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:21",
              "7:00",
              "11:34",
              "13:44",
              "16:07",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:22",
              "7:01",
              "11:35",
              "13:44",
              "16:07",
              "17:34"
            ]
          },
          {
            "vakat": [
              "5:23",
              "7:02",
              "11:35",
              "13:44",
              "16:08",
              "17:35"
            ]
          },
          {
            "vakat": [
              "5:23",
              "7:03",
              "11:36",
              "13:45",
              "16:08",
              "17:35"
            ]
          },
          {
            "vakat": [
              "5:24",
              "7:03",
              "11:36",
              "13:45",
              "16:08",
              "17:35"
            ]
          },
          {
            "vakat": [
              "5:25",
              "7:04",
              "11:37",
              "13:45",
              "16:08",
              "17:35"
            ]
          },
          {
            "vakat": [
              "5:25",
              "7:04",
              "11:37",
              "13:46",
              "16:09",
              "17:36"
            ]
          },
          {
            "vakat": [
              "5:26",
              "7:05",
              "11:38",
              "13:47",
              "16:09",
              "17:36"
            ]
          },
          {
            "vakat": [
              "5:27",
              "7:05",
              "11:38",
              "13:47",
              "16:09",
              "17:36"
            ]
          },
          {
            "vakat": [
              "5:27",
              "7:05",
              "11:39",
              "13:47",
              "16:09",
              "17:37"
            ]
          },
          {
            "vakat": [
              "5:28",
              "7:06",
              "11:39",
              "13:48",
              "16:10",
              "17:37"
            ]
          },
          {
            "vakat": [
              "5:28",
              "7:07",
              "11:40",
              "13:48",
              "16:11",
              "17:38"
            ]
          },
          {
            "vakat": [
              "5:29",
              "7:07",
              "11:41",
              "13:49",
              "16:11",
              "17:38"
            ]
          },
          {
            "vakat": [
              "5:29",
              "7:07",
              "11:41",
              "13:49",
              "16:12",
              "17:39"
            ]
          },
          {
            "vakat": [
              "5:30",
              "7:08",
              "11:42",
              "13:50",
              "16:12",
              "17:39"
            ]
          },
          {
            "vakat": [
              "5:30",
              "7:08",
              "11:42",
              "13:50",
              "16:13",
              "17:40"
            ]
          },
          {
            "vakat": [
              "5:30",
              "7:09",
              "11:42",
              "13:51",
              "16:13",
              "17:41"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:09",
              "11:42",
              "13:51",
              "16:14",
              "17:41"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:09",
              "11:43",
              "13:52",
              "16:15",
              "17:42"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:09",
              "11:44",
              "13:53",
              "16:16",
              "17:43"
            ]
          },
          {
            "vakat": [
              "5:31",
              "7:09",
              "11:44",
              "13:54",
              "16:17",
              "17:44"
            ]
          }
        ]
      }
    ]
  };
  var today = new Date();
  var r = transformData(vaktija, today.getMonth(), today.getDate());

  let resp = {
    sabah: "6:15",
    zora: r.zora,
    izlazak: r.izlazak,
    podne: r.podne,
    ikindija: r.ikindija,
    aksam: r.aksam,
    jacija: r.jacija,
    hadis: "\"A vjernicima je propisano da u određeno vrijeme namaz obavljaju.\" (An-Nisa, 103)"
  };
  res.json(resp);
});

function transformData(data, monthNumber = null, dayNumber = null) {
  let result = {};

  data.mjesec.forEach((month, monthIndex) => {
    if (monthNumber !== null && monthIndex !== monthNumber) return;
      let monthName = monthIndex;
      result[monthName] = {};

      month.dan.forEach((day, dayIndex) => {
        if (dayNumber !== null && dayIndex + 1 !== dayNumber) return;
          result = {
              zora: day.vakat[0],
              izlazak: day.vakat[1],
              podne: day.vakat[2],
              ikindija: day.vakat[3],
              aksam: day.vakat[4],
              jacija: day.vakat[5]
          };
      });
  });

  return result;
}

// Other endpoints can be added similarly...
module.exports = router;
