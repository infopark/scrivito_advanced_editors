(function($, App) {
  'use strict';

  var activate, handleClick, renderTemplate, save;

  var enum_editor = {
    can_edit: function(element) {
      var is_enum = $(element).is('[data-scrivito-field-type=enum]');
      var has_list = $(element).is('[data-toggle-button-list]');
      return is_enum || has_list;
    },
    activate: function(element) {
      return activate($(element));
    }
  };

  scrivito.on('content', function() {
    return scrivito.define_editor('toggle_button_editor', enum_editor);
  });

  activate = function(cmsField) {
    var validValues = cmsField.data('toggle-button-list') || cmsField.scrivito('valid_values');
    var captions = cmsField.data('toggle-button-caption');
    cmsField.html(renderTemplate(cmsField.scrivito('content'), validValues, captions));
    return cmsField.find('.scrivito_enum_editor li').on('click', function() {
      handleClick(cmsField, $(this));
    });
  };

  renderTemplate = function(value, validValues, captions) {
    var i, len, li, ul, validValue, caption;

    ul = $('<ul class="scrivito_enum_editor"></ul>');
    for (i = 0, len = validValues.length; i < len; i++) {
      validValue = validValues[i];
      caption = (captions && captions[validValue]) ? captions[validValue] : validValue;
      li = $('<li></li>');
      li.html(caption);
      li.data('scrivito-toggle-value', validValue);
      if (validValue === value) {
        li.addClass('scrivito_enum_active');
      }
      ul.append(li);
    }
    return ul;
  };

  handleClick = function(cmsField, clickedItem) {
    if (clickedItem.hasClass('scrivito_enum_active')) {
      if(!cmsField.is('[data-scrivito-toggle-button-enable=false]')) {
        clickedItem.removeClass('scrivito_enum_active');
        save(cmsField, null);
      }
    } else {
      cmsField.find('li').removeClass('scrivito_enum_active');
      clickedItem.addClass('scrivito_enum_active');
      save(cmsField, clickedItem.data('scrivito-toggle-value'));
    }
  };

  save = function(cmsField, value) {
    return cmsField.scrivito('save', value).done(function() {
      cmsField.trigger('scrivito_editors:save');
      return cmsField.trigger('scrivito_editors:blur');
    });
  };
})(jQuery, this);
