const router = require('express').Router();
const { isGuest, isAuth } = require('../middlewares/guards');
const { register, login , findUserById} = require('../services/userService');
const mapErrors = require('../utils/mapper');

const attachCookie = (token, res) => {
    return res.cookie(process.env.COOKIE_NAME, token, {
        sameSite: "none",
        secure: true,
    })
}
router.post('/register', isGuest(), async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const rePassword = req.body.rePassword;
   
    try {
        if (username.trim() == '' || password.trim() == '' || email.trim() == '' || rePassword.trim() == '') {
            throw new Error('Username, email, password and rePassword are required');
        }

        const result = await register(username.trim(), email.trim().toLowerCase(), password.trim(), rePassword.trim() );

        attachCookie(result, res)
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim(), req.body.password.trim());
        console.log(result)
       const cook =  attachCookie(result, res)
       console.log(cook)
        
        res.json(result);
        req.user = result;
       console.log(req);

  



    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME) 
    res.status(204).end();
});

router.get('/profile',  async (req, res) => {
    const user = await findUserById();
   
    })

module.exports = router;