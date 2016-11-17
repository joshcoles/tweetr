/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  const MAXTWEETLENGTH = 140;

  const isAllowableLength = (tweet) => {
    return tweet.length <= MAXTWEETLENGTH;
  }

  $(".new-tweet").hide();
  //=======================================================

  function renderTweets(tweets) {
    var parentElement = $('#tweet-container').html('');

    tweets.forEach(function(tweet) {
      var element = createTweetElement(tweet);
      parentElement.prepend(element);
    });
  }

  //=================================================================

  function createTweetElement(tweet) {

    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    var content = tweet.content.text;
    var safeContent = escape(content);

    var name = tweet.user.name;
    var avatars = tweet.user.avatars.small;
    var handle = tweet.user.handle;
    var epoch = tweet.created_at;
    var newDate = new Date(epoch);
    var stringDate = newDate.toUTCString().split("").slice(0, 16).join("");


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
              ${safeContent}
              </div>
              <div class="tweets-footer">
                <footer>
                  ${stringDate}
                  <i class="fa fa-heart" aria-hidden="true"></i>
                  <i class="fa fa-retweet" aria-hidden="true"></i>
                  <i class="fa fa-flag" aria-hidden="true"></i>
                </footer>
              </div>
            </article>`);


      return tweet;
  };

  $('form[action="/tweets"]').on('submit', function (event) {

    event.preventDefault();
    var tweetInput = $(this);
    const tweetContent = tweetInput.serialize().split("=")[1];

    if (tweetContent.length === 0) {
      alert("Whoops, you tried to send an empty tweet! Try entering some text.")
      return false;
    }

    if (isAllowableLength(tweetContent)) {
      console.log("ajax sent")
      $.ajax({
        method: 'POST',
        url: tweetInput.attr('action'),
        data: tweetInput.find("textarea").serialize()
      }).done(function () {
        loadTweets();
        $('textarea').val('');
      });
    }

    $("#configForm").trigger('reset');
    $(".counter").text(140);

  });

  function loadTweets() {

    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function(tweetData) {
        renderTweets(tweetData);
      }
    });
  }

  loadTweets();


$("#nav-bar #header-button").on("click", function() {
    $(".new-tweet").slideToggle(500, function() {
    });
    $( "#content-text" ).focus();
  });

});





// $( "#clickme" ).click(function() {
//   $( "#book" ).slideDown( "slow", function() {
//     // Animation complete.
//   });
// });






