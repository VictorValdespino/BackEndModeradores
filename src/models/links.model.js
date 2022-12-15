const {Schema,model} = require('mongoose')

const linksSchema = Schema({
    whatsapp :{
        type: String
    },
    manual : {
        type: String
    }
})

module.exports = model('Links', linksSchema)