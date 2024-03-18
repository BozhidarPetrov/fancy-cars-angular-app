// const { verifySession } = require('../services/userService');
const jwt = require("../lib/jwt");

module.exports = () => async (req, res, next) => {

    const token = req.cookies["authToken"];

    if (token) {
    //   try {
        const decodedToken = await jwt.verify(token, 'asoiducan93284c9rew');
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.authenticatedUser = true;
  
        next();
    //   } catch (error) {
    //     console.log({ error });
    //     res.clearCookie("authToken");
    //     res.redirect("/users/login");
    //   }
  
    //   return;
    } else {
        console.log('no token');
      next();
    }

    // const token = req.headers['x-authorization'];

    // try {
    //     if (token) {
    //         const userData = verifySession(token);
    //         req.user = userData;
    //     }
    //     next();
    // } catch (err) {
    //     res.status(498).json({ message: 'Invalid access token. Please sign in' });
    // }
};