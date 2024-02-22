const { mongoose } = require("mongoose");

const accountModal = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        unique: true
    }
});

const Account = mongoose.model('Account', accountModal);

module.exports = Account;