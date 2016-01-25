/**
 * Created by yqq on 2016.1.14.
 */

window.onload = function() {
    imitate();
    rotateRobot();
    updateSliderControl();
    addSmoothScrolling();

    addScrollingBling();
};

window.onscroll = function(){
    updateSliderControl();
};

//window.scrollByPages(1);

function imitate(){
    TweenMax.fromTo("#react-logo", 2.5,
        //from
        {css: {y: "-20px"}},
        //to
        //repeat:-1 option to repeat animation forever
        //yoyo:option to reverse the animation and return
        //ease:change easing type
        {css: {y: "20px"}, repeat: -1, yoyo: true,ease: Power2.easeInOut}
    );
};

function rotateRobot(){
    var t = new TimelineMax({yoyo:false,repeat:-1,ease: Power2.easeInOut});
    t.to("#android-logo",1,{rotation:"-55deg"})
        .to("#android-logo",1,{rotation:"-35deg"});
}

function updateSliderControl(){
    var links = document.querySelectorAll("#slider-control a");
    //console.log(links);

    for(var i = 0;i < links.length;i++){
        var link = links[i];

        var section = document.querySelector(".section");
        var sectionTop = section.offsetHeight*i;
        var sectionBottom = section.offsetHeight*(i+1);


        //Check if window.scrollY is between the section.
        if(window.scrollY >= sectionTop && window.scrollY < sectionBottom){
            link.className = "active";
        }else{
            link.className = "";
        }
    }
}

function scrollToElement(element){
    var topOfElement = element.offsetTop;

    TweenMax.to(window,1,
        {scrollTo:{y:topOfElement},ease:Power2.easeInOut}

    );
}

function addSmoothScrolling(){
    var links = document.querySelectorAll("#slider-control a");

    for(var i = 0;i < links.length;i++){
        var link = links[i];
        if(typeof link.addEventListener === "function"){
            (function(link){
               link.addEventListener("click",function(evt){
                   evt.preventDefault();
                   var href = link.getAttribute('href');
                   //scrollToElement(document.getElementById(href));
                   //console.log(document.getElementById(href));
                   scrollToElement(document.querySelector(href));
                   //console.log(href);
                   //href = href.substring(1,href.length);
                   //console.log(href);
                   //scrollToElement(document.getElementById(href));
                   //console.log(document.getElementById(href));
                   //console.log(document.querySelector(href));
               });
            })(link);
        }
    }
}

function addScrollingBling(){

    var controller = new ScrollMagic.Controller();

    var fadeOutBackground = new ScrollMagic.Scene({
        triggerElement:"#native",
        triggerHook:"onEnter",
        duration:"100%"
    }).addTo(controller)
        .setTween("#overlay-color",1,{opacity:1});


    var moveIphone = new ScrollMagic.Scene({
        triggerElement: "#native",
        triggerHook: "onEnter",
        duration: "100%"
    }).addTo(controller)
        .setTween("#iphone",1,{width:"50%",y:0});

    var pinIphone = new ScrollMagic.Scene({
        triggerElement: "#native",
        triggerHook: "onLeave",
        duration: "100%"
    }).addTo(controller)
        //.addIndicators({name:"pin iphone"})
        .setPin("#iphone");
}


//var deg360 = 2*Math.PI;
//var start = null;
//
//function draw(time) {
//    // `time` is current time in millisecond
//    if(!start) {
//        start = time;
//    }
//    var second = (time - start) / 1000;
//    var $box = document.getElementById("react-logo");
//
//    // One sine cycle every second.
//    var x = Math.sin(second * deg360) * 100;
//    $box.style.left = x +"px";
//
//    // Redraw in sync with brows
//    // er redraw.
//    requestAnimationFrame(draw);
//}
//requestAnimationFrame(draw);