const mongoose = require('mongoose');

const db = new mongoose.Schema({
id: { type: String,required: true },
data : { type: String },
number : { type: String }
})
const storedb = mongoose.model("storedb", db)
module.exports = { storedb }
