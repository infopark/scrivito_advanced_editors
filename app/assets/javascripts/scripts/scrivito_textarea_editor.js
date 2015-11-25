(function($, App) {
  'use strict';

  var TextareaEditor = {
    // set selector for Editor
    selector: '[data-editor=scrivito-textarea-editor]',

    initFunction: function() {
      var editors = $(TextareaEditor.selector);
      $.each(editors, function(i, editor) {
        var textarea = $("<textarea></textarea>").val($(editor).html());
        $(editor).html(textarea);
      });
    },

    blurFunction: function(cmsField) {
      var text = cmsField.val();
      return cmsField.parent().scrivito('save', text);
    }
  };

  scrivito.on('load', function() {
    if(scrivito.in_editable_view()) {
      TextareaEditor.initFunction();
    }
    return $('body').on('blur', TextareaEditor.selector + " textarea", function(event) {
      if(scrivito.in_editable_view()) {
        TextareaEditor.blurFunction($(event.target));
      }
    });
  });

})(jQuery, this);