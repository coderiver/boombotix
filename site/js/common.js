$(document).ready(function() {

	$('html, body').animate({
		scrollTop: 0
	}, 0);
	
	// start section

	function startScreen() {
		
		var videoIntro = document.getElementById('video-intro'),
			videoPulse = document.getElementById('video-main'),
			titleWhite = $('.topper__white .h2'),
			titleWhiteBg = $('.topper__white .bg-text'),
			scroll = $('.scroll'),
			topper = $('#topper'),
			blackLogos = $('.topper__logos'),
			blackText = $('.topper__text');


		var tl = new TimelineMax(); 	

		tl.delay(3)
		  .to(videoIntro, 1, {opacity:0})
		  .to(titleWhiteBg, 0.9, {opacity:1}, '-=1')
		  .to(titleWhite, 0.9, {opacity:1}, '-=0.2')
		  .to(videoPulse, 1, {opacity:1}, '-=2')
		  .to(scroll, 0.6, {opacity:1, transform: 'translateY(0)'});

		 //scroll magic animations

		function explosion(){
		 	var totalImages = 666;
		 	var images = new Array();
		 		for(var i = 419; i < totalImages; i = i + 3) {
		 			var filename = 'boombotix_final_22.09_00';
		 			filename += i + '.jpg';
		 			var img = new Image;
		 			img.src = 'img/explosion/' + filename;
		 			images.push(img);
		 		}
		 		var canv = document.getElementById('explosion');
		 		var context = canv.getContext('2d');

		 		var currentLocation = 0;
		 		var maxLocation = images.length - 1;
		 		wescrolledpast = 0;
		 		
		 		window.addEventListener('mousewheel', function(e) {
		 			// ifelse
		 			if(!wescrolledpast){
		 				e.preventDefault();
		 			}
		 			if($(document).scrollTop()<2 && wescrolledpast==1 ){
		 				wescrolledpast = 0;
		 				currentLocation = maxLocation-1;
		 			}
		 			// actual animation
		 			if(currentLocation<maxLocation){wescrolledpast = 0}
		 			else{wescrolledpast = 1;}
		 			if(!wescrolledpast){

		 				var delta = Math.max(-1, Math.min(1, e.wheelDelta));
		 				if(delta == -1) currentLocation += 1;
		 				if(delta == 1) currentLocation -= 1;
		 				if(currentLocation < 0) currentLocation = 0;
		 				if(currentLocation > maxLocation) currentLocation = maxLocation;
		 				setImage(currentLocation);

		 				// hide content from white section
		 				if (currentLocation > 10 && delta == -1) {
			 				var hideTopper = new TimelineMax()
			 					.to(scroll, 0.6, {opacity:0, transform: 'translateY(10px)'})
			 					.to(titleWhite, 0.9, {opacity:0})
								.to(titleWhiteBg, 0.9, {opacity:0});
							
		 				};

		 				// show content from white section
		 				if (currentLocation < 10 && delta == 1) {
		 					var showTopper = new TimelineMax()
		 						.to(scroll, 0.6, {opacity:1, transform: 'translateY(0)'})
		 						.to(titleWhiteBg, 0.9, {opacity:1}, '-=0.5')
								.to(titleWhite, 1, {opacity:1}, '-=0.5');
							
		 				};

		 				// show content from black section
		 				if (currentLocation > (images.length - 10) && delta == -1) {
		 					var showBlack = new TimelineMax()
		 						.to(blackLogos, 0.9, {opacity:1}, '+=1')
								.to(blackText, 1, {opacity:1});
							
		 				};
		 				if (currentLocation < (images.length - 10) && delta == 1) {
		 					var showBlack = new TimelineMax()
		 						.to(blackText, 1, {opacity:0})
		 						.to(blackLogos, 0.9, {opacity:0});
								
							
		 				};
		 			}
		 		});
		 		function setImage(newLocation) {
		 			context.drawImage(images[newLocation], 0, 0, 1920, 1080);
		 		}
		 }


		 // init controller
		 var controller = new ScrollMagic.Controller();
		 
		 var videoCanvas = document.getElementById('video-explosion');

		 var playExplosion = new TimelineMax()
		 	.to(videoCanvas, 0.001, {opacity:1})
		 	.call(explosion);


		 // build scene
		 var intro = new ScrollMagic.Scene({
		 	offset: 0
		 })
		 	.addTo(controller)
		 	.setTween(playExplosion);

	};

	startScreen();

	// sound section

	function sound(){

		var soundWrap = document.getElementById('.sound'),
			bgWhite = $('.bg-white'),
			bgGray = $('.bg-gray'),
			soundTitleBg = $('.sound').find('.title__bg'),
			soundTitle = $('.sound').find('.title .h2'),
			block1 = $('.sound').find('.js-block1'),
			block2 = $('.sound').find('.js-block2'),
			block3 = $('.sound').find('.js-block3'),
			block4 = $('.sound').find('.js-block4'),
			height = $('.sound').height();

		// init controller
		var controllerSound = new ScrollMagic.Controller();

		var playSound = new TimelineMax()
			.to(bgGray, 2, {transform:'rotate(-35deg)'})
			.to(bgWhite, 2, {transform:'rotate(-5deg)'}, '-=1');

		var showSound = new TimelineMax()
			.to(soundTitleBg, 0.8, {opacity:1})
			.to(soundTitle, 0.8, {opacity:1}, '-=0.2')
			.to(block1, 0.3, {opacity:1, transform:'translateY(0)'})
			.to(block2, 0.3, {opacity:1, transform:'translateY(0)'})
			.to(block3, 0.3, {opacity:1, transform:'translateY(0)'});

		// build scene
		var sound = new ScrollMagic.Scene({
			offset: 0,
			triggerElement: soundWrap,
			duration: height
		})
			.addTo(controllerSound)
			.setTween(playSound);

		var soundContent = new ScrollMagic.Scene({
			offset: height/3,
			triggerElement: soundWrap
		})
			.addTo(controllerSound)
			.setTween(showSound);

		var soundRipple = new ScrollMagic.Scene({
			offset: height/2,
			triggerElement: soundWrap,
			duration: height
		})	
			.addTo(controllerSound)
			.on('enter', function(){
				block4.addClass('is-ripple');
			})
			.on('leave', function(){
				block4.removeClass('is-ripple');
			})
	}
	sound();

	// portability
	function portability(){
		var portabilityId = document.getElementById('portability'),
			portability = $('.portability'),
			titleBg = portability.find('.title__bg'),
			title = portability.find('.title .h2'),
			height = portability.height();

		var controllerPortability = new ScrollMagic.Controller();
		
		var showContent = new TimelineMax()
			.to(titleBg, 0.8, {opacity:1})
			.to(title, 0.8, {opacity:1}, '-=0.2');

		var portabilityContent = new ScrollMagic.Scene({
			offset: height/4,
			triggerElement: portabilityId
		})
			.addTo(controllerPortability)
			.setTween(showContent);

	}
	portability();





});