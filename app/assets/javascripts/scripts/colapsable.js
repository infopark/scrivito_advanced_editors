(function($, App) {
  'use strict';

  scrivito.on('load', function() {
    $(document).on('click', '.scrivito_colapsable_headline', function() {
      $(this).parent().toggleClass('in');
      $(this).siblings().stop().slideToggle(300);
    });
  });
})(jQuery, this);