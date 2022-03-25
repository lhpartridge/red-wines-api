const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
 
//copy-paste url from web api
fetch('https://api.sampleapis.com/wines/reds')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })
 
//all red wines
//localhost:3000/reds
//copy/paste URL from api.sampleapis.com
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/wines/reds'
 
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/wines', {
                title: 'All Red Wines',
                name: 'Red Wines List',
                body: 'all',
                data
            })
        })
})
 
//single-wine
//localhost:3000/reds/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    //change statement to match current api
    const URL = `https://api.sampleapis.com/wines/reds/${id}`
 
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                //change statements to match current api
                res.render('pages/single-wine', {
                    title: `${data.wine}`,
                    name: `${data.wine}`,
                    body: 'single',
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})
 

//change section to match current api
//by winery; by rating; by location
//localhost:3000/cartoon/creator
// router.get('/creator/:creator', (req, res) => {
//     const creator = req.params.creator
//     const URL = 'https://api.sampleapis.com/wines/reds'
 
//     fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             for (let i = 0; i < data.creator.length; i++) {
//                 if(creator == data.creator[i]) {
//                     res.render('pages/cartoons', {
//                         title: creator,
//                         name: creator,
//                         data
//                     })
//                 }
//             }
//         })
// })
 
 
//by genre
 
module.exports = router