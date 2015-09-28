$(document).ready(function() {
	
	function startScreen() {
		
		var video1 = document.getElementById('video-intro'),
			video2 = document.getElementById('video-main');

		var tl = new TimelineLite(); 	

		tl.delay(3)
		  .to(video1, 1, {opacity:0, visibility:'hidden'})
		  .to( video2, 1, {opacity:1, visibility:'visible'}, '-=2');

	};

	startScreen();

	function Explosion() {

		var videoWrap = document.getElementById('video-explosion');
		var video = document.getElementById('bla');

		// explosion video play
		function play() {
			video.play();
		}
		
		// explosion video appearance	
		this.init = function() {
			
			var tl = new TimelineLite();	
			
			tl
				.to(videoWrap, 0, {opacity: 1, visibility:'visible'})
				.call(play)

		}
		

	};

	function explosionFroward() {
		
		var explosionAnim = new Explosion();

		explosionAnim.init();
	}



	$('#fullpage').fullpage({
		onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);

            //after leaving section 1
            if(index == 1 && direction =='down'){
                
                explosionFroward();

                return false;
            }
        }
	});


});