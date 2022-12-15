const { Router } = require('express');

const  {mLinksGet}  = require('../src/controllers/links.controller');

const vRouter = Router();

vRouter.get('/traer-links', mLinksGet);


module.exports = vRouter