const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require("../models/user")
const UserRole = require("../models/enums/userRoles")

const { generateGoogleUserToken } = require('../utils/jwt');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = new User({
                        isEmailVerified: true,
                        userName: null,
                        password: null,
                        email: profile.emails[0].value,
                        userRole: UserRole.VISITOR
                    });

                    await user.save();
                }

                const googleUserToken = generateGoogleUserToken(user);

                user.isEmailVerified = true;
                user.verificationToken = null;
                user.googleUserToken = googleUserToken;
                await user.save();

                return done(null, user);
            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});
