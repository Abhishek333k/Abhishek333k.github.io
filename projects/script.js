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
   POS GALLERY CONTROLLER
   ========================================= */
const posImages = [
    { src: "../assets/images/projects/pos/pos-1-dashboard.webp", caption: "1. Main Dashboard" },
    { src: "../assets/images/projects/pos/pos-2-billing.webp", caption: "2. POS & Billing (Cart)" },
    { src: "../assets/images/projects/pos/pos-3-products.webp", caption: "3. Product Database" },
    { src: "../assets/images/projects/pos/pos-4-customers.webp", caption: "4. Customer Database" },
    { src: "../assets/images/projects/pos/pos-5-ledger.webp", caption: "5. Ledger / Khata" },
    { src: "../assets/images/projects/pos/pos-6-sales.webp", caption: "6. Sales Reports" },
    { src: "../assets/images/projects/pos/pos-7-analytics.webp", caption: "7. Business Analytics" },
    { src: "../assets/images/projects/pos/pos-8-settings.webp", caption: "8. System Settings (v5.4)" }
];

let currentSlide = 0;
let autoSlideInterval;

function openGallery() {
    const modal = document.getElementById('pos-lightbox');
    modal.classList.add('show');
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    updateGalleryUI();
    
    // Start auto-slider (changes every 3.5 seconds)
    startAutoSlide();
}

function closeGallery() {
    const modal = document.getElementById('pos-lightbox');
    modal.classList.remove('show');
    document.body.style.overflow = "auto";
    
    // Reset zoom and clear interval
    document.getElementById("lightbox-img").classList.remove("zoomed");
    clearInterval(autoSlideInterval);
}

function updateGalleryUI() {
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    
    // Fade out slightly for smooth transition
    img.style.opacity = 0.5;
    
    setTimeout(() => {
        img.src = posImages[currentSlide].src;
        caption.innerText = `${posImages[currentSlide].caption} (${currentSlide + 1} / 8)`;
        img.style.opacity = 1;
    }, 150);
}

function changeSlide(direction) {
    clearInterval(autoSlideInterval); // Stop auto-slide if user manually clicks
    currentSlide += direction;
    
    // Loop around
    if (currentSlide >= posImages.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = posImages.length - 1;
    
    // Reset zoom when changing slides
    document.getElementById("lightbox-img").classList.remove("zoomed");
    updateGalleryUI();
}

function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
        startAutoSlide(); // restarts the timer so it doesn't overlap manual clicks
    }, 3500);
}

function toggleZoom() {
    const img = document.getElementById("lightbox-img");
    img.classList.toggle("zoomed");
    
    // Pause auto-slider while zoomed in
    if(img.classList.contains("zoomed")) {
        clearInterval(autoSlideInterval);
    } else {
        startAutoSlide();
    }
}

// Close modal if user clicks outside the image
document.getElementById('pos-lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeGallery();
});

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
