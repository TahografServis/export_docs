$(function(){
	$('pre.code').each(function(){
		var txt = $(this).text().length;
		if(txt>10){
			$(this).highlight({
				source:true,
				zebra:true,
				indent:'tabs',
				list:'ol'
			});
		}
	});
	$('td:nth-child(3)').hyphenate('ru');
	$('p').hyphenate('en-us');
});