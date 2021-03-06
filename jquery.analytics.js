(function($) {
	$.fn.extend({
		analyze : function(options) {

			var defaults = {
				category : location.pathname,
				label : '',
				value : 0
			};
			
			var anchorDefaults = $.extend({}, defaults, {action: 'click'});

			options = $.extend({}, defaults, options);

			return this.each(function(){
				var $this = $(this);

				$this.find('a').each(function(){
					$(this).click(function(){
						var opts = $.extend({}, anchorDefaults, getClickOptions($(this)));
						sendEvent(opts);
					});
				});
			});
		}
	});
	
	var sendEvent = function(opts){
		if( typeof ga == 'undefined' ){
			return;
		}
		ga('send', 'event', opts.category, opts.action, opts.label, opts.value);
	};
		
	var getClickOptions = function($el){
		var label = $el.text();
		label = label || $el.attr('title');
		var action = 'click';
		var href = $el.attr('href');
		var onclick = $el.attr('onclick');
		if( (href == '#' || (typeof href == 'undefined' || href.match(/javascript[ ]*:[ ]*void\(0\).*/))) && onclick ){
			action = 'click : ' + $el.attr('onclick');
		}
		
		var value = 0;
		if( $el.parents('li').length > 0 ){
			var $item = $el.parents('li').first();
			value = $item.siblings().andSelf().index($item);
		}
		else if( $el.parents('tr').length > 0 ){
			var $item = $el.parents('tr').first();
			value = $item.siblings().andSelf().index($item);
		}
		
		return {label : label, action: action, value: value};
	};
	
	$(document).ready(function(){
		$('[data-toggle="analyze"]').each(function(){
			$(this).analyze($(this).data());
		});
	});
}(jQuery));