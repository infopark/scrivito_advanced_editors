(function($, App) {
  'use strict';

  $(function() {

    App.ScrivitoToggleButton = {
      // set selector for Editor
      selector: "[data-editor='scrivito-toggle-button']",
      
      // Function that will be called on scrivito load
      initFunction: function(index, elem) {},
      
      // set function triggert on click
      clickFunction: function(scrivito_tag) {
        var text = scrivito_tag.data('content');

        scrivito_tag.addClass('activated');
        scrivito_tag.siblings().removeClass('activated');

        return scrivito_tag.scrivito('save', text);
      },
    };

    // Set click event
    scrivito.on('load', function() {
      return $('body').on('click', ScrivitoToggleButton.selector, function(event) {
        ScrivitoToggleButton.clickFunction($(event.target));
      });
    });
  });

})(jQuery, this);