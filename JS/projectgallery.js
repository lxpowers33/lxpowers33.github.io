var showing = 1;

function projectshow(i) {
    if (showing!=i) { 
        //update the highlight to over the current project
        $('#image'+i).addClass("highlight");
        $('#image'+showing).removeClass("highlight");

        //calculate how far down the text should appear
        var down = $(window).scrollTop() - $(".row").position().top;
        //don't appear above the top of the div
        down = Math.max(down+10, 0);
        //calculate the initial position for the slide transition
        start = down+40; 
        
        //hide the current shown text with a slide out and fade
        var divout = $('.show');
        divout.animate({
            opacity: '0',
            top: "+=40px"
            }, 200);
        //hide the element completley
        divout.animate({
            height: '0px',
            }, 100);
        //return the div to the starting position
        divout.queue( function() {
            divout.css("transform", 'translateY(0px)');
            // This tells jQuery to continue to the next item in the queue
            $( this ).dequeue();
        });

        //after hide animation completes
        divout.queue( function() {
            $(".show").removeClass("show");
            //find the element to fade in
            var divin = $('#fade-in'+i);
            //transform to the correct start position
            divin.css("transform", 'translateY('+start+'px)');
            //unhide the element
            divin.height('auto')
            //adjust the height of the column div 
            $("#descriptioncol").css("height", divin.height()+down+'px');

            //animation the fade and slide
            divin.animate({
                opacity: '1', 
                top: "-=40px"
                }, "slow");
            //update the classe to show
            divin.addClass('show');
            // This tells jQuery to continue to the next item in the queue
            $( this ).dequeue();
        });
        //update the showing record to current shown
        showing=i;
    }
}

function showabstract(p, i) {
    $('#abstract'+i).slideToggle("slow");
    text = $(p).text();
    console.log(text)
    $(p).text((text == "Show Abstract") ? "Hide Abstract" : "Show Abstract");
}