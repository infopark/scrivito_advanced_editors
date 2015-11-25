(function($, App) {
  'use strict';

  var ScrivitoToggleButton = {
    init_function: function($scrivito_tag) {
      var content = $scrivito_tag.scrivito('content');
      var values = $scrivito_tag.is('[data-scrivito-field-type=enum]') ? $scrivito_tag.scrivito('allowed_values') : $scrivito_tag.data('toggle-button-list');
      var captions = $scrivito_tag.data('toggle-button-caption');

      $scrivito_tag.addClass('toggle_button_list').html('');
      return $.each(values, function(index, value) {
        var css_class = (value.toString() === content) ? 'active' : 'inactive'
        var caption = (captions && captions[value]) ? captions[value] : value
        $('<button></button>')
          .addClass('scrivito-toggle-button')
          .addClass(css_class)
          .data('content', value)
          .html(caption)
          .appendTo($scrivito_tag);
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
    scrivito.define_editor("toggle_button_editor", {
      can_edit: function(element) {
        var is_enum = $(element).is('[data-scrivito-field-type=enum]')
        var has_list = $(element).is('[data-toggle-button-list]')
        return is_enum || has_list;
      },
      activate: function(element) {
        ScrivitoToggleButton.init_function($(element));
        $(element).on('click', '.scrivito-toggle-button', ScrivitoToggleButton.clickFunction);
      }
    });
  });

})(jQuery, this);
