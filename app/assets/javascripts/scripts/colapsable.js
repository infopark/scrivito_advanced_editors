(function($, App) {
  'use strict';

  scrivito.on('content', function() {
    $('.scrivito_colapsable_headline').on('click', function() {
      $(this).parent().toggleClass('in');
      $(this).siblings().stop().slideToggle(300);
    });
  });
})(jQuery, this);