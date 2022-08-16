import axios from "axios";
async  function getting(req,res){
    axios.get('https://api.twitter.com/2/tweets?ids=1527253678612430848,1527122798325338112,1527469671460503553,1527462661134471199,1527318536741261319', {
    headers: {
      'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAAOt3cgEAAAAA9AOcdr%2BYKXqqXWALfMixPUQ47SA%3DjJ19RYciApj5wGSEJ1LGkoIj6r0PXYk2V7mTA18Tp8a1Dq0Ddk`
    }
  })
  .then((twitterresponse) => {
    // console.log(res.data)
    res.send(twitterresponse.data)
    console.log(twitterresponse.data)
  
  })
  .catch((error) => {
    res.send(error.message)
  })

}
export default getting