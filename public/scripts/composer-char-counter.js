$(document).ready(function() {
  console.log( "ready!" );
  $("#tweet-text").on('input', function() {
    let count = $(this).val().length;
    let counterElement = $(this).parentsUntil('.new-tweet').find('.counter');
    if (count > 140) {
      let negCount = count - 140;
      counterElement.text('-' + negCount).css('color', 'red');
    } else {
      let charCount = 140 - count;
      counterElement.text(charCount).css('color', '#545149');
    }
  });  
});

