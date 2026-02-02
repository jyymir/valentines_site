// 1. Move the interval variable to the very top so EVERY function can see it
let scrollInterval;

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('mySong');
    const btn = document.getElementById('playBtn');
    // Define the timeline variable so the code knows where to scroll to
    const timeline = document.querySelector('.timeline-wrapper');

    if (btn) {
        btn.addEventListener('click', () => {
            console.log("Button was clicked!"); 
            if (audio.paused) {
                audio.play();
                btn.innerHTML = "♡ Pause Music";

                openFullscreen();

                // Optional: Instant smooth jump to the start of timeline
                if(timeline) {

                    timeline.classList.add('revealed');
                    smoothScrollTo(timeline.offsetTop, 2000);
                }

                clearInterval(scrollInterval);

                // Start the slow "Cinema" crawl
                // We wait 1 second (1000ms) so the smooth scroll finishes first
                setTimeout(() => {
            // This part only runs after 5000ms (5 seconds)
            scrollInterval = setInterval(() => {
                window.scrollBy(0, 2); // Your speed setting
            }, 18); 
        }, 5000);

            } else {
                audio.pause();
                btn.innerHTML = "🎵 Play Music";
                clearInterval(scrollInterval);
                closeFullscreen();
            }
        });
    }

function openFullscreen() {
  const elem = document.documentElement; // The whole page
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

    /**
 * Custom Smooth Scroll Function
 * @param {number} target - The Y position to scroll to
 * @param {number} duration - How long the glide should take in ms
 */
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        
        // This math (Ease-In-Out) makes it start slow, go fast, then end slow
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Cubic Easing Function for a "Premium" feel
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

    // 2. Timeline Progress Line Logic
    window.addEventListener('scroll', () => {
        const line = document.querySelector('.timeline-progress-line');
        const wrapper = document.querySelector('.timeline-wrapper');
        
        if (!line || !wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        let scrollDistance = -rect.top + (windowHeight / 2);
        let progress = (scrollDistance / rect.height) * 100;

        if (progress < 0) progress = 0;
        if (progress > 100) progress = 100;

        line.style.height = progress + "%";
    });

    // 3. Intersection Observer for Pop-up
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                const vid = entry.target.querySelector('video');
                if (vid) vid.play();
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
});

// 4. Stop scrolling if the user interacts (Fixed Scope)
window.addEventListener('wheel', () => {
    clearInterval(scrollInterval);
});
window.addEventListener('touchmove', () => {
    clearInterval(scrollInterval);
});

window.onscroll = function() { updateProgressBar() };

function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  const progressBar = document.getElementById("myBar");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
}

