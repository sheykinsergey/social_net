const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('../services/config')
const { getUserEmail } = require('./user')
const {createUser} = require('../services/store/user.service')

    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: config.clientID,
          clientSecret: config.clientSecret
        },
        //  Passport verify callback
        async (accessToken, refreshToken, profile, done) => {
          const [{ value: email }] = profile.emails;
          let user = await getUserEmail(email);
          
          if (!user) {
            await createUser({
              name: profile.displayName,  
              email,

            });
            user = await getUserEmail(email);
          }
          console.log('id');
          console.log(user);
          return done(null,{
            id: user.id,
            name: user.name,
            email: user.email,
          });
        },
      ),
    );
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    module.exports = passport