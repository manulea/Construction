document.addEventListener("mousemove", (event) => {
    const starsContainer = document.querySelector(".stars");

    // Create a new star
    const star = document.createElement("div");
    star.classList.add("star");

    // Randomize the size of the star
    const size = Math.random() * 10 + 5; // Between 5px and 15px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Position the star near the mouse cursor
    const x = event.clientX + (Math.random() * 100 - 50); // Random offset
    const y = event.clientY + (Math.random() * 100 - 50); // Random offset
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Add the star to the container
    starsContainer.appendChild(star);

    // Remove the star after a short delay
    setTimeout(() => {
        star.remove();
    }, 2000); // Star disappears after 2 seconds
});

document.addEventListener("click", () => {
    const body = document.body;

    // Add a transition for smooth fading
    body.style.transition = "background 3s ease";

    // Change the background gradient to purple
    body.style.background = "linear-gradient(135deg, #6a11cb, #2575fc)";

    // Reset the background to black after 3 seconds
    setTimeout(() => {
        body.style.background = "black";
    }, 3000); // 3000ms = 3 seconds
});

document.addEventListener("click", (event) => {
    const body = document.body;

    // Function to create a single lightning segment
    const createLightningSegment = (x, y, angle) => {
        const segment = document.createElement("div");
        segment.classList.add("lightning-segment");

        // Position and rotate the segment
        segment.style.left = `${x}px`;
        segment.style.top = `${y}px`;
        segment.style.transform = `rotate(${angle}deg)`;

        // Add the segment to the body
        body.appendChild(segment);

        // Remove the segment after the animation ends
        setTimeout(() => {
            segment.remove();
        }, 500); // Match the duration of the CSS animation
    };

    // Starting position of the lightning bolt
    let x = event.clientX;
    let y = 0; // Start from the top of the screen

    // Generate multiple segments to simulate a jagged, forked lightning bolt
    for (let i = 0; i < 5; i++) {
        const angle = Math.random() * 60 - 30; // Random angle between -30 and 30 degrees
        createLightningSegment(x, y, angle);

        // Move the next segment slightly down and to a random horizontal position
        x += Math.random() * 40 - 20; // Random horizontal offset
        y += 50; // Move down by 50px
    }
});

document.addEventListener("click", (event) => {
    const body = document.body;

    // Create the lightning bolt
    const bolt = document.createElement("div");
    bolt.classList.add("lightning-segment");

    // Offset the lightning bolt from the mouse cursor
    const offsetX = 100; // Horizontal offset
    const offsetY = 50;  // Vertical offset

    // Position the lightning bolt relative to the mouse click
    bolt.style.left = `${event.clientX - offsetX}px`; // Offset horizontally
    bolt.style.top = `${event.clientY - offsetY}px`;  // Offset vertically

    // Add the bolt to the body
    body.appendChild(bolt);

    // Remove the bolt after the animation ends
    setTimeout(() => {
        bolt.remove();
    }, 500); // Match the duration of the CSS animation
});

document.addEventListener("click", (event) => {
    const body = document.body;

    // Create the jigsaw piece
    const jigsaw = document.createElement("div");
    jigsaw.classList.add("jigsaw-piece");

    // Position the jigsaw piece at the mouse click location
    const size = 100; // Size of the jigsaw piece
    jigsaw.style.left = `${event.clientX - size / 2}px`; // Center horizontally
    jigsaw.style.top = `${event.clientY - size / 2}px`; // Center vertically

    // Generate a random shape using clip-path
    const randomShape = generateRandomShape();
    jigsaw.style.clipPath = randomShape;

    // Add the jigsaw piece to the body
    body.appendChild(jigsaw);

    // Remove the jigsaw piece after the animation ends
    setTimeout(() => {
        jigsaw.remove();
    }, 1000); // Match the duration of the fade-out animation
});

// Function to generate a random clip-path polygon
function generateRandomShape() {
    const points = [];
    for (let i = 0; i < 6; i++) { // Generate 6 random points
        const x = Math.random() * 100; // Random x-coordinate (0-100%)
        const y = Math.random() * 100; // Random y-coordinate (0-100%)
        points.push(`${x}% ${y}%`);
    }
    return `polygon(${points.join(", ")})`;
}

document.querySelectorAll(".photo-wall img").forEach((img) => {
    img.addEventListener("mousemove", (event) => {
        img.style.left = `${event.clientX + 10}px`; // Position slightly to the right of the cursor
        img.style.top = `${event.clientY + 10}px`; // Position slightly below the cursor
    });

    img.addEventListener("mouseleave", () => {
        img.style.left = ""; // Reset position when the cursor leaves
        img.style.top = ""; // Reset position when the cursor leaves
    });
});

// Select the gallery section
const gallery = document.querySelector("#gallery");

// Add a mousemove event listener to the gallery
gallery.addEventListener("mousemove", (event) => {
    const { clientX, clientY, currentTarget } = event;

    // Get the dimensions of the gallery
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    // Calculate the cursor's position as a percentage of the gallery's dimensions
    const xPercent = ((clientX - left) / width) * 100;
    const yPercent = ((clientY - top) / height) * 100;

    // Update the background gradient based on the cursor's position
    gallery.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #ff7eb3, #ff758c, #ff6a6a)`;
});