let CALLBACK_URL;
if(process.env.NODE_ENV === 'production') {
    CALLBACK_URL= `https://blind-guru.netlify.app/api/auth/twitter/callback`;
} else {
    CALLBACK_URL= `http://localhost:3000/api/auth/twitter/callback`;
}
export {CALLBACK_URL};

export const CLIENT_ID="MV94RjJRLUtEZHRwclViZ254Wkw6MTpjaQ";