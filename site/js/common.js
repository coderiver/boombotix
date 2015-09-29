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


	// detect native scroll events for start screen
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


	// scroll magic animations

	$(function () { // wait for document ready
		// init controller
		var controller = new ScrollMagic.Controller({container: ".topper"});

		var playForward = new TimelineMax()
			.to(".animation", 0.001, {opacity:1, visibility:'visible'})
			.to(".animation", 1, {backgroundColor: "red"});

		// build scene
		var scene = new ScrollMagic.Scene({
			offset: 0,
			duration: $('.topper__in').height()
		})
			.addTo(controller)
			.setTween(playForward)
			.setPin(".animation");
	});

	// explosion video play
	function play() {
		document.getElementById('explosion').play();
	}

	// explosion video appearance	
	// var videoWrap = document.getElementById('video-explosion');

	// var explosionInit = new TimelineLite()
	// 	.to(videoWrap, 0, {opacity: 1, visibility:'visible'})
	// 	.call(play)
	// 	.add(function() {
	// 		$('.topper').addClass('is-exploded');
	// 	}, '+=9')

	
	


	// fullpage init

	$('#fullpage').fullpage({
		normalScrollElements: '.topper__in'
	});









});