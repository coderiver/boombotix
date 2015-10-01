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

	//scroll magic animations

	var videoCanvas = document.getElementById('video-explosion');

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
			// $(canv)
			// 	.width($(window).width())
			// 	.height($(window).height());
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

					// if (currentLocation == 0 && delta == 1) {
					// 	$('.video_explosion').removeAttr('style');
					// };
				}
			});
			function setImage(newLocation) {
				context.drawImage(images[newLocation], 0, 0, 1920, 1080);
			}
	}


	$(function () { // wait for document ready
		// init controller
		var controller = new ScrollMagic.Controller();

		var playForward = new TimelineMax()
			.to(videoCanvas, 0.001, {opacity:1, visibility:'visible'})
			.call(explosion);

		// build scene
		var scene = new ScrollMagic.Scene({
			offset: 0
		})
			.addTo(controller)
			.setTween(playForward)
			//.setPin("#video-explosion");
	});

	
	


	//fullpage init

	// $('#fullpage').fullpage({
	// 	normalScrollElements: '.topper'
	// });






});