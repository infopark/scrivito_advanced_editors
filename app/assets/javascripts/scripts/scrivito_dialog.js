(function($, App) {
  'use strict';

  $(function() {
    scrivito.on('content', function(content) {
      $(content).find('[data-scrivito-toggle-details]').on('click', function() {
        var details_link = $(this);
        var details_id = details_link.data('scrivito-toggle-details');
        var details = details_link.parent().find('.scrivito-details-' + details_id);
        details.toggle();
        return false;
      });
    });
  });
})(jQuery, this);