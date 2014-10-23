/*
 * Code that isn't used at present, but might come in handy at a later date...
 * 
 * DO NOT INCLUDE THIS FILE!
 */

// var ToggleBlock = function( element ) {
//     this.element = element;
//     this.content_block = element.getElementsByClassName("nav_toggle_block")[0];
//     this.toggle = element.getElementsByClassName("nav_toggle")[0];
//     this.open = false;
//     this.toggle.addEventListener('click', this, false);
//     this.element.addEventListener('transitionend', this, false);
//     this.element.addEventListener('webkitTransitionEnd', this, false);
//     this.element.addEventListener('oTransitionEnd', this, false);
//     this.element.addEventListener('msTransitionEnd', this, false);

//     this.original_height = this.element.offsetHeight;

//     return this;
// }

// ToggleBlock.prototype.handleEvent = function(e) {
//     switch(e.type) {
//         case 'click':
//             this.toggleNav();
//             break;
//         case 'transitionend':
//             this.toggleClasses();
//             break;
//         case 'webkitTransitionEnd':
//             this.toggleClasses();
//             break;
//         case 'oTransitionEnd':
//             this.toggleClasses();
//             break;
//         case 'msTransitionEnd':
//             this.toggleClasses();
//             break;
//     }
// }

// ToggleBlock.prototype.toggleClasses = function(e) {
//     if(this.open) {
//         this.unconstrain();
//     }
// }

// ToggleBlock.prototype.unconstrain = function() {
//     //this.element.className = "toggle open";
//     //this.element.style.height = "";
// }

// ToggleBlock.prototype.constrain = function() {
//     //this.element.className = "toggle";
//     this.element.style.height = "";// this.original_height + "px";
// }

// ToggleBlock.prototype.toggleNav = function(e) {
//     this.slide_height = this.content_block.offsetHeight;
//     if(this.open) {
//         this.constrain();
//     } else {
//         this.element.style.height = this.slide_height + "px";
//     }
//     this.open = !this.open;
// }

/* Not currently required reinstate and adjust if show/hide toggling is needed on section nav w/o page refresh
// Accordion
(function ($) {
    "use strict";
    $.fn.accordionize = function (options) {

        var settings = {
            'slideSpeed': 500
        };

        this.each(function () {
            var $this, speed, link, ul, parent_ul;

            if (options) {
                $.extend(settings, options);
            }

            $this = $(this);
            speed = settings.slideSpeed;
            link = $this.find('a:first');
            ul = $this.find('ul:first');

            if (link.size() > 0 && ul.size() > 0 && (!link.attr('href') || link.attr('href') === '')) {
                parent_ul = $this.parents('ul:first');
                link.click(function () {
                    parent_ul.find('li > ul:visible').not(ul).slideUp(speed);
                    ul.slideToggle(speed);
                    $this.toggleClass("parent");
                    $this.siblings('li').removeClass("parent");
                    return false;
                });
            }
        });
    };
}(jQuery));
*/

//VU.equalHeight = function (group) {
// var tallest = 0;
// group.each(function() {
//     var thisHeight = $(this).height();
//     if(thisHeight > tallest) {
//         tallest = thisHeight;
//     }
// });
// group.height(tallest);
//}