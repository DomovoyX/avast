$(function() {	
	//меню для низких разрешений
	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-mnu-mobile").slideToggle();
		return false;
	});
	// анимация цифр в секции
	$(".indicators").waypoint(function(){
		$({blurRadius: 5}).animate({blurRadius: 0}, {
			duration: 1200,
			easing: 'swing',
			step: function() {
				$(".indicators-block h3 spans").css({
					"-webkit-filter": "blur("+this.blurRadius+"px)",
					"filter": "blur("+this.blurRadius+"px)"
				});
			}
		});
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
		$(".indicators-block h3 span").each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({ number: tcount,
				easing: 'easeInQuad',
				"font-size": "1.875em",
				numberStep: comma_separator_number_step},
				1200);
		});	
		this.destroy();
	}, {
		offset: '70%'
	});
	//вериткальное выравнивание блока
	$(".services-block p").equalHeights();
	// Replace all SVG images with inline SVG
	$('.img-svg').each(function(){
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}

				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

	});
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});

	Share = {
		vkontakte: function(purl, ptitle, pimg, text) {
			url  = 'http://vkontakte.ru/share.php?';
			url += 'url=http://localhost:3000/' + encodeURIComponent(purl);
			url += '&title=Avast | Бесплатный антивирус';
			url += '&description=' + encodeURIComponent(text);
			url += '&image='       + encodeURIComponent(pimg);
			url += '&noparse=true';
			Share.popup(url);
		},
		odnoklassniki: function(purl, text) {
			url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
			url += '&st.comments=' + encodeURIComponent(text);
			url += '&st._surl='    + encodeURIComponent(purl);
			Share.popup(url);
		},
		facebook: function(purl, ptitle, pimg, text) {
			url  = 'http://www.facebook.com/sharer.php?s=100';
			url += '&p[title]=';
			url += '&p[summary]='   + encodeURIComponent(text);
			url += '&p[url]='       + encodeURIComponent(purl);
			url += '&p[images][0]=' + encodeURIComponent(pimg);
			Share.popup(url);
		},
		twitter: function(purl, ptitle) {
			url  = 'http://twitter.com/share?';
			url += 'text='      + encodeURIComponent(ptitle);
			url += '&url='      + encodeURIComponent(purl);
			url += '&counturl=' + encodeURIComponent(purl);
			Share.popup(url);
		},

		popup: function(url,soc) {
			window.open(url,'','toolbar=0,status=0,width=626,height=436');
		$.post('/social/share', {social:soc, page:url}, function (data){});
		}
	};
});
