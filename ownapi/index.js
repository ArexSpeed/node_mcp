const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const newspapers = require('./newspapers')

const app = express();


const articles = [];

newspapers.forEach(newspaper => {
  axios.get(newspaper.address)
       .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("climate")', html).each(function () {
          const title = $(this).text()
          const url = $(this).attr('href')

            articles.push({
              title,
              url: newspaper.base + url,
              source: newspaper.name
            })
          })
       })
})

app.get('/', (req, res) => {
  res.json('Welcome to my Climate Change API')
});

app.get('/news', (req, res) => {
  res.json(articles)
  //het all articles and parse to html (first stage then copy json to newspaper.js))
  /*
  axios.get('https://www.theguardian.com/environment/climate-crisis')
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text()
        const url = $(this).attr('href')
        articles.push({
          title,
          url
        })
      })
      res.json(articles)
    }).catch((err) => console.log(err))
    */
});

app.get('/news/:newspaperId', (req, res) => {
   const newspaperId = req.params.newspaperId

   const newspaperAddress = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].address;
   const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base;
   //console.log(newspaperAddress);
   axios.get(newspaperAddress)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const specificArticles = []

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text()
        const url = $(this).attr('href')
        specificArticles.push({
            title,
            url: newspaperBase + url,
            source: newspaperId
        })
      })
      res.json(specificArticles)
    }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Server is started on ${PORT}`));