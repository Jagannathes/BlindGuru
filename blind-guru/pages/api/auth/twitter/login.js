import { CLIENT_ID, CALLBACK_URL  } from "config";

export default async function handler (req, res) {
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;
    res.redirect(authUrl);
}