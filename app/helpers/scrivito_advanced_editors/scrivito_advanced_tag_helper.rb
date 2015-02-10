module ScrivitoAdvancedEditors
  module ScrivitoAdvancedTagHelper

    def scrivito_toggle_button_editor(obj, attribute, list=nil)
      list = enum_list(obj, attribute) if list.nil?
      if block_given?
        list.map { |elem| yield(elem) }.join('').html_safe
      else
        list.map { |elem| fallback_toggle_button(obj, attribute, elem, obj.send(attribute)) }.join('').html_safe
      end
    end

    private
    def fallback_toggle_button(obj, attribute, elem, active)
      scrivito_tag(:button, obj, attribute, class: css_class(elem, active), data: data_attribute(elem)) do
        elem
      end
    end

    def data_attribute(elem)
      {
        editor: 'scrivito-toggle-button',
        content: elem,
      }
    end

    def enum_list
      attribute_definition = object.cms_attribute_definition(attribute_name)
      values = attribute_definition['values']
    end

    def css_class(elem, active)
      elem == active ? 'active' : ''
    end
  end
end
