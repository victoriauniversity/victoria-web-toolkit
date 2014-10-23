dir = File.dirname(__FILE__) # path to this file
# including custom extensions
#require File.join(dir, 'lib', 'custom_extensions.rb')
require File.join(dir, 'www/assets/lib', 'custom_extensions.rb')

# environment
environment = :development

# Set this to the root of your project when deployed:
project_path = "www/assets/" #http://stackoverflow.com/q/17544779/1081234
http_path = "/assets/"
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
#images_path = "../images"
javascripts_dir = "includes"



# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Printing stuff to the command line
# printf('commandline print')

asset_cache_buster :none

compilation_date = Time.now.getutc.to_i.to_s

# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png?' + compilation_date)
    end
  end
end

