(function($, App) {
  'use strict';

  var activate, config, save;

  var date_editor = {
    can_edit: function(element) {
      return $(element).is('[data-scrivito-field-type=date]');
    },
    activate: function(element) {
      return activate($(element));
    }
  };

  scrivito.on('content', function() {
    if(scrivito.in_editable_view()) {
      scrivito.define_editor('datetime_editor', date_editor);
    }
  });

  activate = function(cmsField) {
    cmsField.on('click', function(event) {
      var content = new Date(cmsField.scrivito('content'));
      var isoOffset = content.getTimezoneOffset() / 60;
      var date = content.setHours(content.getHours() + isoOffset);
      var elem = $('<input value="'+ new Date(date) +'">').insertAfter(cmsField);
      var options = cmsField.data("scrivito-datetimepicker-config");
      cmsField.hide();
      cmsField.next().flatpickr($.extend(config, options)).open();
    })
  };

  save = function(cmsField, value) {
    var isoOffset = value.getTimezoneOffset() / 60;
    var date = value.setHours(value.getHours() - isoOffset);
    return cmsField.scrivito('save', new Date(date)).done(function() { cmsField.trigger('scrivito_editors:save'); });
  };

  config = {
    enableTime: true,
    enableSeconds: true,
    time_24hr: true,
    parseDate: function(date) { return date=="null" ? new Date() : new Date(date); },
    onChange: function(selectedDates, dateStr, instance) {
      var cmsField = $(instance.element).prev();
      save(cmsField, new Date(dateStr));
    },
    onClose: function(selectedDates, dateStr, instance) {
      var cmsField = $(instance.element).prev();
      save(cmsField, new Date(dateStr));
      $(instance.element).remove();
      cmsField.html(dateStr).show();
    }
  }
})(jQuery, this);
