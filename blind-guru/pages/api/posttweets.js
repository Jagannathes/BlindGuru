import axios from "axios";

async function posting(tweet) {
  const tweet = tweet;
  axios.post(
    "https://api.twitter.com/2/tweets",
    {
      headers: {
        Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAOt3cgEAAAAA9AOcdr%2BYKXqqXWALfMixPUQ47SA%3DjJ19RYciApj5wGSEJ1LGkoIj6r0PXYk2V7mTA18Tp8a1Dq0Ddk`,
        "Content-type": "applicaton/json",
      },
    },
    { text: tweet }
  ).then((res) => {
      console.log(res.data);
  }).catch((err) => {
      console.log(err);
  }
  
  )
}
export default posting