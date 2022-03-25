//change root to name of api
const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
 
router.use(express.static('public'))
 
const wineRoutes = require('./api/wineRoutes')
 
router.use('/wines', wineRoutes)
 
//home route
router.get('/', (req, res) => {
    //copy/paste url from web api
    const URL = 'https://api.sampleapis.com/wines/reds'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'Red Wines API',
                name: "Red Wines",
                body: 'home',
                data
        })
    })
})
 
router.get('*', (req, res) => {
    if(req.url == '/favicon.ico') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error - Page not found',
            name: '404 Error'
        })
    }
 
})
 
module.exports = router