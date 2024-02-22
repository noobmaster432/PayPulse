const { mongoose } = require("mongoose");
const Account = require("../models/accountsModal");

// -------------------------------- Account Balance --------------------------------
const getBalance = async(req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId }).populate(
          "userId",
          "-_id -password"
        );;
        if (!account) {
            return res.status(411).json({ message: "Account not found" });
        }
        res.status(200).json({ balance: account.balance, account: account });
    } catch (error) {
        res.status(411).json({ message: error.message });
    }
}

// -------------------------------- Transfer Money --------------------------------
const transferMoney = async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if(amount > account.balance) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: "Insufficient balance" });
    }

    const receiver = await Account.findOne({ userId: to }).session(session);
    if(!receiver) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: "Receiver not found" });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: `Successfully Transfered ${amount}` });
}

module.exports = { getBalance, transferMoney };