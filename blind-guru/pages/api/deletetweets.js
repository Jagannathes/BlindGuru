import axios from "axios";

async function deleting(tweetid) {

    axios.delete(`https://api.twitter.com/2/tweets?ids=${tweetid}`, {
        headers: {
          'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAAOt3cgEAAAAA9AOcdr%2BYKXqqXWALfMixPUQ47SA%3DjJ19RYciApj5wGSEJ1LGkoIj6r0PXYk2V7mTA18Tp8a1Dq0Ddk`
        }
      }).then((twitterresponse) => {
        console.log(twitterresponse.data)
        res.send(twitterresponse.data)
        console.log(twitterresponse.data)
      }).catch((error) => {
        res.send(error.message)
      }

      )
}
export default deleting