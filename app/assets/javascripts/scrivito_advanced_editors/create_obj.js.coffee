$ ->
  scrivito.on 'content', ->
    elements = $('.create_obj')

    elements.each (index, element) ->
      elem = $(element)

      obj_class = elem.data('obj-class')
      obj_path = elem.data('obj-path')


      elem.on 'submit', ->
        name = elem.find('input').val()
        now = new Date()
        isoDate = now.toISOString().replace(/[^0-9]/g, '')

        scrivito
          .create_obj
            _obj_class: obj_class
            _path: "#{obj_path}/" + isoDate
            title: name || "#{obj_class}_#{isoDate}"
            published_at: now
          .done (data) ->
            $('body').trigger("scrivito_reload")
