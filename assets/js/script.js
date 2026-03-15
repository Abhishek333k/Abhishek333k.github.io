$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });
  
// Dynamic OS Theme Controller (Favicon & Header Logo)
function setFavicon() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const favicon = document.getElementById('favicon');
    const headerLogo = document.getElementById('header-logo-img'); // Target the header logo
    
    if (favicon) {
        // Extract the base path (e.g., ./assets/images or ../assets/images)
        let basePath = favicon.href.substring(0, favicon.href.lastIndexOf('/'));
        
        // Determine the correct image file
        let iconName = isDarkMode ? 'favicon_white.png?v=2' : 'favicon_black.png?v=2';
        
        // 1. Update the Browser Tab
        favicon.href = `${basePath}/${iconName}`;
        
        // 2. Update the Header Logo (if it exists on the current page)
        if (headerLogo) {
            headerLogo.src = `${basePath}/${iconName}`;
        }
    }
}

// Execute on load
setFavicon();

// Listen for OS theme changes in real-time
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);

    
    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

   // Formspree Integration Engine
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        
        // Architect Override: Your active Formspree ID
        var formAction = "https://formspree.io/f/mlgpwokd"; 
        
        $.ajax({
            url: formAction,
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function() {
                console.log('SUCCESS!');
                document.getElementById("contact-form").reset();
                alert("Operational Request Transmitted Successfully.");
            },
            error: function() {
                console.log('FAILED...');
                alert("Transmission Failed! Please try again.");
            }
        });
    });

});

// Browser Tab Operations & Dynamic Favicon
document.addEventListener('visibilitychange', function () {
    // Detect OS Theme
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let activeFavicon = isDarkMode ? "assets/images/favicon_white.png" : "assets/images/favicon_black.png";
    
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | M. Abhishek Ramesh";
        $("#favicon").attr("href", activeFavicon);
    } else {
        document.title = "Return to Secure Terminal";
        $("#favicon").attr("href", activeFavicon);
    }
});

// Typed js effect starts
var typed = new Typed(".typing-text", {
    strings: ["Systems Engineering", "Operations Management", "Full-Stack Development", "Cyber Security"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// JSON Fetch Operations
async function fetchData(type = "skills") {
    let response;
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // Initialize tilt on dynamic elements
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    
    // Refresh ScrollReveal on dynamic elements
    srtop.reveal('.work .box', { interval: 200 });
}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// Initial tilt effect starts
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

/* ===== UNIFIED MATERIAL DESIGN SCROLL REVEAL ===== */
const srtop = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 800,
    delay: 100,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    reset: false /* Prevents erratic re-animation when scrolling up */
});

/* SCROLL HOME */
srtop.reveal('.home .content h2', { delay: 100 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 300 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 100, delay: 500 });
srtop.reveal('.home .github', { interval: 100, delay: 600 });
srtop.reveal('.home .telegram', { interval: 100, delay: 700 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 150 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 250 });
srtop.reveal('.about .content .box-container', { delay: 300 });
srtop.reveal('.about .content .resumebtn', { delay: 350 });

/* SCROLL SKILLS */
srtop.reveal('.skills .container', { delay: 150 });
srtop.reveal('.skills .container .bar', { interval: 100, delay: 250 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 150, delay: 150 });

/* SCROLL COURSES & INTERNSHIPS */
srtop.reveal('.courses .course-card', { interval: 150, delay: 150 });

/* SCROLL COMMERCIAL DEPLOYMENTS (Projects) */
srtop.reveal('.work .box', { interval: 150, delay: 150 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 150 });
srtop.reveal('.experience .timeline .container', { interval: 200, delay: 250 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 150 });
srtop.reveal('.contact .container .form-group', { delay: 250 });

/* ===== PARTICLES.JS ENGINE (GOOGLE WORKSPACE THEME) ===== */
if(document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#1a73e8" }, 
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#1a73e8", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });
}
