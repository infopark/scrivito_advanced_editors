(function($, App) {
  'use strict';

  var ScrivitoColorPicker = {
    init_function: function(scrivito_tag) {
      var content = $(scrivito_tag).scrivito('content');
      var values = $(scrivito_tag).data('colors-list');

      $(scrivito_tag).addClass('toggle_button_list').html('');
      return $.each(values, function(index, color) {
        var css_class = (color === content) ? 'active' : 'inactive'
        $('<button></button>')
          .addClass('scrivito-toggle-button')
          .addClass('color-select')
          .addClass(color === "" ? "default" : color)
          .addClass(color !== "" ? '' : 'transparent_bg')
          .addClass(css_class)
          .data('content', color)
          .html('')
          .appendTo($(scrivito_tag));
      });
    },

    clickFunction: function(event) {
      var text = $(event.currentTarget).data('content');
      var scrivito_tag = $(event.currentTarget).parent();

      scrivito_tag.find('.active').removeClass('active');
      $(event.currentTarget).addClass('active');

      scrivito_tag.scrivito('save', text);
    },
  };

  scrivito.on('load', function() {
    scrivito.define_editor("color_picker", {
      can_edit: function(element) {
        return $(element).is('[data-colors-list]');
      },
      activate: function(element) {
        ScrivitoColorPicker.init_function(element);
        $(element).on('click', '.scrivito-toggle-button', ScrivitoColorPicker.clickFunction);
      }
    });
  });

})(jQuery, this);