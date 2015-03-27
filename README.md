# ScrivitoAdvancedEditors

Provides some advanced Editors and details view extensions for scrivito

## Installation

Add to your gemfile

    gem 'scrivito_advanced_editors'

Add this line to your application Stylesheet manifest:

    *= require scrivito_advanced_editors

Add this line to your editing Stylesheet manifest:

    //= require scrivito_advanced_editors

If do not need all contained features, you can add them individually.

## Prerequisites

For a good look of all elements in details view window surround your view with a block element with css class `details-view`

    <div class="details-view">
      ... your Code ...
    </div>

## Included Editors

### Scrivito Toggle Button

A helper method that renders buttons by a given list. Click on one to toggle the content.

#### Usage

The easiest is to use the helper method.

    scrivito_toggle_button_editor(obj, attribute, list)

*If no list is given, the attribute type have to be an enum.*

A block can be set to edit the view of one button. This is usefull if used to select icons or colors.

```ruby
scrivito_toggle_button_editor(obj, attribute, list) do |text|
  scrivito_tag(:button, obj, attribute, class: 'my_css_class', style: 'some_custome_styling', data: {editor: 'scrivito-toggle-button', content: text}) do
    content_tag(:i, '', class: 'fa fa-icon') + text
  end
end
```

### Slider

### List Editor

This Editor can be used to edit word lists like tags.

#### Usage

Simply specify the editor on scrivito_tag.

    scrivito_tag(:div, obj, attribute, data: {editor: 'scrivito-list-editor'})

The normal delimiter is `|`. If you need a different, add the data atrribute `data-delimiter`.

    scrivito_tag(:div, obj, attribute, data: {editor: 'scrivito-list-editor', delimiter: ','})

### Scrivito Textarea Editor

Use this editor if you want to edit longer text but don't want the wysiwyg editor. Example for this could be descriptions in meta datas.

#### Usage

Simply add the editor to scrivito_tag and use `textarea` as tag.

    scrivito_tag(:textarea, obj, attribute, data: {editor: 'scrivito-textarea-editor'})

## Included Extensions

### Create new Obj Button

It could be helpful to have a button to create a new obj. Like blog posts.
To use the script, add a form with css class `create-obj`. Add data-obj-class and data-obj-path as attributes.

```xml
<form class="create-obj" data-obj-class="BlogPost" data-obj-path=@obj.path>
  <button>
    Create a new Blog Post
  </button>
</form>
```

For this default example you can also use a partial provided by this gem.

    <%= render "scrivito_advanced_editors/create_obj", obj_class: "BlogPost", obj_path: @obj.path %>

In this Version a creatable obj class has to have an attribute named published_at

### View for inline help

Some attributes are hard to describe in a short way. To give your editor a longer description you can add alerts in your view.

    <div class="alert alert-info>Do it in this way or look here</div>

An unobtrusive way is a small icon next to the headline. You can use an abbr if using bootstrap.

    <h4>My attribute <abbr title="My long description" class="initialism"></abbr></h4>

In default we render a "?" as content with css. but you can change this by your own style.

    .details-view abbr:after {
      content: " more details"
    }

For seperation for your cms fields you can add a dom element arround your field. Colors and classes are given by bootstrap.

    <div class="alert alert-info">
      <h4>Attribute name</h4>
      <%= scrivito_tag :div, @obj, :attribute %>
    </div>

### Tab View

The Tab view is to seperate your attributes if there are many at one cms object. This could be meta datas, datas for different devices or so on.
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
