
//  .-'---`-.
// ,'          `.
// |             \
// |              \
// \           _  \
// ,\  _    ,'-,/-)\
// ( * \ \,' ,' ,'-)
//  `._,)     -',-')
//    \/         ''/
//     )        / /
//    /       ,'-'


$(function() {
	$('#page').on('click', '.code_hider', function(e) {

		$this = $(this);
		
		var $arrow = $this.find('.code_toggle');
		$arrow.toggleClass('open');
		
		var $pre = $this.next('pre');
		$pre.toggleClass('hido');

	});
});