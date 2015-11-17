(function($, App) {
  'use strict';

  $(function() {
    App.ScrivitoMultiSelectButton = {
      init_function: function(scrivito_tag) {
        var content = $(scrivito_tag).scrivito('content');
        var values = $(scrivito_tag).is('[data-scrivito-field-type=multienum]') ? $(scrivito_tag).scrivito('allowed_values') : $(scrivito_tag).data('toggle-button-list');
        var captions = $(scrivito_tag).data('multi-select-caption');

        $(scrivito_tag).addClass('button_list').addClass('select').html('');
        return $.each(values, function(index, value) {
          var css_class = ($.inArray(value, content) >= 0) ? 'active' : 'inactive'
          var caption = (captions && captions[value]) ? captions[value] : value
          $('<button></button>')
            .addClass('scrivito-multi-select-button')
            .addClass(css_class)
            .data('content', value)
            .html(caption)
            .appendTo($(scrivito_tag));
        });
      },

      clickFunction: function(event) {
        var newValue = $(event.currentTarget).data('content');
        var scrivito_tag = $(event.currentTarget).parent();
        var content = $(scrivito_tag).scrivito('content');

        if($.inArray(newValue, content) >= 0) {
          content.splice( content.indexOf(newValue), 1 );
        } else {
          content.push(newValue);
        }

        $(event.currentTarget).toggleClass('active');

        scrivito_tag.scrivito('save', content);
      },
    };

    scrivito.on('load', function() {
      scrivito.define_editor("toggle_multi_select_editor", {
        can_edit: function(element) {
          var is_enum = $(element).is('[data-scrivito-field-type=multienum]')
          var has_list = $(element).is('[data-multi-select-list]')
          return is_enum || has_list;
        },
        activate: function(element) {
          ScrivitoMultiSelectButton.init_function(element);
          $(element).on('click', '.scrivito-multi-select-button', ScrivitoMultiSelectButton.clickFunction);
        }
      });
    });
  });
})(jQuery, this);