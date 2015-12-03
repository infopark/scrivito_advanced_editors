(function($, App) {
  'use strict';

  var ScrivitoMultiSelectButton = {
    init_function: function(scrivito_tag) {
      var content = $(scrivito_tag).scrivito('content');
      var is_enum = $(scrivito_tag).is('[data-scrivito-field-type=multienum]');
      var values = is_enum ? $(scrivito_tag).scrivito('allowed_values') : $(scrivito_tag).data('multi-select-list');
      var captions = $(scrivito_tag).data('multi-select-caption');

      $(scrivito_tag).addClass('button_list').addClass('select').html('');
      return $.each(values, function(index, value) {
        var css_class = ($.inArray(value, content) >= 0) ? 'active' : 'inactive'

        if(!is_enum) css_class = (content.indexOf(value) > -1) ? 'active' : 'inactive'

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
      var array_content = Array.isArray(content) ? content : content.split('%|%')
      if(content === "") array_content = []

      if($.inArray(newValue, array_content) >= 0) {
        array_content.splice( array_content.indexOf(newValue), 1 );
      } else {
        array_content.push(newValue);
      }

      var to_save = $(scrivito_tag).is('[data-scrivito-field-type=multienum]') ? array_content : array_content.join('%|%');

      scrivito_tag.scrivito('save', to_save).then(function() {
        $(event.currentTarget).toggleClass('active');
      });
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

})(jQuery, this);