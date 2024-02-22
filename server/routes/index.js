const router = require("express").Router();
const userRouter = require("./userRoute.js");
const accountRouter = require("./accountRoute.js");

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
