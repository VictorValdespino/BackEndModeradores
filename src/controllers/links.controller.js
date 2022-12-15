const { response } = require("express");
const vLinks = require('../models/links.model')


const mLinksGet = async(req, res = response) => {
    
    try 
    {
        const vLinks = await vLinks.find()
        console.log(".---------------------")
        console.log(vLinks)
        console.log(".---------------------")
        res.status(201).json(vLinks)

    } catch ( error ) 
    {
        console.log(error);
    }
}

module.exports = mLinksGet;