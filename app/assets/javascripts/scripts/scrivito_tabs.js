(function($, App) {
  'use strict';

  var as_accordion;

  scrivito.on('content', function(content) {
    var tab_list = $(content).find('.tab-list');
    var active = tab_list.find('.active');

    if(!as_accordion()) {
      $.each(active, function(i,e) {
        $($(e).data('panel-target')).addClass('active');
      });
    }

    tab_list.on('click', 'li', function() {
      var target = $(this).data('panel-target');
      if(!$(this).hasClass('inactive')) {
        $(target).siblings('.active').removeClass('active');
        $(this).siblings('.active').removeClass('active');
        $(target).addClass('active');
        $(this).addClass('active');
      }
    });
  });

  as_accordion = function() {
    return $(document).width() < 750;
  }
})(jQuery, this);