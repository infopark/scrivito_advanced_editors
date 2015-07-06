(function($, App) {
  'use strict';

  $(function() {
    App.ScrivitoListEditor = {
      // set selector for Editor
      selector: "[data-editor='scrivito-list-editor']",

      // Function that will be called on scrivito load
      initFunction: function() { },

      // set function triggert on click
      clickFunction: function(scrivito_tag, text, delimiter) {
        var delimiter = $(scrivito_tag).data('delimiter') || '|';
        var content = scrivito_tag.data('scrivito-field-type') == 'string' ? text.join(delimiter) : text;
        return scrivito_tag.scrivito('save', content);
      },
    };

    // Set click event
    scrivito.on('content', function() {
      if(scrivito.in_editable_view()) {
        var elems = $(ScrivitoListEditor.selector);
        $.each(elems, function(index, elem) {
          var delimiter = $(elem).data('delimiter') || '|';
          var content = $(elem).data('scrivito-field-type') == 'string' ? $(elem).html().split(delimiter) : $(elem).scrivito('content');
          $(elem).tagEditor({
            initialTags: content,
            delimiter: delimiter,
            forceLowercase: false,
            maxLength: 1000,
            placeholder: 'Enter new value ...',
            onChange: function (field, editor, tags) {
              ScrivitoListEditor.clickFunction(field, tags);
            }
          });
        });
      }
    });
  });

})(jQuery, this);