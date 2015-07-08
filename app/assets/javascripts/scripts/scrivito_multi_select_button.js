(function($, App) {
  'use strict';

  $(function() {

    App.ScrivitoMultiSelectButton = {
      // set selector for Editor
      selector: "[data-editor='scrivito-multi-select-button']",

      // Function that will be called on scrivito load
      initFunction: function() {},

      // set function triggert on click
      clickFunction: function(scrivito_tag) {
        var content = scrivito_tag.data('content');
        //var text = scrivito_tag.scrivito('content');
        var buttons = scrivito_tag.parent().find('button');

        var text = [];
        $.each(buttons, function(index, elem) {
          var button = $(elem);
          if(button.hasClass('active')) text.push(button.data('content'));
        });

        if(scrivito_tag.hasClass('active')) {
          text.splice( text.indexOf(content), 1 );
        } else {
          text.push(content);
        }

        scrivito_tag.toggleClass('active');

        return scrivito_tag.scrivito('save', text);
      },
    };

    // Set click event
    scrivito.on('load', function() {
      if(scrivito.in_editable_view()) {
        return $('body').on('click', ScrivitoMultiSelectButton.selector, function(event) {
          ScrivitoMultiSelectButton.clickFunction($(event.target));
        });
      }
    });
  });

})(jQuery, this);