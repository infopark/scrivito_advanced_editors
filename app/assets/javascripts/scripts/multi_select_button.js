(function($, App) {
  'use strict';

  var activate, handleClick, renderTemplate,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  var multienum_editor = {
    can_edit: function(element) {
      var is_multienum = $(element).is('[data-scrivito-field-type=multienum]')
      var has_list = $(element).is('[data-multi-select-list]');
      return is_multienum || has_list;
    },
    activate: function(element) {
      return activate($(element));
    }
  };

  scrivito.on('load', function() {
    return scrivito.define_editor('multienum', multienum_editor);
  });

  activate = function(cmsField) {
    var validValues = cmsField.data('multi-select-list') || cmsField.scrivito('valid_values');
    var captions = cmsField.data('multi-select-caption');
    cmsField.html(renderTemplate(cmsField.scrivito('content'), validValues, captions));
    return cmsField.find('.scrivito_enum_editor li').on('click', function() {
      return handleClick(cmsField, $(this));
    });
  };

  renderTemplate = function(values, validValues, captions) {
    var i, len, li, ul, validValue, caption;
    ul = $('<ul class="scrivito_enum_editor scrivito_multi"></ul>');
    for (i = 0, len = validValues.length; i < len; i++) {
      validValue = validValues[i];
      caption = (captions && captions[validValue]) ? captions[validValue] : validValue;
      li = $('<li></li>');
      li.html(caption);
      li.data('scrivito-select-value', validValue);
      if (indexOf.call(values, validValue) >= 0) {
        li.addClass('scrivito_enum_active');
      }
      ul.append(li);
    }
    return ul;
  };

  handleClick = function(cmsField, clickedItem) {
    var values;
    clickedItem.toggleClass('scrivito_enum_active');
    values = $.map(cmsField.find('li.scrivito_enum_active'), function(item) {
      return $(item).data('scrivito-select-value');
    });
    cmsField.scrivito('save', values).done(function() {
      cmsField.trigger('scrivito_editors:save');
      return cmsField.trigger('scrivito_editors:blur');
    });
    return false;
  };

})(jQuery, this);
