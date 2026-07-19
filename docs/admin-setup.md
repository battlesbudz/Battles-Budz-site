# Battles Budz admin setup

The administration system has one configured account: `battlesbudz@gmail.com`.

Before the first production sign-in, add these private deployment variables:

- `ADMIN_EMAIL=battlesbudz@gmail.com`
- `ADMIN_SETUP_TOKEN`: a randomly generated secret of at least 32 characters
- `SESSION_SECRET`: a different randomly generated secret of at least 32 characters

`DATABASE_URL` must remain configured for the existing PostgreSQL database. Never commit or paste any of these secret values into GitHub.

Then visit `/admin/login`. The first visit presents the one-time setup form. Enter the configured setup token and choose a password of at least 12 characters. Once the password is stored, the setup endpoint disables itself.

The same deployment token is the emergency recovery token. Rotate `ADMIN_SETUP_TOKEN` in the deployment settings after using recovery. Changing or recovering the password invalidates existing admin sessions.

If `SESSION_SECRET` is not configured, the application generates a secure temporary secret. This is safe for development but signs the administrator out whenever the server restarts.
