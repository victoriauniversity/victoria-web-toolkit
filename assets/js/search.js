// Should be set in common.js - this is a fallback
var VU = VU || {};

/* ------------------------------------------------------------------ *
    KB_NAV.hasEvent

    Function to check wether an element has a given event assigned
    ------------------------------------------
    @param: element | jQuery object | Object to test, e.g. $("#my_id")
    @param: eventType | event type | Event type to test for, e.g. "click"
    @returns: boolean
    @author: Frej
    ------------------------------------------
    Example:
    --------

    var hasEvent = KB_NAV.hasEvent($("#my_id"), "click");


/* ------------------------------------------------------------------ */

VU.hasEvent = function( element, eventType ){
    var events = $.data( element.get(0), "events" );
    var hasEvent = false;
    if (typeof(events) !== "undefined"){
        for (var key in events) {
            if( key === eventType){
                hasEvent = true;
            }
        }
    }
    return hasEvent;
};

//------------------------------------------
//  Defining search object
//------------------------------------------

VU.search = function( area, form, input, results, filter, linkText, linkUrl ) {
    this.allResultsText = linkText;
    this.allResultsUrl = form.attr('action') + '?q=';
    this.formActionUrl = form.attr('action') + '?q=';
    this.keyupDelay = 350; // number of ms timeout before calling search function / time to type
    this.$area = area; // container including all search elements - used to exclude body click for closing search results
    this.$form = form; // search form element
    this.$input = input; // search input element
    this.$results = results; // search results container
    this.$filter = filter; // search radio input filter container
    this.keyupMin = 3; // minimum number of characters before using keyup
    this.inputLength = 0; // storing the current input length (hardset to 0 to avoid collision w fake placeholder)
    this.hasResults = false; // wether the results list is showing so it's possible to tab through it
};


//------------------------------------------
//  VU.search.tabResults
//  --------------------
//  Switches "hovered" class on elements in results list according to new index (up/down)
//------------------------------------------

VU.search.prototype.tabResults = function(direction) {
    // direction can be 1 (down) or -1 (up)
    var $results = this.$results.find("ul");
    var numResults = $("li", $results).length;
    var activeIndex = $(".hovered", $results).index();
    var nextIndex = activeIndex + direction;
    if( nextIndex >= 0 && nextIndex < numResults ){
        $(".hovered", $results).removeClass("hovered"); // remove active from old selected
        $("li:eq("+nextIndex+")", $results).addClass("hovered"); // add active to new
    }
};


//------------------------------------------
//  VU.search.resultHover
//  ---------------------
//  Switches "hovered" class on elements in results list on mouseover
//------------------------------------------

VU.search.prototype.resultHover = function() {
    var _scope = this;
    var $results = this.$results.find("li");
    $results.hover(function(){
        if(!$(this).hasClass("hovered")){
            $results.filter(".hovered").removeClass("hovered");
            $(this).addClass("hovered");
        }
    });
};


//------------------------------------------
//  VU.search.openResult
//  --------------------
//  Opens the location of the currently selected item
//------------------------------------------

VU.search.prototype.openResult = function() {
    var activeItem = this.$results.find("li.hovered a").eq(0);
    var url = activeItem.attr("href");
    if(typeof(url) !== "undefined"){
        window.location.href = url;
    }
};


//------------------------------------------
//  VU.search.keydown
//  -----------------
//  Keydown delegator - used for tabbing and opening results
//------------------------------------------

VU.search.prototype.keydown = function(e) {
    // Trapping keydown if results are present
    if( this.hasResults ) {

        var keycode = e.keyCode || e.which;

        if( keycode === 40 ) {          // down arrow
            e.preventDefault();
            this.tabResults(1);
        } else if ( keycode === 38 ) {  // up arrow
            e.preventDefault();
            this.tabResults(-1);
        } else if ( keycode === 13 ) {  // enter
            e.preventDefault();
            this.openResult();
        } else if ( keycode === 27 ) {  // escape
            this.clearSearch();
        } else {
            return; // if none of the keys above, return
        }
    }
};


//------------------------------------------
//  VU.search.keyup
//  ---------------
//  Keyup delegator - used to call a search or clear a search
//------------------------------------------

VU.search.prototype.keyup = function(e) {
    var _scope = this;
    var curInputLength = this.$input.attr("value").length;
    var keycode = e.keyCode || e.which;

    // If not up arrow or down arrow, and the input lenght has changed (i.e. no keys pushed that don't affect input lenght like arrow left/right)
    if(keycode !== 40 && keycode !== 38 && curInputLength !== this.inputLength){ // make sure there's no reaction on arrow keys

        if( curInputLength >= this.keyupMin ){ // check if input is more than x characters
            this.inputLength = curInputLength; // update stored input lenght

            this.delayedSearch();

        } else if( this.hasResults ) {
            this.clearSearch(); // clear search results if input lenght is too short
        }
    }
};


//------------------------------------------
//  VU.search.filter
//  ----------------
//  Re-submits a search when clicking on a radio in the filter
//------------------------------------------

VU.search.prototype.filter = function() {
    var _scope = this;
    this.$filter.find("input:radio[name=type]").click(function(){
        if( _scope.inputLength >= _scope.keyupMin ){
            _scope.delayedSearch();
        }
    });
};


//------------------------------------------
//  VU.search.setLoading
//  --------------------
//  Handles loading behavior
//------------------------------------------

VU.search.prototype.setLoading = function() {
    this.$form.addClass("loading");
};


//------------------------------------------
//  VU.search.removeLoading
//  -----------------------
//  Handles loading behavior
//------------------------------------------

VU.search.prototype.removeLoading = function() {
    this.$form.removeClass("loading");
};


//------------------------------------------
//  VU.search.bodyClickHandler
//  ----------------------------
//  Click handler for body to hide search results
//------------------------------------------

VU.search.prototype.bodyClickHandler = function(action) {
    var _scope = this;
    if(action === "bind"){
        $("body").bind("click", function(e){
            _scope.clearSearch();
            _scope.bodyClickHandler("unbind");
        });
        // Excluding search area from click
        _scope.$area.bind("click", function(e){
            e.stopPropagation();
        });
    } else if( action === "unbind" ){
        if(VU.hasEvent($("body"), "click")){
            $("body").unbind("click");
            _scope.$area.unbind("click");
        }
    }
};



//------------------------------------------
//  VU.search.clearSearch
//  ---------------------
//  Reset search
//------------------------------------------

VU.search.prototype.clearSearch = function() {
    this.hasResults = false;
    this.numResults = null;
    this.$results.hide();
};


//------------------------------------------
//  VU.search.delayedSearch
//  ---------------------
//  Calls search within a timeout to make room for typing/tabbing without sending off a request for every keystroke
//------------------------------------------

VU.search.prototype.delayedSearch = function() {
    var _scope = this;
    if( typeof(this.searchTimeout) !== "undefined" ){ // clear keyup timeout
        clearTimeout(this.searchTimeout);
    }

    // Calling search inside a settimeout so we don't necessarily call it
    // for every keyup, but only after a streak of key strokes.
    this.searchTimeout = setTimeout(function(){
        _scope.doSearch();
    }, this.keyupDelay);
};


//------------------------------------------
//  VU.search.success
//  -----------------
//  Search success function - appending and showing results
//------------------------------------------

VU.search.prototype.success = function(results) {
    this.hasResults = true;
    var searchString = this.$input.attr("value"); // value of search input
    var $resultsContainer = $("<ul class='search_results'>"); // creating ul for search results
    var $allResultsLink = $("<li class='show_all'><a class='button tertiary' href='"+this.allResultsUrl+searchString+"'>"+this.allResultsText+"</a></li>");

    $resultsContainer.append(results).append($allResultsLink);
    this.$results.show().html($resultsContainer); // appending search results

    setTimeout(function(){
        $resultsContainer.addClass("active"); // putting active class on with a slight timeout to animate fade
    }, 50);

    this.bodyClickHandler("bind"); // appending click handler to body
    this.removeLoading(); // remove loading spinner from search field
    this.resultHover(); // initiate hover on search results
};

//------------------------------------------
//  VU.search.init
//  --------------
//  Init search object
//------------------------------------------

VU.search.prototype.init = function() {
    var _scope = this;
    this.$input.keydown(function(e){
        _scope.keydown(e);
    });
    this.$input.keyup(function(e){
        _scope.keyup(e);
    });
    this.filter(); // init filter

    String.prototype.latiniseMacrons = function(){
        var _str = this;
        //accept a lowercase-only subset of macrons from https://www.stat.auckland.ac.nz/~kimihia/unicode-macrons
        var macronsMap = [
            {macron: '\u0101', sub: 'a'},
            {macron: '\u0113', sub: 'e'},
            {macron: '\u012B', sub: 'i'},
            {macron: '\u014D', sub: 'o'},
            {macron: '\u016B', sub: 'u'}
        ];
        for (var i = macronsMap.length; i--;) {
            _str = _str.replace(macronsMap[i].macron, macronsMap[i].sub);
        }
        return _str;
    };
};

//------------------------------------------------------------------------------------
//  VU.search.doSearch
//  ------------------
//  This is where the search request is sent off
//  Please insert ajax magic!!!
//------------------------------------------------------------------------------------

VU.search.prototype.doSearch = function() {
    var _scope = this;

    // Here's some help:
    var searchString = this.$input.attr("value").toLowerCase().latiniseMacrons(); // value of search input
    var filter = this.$filter.find("input:radio[name=type]:checked").val(); // type of search filter: everything/courses/people

    //unnecessary for local lookup:
    // this.setLoading(); // add loading spinner

    var $results = $('#areas-of-expertise').find('li').filter(function() {       

        return $(this).text().toLowerCase().latiniseMacrons().indexOf(searchString) != -1;
    });

    var resultsHTML = '';
    var formActionUrl = this.formActionUrl;
    $results.each(function() {
      resultsHTML += '<li class="result"><a href="' + formActionUrl + $(this).html() + '">' + $(this).html() + '</a></li>\n';
    });


    if (resultsHTML != '') {
      _scope.success(resultsHTML);
    }
/*
    $.ajax({
      url: 'http://new.victoria.ac.nz/tests/autocomplete-results'
    }).done(function(data) {
      _scope.success(data);
    });
*/
/*
    // Faking ajax search
    setTimeout(function(){ // this setTimeout is there to immitate ajax request

        // REMOVE FOR PRODUCTION!!!
        // Please replace this with actual results
        // It needs to just be a list of <li>'s according to the markup in this demo
        var fakeResults = VU.fakeResults;
        // END REMOVE

        // SUCCESS
        _scope.success(fakeResults);

    }, 500);
*/
};

//------------------------------------------------------------------------------------


//------------------------------------------
//  DOCUMENT READY
//------------------------------------------
/*
$(document).ready(function(){
    var searchArea = $(document.getElementById("big_search_wrapper"));
    var searchForm = $(document.getElementById("big_search_form"));
    var searchInput = $(document.getElementById("big_search_query"));
    var searchResults = $(document.getElementById("big_search_results"));
    var searchFilter = $(document.getElementById("big_search_filter"));

    var allResultsText = "View all results";
    var allResultsUrl = "?big_search_query=";

    // Create new search object
    var mainSearch = new VU.search(
        searchArea,
        searchForm,
        searchInput,
        searchResults,
        searchFilter,
        allResultsText,
        allResultsUrl
    );

    mainSearch.init(); // init search

    // REMOVE FOR PRODUCTION!!!
    // Making copy of search result li's for demo purposes
    VU.fakeResults = searchResults.find("ul").html();
    // END REMOVE

});
*/