$(document).ready(function() {
	
	function startScreen() {
		
		var video1 = document.getElementById('video-intro'),
			video2 = document.getElementById('video-main'),
			titleWhite = $('.topper__white .h2'),
			titleWhiteBg = $('.topper__white .bg-text'),
			scroll = $('.scroll'),
			topper = $('#topper');


		var tl = new TimelineMax(); 	

		tl.delay(3)
		  .to(video1, 1, {opacity:0})
		  .to(titleWhiteBg, 0.9, {opacity:1}, '-=1')
		  .to(titleWhite, 0.9, {opacity:1}, '-=0.2')
		  .to( video2, 1, {opacity:1}, '-=2')
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
		 				console.log('at top');
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
								.to(titleWhite, 0.9, {opacity:1}, '-=0.5');
							
		 				};

		 				// show content from black section
		 				if (currentLocation > (images.length - 10) && delta == -1) {
		 					var showTopper = new TimelineMax()
		 						.to(scroll, 0.6, {opacity:1, transform: 'translateY(0)'})
		 						.to(titleWhiteBg, 0.9, {opacity:1})
								.to(titleWhite, 0.9, {opacity:1});
							
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

	







});