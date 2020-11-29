const express = require('express');
const router = express.Router();
const Inquiry = require('../models/contact_form');

// Support information
router.get('/docs/:info_page', async (req, res) => {
  // const horde = getClientInfo(req);
  // form page request structure: folder/page_lang.ejs
  const page = req.params.info_page;
  const lang = req.lang;

  res.render(`info/${page}_${lang}`, { locale: req.eval_language, theme: req.theme });
});

// Contact form
router.get('/contact', (req, res) => {
  res.render('contact_form', { locale: req.eval_language, theme: req.theme });
});

router.post('/contact', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    console.log('Contact form submitted...'.toUpperCase());
    res.json({ message: `${inquiry.name}, your inquiry submitted successfully!` });
  } catch (err) {
    console.log('there was error', err);
  }
});

module.exports = router;
