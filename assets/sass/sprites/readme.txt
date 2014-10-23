sass/images/

New sprites go here.

Steps to create a new sprite:

1)	Create a new image folder in assets/images/sprite-[name]
	The folder should contain 2 subfolders: 
	sprite-[name]/icons/ 
	sprite-[name]/icons-retina/
	The two folders must contain same set of images.

2)	Create a new sprite map in /assets/sass/images/sprite-maps/
	Put the right url references in, and rename variables to fit the new sprite:

	$[name]-sprite: sprite-map('sprite-[name]/icons/*.png',
					$spacing: $sprite-padding,
					$repeat: no-repeat);

	$[name]-sprite-retina: sprite-map('sprite-[name]/icons-retina/*.png',
								$spacing: $sprite-padding*2,
								$repeat: no-repeat);

	@mixin [name]-sprite( $icon, $offset-x:0, $offset-y:0 ){
		@include custom-sprite( $icon, $[name]-sprite, $[name]-sprite-retina, $offset-x, $offset-y );
	}

3)	Import the new sprite map in /assets/sass/images/_sprite-maps.scss

4)	Using the new sprite:

	.my_selector{
		@include [name]-sprite(icon-name);
	}

	icon-name is the name if the image you want to use,
	i.e. if you want to use the image arrow.png, 
	write: @include [name]-sprite(arrow);

	If you want to adjust the image position: @include [name]-sprite(icon-name, -1px, -5px);
