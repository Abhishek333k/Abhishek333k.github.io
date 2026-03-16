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
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Commercial Deployments | M. Abhishek Ramesh";
            $("#favicon").attr("href", "../assets/images/favicon.png");
        }
        else {
            document.title = "Return to Secure Terminal";
            $("#favicon").attr("href", "../assets/images/favhand.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}

/* =========================================
   POS GALLERY CONTROLLER (GOOGLE UX)
   ========================================= */
const posImages = [
    { src: "../assets/images/projects/pos/pos-1-dashboard.webp", caption: "Main Dashboard" },
    { src: "../assets/images/projects/pos/pos-2-billing.webp", caption: "POS & Billing Cart" },
    { src: "../assets/images/projects/pos/pos-3-products.webp", caption: "Product Database" },
    { src: "../assets/images/projects/pos/pos-4-customers.webp", caption: "Customer Database" },
    { src: "../assets/images/projects/pos/pos-5-ledger.webp", caption: "Ledger / Khata" },
    { src: "../assets/images/projects/pos/pos-6-sales.webp", caption: "Sales Reports" },
    { src: "../assets/images/projects/pos/pos-7-analytics.webp", caption: "Business Analytics" },
    { src: "../assets/images/projects/pos/pos-8-settings.webp", caption: "System Settings (v5.4)" }
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
    const counter = document.getElementById("lightbox-counter"); // FIX: Added Counter target
    
    img.style.opacity = 0.5;
    setTimeout(() => {
        img.src = posImages[currentSlide].src; 
        caption.innerText = posImages[currentSlide].caption; 
        if(counter) counter.innerText = `${currentSlide + 1} / ${posImages.length}`; // FIX: Updates Counter
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

/* --- FIX: Google UX Auto-Hide UI on Idle --- */
function resetIdleTimer() {
    const appbar = document.getElementById('lightbox-top-ui');
    const navBtns = document.querySelectorAll('.nav-btn');
    if(!appbar) return;
    
    appbar.classList.remove('ui-hidden');
    navBtns.forEach(btn => btn.classList.remove('ui-hidden'));
    clearTimeout(idleTimer);
    
    if(document.getElementById('pos-lightbox').classList.contains('show')) {
        idleTimer = setTimeout(() => {
            appbar.classList.add('ui-hidden');
            navBtns.forEach(btn => btn.classList.add('ui-hidden'));
        }, 2500);
    }
}
document.getElementById('pos-lightbox').addEventListener('mousemove', resetIdleTimer);
document.getElementById('pos-lightbox').addEventListener('touchstart', resetIdleTimer);

// KEEP YOUR showProjects() and getProjects() logic below this exactly as it was.

function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    projects.forEach(project => {
        
        // Architect Logic: Lock the code button if private
        let codeButton = project.links.code === "private" 
            ? `<span class="btn" style="background: #f1f3f4; color: #5f6368; border: 1px solid #dadce0; cursor: not-allowed; box-shadow: none;"><i class="fas fa-lock"></i> Proprietary</span>`
            : `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>`;

        // Architect Logic: Safely route the Gallery click
        let isGallery = project.links.view.includes("openGallery");
        let viewTarget = isGallery ? "" : `target="_blank"`;
        let viewHref = isGallery ? `javascript:void(0)` : project.links.view;
        let viewOnClick = isGallery ? `onclick="openGallery()"` : "";
        let viewButtonText = isGallery
            ? `<i class="fas fa-images"></i> View Gallery`
            : `<i class="fas fa-eye"></i> View Live`;

        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box pulse-hover" style="width: 380px; margin: 1rem">
                <img draggable="false" src="../assets/images/projects/${project.image}.png" alt="project" />
                <div class="content">
                    <div class="tag"><h3>${project.name}</h3></div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${viewHref}" class="btn" ${viewTarget} ${viewOnClick}>${viewButtonText}</a>
                            ${codeButton}
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    });
    projectsContainer.innerHTML = projectsHTML;

    // Isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item', layoutMode: 'fitRows', masonry: { columnWidth: 200 }
    });

    // Filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

getProjects().then(data => {
    showProjects(data);
});
