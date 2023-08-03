__path = process.cwd()
let { runtime, fetchJson } = require('../lib');
let express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
res.sendFile(__path + '/view/home.html')
})

router.get('/docs', (req, res) => {
    res.sendFile(__path + '/view/docs.html')
})
router.get('/deploy/heroku', (req, res) => {
    res.sendFile(__path + '/view/heroku.html')
})
router.get('/viwe/friendpage', (req, res) => {
    res.sendFile(__path + '/view/frendpage.html')
})
router.get('/viwe/contact', (req, res) => {
    res.sendFile(__path + '/view/contact.html')
})
router.get('/viwe/getqr', (req, res) => {
    res.sendFile(__path + '/view/getqr.html')
})
router.get('/viwe/service', (req, res) => {
    res.sendFile(__path + '/view/service.html')
})
module.exports = router
