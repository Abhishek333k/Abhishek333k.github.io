// 1. Dynamic OS Theme Controller (Favicon & Header Logo)
function setFavicon() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const favicon = document.getElementById('favicon');
    const headerLogo = document.getElementById('header-logo-img');
    if (favicon) {
        let basePath = favicon.href.substring(0, favicon.href.lastIndexOf('/'));
        let iconName = isDarkMode ? 'favicon_white.png?v=3' : 'favicon_black.png?v=3';
        favicon.href = `${basePath}/${iconName}`;
        if (headerLogo) { headerLogo.src = `${basePath}/${iconName}`; }
    }
}
setFavicon();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | M. Abhishek Ramesh";
        setFavicon();
    } else {
        document.title = "Return to Secure Terminal";
        setFavicon();
    }
});

// 2. Google Material Snackbar (Toast) Controller
function showToast(message, isError = false) {
    const snackbar = document.getElementById("snackbar");
    if (!snackbar) return;
    snackbar.innerText = message;
    if (isError) { snackbar.classList.add("error"); } else { snackbar.classList.remove("error"); }
    snackbar.classList.add("show");
    setTimeout(function(){ snackbar.classList.remove("show"); }, 3500);
}

// 3. Main DOM Operations
$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('active');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('active');
        if ($(window).scrollTop() > 60) {
            $('header').css({ 'box-shadow': '0 1px 2px 0 rgba(60,64,67,0.3)', 'background': '#ffffff' });
            $('#scroll-top').addClass('active');
        } else {
            $('header').css({ 'box-shadow': '0 1px 2px 0 rgba(60,64,67,0.1)', 'background': '#ffffff' });
            $('#scroll-top').removeClass('active');
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

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top, }, 500, 'linear')
    });

    // Formspree API with Toast Alerts
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: "https://formspree.io/f/mlgpwokd",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function() {
                document.getElementById("contact-form").reset();
                showToast("Operational Request Transmitted Successfully.");
            },
            error: function() {
                showToast("Transmission Failed! Please verify data and try again.", true);
            }
        });
    });
});

/* =========================================
   SECURITY PROTOCOL: HTML Sanitizer
   ========================================= */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// 4. JSON Fetch Operations (Skills & Projects)
async function fetchData(type = "skills") {
    let response = type === "skills" ? await fetch("skills.json") : await fetch("./projects/projects.json");
    return await response.json();
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    if(skillsContainer) {
        skills.forEach(skill => {
            let safeName = escapeHTML(skill.name);
            skillHTML += `<div class="bar"><div class="info"><img src=${skill.icon} alt="skill" /><span>${safeName}</span></div></div>`;
        });
        skillsContainer.innerHTML = skillHTML;
    }
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    if(projectsContainer) {
        projects.forEach(project => {
            
            // SECURITY: Sanitize inputs to prevent XSS
            let safeName = escapeHTML(project.name);
            let safeDesc = escapeHTML(project.desc);

            let codeButton = project.links.code === "private" 
                ? `<span class="btn" style="background: #f1f3f4; color: #5f6368; border: 1px solid #dadce0; cursor: not-allowed; box-shadow: none;"><i class="fas fa-lock"></i> Proprietary</span>`
                : `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>`;

            let isGallery = project.links.view.includes("openGallery");
            let viewTarget = isGallery ? "" : `target="_blank"`;
            let viewHref = isGallery ? `javascript:void(0)` : project.links.view;
            let viewOnClick = isGallery ? `onclick="openGallery()"` : "";
            let viewButtonText = isGallery
                ? `<i class="fas fa-images"></i> View Gallery`
                : `<i class="fas fa-eye"></i> View Live`;
            
            let repoPath = window.location.pathname.includes("Abhishek333k.github.io") ? "/Abhishek333k.github.io" : "";

            // FIX: Removed .png hardcode. Added Object-Fit image framing optimization.
            projectHTML += `
            <div class="box pulse-hover" style="border-radius: 8px; overflow: hidden;">
                <img draggable="false" src="${repoPath}/assets/images/projects/${project.image}" alt="${safeName}" onerror="this.src='${repoPath}/assets/images/favicon_black.png'" style="height: 200px; width: 100%; object-fit: cover; object-position: top center;" />
                <div class="content">
                    <div class="tag"><h3>${safeName}</h3></div>
                    <div class="desc">
                        <p>${safeDesc}</p>
                        <div class="btns">
                            <a href="${viewHref}" class="btn" ${viewTarget} ${viewOnClick}>${viewButtonText}</a>
                            ${codeButton}
                        </div>
                    </div>
                </div>
            </div>`;
        });
        projectsContainer.innerHTML = projectHTML;
        
        // Wait briefly for DOM to render, then sync ScrollReveal
        setTimeout(() => { srtop.reveal('.work .box', { interval: 150, delay: 150 }); }, 50);
    }
}

fetchData("skills").then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));

// 5. Typed.js
if(document.querySelector('.typing-text')){
    new Typed(".typing-text", {
        strings: ["Systems Engineering", "Operations Management", "Full-Stack Development", "Cyber Security"],
        loop: true, typeSpeed: 50, backSpeed: 25, backDelay: 500,
    });
}

// 6. Unified Material Design Scroll Reveal
const srtop = ScrollReveal({ origin: 'bottom', distance: '40px', duration: 800, delay: 100, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', reset: false });
srtop.reveal('.home .content h2', { delay: 100 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 300 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .socials a', { interval: 100, delay: 500 });
srtop.reveal('.heading', { delay: 100 });
srtop.reveal('.about .content h3', { delay: 150 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 250 });
srtop.reveal('.about .content .box-container', { delay: 300 });
srtop.reveal('.about .content .resumebtn', { delay: 350 });
srtop.reveal('.skills .container', { delay: 150 });
srtop.reveal('.skills .container .bar', { interval: 100, delay: 250 });
srtop.reveal('.education .box', { interval: 150, delay: 150 });
srtop.reveal('.courses .course-card', { interval: 150, delay: 150 });
srtop.reveal('.experience .timeline', { delay: 150 });
srtop.reveal('.experience .timeline .container', { interval: 200, delay: 250 });
srtop.reveal('.contact .saas-form', { delay: 150 });

// 7. Particles.js Engine
if(document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#1a73e8" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#1a73e8", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none" } },
        "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } } },
        "retina_detect": true
    });
}


/* =========================================
   POS GALLERY CONTROLLER (GOOGLE UX)
   ========================================= */
const posImages = [
    { src: "/assets/images/projects/pos/pos-1-dashboard.webp", caption: "Main Dashboard" },
    { src: "/assets/images/projects/pos/pos-2-billing.webp", caption: "POS & Billing Cart" },
    { src: "/assets/images/projects/pos/pos-3-products.webp", caption: "Product Database" },
    { src: "/assets/images/projects/pos/pos-4-customers.webp", caption: "Customer Database" },
    { src: "/assets/images/projects/pos/pos-5-ledger.webp", caption: "Ledger / Khata" },
    { src: "/assets/images/projects/pos/pos-6-sales.webp", caption: "Sales Reports" },
    { src: "/assets/images/projects/pos/pos-7-analytics.webp", caption: "Business Analytics" },
    { src: "/assets/images/projects/pos/pos-8-settings.webp", caption: "System Settings (v5.4)" }
];

let currentSlide = 0; let autoSlideInterval; let idleTimer;

function openGallery() {
    const modal = document.getElementById('pos-lightbox');
    if(!modal) return; 
    modal.classList.add('show'); document.body.style.overflow = "hidden"; 
    updateGalleryUI(); startAutoSlide(); resetIdleTimer();
}

function closeGallery() {
    const modal = document.getElementById('pos-lightbox');
    modal.classList.remove('show'); document.body.style.overflow = "auto";
    document.getElementById("lightbox-img").classList.remove("zoomed"); 
    clearInterval(autoSlideInterval); clearTimeout(idleTimer);
}

function updateGalleryUI() {
    const img = document.getElementById("lightbox-img"); 
    const caption = document.getElementById("lightbox-caption");
    const counter = document.getElementById("lightbox-counter");
    
    img.style.opacity = 0.5;
    setTimeout(() => {
        let repoPath = window.location.pathname.includes("Abhishek333k.github.io") ? "/Abhishek333k.github.io" : "";
        img.src = repoPath + posImages[currentSlide].src; 
        
        caption.innerText = posImages[currentSlide].caption; 
        if(counter) counter.innerText = `${currentSlide + 1} / ${posImages.length}`;
        img.style.opacity = 1;
    }, 150);
}

function changeSlide(direction) {
    clearInterval(autoSlideInterval); currentSlide += direction;
    if (currentSlide >= posImages.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = posImages.length - 1;
    document.getElementById("lightbox-img").classList.remove("zoomed"); 
    updateGalleryUI(); resetIdleTimer();
}

function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => { changeSlide(1); startAutoSlide(); }, 3500);
}

function toggleZoom() {
    const img = document.getElementById("lightbox-img"); img.classList.toggle("zoomed");
    if(img.classList.contains("zoomed")) { clearInterval(autoSlideInterval); } else { startAutoSlide(); }
    resetIdleTimer();
}

function resetIdleTimer() {
    const appbar = document.getElementById('lightbox-top-ui');
    const navBtns = document.querySelectorAll('.nav-btn');
    if(!appbar) return;
    appbar.classList.remove('ui-hidden'); navBtns.forEach(btn => btn.classList.remove('ui-hidden'));
    clearTimeout(idleTimer);
    if(document.getElementById('pos-lightbox').classList.contains('show')) {
        idleTimer = setTimeout(() => { appbar.classList.add('ui-hidden'); navBtns.forEach(btn => btn.classList.add('ui-hidden')); }, 2500);
    }
}

const lightboxNode = document.getElementById('pos-lightbox');
if(lightboxNode) { lightboxNode.addEventListener('mousemove', resetIdleTimer); lightboxNode.addEventListener('touchstart', resetIdleTimer); }
