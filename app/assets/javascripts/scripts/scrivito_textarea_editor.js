(function($, App) {
  'use strict';

  $(function() {

    App.textareaEditor = {
      // set selector for Editor
      selector: '[data-editor=scrivito-textarea-editor]',

      blurFunction: function(cmsField) {
        var text = cmsField.val();
        return cmsField.scrivito('save', text);
      }
    };

    scrivito.on('load', function() {
      return $('body').on('blur', textareaEditor.selector, function(event) {
        if(scrivito.in_editable_view()) {
          textareaEditor.blurFunction($(event.target));
        }
      });
    });
  });

})(jQuery, this);