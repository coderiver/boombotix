$(document).ready(function() {
	
	function startScreen() {
		
		var video1 = document.getElementById('video-intro'),
			video2 = document.getElementById('video-main');

		var tl = new TimelineMax(); 	

		tl.delay(3)
		  .to(video1, 1, {opacity:0, visibility:'hidden'})
		  .to( video2, 1, {opacity:1, visibility:'visible'}, '-=2');

	};

	startScreen();


	//detect native scroll events for start screen
	$('.topper').scroll(function(){
		var block = $(this);
		var windowHeight = $('.topper__in').height();
		var blockscroll = block.scrollTop();
		var h = block.height();

		scroll = blockscroll + h;

		if (scroll == windowHeight) {
			$('.topper__in').addClass('is-transformed');
		}
		else {
			$('.topper__in').removeClass('is-transformed');
		}
	});	


	// throttle

	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last,
	      deferTimer;
	  return function () {
	    var context = scope || this;

	    var now = +new Date,
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

	//scroll magic animations


	$(function () { // wait for document ready
		// init controller
		var controller = new ScrollMagic.Controller({container: ".topper"});
		var videoWrap = document.getElementById('video-explosion');

		var playForward = new TimelineMax()
			.to(videoWrap, 0.001, {opacity:1, visibility:'visible'})
			.add(function(){

				$('.topper').on('scroll', throttle(function (event) {
					
					// get video properties
					var video = document.getElementById('explosion'),
						videoDuration = video.duration;

						//console.log(videoDuration);

					// get wrapper properties
					var wrap = $('.topper'),
						scrollable = $('.topper__in').height() - wrap.height();

						//console.log(scrollable);

					// do seeking
					var scrollRatio = $('.topper').scrollTop()/scrollable;

					scrollRatio = scrollRatio.toFixed(3);

					console.log(scrollRatio);

					if(isNaN(scrollRatio)) {
						scrollRatio = 0
					};

					video.currentTime = scrollRatio*videoDuration;

					

				}, 10));

			});

		// build scene
		var scene = new ScrollMagic.Scene({
			offset: 1
		})
			.addTo(controller)
			.setTween(playForward)
			.setPin("#video-explosion");
	});

	
	


	//fullpage init

	$('#fullpage').fullpage({
		//normalScrollElements: '.topper__in'
	});


// $(function() {
//     $(window)
//     .on('scroll', vidProgress);
    
//     function vidProgress() {
//         // Get video properties
//         var $v = document.getElementById('explosion'),
//             duration = $v.duration;
        
//         // Get window properties
//         var $w = $(window),
//             scrollable = $(document).height() - $w.height();
        
//         // Do seeking
//         var scrollRatio = $(document).scrollTop()/scrollable;
//         if(isNaN(scrollRatio)) {scrollRatio = 0};
//         var progress = scrollRatio*duration;
//         console.log(progress);
//         $v.currentTime = progress;
//     };
// });






});