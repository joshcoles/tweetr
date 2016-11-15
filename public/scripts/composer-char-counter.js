//begin by waiting for document to be ready
$(document).ready(function() {
//accessing textarea node
//on 'keyup' event
    $('.container .new-tweet textarea').on('input', function(event) {
//beginning characters
      var charsAvailable = 140;
//$(this) refers to data being passed into textarea
//get length of value of that data
      var lengthOfContent = $(this).val().length;
//assign backwardsCounter variable to difference
      var backwardsCounter = charsAvailable - lengthOfContent;
//traversing through DOM to access .counter node
//assign value of that to content of backwardsCounter
    $(this).parent().find('.counter').text(backwardsCounter);
//alternatively, the code below would work
//$('.counter').text(backwardsCounter);
//change css of .counter node if it is below zero
      if (backwardsCounter < 0) {
        $(this).parent().find('.counter').css("color", "red");
      } else {
        $(this).parent().find('.counter').css('color', "")
      }
  });
});
