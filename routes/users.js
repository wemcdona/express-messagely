const Router = require("express").Router;
const User = require("../models/user");
const {ensureLoggedIn, ensureCorectUser} = require("../middleware/auth");

const router = new Router();

router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
        let users = await User.all();
        return res.json({users});
    }

    catch (err) {
        return next(err);
    }
});

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        let user = await User.get(req.params.username);
        return res.json({user});
    }

    catch (err) {
        return next(err);
    }
});

router.get("/:username/to", ensureCorrectUser, async function (req, res, next) {
    try {
        let messages = await User.messagesTo(req.params.username);
        return res.json({messages});
    }

    catch (err) {
        return next(err);
    }
});

router.get("/:username/from", ensureCorrectUser, async function (req, res, next) {
    try {
        let messages = await User.messagesFrom(req.params.username);
        return res.json({messages});
    }

    catch (err) {
        return next(err);
    }
});

module.exports = router;
