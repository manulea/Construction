
// Select the photo wall conta=ner
const photoWall = document.querySelector(".photo-wall-container");

// Add stars that follow the mouse cursor
document.addEventListener("mousemove", (event) => {
    // Ensure the stars container exists
    let starsContainer = document.querySelector(".stars");
    if (!starsContainer) {
        starsContainer = document.createElement("div");
        starsContainer.classList.add("stars");
        document.body.appendChild(starsContainer); // Add the container to the body
    }

    // Create a new star
    const star = document.createElement("div");
    star.classList.add("star");

    // Randomize the size and position of the star
    const size = Math.random() * 10 + 5; // Between 5px and 15px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${event.clientX + (Math.random() * 100 - 50)}px`; // Random offset
    star.style.top = `${event.clientY + (Math.random() * 100 - 50)}px`; // Random offset

    // Add the star to the container and remove it after 2 seconds
    starsContainer.appendChild(star);
    setTimeout(() => star.remove(), 2000);
});

// Add lightning effect on click
document.addEventListener("click", (event) => {
    const createLightningSegment = (x, y, angle) => {
        const segment = document.createElement("div");
        segment.classList.add("lightning-segment");
        segment.style.left = `${x}px`;
        segment.style.top = `${y}px`;
        segment.style.transform = `rotate(${angle}deg)`;
        document.body.appendChild(segment);

        // Remove the segment after the animation ends
        setTimeout(() => segment.remove(), 500); // Match the duration of the CSS animation
    };

    // Generate multiple segments for a jagged lightning bolt
    let x = event.clientX;
    let y = 0; // Start from the top of the screen
    for (let i = 0; i < 5; i++) {
        const angle = Math.random() * 60 - 30; // Random angle between -30 and 30 degrees
        createLightningSegment(x, y, angle);
        x += Math.random() * 40 - 20; // Random horizontal offset
        y += 50; // Move down by 50px
    }
});

// Load saved shapes from local storage
const savedJigsawShapes = JSON.parse(localStorage.getItem("jigsawShapes")) || [];

// Add event listener to the "Save Jigsaw Shapes" button
document.getElementById("save-shapes").addEventListener("click", () => {
    // Convert the saved shapes array to a JSON string
    const shapesJSON = JSON.stringify(savedJigsawShapes, null, 2); // Pretty-print with 2 spaces

    // Create a Blob object with the JSON data
    const blob = new Blob([shapesJSON], { type: "application/json" });

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "jigsaw_shapes.json"; // File name for the download
    a.click(); // Trigger the download

    // Clean up the URL object
    URL.revokeObjectURL(a.href);
});

// Add jigsaw piece effect on click
document.addEventListener("click", (event) => {
    const jigsaw = document.createElement("div");
    jigsaw.classList.add("jigsaw-piece");

    // Position the jigsaw piece at the mouse click location
    const size = 100; // Size of the jigsaw piece
    jigsaw.style.left = `${event.pageX - size / 2}px`; // Use pageX for horizontal position
    jigsaw.style.top = `${event.pageY - size / 2}px`; // Use pageY for vertical position

    // Generate a random gradient for the jigsaw piece
    const randomColor1 = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random vibrant color
    const randomColor2 = `hsl(${Math.random() * 360}, 100%, 50%)`; // Another random vibrant color
    jigsaw.style.background = `linear-gradient(45deg, ${randomColor1}, ${randomColor2})`;

    // Generate a random shape for the jigsaw piece
    const shape = generateRandomShape();
    jigsaw.style.clipPath = shape;

    // Save the shape to the array and local storage
    savedJigsawShapes.push(shape);
    localStorage.setItem("jigsawShapes", JSON.stringify(savedJigsawShapes));

    // Add the jigsaw piece to the body and remove it after 1 second
    document.body.appendChild(jigsaw);
    setTimeout(() => jigsaw.remove(), 1000);

    // Log the saved shapes to the console
    console.log("Saved Jigsaw Shapes:", savedJigsawShapes);
});

// Function to generate a random clip-path polygon
function generateRandomShape() {
    const points = Array.from({ length: 6 }, () => {
        const x = Math.random() * 100; // Random x-coordinate (0-100%)
        const y = Math.random() * 100; // Random y-coordinate (0-100%)
        return `${x}% ${y}%`;
    });
    return `polygon(${points.join(", ")})`;
}

// Add hover effect for images in the photo wall
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

// Function to randomly swap two images in the active set
function swapRandomImages() {
    // Select the active set
    const activeSet = document.querySelector(".photo-wall.set.active");

    if (!activeSet) return; // Ensure there is an active set

    // Select all images within the active set
    const images = activeSet.querySelectorAll("img");

    if (images.length < 2) return; // Ensure there are at least two images to swap

    // Select two random images
    const firstIndex = Math.floor(Math.random() * images.length);
    let secondIndex;
    do {
        secondIndex = Math.floor(Math.random() * images.length);
    } while (secondIndex === firstIndex); // Ensure the two indices are different

    const firstImage = images[firstIndex];
    const secondImage = images[secondIndex];

    // Add fade-out effect
    firstImage.style.transition = "opacity 0.5s ease";
    secondImage.style.transition = "opacity 0.5s ease";
    firstImage.style.opacity = "0";
    secondImage.style.opacity = "0";

    // After fade-out, swap positions and fade back in
    setTimeout(() => {
        // Swap the actual DOM positions
        const parent = firstImage.parentNode;
        parent.insertBefore(secondImage, firstImage);

        // Fade back in
        firstImage.style.opacity = "1";
        secondImage.style.opacity = "1";
    }, 500); // Match the duration of the fade-out effect
}

// Set an interval to swap images every 3-5 seconds in the active set
setInterval(() => {
    swapRandomImages();
}, Math.random() * 2000 + 3000); // Random interval between 3-5 seconds

// Carousel Functionality
const sets = document.querySelectorAll(".photo-wall.set"); // Select all sets
const rightArrow = document.querySelector(".carousel-arrow.right-arrow"); // Select the right arrow button

let currentSetIndex = 0; // Track the current set index

// Function to show the current set
function showSet(index) {
    sets.forEach((set, i) => {
        set.classList.toggle("active", i === index); // Show the active set, hide others
    });
}

// Show the first set initially
showSet(currentSetIndex);

// Handle Right Arrow Click
rightArrow.addEventListener("click", () => {
    currentSetIndex = (currentSetIndex + 1) % sets.length; // Move to the next set, loop back to the start
    showSet(currentSetIndex); // Update the visible set
});

// Select the navigation bar and logo
const navbar = document.querySelector("header nav");
const logo = document.querySelector("header .logo");

// Add a scroll event listener
window.addEventListener("scroll", () => {
    // Get the bottom position of the logo relative to the viewport
    const logoBottom = logo.getBoundingClientRect().bottom;

    // Check if the logo is out of view
    if (logoBottom <= 0) {
        // Fade out the navigation bar
        navbar.style.opacity = "0";
        navbar.style.pointerEvents = "none"; // Disable interaction while hidden
    } else {
        // Fade in the navigation bar
        navbar.style.opacity = "1";
        navbar.style.pointerEvents = "auto"; // Enable interaction
    }
});