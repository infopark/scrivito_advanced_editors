$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "scrivito_advanced_editors/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "scrivito_advanced_editors"
  s.version     = ScrivitoAdvancedEditors::VERSION
  s.authors     = ["Scrivito"]
  s.email       = ['support@scrivito.com']
  s.homepage    = 'https://www.scrivito.com'
  s.summary     = "Advanced Editors and details view extensions for scrivito"
  s.description = "Provides some advanced Editors and details view extensions for scrivito"
  s.license     = "LGPL-3.0"

  s.files = Dir[
    "{app,lib,scrivito}/**/*",
    "LICENSE",
    "Rakefile",
    "README.rdoc"
  ]

  s.add_dependency 'rails'
  s.add_dependency 'scrivito_sdk'
end
