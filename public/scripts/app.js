//wait for document ready
$(function() {

//tweet textinput length error handling
  const MAXTWEETLENGTH = 140;
  const isAllowableLength = (length) => {
    return length <= MAXTWEETLENGTH;
  }

//when user visits site, tweet submission form is hidden by default
  $(".new-tweet").hide();

//prepends tweets to DOM, tweets are built using createTweetElement function;
  function renderTweets(tweets) {
    var parentElement = $('#tweet-container').html('');
//loops through each tweet item and builds html structure with createTweetElement
    tweets.forEach(function(tweet) {
      var element = createTweetElement(tweet);
      parentElement.prepend(element);
    });
  }

  //=================================================================

//builds tweet dom
  function createTweetElement(tweet) {

//cross-site scripting defense system
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

//variables to clean up structure below. Variables are assigned to data coming in from tweets in database.
    var content = tweet.content.text;
//escape function being used
    var safeContent = escape(content);
    var name = tweet.user.name;
    var avatars = tweet.user.avatars.small;
    var handle = tweet.user.handle;
//time stamp being handled by Moment.js library
    var epoch = tweet.created_at;
    var newDate = new Date(epoch);
    var relativeDate = moment(newDate).fromNow();

//building tweet
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
                  ${relativeDate}
                  <i class="fa fa-heart" aria-hidden="true"></i>
                  <i class="fa fa-retweet spinner" aria-hidden="true"></i>
                  <i class="fa fa-flag" aria-hidden="true"></i>
                </footer>
              </div>
            </article>`);
      return tweet;
  };

//when new tweets are submitted via form
  $('form[action="/tweets"]').on('submit', function (event) {
//prevent default (to redirect)in favour of using ajax
    event.preventDefault();
//assign tweetInput to value passed through form
    var tweetInput = $(this);

//error handling for when user attempts to submit tweet with no content.
    if ($('textarea').val().length === 0) {
      alert("Whoops, you tried to send an empty tweet! Try entering some text.")
      return false;
    }

//happy path
    if (isAllowableLength($('textarea').val().length)) {
//tweetContent is assigned to value of input with =s removed, to not affect character count;
      const tweetContent = tweetInput.serialize().split("=")[1];
//ajax listens for new posts
      $.ajax({
        method: 'POST',
        url: tweetInput.attr('action'),
        data: tweetInput.find("textarea").serialize()
      }).done(function () {
//on new post, tweets are loaded and text area is reset to empty
        loadTweets();
        $('textarea').val('');
      });
    }
//after new tweet form and counter are reset
    $("#configForm").trigger('reset');
    $(".counter").text(140);
  });

//tweets loading via ajax upon get request
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

//handles new tweet container - toggles upon click of button on nav bar
  $("#nav-bar #header-button").on("click", function() {
      $(".new-tweet").slideToggle(500, function() {
    });
//automatically focuses on text field upon toggle
    $( "#content-text" ).focus();
  });
});





