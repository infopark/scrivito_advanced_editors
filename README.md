# ScrivitoAdvancedEditors

Provides some advanced editors and partials for Scrivito's details views.

## Installation

Add to your gemfile:

    gem 'scrivito_advanced_editors'

Add this line to your application stylesheet manifest:

    *= require scrivito_advanced_editors

Add this line to your JavaScript manifest:

    //= require scrivito_advanced_editors

If you do not need all the features contained in the library, you can specify them individually.

    //= require scrivito_advanced_editors/multi_select_button
    //= require scrivito_advanced_editors/toggle_buttons

    //= require scrivito_advanced_editors/scrivito_tabs
    //= require scrivito_advanced_editors/details_accordion
    //= require scrivito_advanced_editors/color_picker
    //= require scrivito_advanced_editors/create_obj

## Included Editors

- [Scrivito Toggle Button Editor](#toggle_button)
- [Scrivito Multi-Selection Button Editor](#multi_button)
- [Scrivito Textarea Editor](#textarea)

### <a id="toggle_button"></a>Scrivito Toggle Button

This editor changes Scrivito's normal `enum` editor to a toggle button editor.

#### Usage

Activate this editor in your editor selection:

```ruby
scrivito.select_editor(function(element, editor) {
  editor.use("toggle_button_editor");
});
```
Using this editor with `enum` attributes works automatically.

```ruby
# in details view my_class/details
scrivito_tag(:div, @obj, :my_enum_attribute)
```

You can also use this editor with string elements. In this case, just pass the list to the `scrivito_tag` helper:

```ruby
scrivito_tag(:div, @obj, :my_string_attribute, data: {toggle_button_list: ['elem1', 'elem2', 'elem3']})
```

If you require localisation for your editors or want to provide more details to a single button, you can set a data attribute:

```ruby
scrivito_tag(:div, @obj, :my_enum_attribute, data: {toggle_button_caption: {'elem1' => 'caption1', 'elem2' => 'caption2', 'elem3' => 'caption3']})
```

This list does not need to be complete. If you do not provide a caption for an element, the source element is used.

### <a id="multi_button"></a>Scrivito Multi-Selection Button

This editor changes all `multienum` fields to buttons.

#### Usage

Activate this editor in your editor selction:

```ruby
scrivito.select_editor(function(element, editor) {
  editor.use("toggle_multi_select_editor");
});
```

Using this editor with `multienum` attributes works automatically:

```ruby
# in details view my_class/details
scrivito_tag(:div, @obj, :my_enum_attribute)
```

You can also use this editor with string elements. In this case, just pass the list to the `scrivito_tag` helper:

```ruby
scrivito_tag(:div, @obj, :my_string_attribute, data: {multi_select_list: ['elem1', 'elem2', 'elem3']})
```

If you require localisation for your editors or want to provide more details to a single button, you can set a data attribute:

```ruby
scrivito_tag(:div, @obj, :my_string_attribute, data: {multi_select_caption: {'elem1' => 'caption1', 'elem2' => 'caption2', 'elem3' => 'caption3']})
```

This list does not need to be complete. If you do not provide a caption for an element, the source element is used.

## Included Extensions

- [Create New Obj](#new_obj)
- [Inline Help](#inline_help)
- [Tabs](#details_tabs)
- [Accordion](#details_accordion)
- [Color Picker](#color_picker)

### <a id="new_obj"></a>Button for creating a new CMS object

It could be helpful to have a button for creating a new CMS object like a blog post.
To use the script, add a form that uses the `create-obj`  CSS class. Also, add `data-obj-class` and `data-obj-path` as attributes:

```xml
<form class="create-obj" data-obj-class="BlogPost" data-obj-path=@obj.path data-with-date="created_at">
  <button>
    Create a new Blog Post
  </button>
</form>
```

For this simple example, you can also use a partial provided by this gem.

    <%= render "scrivito_advanced_editors/create_obj", obj_class: "BlogPost", obj_path: @obj.path, with_date: "created_at" %>

`with_date` optionally specifies a date attribute.

### <a id="inline_help"></a>View helper for explanations in details views

Some attributes are hard to describe in short. To provide an editor with a more detailed description, you can add alerts to your view. This feature requires `bootstrap` to be enabled in your app.

```html
<div class="alert alert-info">Do it in this way or look here</div>
```

To offer help unobtrusively, a small icon next to the headline can be used. For this, an `abbr` tag is suitable:

```html
<h4>My attribute <abbr title="My long description" class="initialism"></abbr></h4>
```

By default, we render a "?" as content using CSS, but you can change this in accordance with your own styles:

```css
.details-view abbr:after {
  content: " more details"
}
```

Another option is to use `small`:

```html
<h4>My Attribute <small>This is a description for my attribute</small></h4>
```

### <a id="details_tabs"></a>Tab View

The purpose of the tab view is to separate your attributes. This is useful if your object contains many of them, such as meta data, data for different devices, and so on.

#### Usage

To utilize the tab view, please add some blocks to your details view.
Use the `active` class to select the initially active panel of the tab list:

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

Using the `inactive` class for a list element removes the click handler and makes the font color brighter. Conditionally enabling and disabling click handlers lets you enable or disable panels depending on the values of other elements.

### <a id="details_accordion"></a>Accordion

The accordion can be used to separate your attributes into groups or hide them if they are too space-consuming.

It is also helpful for rendering a `widgetlist` in a details view. A tab widget could be a good example for this. You can use the accordion view in your panels and render them in details view of the tab widget.

#### Usage

To utilize the accordion, please add some blocks to your details view.

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

First, activate the editor in your editor selection callback:

```ruby
scrivito.select_editor(function(element, editor) {
  editor.use("color_picker");
});
```

To make the color picker available, use `scrivito_tag` and provide it with a color list:

```ruby
<%= scrivito_tag :div, @obj, :background_color, data: {colors_list: ['red', 'green', 'blue']} %>
```

Then specify the CSS for the colors:

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
