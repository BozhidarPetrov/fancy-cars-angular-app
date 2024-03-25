const router = require('express').Router();
const { register, login , findUserById} = require('../services/userService');

const attachCookie = (token, res) => {
    return res.cookie(process.env.COOKIE_NAME, token, {
        sameSite: "none",
        secure: true,
    })
}
router.post('/register', async (req, res) => {
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
        res.status(400).json(err.message);
    }
});

router.post('/login', async (req, res) => {
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
        res.status(400).json(err.message);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME) 
    res.status(204).end();
});

router.post('/profile',  async (req, res) => {
    const id = req.body.id;
    const user = await findUserById(id);
   res.json(user)
    })

module.exports = router;