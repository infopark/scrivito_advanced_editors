module ScrivitoAdvancedEditors
  module ScrivitoAdvancedTagHelper

    def scrivito_multi_select_button_editor(obj, attribute, list=nil)
      if list
        scrivito_tag(:div, obj, attribute, data: {multi_select_list: list})
      else
        scrivito_tag(:div, obj, attribute)
      end
    end

    def scrivito_toggle_button_editor(obj, attribute, list=nil)
      if list
        scrivito_tag(:div, obj, attribute, data: {toggle_list: list})
      else
        scrivito_tag(:div, obj, attribute)
      end
    end

    def scrivito_selectable_color_classes(class_name, attribute)
      colors = if Obj.respond_to?('selectable_color_classes')
        Obj.selectable_color_classes(class_name, attribute)
      else
        fallback_colors
      end

      colors
    end

    private

    def fallback_colors
      ['', 'black', 'gray', 'light-gray', 'red', 'green', 'blue', 'yellow']
    end
  end
end
