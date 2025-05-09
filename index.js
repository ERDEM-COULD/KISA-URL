const express = require('express');
const shortid = require('shortid');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static('public'));

let urlDb = {};

// URL kısaltma endpoint'i
app.post('/shorten', (req, res) => {
  const { originalUrl, customAlias } = req.body;
  const id = customAlias || shortid.generate();

  if (urlDb[id]) {
    return res.status(400).json({ error: 'Bu kısa ad zaten kullanılıyor.' });
  }

  urlDb[id] = originalUrl;
  res.json({ shortUrl: `${req.headers.host}/${id}` });
});

// Yönlendirme
app.get('/:id', (req, res) => {
  const originalUrl = urlDb[req.params.id];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL bulunamadı.');
  }
});
// shortid yerine nanoid'ı kullanıyoruz
const { nanoid } = require('nanoid');

// ID üretmek için nanoid'ı kullan
console.log(nanoid());  // Bu, kısa ve benzersiz bir ID oluşturur

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
