$(document).ready(function () {

    // 1. Mobile Menu Toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('active');
    });

    // 2. Active Link Switching on Scroll
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('active');

        if ($(window).scrollTop() > 60) {
            $('header').css({
                'box-shadow': '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
                'background': '#ffffff'
            });
        } else {
            $('header').css({
                'box-shadow': '0 1px 2px 0 rgba(60,64,67,0.1)',
                'background': '#ffffff'
            });
        }

        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // 3. Typed.js Initialization (Dynamic Text)
    var typed = new Typed(".typing-text", {
        strings: ["Systems Engineering", "Operations Management", "Full-Stack Development", "Cyber Security"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    // 4. VanillaTilt.js Initialization (3D Card Hover Effects)
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // 5. ScrollReveal.js Initialization (Slide/Fade in on scroll)
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.home .content h2', { delay: 100 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 300 });

    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .socials a', { interval: 200 });

    srtop.reveal('.about .content', { delay: 200 });
    srtop.reveal('.skills .container', { delay: 200 });
    srtop.reveal('.education .box', { interval: 200 });
    srtop.reveal('.experience .timeline', { delay: 200 });
    srtop.reveal('.work .box', { interval: 200 });

    // 6. Particles.js Initialization (Configured for Google Workspace Light Theme)
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#1a73e8" }, /* Google Blue Particles */
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#1a73e8", /* Google Blue Lines */
                "opacity": 0.4,
                "width": 1
            },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });

});
