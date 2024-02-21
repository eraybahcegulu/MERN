const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy
var DiscordStrategy = require('passport-discord').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
const User = require("../models/user")
const UserRole = require("../models/enums/userRoles")

const { generateGoogleUserToken, generateDiscordUserToken, generateGithubUserToken } = require('../utils/jwt');
const { dateNow } = require("./moment");
const { generateRandomDefaultAvatar } = require("./multiavatar");
const { generateShortId } = require("./uuid");

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

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
                        emailVerifiedAt: dateNow(),
                        userName: null,
                        password: null,
                        email: profile.emails[0].value,
                        avatar: generateRandomDefaultAvatar(),
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

passport.use(
    new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: "/auth/discord/callback",
        scope: ["identify", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.email });

                if (!user) {
                    user = new User({
                        isEmailVerified: true,
                        emailVerifiedAt: dateNow(),
                        userName: null,
                        password: null,
                        email: profile.email,
                        avatar: generateRandomDefaultAvatar(),
                        userRole: UserRole.VISITOR
                    });

                    await user.save();
                }

                const discordUserToken = generateDiscordUserToken(user);

                user.isEmailVerified = true;
                user.verificationToken = null;
                user.discordUserToken = discordUserToken;
                await user.save();

                return done(null, user);
            } catch (error) {
                return done(error, null)
            }
        }));


passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            try {

                let user = await User.findOne({ githubId: profile.id });

                if (!user) {
                    profile.username = profile.username + generateShortId();
                    user = new User({
                        githubId: profile.id,
                        userName: profile.username,
                        password: null,
                        avatar: generateRandomDefaultAvatar(),
                        userRole: UserRole.VISITOR
                    });

                    await user.save();
                }

                const githubUserToken = generateGithubUserToken(user);

                user.verificationToken = null;
                user.githubUserToken = githubUserToken;
                await user.save();

                return done(null, user);
            } catch (error) {
                return done(error, null)
            }
        }
    ));
