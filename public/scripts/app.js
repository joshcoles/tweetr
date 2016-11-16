/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

var tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

//=================================================================

function renderTweets(tweets) {
  var parentElement = $('#tweet-container').html('');

  tweets.forEach(function(tweet) {
    var element = createTweetElement(tweet);
    parentElement.append(element);
  });
}

//=================================================================

function createTweetElement(tweet) {

  var name = tweet.user.name;
  var avatars = tweet.user.avatars.small;
  var handle = tweet.user.handle;
  var content = tweet.content.text;
  var epoch = tweet.created_at;
  var newDate = new Date(epoch);
  var stringDate = newDate.toUTCString().split("").slice(0, 16).join("");
  // console.log(stringDate);

//=======================================================================
  var $tweet = $('<article>').addClass('tweets')

  // .append(tweetsHeader).append($header).append($img).append($b).append($tweetsHeader);



//header
  var $tweetsHeader = $('<div>').addClass('tweets-header');
  var $header = $('<header>');
  var $img = $('<img>').attr('src', avatars);
  var $b = $('<b>');
  var $tweetrHandle = $('<div>').addClass('tweetr-handle');


//body
  var $body = $('<div>').addClass('body');


//footer
  var $tweetsFooter = $('<div>').addClass('tweets-footer');
  var $footer = $('<footer>');
  var $iOne = $('<i>').addClass('fa fa-heart');
  var $iTwo = $('<i>').addClass('fa fa-retweet');
  var $iThree = $('<i>').addClass('fa fa-flag');


//=========================================================================


// tweet = $tweet.append($tweetsHeader).append($body).text(content).append($tweetsFooter).append($footer);

// tweet = $tweet.append($tweetsHeader).append($header).append($img).append($b).text(handle).append($tweetrHandle).append($body).text(content).append($tweetsFooter).append($footer).append($iOne).append($iTwo).append($iThree);

// tweet = $tweet.append($tweetsHeader).append($header).html($img).append($b).append($tweetsFooter);


// tweet = $tweet.append($tweetsHeader).append($header).html($img).append($b).html(handle).append($tweetsFooter);

tweet = $(`  <article class="tweets">
          <div class="tweets-header">
            <header>
            <img src="${avatars}">
              <b>${name}</b>
              <div class="tweetr-handle">
              ${handle}
              </div>
            </header>
          </div>
          <div class="body">
          ${content}
          </div>
          <div class="tweets-footer">
            <footer>
              ${stringDate}
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
              <i class="fa fa-flag" aria-hidden="true"></i>
            </footer>
          </div>
        </article>`)


// tweet = $tweet.append($tweetsHeader).append($header).append($img).append($b).append($tweetrHandle).append($body).text(content).append($tweetsFooter);



return tweet;
};

// createTweetElement(tweetData);
renderTweets(tweetData)

});




