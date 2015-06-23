(function($, App) {
  'use strict';

  $(function() {
    scrivito.on('content', function(content) {
      $(content).find('[data-scrivito-tab-toggle-details]').on('click', function() {
        var tab_details_link = $(this);
        var tab_details_id = tab_details_link.attr('data-scrivito-tab-toggle-details');
        var tab_details = tab_details_link.parent().find('.scrivito-tab-details-'+tab_details_id);
        tab_details.toggle();
        return false;
      });
    });
  });
})(jQuery, this);