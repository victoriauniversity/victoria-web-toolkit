//------------------------------------------
//  MODULE CONTAINER
//------------------------------------------
var VU = VU || {};


VU.placeholder = function ($this) {
    "use strict";

    if(typeof($this.attr("id")) !== "undefined"){

      var label = $("label[for='"+$this.attr("id")+"']");

      if(typeof(label !== "undefined")){

        var placeholder = label.text();

        label.hide();

        if($this.attr("value") === "" || typeof($this.attr("value")) === "undefined"){
          $this.attr("value", placeholder);
        }

        $this.focus(function(){
          if($this.attr("value") === placeholder){
            $this.attr("value", "")
          }
        });

        $this.blur(function(){
          if($this.attr("value") === ""){
            $this.attr("value", placeholder);
          }
        });
      }

    }
};



//------------------------------------------
//  Image slider function
//------------------------------------------

VU.slider = function ($slider) {
    "use strict";

    //var $slides = $slider.find('li'), 
	// changed to only use direct list items of top level slider list 
    var $slides = $slider.children('ul').children("li"),
        $nextButton = $slider.find('.slider_next'),
        $prevButton = $slider.find('.slider_prev'),
        $nav = $slider.find('.slider_nav'),
        $nav_items = null,
        current = 0,
        numSlides = $slides.length - 1; 

    if ($nav !== 'undefined') {
        $nav_items = $nav.find('li > a');
    }

    function slideTo(target) {
        if (target < 0) {
            target = numSlides + target + 1;
        }
        if (target > numSlides) {
            target = target - numSlides - 1;
        }

        function updateElements(group) {
            group.filter('.active').removeClass('active');
            group.eq(target).addClass('active');
        }

        updateElements($slides);
        if ($nav_items) {
            updateElements($nav_items);
        }

        current = target;
    }

    if ($nextButton !== 'undefined') {
        $nextButton.click(function (e) {
            e.preventDefault();
            slideTo(current + 1);
        });
    }

    if ($prevButton !== 'undefined') {
        $prevButton.click(function (e) {
            e.preventDefault();
            slideTo(current - 1);
        });
    }

    if ($nav_items) {
        $.each($nav_items, function (i) {
            $(this).click(function (e) {
                e.preventDefault();
                slideTo(i);
            });
        });
    }

    // Initiate first slide
    slideTo(0);
	

};

VU.touchSwipes = [];



 // jQuery(function($){
 //    var size = 4,
 //        $ul  = $(".multi_column"),
 //        $lis = $ul.children().filter(':gt(' + (size - 1) + ')'),
 //        loop = Math.ceil($lis.length / size),
 //        i    = 0;

 //    $ul.addClass('multi_column').wrap("<div style='overflow: hidden'></div>");

 //    for(; i < loop; i = i + 1){
 //      $ul = $("<ul />").addClass('multi_column').append($lis.slice(i * size, (i * size) + 4)).insertAfter($ul);
 //    }
 //  });



//------------------------------------------
//  Main initialisation function
//------------------------------------------

VU.init = function () {
    "use strict";

    // We have JavaScript.
    $(document.documentElement).removeClass('no-js');

    // Init search
    // VU.search();

    $('body').on('click', '.alert .close', function () {
        $(this).parents('.alert').addClass('dismissed');
        $('html').removeClass('alert_active');
    });

    // Enable placeholder
    $('.field_placeholder').each(function () {
        VU.placeholder($(this));
    });

    //Add a mask to cover the main page elements when mobile nav is open
    $('footer.site_footer').after("<div class='mask'></div>");

        //Add a mask to cover the main page elements when mobile nav is open
    $('#page').append("<div class='section_mask'></div>");


    // Add active class to show mobile menu
    $('.toggle_menu').click(function (event) {
        $("html").toggleClass("nav_closed");
        $('#wrapper').addClass('animated');
        $('#wrapper').toggleClass('active');
        $('#std_search_query').blur();
        event.preventDefault();
    });

        // Add active class to show mobile menu
    $('.nav_closed .toggle_search').click(function (event) {
        $("html").toggleClass("nav_closed");
        $('#wrapper').removeClass('animated');
        $('#wrapper').toggleClass('active');
        $('#std_search_query').focus();
        event.preventDefault();
    });


    // When clicking on .container, make sure the menu is closed
    $(".mask").click(function () {
        $('#wrapper').addClass("animated");
        $('#wrapper').removeClass("active");
        $("html").toggleClass("nav_closed");
        $('#std_search_query').blur();
    });

    // Clicking on the page mask when the section menu is open closes it
    $(".section_mask").click(function () {
        $("html").removeClass("menu_open");
        $("#menu_toggle").toggleClass("active");
    });

    // Hide mobile menu after close animation
    $("#wrapper").bind("transitionend webkitTransitionEnd oTransitionEnd msTransitionEnd", function () {
        if ($(this).hasClass("active") === false) {
            $("html").addClass("nav_closed");
        }
    });

    // A link click in the menu will hide the menu for mobiles
    $("#main_nav_wrap a").click(function () {
        var $this = $(this),
            href = $this.attr("href");
        // Don't do this for phone number or email links
        if (href.substr(0, 4) !== "tel:" && href.substr(0, 7) !== "mailto:") {
            $("#main_nav_wrap").addClass("nav_closed");
        }
    });

    // Toggle classes on mobile menu etc.
    $('.toggle').click(function (event) {
		// Added condition to prevent toggle from closing on itself
        if ($(event.target).closest('.toggle_block').length) return;
		var $this = $(this);
		$this
			.toggleClass('active')
			.children('.toggle_block').toggleClass('active').end()
			.next('.toggle_block').toggleClass('active');
		// Put a class on the body to show that the main menu is open
		if ($this.attr("id") === "menu_toggle") {
			if ($this.hasClass("active")) {
				$("html").addClass("menu_open");
			} else {
				$("html").removeClass("menu_open");
			}
		}
		event.preventDefault();
    });

    /*
     * Tabs
     */

    // activate first tab
    $("ul.tabs").find("li:first").addClass("active");

    // show first tab content
    $(".tab_container").find(".tab_content:first").removeClass("js_hide");

    // onclick event
    $("ul.tabs li").click(function (event) {

        var $t = $(this),
            // find the href attribute value to identify the active tab + content
            activeTab = $($t.find("a").attr("href"));

        if (activeTab.size() > 0) {

            $t
                // strip active from li's
                .parent("ul")
                .find("li")
                .removeClass("active")
                .end()
                .end()
                // add "active" class to selected tab
                .addClass("active")
                // hide all tab content
                .parent("ul")
                .next(".tab_container")
                .find(".tab_content")
                .addClass("js_hide");

            // fade in the active ID content
            activeTab.removeClass("js_hide").fadeOut(0).fadeIn();

        }

        event.preventDefault();

    });

    // Enable image sliders
    $('.slider').each(function () {
        VU.slider($(this));
    });


    //Make embeds and iframes stretchy
    
    $('object, iframe, embed', document.getElementById("page"))
        .not('.twitter-follow-button')
        .wrap('<div class="media stretchy_embed" />')
        .each(function () {
            var t = $(this),
                width = t.attr('width') || t.width(),
                height = t.attr('height') || t.height(),
                ratio = (height / width) * 100;
            t.parent().css('padding-top', ratio + '%');
        });
    
		
	// When a link with the class 'show_more' appears on the page, hide all but 5 of the list items in the unordered list which
	// immediately preceeds the link. Then show / hide the list items when the link is clicked.
	$('a.show_more').prev('ul').children('li').slice(5).hide();

	$('a.show_more').click(function() {

	if ($(this).hasClass('opened')) {
	  $(this).prev('ul').children('li').slice(5).fadeOut();
	  $(this).removeClass('opened').addClass('closed');
	  $(this).text('Show more');
	} else {
	  $(this).prev('ul').children('li').fadeIn();
	  $(this).removeClass('closed').addClass('opened');
	  $(this).text('Show less');
	}
	});	
	
	// Auto submit control for widget forms
    $('body').on('change', '.auto_submit select.as_trigger', function(e){
       if(this.value == "") return false; // don't redirect the empty option
       $(this).closest('.auto_submit').submit();
    });


    //Google analytics for homepage tiles
    var gaClickFunction = function trackTileClicks(e) {
        var $e = $(this);
        var category = $e.data("gacategory"),
            action = $e.data("gaaction"),
            label = $e.data("galabel");

        _gaq.push(['_trackEvent', category, action, label]);
    };

    //Do the GA tracking
    $("a.info_block").on('click', gaClickFunction);
    $("a.hero-image").on('click', gaClickFunction);
    $("#hero").on('click', gaClickFunction);		

};

//------------------------------------------
//  On your marks, get set....go!
//------------------------------------------

$(document)
    .ready(function () {
        "use strict";
        VU.init();

    });
