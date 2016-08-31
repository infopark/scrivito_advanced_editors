(function($, App) {
  'use strict';

  var check_for_accordion, tab_as_accordion, as_accordion;

  scrivito.on('load', function() {
    check_for_accordion()
    tab_as_accordion();
    $(window).on('resize', function() {
      check_for_accordion();
    })
  });

  check_for_accordion = function() {
    if(as_accordion()) {
      $('.scrivito_dialog').addClass('scrivito-mobile-view');
    } else {
      $('.scrivito_dialog').removeClass('scrivito-mobile-view');
    }
  }

  tab_as_accordion = function() {
    $.each($('.tab-list').find('li'), function(i, l) {
      var target = $(l).data('panel-target');
      var inactive = $(l).hasClass('inactive') ? 'inactive' : '';
      var headline = $("<h4 class="+ inactive +">"+ $(l).html() +"</h4>");
      headline.addClass('accordion-headline').data('panel-target', target).insertBefore($(target));
      if(!$(l).hasClass('inactive')) {
        headline.on('click', function() {
          var next = headline.next();

          if(next.is(':visible')) {
            headline.removeClass('active');
            headline.next().removeClass('active');
            $(l).removeClass('active');
          } else {
            headline.siblings().removeClass('active');
            $(l).siblings().removeClass('active');
            headline.addClass('active');
            headline.next().addClass('active');
            $(l).addClass('active');
            $('html,body').animate({
                scrollTop: $(headline).offset().top - 10
            }, 300);
          }
        });
      }
    });
  };

  as_accordion = function() {
    return $(document).width() < 750;
  }
})(jQuery, this);
