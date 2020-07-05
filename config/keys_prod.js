module.exports = {
  mongoURI: process.env.MONGOLAB_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  ownerCode: process.env.OWNER_CODE,
  adminCode: process.env.ADMIN_CODE,
  ownerEmail: process.env.OWNER_EMAIL,
  ownerSecret: process.env.OWNER_SECRET_EMAIL,
  adminEmail: process.env.EMAIL,
  adminSecret: process.env.SECRET_EMAIL,
  stripePublish: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecret: process.env.STRIPE_SECRET_KEY,
  mailgunAPIKey: process.env.MAILGUN_API_KEY,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
};
