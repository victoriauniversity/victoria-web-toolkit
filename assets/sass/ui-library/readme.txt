sass/ui-library/

All @mixins and modulized elements - this way we can keep a central library of widgets etc.
I recommend everything here is a mixin and called in the ui-elements.

- sliders
- button mixins
- fluid media container

An example could be sliders. ui-library/_slider.scss would contain the slider base as a mixin:

%slider{
	.slides{
		li{ }
	}
}

ui-elements/_slider.scss would then include that mixin, and adding the overrides needed:

.slider{
	@extend %slider;
}

body.wide .slider{
	width: 100%
}
 



