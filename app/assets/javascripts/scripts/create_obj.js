$(function() {
  return scrivito.on('content', function() {
    var elements = $('.create_obj');

    return elements.each(function(index, element) {
      var elem = $(element);
      var obj_class = elem.data('obj-class');
      var obj_path = elem.data('obj-path');
      var with_date = elem.data('with-date')

      return elem.on('submit', function() {
        var name = elem.find('input').val();
        var now = new Date();
        var isoDate = now.toISOString().replace(/[^0-9]/g, '');

        var options = {
          _obj_class: obj_class,
          _path: (obj_path + "/") + isoDate,
          title: name || (obj_class + "_" + isoDate)
        }

        if(with_date != "") {
          jQuery.extend({with_date: now}, options)
        }

        return scrivito.create_obj(options).done(function(data) {
          return $('body').trigger("scrivito_reload");
        });
      });
    });
  });
});