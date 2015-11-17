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
- [Scrivito Multi Select Button Editor](#multi_button)
- [Scrivito Textarea Editor](#textarea)

### <a id="toggle_button"></a>Scrivito Toggle Button

This editor changes the normal enum editor of scrivito to a toggle button editor.

#### Usage

Activate this Editor in your editor selction.

```ruby
scrivito.select_editor(function(element, editor) {
  editor.use("toggle_button_editor");
});
```
Using this Editor with enum attributes will work automaticly.

```ruby
# in details view my_class/details
scrivito_tag(:div, @obj, :my_enum_attribute)
```

You can also use this Editor with string elements. In this case, you have to give the list to the scrivito_tag.

```ruby
scrivito_tag(:div, @obj, my_string_attribute, data: {toggle_button_list: ['elem1', 'elem2', 'elem3']})
```

If you need localisation for your editors or want to provide mor information to a single value, you can set an data attribute.

```ruby
scrivito_tag(:div, @obj, my_string_attribute, data: {toggle_button_caption: {'elem1' => 'caption1', 'elem2' => 'caption2', 'elem3' => 'caption3']})
```

This List do not have to bee full. If you do not provide a caption for an element, the element will be used.

### <a id="multi_button"></a>Scrivito Multi Select Button

This editor will change all multienum fields to buttons.

#### Usage

Activate this Editor in your editor selction.

```ruby
scrivito.select_editor(function(element, editor) {
  editor.use("multi_select_editor");
});
```

Using this Editor with multienum attributes will work automaticly.

```ruby
# in details view my_class/details
scrivito_tag(:div, @obj, :my_enum_attribute)
```

You can also use this Editor with string elements. In this case, you have to give the list to the scrivito_tag.

```ruby
scrivito_tag(:div, @obj, my_string_attribute, data: {multi_select_list: ['elem1', 'elem2', 'elem3']})
```

If you need localisation for your editors or want to provide mor information to a single value, you can set an data attribute.

```ruby
scrivito_tag(:div, @obj, my_string_attribute, data: {multi_select_caption: {'elem1' => 'caption1', 'elem2' => 'caption2', 'elem3' => 'caption3']})
```

This List do not have to bee full. If you do not provide a caption for an element, the element will be used.

### <a id="textarea"></a>Scrivito Textarea Editor

Use this editor if you want to edit longer text but don't want the wysiwyg editor. Example for this could be descriptions in meta datas.

#### Usage

Simply add the editor to scrivito_tag.

    scrivito_tag(:div, obj, attribute, data: {editor: 'scrivito-textarea-editor'})

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

An other way is to use `small`.

```html
<h4>My Attribute <small>This is a description for my attribute</small></h4>
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
  <li data-panel-target="#panel3" class="inactive">This is an inactive element</li>
</ul>

<div class="tab-panels">
  <div class="tab-panel" id="panel1">
    scrivito_tags for panel 1 are here ....
  </div>

  <div class="tab-panel" id="panel2">
    scrivito_tags for panel 2 are here ....
  </div>

  <div class="tab-panel" id="panel3">
    scrivito_tags for panel 3 are here ....
  </div>
</div>
```

Setting a list element inactive remove the click handler and make the font color brighter. This can be used to enable or disable panels by the value of other elems.

For example you have an attribute type. Only if this attribute is set to `image` the last panel can be enabled to edit the attributes for this.

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

First, you have to activate the Editor in your editor selection.

```ruby
scrivito.select_editor(function(element, editor) {
  editor.use("color_picker");
});
```

Using the color picker use scrivito_tag and provide a color list to it.

```ruby
<%= scrivito_tag :div, @obj, :background_color, data: {colors_list: ['red', 'green', 'blue']} %>
```

After this, you need the css for the colors.

```ruby
.red {
  background_color: red !important;
}

.green {
  background_color: green !important;
}

// Also more styles can be defined, like text color if background is to dark.
.blue {
  background_color: blue !important;
  color: #fff !important;
}
.blue * { color: #fff; }
```
