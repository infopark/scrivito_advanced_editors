module ScrivitoAdvancedEditors
  class Engine < ::Rails::Engine
    isolate_namespace ScrivitoAdvancedEditors

    initializer "scrivito_editors.scrivito_advanced_tag_helper" do
      ActionView::Base.send :include, ScrivitoAdvancedTagHelper
    end
  end
end
