(function($, App) {
  'use strict';

  var as_accordion;

  scrivito.on('content', function(content) {
    var tab_list = $(content).find('.tab-list');
    var active;

    $.each(tab_list, function(i,e) {
      active = $(e).find('.active');

      if(active.length == 0) {
        // first elem in tab_list if not in small view
        active = as_accordion() ? [] : $($(e).find('li')[0]);
      }

      $(active).addClass('active');
      $($(active).data('panel-target')).addClass('active');
    });

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