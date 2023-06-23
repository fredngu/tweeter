/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Functions for tweets
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (keys in tweets) {
    const $newTweet = createTweetElement(tweets[keys]);
    $('#tweets-container').prepend($newTweet)
  }
  return;
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <section class="tweet-message">${escape(tweetObj.content.text)}</section>
      <footer class="tweet-footer">
        <div class="tweet-date">${timeago.format(new Date(tweetObj.created_at))}</div>
        <div class="tweet-icons">
          <i class="fa-sharp fa-solid fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `)
  return $tweet
};

const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  }).then(function(tweet){
    renderTweets(tweet);
  });
}

$(document).ready(function() {
  loadTweets()
  $('#error-message').hide();
  $("#submit-tweet").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    if ($('#tweet-text').val() === "" || null) {
      $('#error-message').slideDown("slow");
      $('#error-message').html(`!! Error: Tweet Cannot Be Blank !!`);
      return 
    } else if ($('#tweet-text').val().length > 140) {
      $('#error-message').slideDown("slow");
      $('#error-message').html(`!! Error: Tweet Exceeds Character Limit !!`);
    } else {
      $.ajax({
        method: 'POST',
        data: serializedData,
        url: '/tweets',
        success: loadTweets()
      })
    }
  });
});