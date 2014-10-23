# Extending the Compass Sprites extension
# Adding function to write out the URL for the generated sprite image.
#
# USE:
# $map: sprite-map("sprite/images/path/*.png");
# sprite-clean-url($map);
#
# OUTPUT:
# "/folder/folder/sprite-file-name.png"
module Compass::SassExtensions::Functions::Sprites
    def sprite_clean_url(map)
        verify_map(map, "sprite-clean-url")
        map.generate

        Sass::Script::String.new("#{map.path}-s#{map.uniqueness_hash}.png")
    end

    Sass::Script::Functions.declare :sprite_clean_url, [:map]
end

# Attempting to make a function to shrink an image
# This way it will only be necessary to create the retina backgrounds, 
# and then automatically generate a sprite for regular displays in a lower resolution
# [FYI: not finished]
module Compass::SassExtensions::Sprites
    class ShrinkSprite < Sass::Script::Literal
        include ImageMethods

        def initialize(path, name, context)
          @path = path
          @name = name
          @images = nil
          @width = nil
          @height = nil
          @engine = nil
          @evaluation_context = context
          validate!
          compute_image_metadata!
        end

        def to_s(kwargs = self.kwargs)
          image_url(self).value
        end

        def modulize
          @modulize ||= Compass::configuration.sprite_engine.to_s.scan(/([^_.]+)/).flatten.map {|chunk| "#{chunk[0].chr.upcase}#{chunk[1..-1]}" }.join
        end
    end
end


require 'sass/tree/visitors/perform'

# Runs SassScript interpolation in the selector,
# and then parses the result into a {Sass::Selector::CommaSequence}.
class Sass::Tree::Visitors::Perform
    def visit_test(node)
        parser = Sass::SCSS::StaticParser.new(run_interp(node.selector), node.filename, node.line)
        node.resolved_selector = parser.parse_selector
        node
    end
end

require 'sass/tree/node'

module Sass::Tree
  # A static node reprenting an `@extend` directive.
  #
  # @see Sass::Tree
  class TestNode < Node
    # The parsed selector after interpolation has been resolved.
    # Only set once {Tree::Visitors::Perform} has been run.
    #
    # @return [Selector::CommaSequence]
    attr_accessor :resolved_selector

    # The CSS selector to extend, interspersed with {Sass::Script::Node}s
    # representing `#{}`-interpolation.
    #
    # @return [Array<String, Sass::Script::Node>]
    attr_accessor :selector

    # @param selector [Array<String, Sass::Script::Node>]
    #   The CSS selector to extend,
    #   interspersed with {Sass::Script::Node}s
    #   representing `#{}`-interpolation.
    def initialize(selector)
      @selector = selector
      super()
    end
  end
end