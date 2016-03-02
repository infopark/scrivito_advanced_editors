(function($, App) {
  'use strict';

  var activate;

  scrivito.on('content', function() {
    var l, b, id;

    $(document).on('click', '[data-tab-to-toggle] li', function(event) {
      activate(event.currentTarget);
    });

    // initial activate listelems
    $.each($('.tab-list'), function(index, elem) {
      id = '#'+$(elem).attr('id')
      b = $('[data-tab-to-toggle="'+id+'"]');
      activate(b);
    });
  });

  activate = function(button) {
    var value = $(button).data('scrivito-toggle-value') || button.text();
    var list = $(button).parents('[data-tab-to-toggle]')[0] || button;
    var selector = $(list).data('tab-to-toggle');
    var tab = $(selector);
    var panel, allowedValues;

    $(tab).find('.active').removeClass('active');

    $.each(tab.find('li'), function(index, elem) {
      panel = $(elem).data('panel-target');
      $(panel).removeClass('active');
      allowedValues = $(elem).data('allowed-values');

      if(allowedValues == undefined || $.inArray(value, allowedValues) > -1) {
        if($(button).hasClass('scrivito_enum_active')) {
          $(elem).removeClass('inactive');
        }
      } else {
        $(elem).addClass('inactive');
      }
    });

    $($(tab).find('li').not('.inactive')[0]).addClass('active');
    $($($(tab).find('li').not('.inactive')[0]).data('panel-target')).addClass('active');
  }

})(jQuery, this);
