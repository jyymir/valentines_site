document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Select all images inside your media-grid
    document.querySelectorAll('.media-item img').forEach(image => {
        image.onclick = () => {
            lightbox.style.display = 'flex'; // Show the lightbox
            lightboxImg.src = image.src;    // Set the large image source
            
            // Get the text from the <p> tag right next to the image
            const captionText = image.parentElement.querySelector('.photo-note').innerText;
            lightboxCaption.innerText = captionText;
        };
    });

    // Close when clicking the "X"
    closeBtn.onclick = () => {
        lightbox.style.display = 'none';
    };

    // Close when clicking anywhere outside the image
    lightbox.onclick = (e) => {
        if (e.target !== lightboxImg && e.target !== lightboxCaption) {
            lightbox.style.display = 'none';
        }
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const bars = document.querySelectorAll('.bar');

    menu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate the hamburger into an X
        bars[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
        bars[1].style.opacity = navLinks.classList.contains('active') 
            ? '0' : '1';
        bars[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date("2023-06-22");
    const today = new Date();
    const timeDiff = today - startDate;
    const daysTotal = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    const counterElement = document.getElementById("days-counter");
    
    if (counterElement) {
        let count = 0;
        const timer = setInterval(() => {
            if (count < daysTotal) {
                // Adjusting the step so it finishes counting in about 2 seconds
                count += Math.ceil(daysTotal / 40); 
                if (count > daysTotal) count = daysTotal;
                counterElement.innerText = count;
            } else {
                clearInterval(timer);
            }
        }, 30);
    }
});