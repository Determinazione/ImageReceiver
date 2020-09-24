const mongoose = require('mongoose');
const imageSchema = mongoose.Schema({
    guildId: String,
    serverId: String,
    hashValue: String,
    image: String,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('images', imageSchema);