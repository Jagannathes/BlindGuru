import axios from "axios";
import { CLIENT_ID, CALLBACK_URL } from "config";
import { getSession } from "lib/get-session.js";
import { setCookies, getCookie } from 'cookies-next';


export default async function handler (req, res) {
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  try {
      const oneYear = 1000 * 60 * 60 * 24 * 365;
      
      const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
      // const authHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      // res.send(authHeader);
      // return;
      const { code } = req.query;
        const response = await axios.post('https://api.twitter.com/2/oauth2/token',
            {},
            {
                params: {
                    code: code,
                    grant_type: 'authorization_code',
                    client_id: CLIENT_ID,
                    redirect_uri: CALLBACK_URL,
                    code_verifier: 'challenge'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authHeader}`
                }
            }
        );
        console.log(response.data);
        setCookies('user', 
        {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token
        } , { req, res, maxAge: oneYear });
        res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
      res.send(error);
    }
}