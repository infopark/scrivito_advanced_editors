# ScrivitoAdvancedEditors

Provides some advanced editors and partials for details views for scrivito.

## Installation

Add to your gemfile

    gem 'scrivito_advanced_editors'

Add this line to your application Stylesheet manifest:

    *= require scrivito_advanced_editors

Add this line to your editing Stylesheet manifest:

    //= require scrivito_advanced_editors

If do not need all contained features, you can add them individually.

## Included Editors

- [Scrivito Toggle Button Editor](#toggle_button)
- [Scrivito String List Editor](#string_list)
- [Scrivito Textarea Editor](#textarea)

### <a id="toggle_button"></a>Scrivito Toggle Button

A helper method that renders buttons by a given list. Click on one to toggle the content.

#### Usage

The easiest is to use the helper method.

```ruby
# List is an array of strings
scrivito_toggle_button_editor(obj, attribute, list)

# If attribute is an enum, no list have to be set
scrivito_toggle_button_editor(obj, attribute)

# List can also be a list of hashes in form
[
  {
    caption: 'Text visible on Button',
    content: 'Text will be saved',
    css, 'css class of button',
    stlye: 'style can be added to button'
  },
  ...
]
```

A block can be set to edit the view of one button. This is usefull if used to select icons or colors.

```ruby
scrivito_toggle_button_editor(obj, attribute, list) do |text|
  scrivito_tag(:button, obj, attribute, class: 'my_css_class', style: 'some_custome_styling', data: {editor: 'scrivito-toggle-button', content: text}) do
    content_tag(:i, '', class: 'fa fa-icon') + text
  end
end
```

### <a id="string_list"></a>String List Editor

This Editor can be used to edit word lists like tags.

#### Usage

Simply specify the editor on scrivito_tag.

    scrivito_tag(:div, obj, attribute, data: {editor: 'scrivito-list-editor'})

The normal delimiter is `|`. If you need a different, add the data atrribute `data-delimiter`.

    scrivito_tag(:div, obj, attribute, data: {editor: 'scrivito-list-editor', delimiter: ','})

### <a id="textarea"></a>Scrivito Textarea Editor

Use this editor if you want to edit longer text but don't want the wysiwyg editor. Example for this could be descriptions in meta datas.

#### Usage

Simply add the editor to scrivito_tag and use `textarea` as tag.

    scrivito_tag(:textarea, obj, attribute, data: {editor: 'scrivito-textarea-editor'})

## Included Extensions

- [Create New Obj](#new_obj)
- [Inline Help](#inline_help)
- [Tabs](#details_tabs)
- [Accordion](#details_accordion)
- [Color Picker](#color_picker)


### <a id="new_obj"></a>Create new Obj Button

It could be helpful to have a button to create a new obj. Like blog posts.
To use the script, add a form with css class `create-obj`. Add data-obj-class and data-obj-path as attributes.

```xml
<form class="create-obj" data-obj-class="BlogPost" data-obj-path=@obj.path data-with-date="created_at">
  <button>
    Create a new Blog Post
  </button>
</form>
```

For this default example you can also use a partial provided by this gem.

    <%= render "scrivito_advanced_editors/create_obj", obj_class: "BlogPost", obj_path: @obj.path, with_date: "created_at" %>

`with_date` specifies a date attribute. The actual date is stored in it.

### <a id="inline_help"></a>View for inline help

Some attributes are hard to describe in a short way. To give your editor a longer description you can add alerts in your view.

```html
<div class="alert alert-info">Do it in this way or look here</div>
```

An unobtrusive way is a small icon next to the headline. You can use an abbr if using bootstrap.

```html
<h4>My attribute <abbr title="My long description" class="initialism"></abbr></h4>
```

In default we render a "?" as content with css. but you can change this by your own style.

```css
.details-view abbr:after {
  content: " more details"
}
```

### <a id="details_tabs"></a>Tab View

The Tab view is to seperate your attributes. This is useful if many of them are defined at the object. This could be meta datas, datas for different devices and so on.
So have a better survey over your params.

#### Usage

You have to add some blocks to your details view.
Set the class `active` to the tab list to select the initial active panel.

```xml
<ul class="tab-list">
  <li data-panel-target="#panel1" class="active">Elem1</li>
  <li data-panel-target="#panel2">Elem2</li>
</ul>

<div class="tab-panels">
  <div class="tab-panel" id="panel1">
    scrivito_tags for panel 1 are here ....
  </div>

  <div class="tab-panel" id="panel2">
    scrivito_tags for panel 2 are here ....
  </div>
</div>
```

### <a id="details_accordion"></a>Accordion

Accordion can be used to seperate your attributes or hide them if they need a lot of space.

It is also helpful if using render widgetlist in details view. A Tab Widget could be a good example for this. Use the Accordion view in your panels and render them in details view of the tab widget.

#### Usage

You have to add some blocks to your details view.

```xml
  <div class="scrivito-title-details">
    <%= scrivito_tag :h4, widget, :title %>
    <%= link_to '(details)', '#', 'data-scrivito-toggle-details' => widget.id %>
    <div class="scrivito-details-<%= widget.id %>">
      ... Content for your panel ...
    </div>
  </div>

  ... next panel ...
```

### <a id="color_picker"></a>Color Picker

An easy color picker using the toggle buttons can be used by adding this line:

```ruby
<%= render 'scrivito_advanced_editors/color_picker', widget: widget, attribute: :attribute %>
```
