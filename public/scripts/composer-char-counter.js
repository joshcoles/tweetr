//begin by waiting for document to be ready
$(document).ready(function() {
//accessing textarea node
//on input to textarea
    $('.container .new-tweet textarea').on('input', function(event) {
//establish counter
      const counter = $(this).parent().find('.counter')
//beginning characters available
      var charsAvailable = 140;
//$(this) refers to data being passed into textarea
//get length of value of that data
      var lengthOfContent = $(this).val().length;
//assign backwardsCounter variable to difference
      var backwardsCounter = charsAvailable - lengthOfContent;
//re-assigne text of counter to value of backwardsCounter;
      counter.text(backwardsCounter);
//error handling if counter goes below zero
      if (backwardsCounter < 0) {
//change css of .counter node if it is below zero
        counter.css("color", "red");
//also disable 'tweet' button, which is access by walking the dom to the 'next()' item
        $(this).next().attr("disabled", true);
      } else {
//if counter is not below zero, all is well
        counter.css('color', "");
        $(this).next().attr("disabled", false);
      }
  });
});


