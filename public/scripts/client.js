/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // const millisecondsToDay = (ms) => {
  //   return new Date(ms).toString()
  // }
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {
    for (keys in tweets) {
      const $newTweet = createTweetElement(tweets[keys]);
      $('#tweets-container').append($newTweet)
    }
    return;
  }
  
  const createTweetElement = function(tweetObj) {
    let $tweet = (`
      <article class="tweets">
        <header class="tweet-header">
          <div class="user">
            <img class="user-avatar" src="${tweetObj.user.avatars}"></img> 
            <h3 class="user-name">${tweetObj.user.name}<h3>
          </div>
          <div class="user-handle">
            <h4>${tweetObj.user.handle}</h4>
          </div>
        </header>
        <section class="tweet-message">${tweetObj.content.text}</section>
        <section class="tweet-footer">
          <div class="tweet-date">${tweetObj.created_at} days ago</div>
          <div class="tweet-icons">
            <i class="fa-sharp fa-solid fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </section>
      </article>
      `)
    return $tweet
  };
  
  renderTweets(data)
});