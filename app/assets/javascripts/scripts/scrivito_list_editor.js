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
        return scrivito_tag.scrivito('save', text.join(delimiter));
      },
    };

    // Set click event
    scrivito.on('content', function() {
      if(scrivito.in_editable_view()) {
        var elems = $(ScrivitoListEditor.selector);
        $.each(elems, function(index, elem) {
          var delimiter = $(elem).data('delimiter') || '|';
          $(elem).tagEditor({
            initialTags: $(elem).html().split(delimiter),
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