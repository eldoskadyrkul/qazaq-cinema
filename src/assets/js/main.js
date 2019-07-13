$(window).on('scroll', function() {
  if ($(this).scrollTop() > 300) {
    $('#top').fadeIn();
  }
  else {
    $('#top').fadeOut();
  }
});
$('#top').on('click', function() {
  $("html, body").animate( {
      scrollTop: 0
    }
    , 1000);
  return false;
});
