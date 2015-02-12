(function($, App) {
  'use strict';

  $(function() {

    App.ScrivitoListEditor = {
      // set selector for Editor
      selector: "[data-editor='scrivito-list-editor']",
      
      // Function that will be called on scrivito load
      initFunction: function() { },
      
      // set function triggert on click
      clickFunction: function(scrivito_tag, text) {
        return scrivito_tag.scrivito('save', text.join(','));
      },
    };

    // Set click event
    scrivito.on('content', function() {
      if(scrivito.in_editable_view()) {
        var elems = $(ScrivitoListEditor.selector);

        $.each(elems, function(index, elem) {
          $(elem).tagEditor({
            initialTags: $(elem).html().split(','),
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