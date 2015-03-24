(function($, App) {
  'use strict';

  $(function() {
    scrivito.on('content', function() {
      var tab_list = $('.tab-list');
      var active = tab_list.find('.active');

      $(active.data('panel-target')).addClass('active');

      tab_list.on('click', 'li', function() {
        var target = $(this).data('panel-target');
        $(target).siblings('.active').removeClass('active');
        $(this).siblings('.active').removeClass('active');
        $(target).addClass('active');
        $(this).addClass('active');
      });
    });
  });

})(jQuery, this);