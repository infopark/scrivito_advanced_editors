module ScrivitoAdvancedEditors
  module ScrivitoAdvancedTagHelper

    def scrivito_toggle_button_editor(obj, attribute, list=nil)
      list = enum_list(obj, attribute) if list.nil?

      buttons = if block_given?
        list.map { |elem| yield(elem) }.join('').html_safe
      else
        list.map { |elem| fallback_toggle_button(obj, attribute, elem, obj.send(attribute)) }.join('').html_safe
      end

      content_tag :div, buttons, class: 'button_list'
    end

    def scrivito_selectable_color_classes(class_name, attribute)
      colors = if Obj.respond_to?('selectable_color_classes')
        Obj.selectable_color_classes(class_name, attribute)
      else
        fallback_colors
      end

      colors.map { |color| color_hash(color) }
    end

    private

    def fallback_colors
      ['','transparent', 'black', 'gray', 'light-gray', 'red', 'green', 'blue', 'yellow']
    end

    def fallback_toggle_button(obj, attribute, elem, active)
      content = elem.is_a?(Hash) ? elem : content_hash(elem)
      scrivito_tag(:button, obj, attribute, class: (css_class(elem, active) + content[:css]), style: content[:style], data: data_attribute(content)) do
        content[:caption]
      end
    end

    def content_hash(elem)
      {
        content: elem,
        caption: (elem.present? ? elem.to_s : 'none'),
        style: '',
        css: ''
      }
    end

    def color_hash(color)
      {
        content: color,
        caption: (color.present? ? color : 'no selection'),
        style: '',
        css: color,
      }
    end

    def data_attribute(elem)
      {
        editor: 'scrivito-toggle-button',
        content: elem[:content],
      }
    end

    def enum_list(obj, attribute)
      obj.attribute_definitions[attribute].values
    end

    def css_class(elem, active)
      elem.to_s == active ? 'active' : ''
    end
  end
end
