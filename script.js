const cards = [...document.querySelectorAll(".card")];

const filters = [...document.querySelectorAll(".filter")];

const lightbox = document.getElementById("lightbox");

const previewImage =
    document.getElementById("previewImage");

const previewTitle =
    document.getElementById("previewTitle");

const closeButton =
    document.getElementById("close");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");


let activeImages = [];

let selectedIndex = 0;


/* --------------------------------
   GET CURRENT VISIBLE IMAGES
-------------------------------- */

function refreshImages() {

    activeImages =
        cards.filter(card =>
            card.style.display !== "none"
        );

}


/* --------------------------------
   FILTER IMAGES
-------------------------------- */

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {

            item.classList.remove("active");

        });


        filter.classList.add("active");


        const selectedCategory =
            filter.dataset.filter;


        cards.forEach(card => {

            const category =
                card.dataset.category;


            const shouldShow =
                selectedCategory === "all" ||
                category === selectedCategory;


            card.style.display =
                shouldShow ? "block" : "none";

        });


        refreshImages();

    });

});


/* --------------------------------
   OPEN IMAGE
-------------------------------- */

cards.forEach(card => {

    card.addEventListener("click", () => {

        refreshImages();

        selectedIndex =
            activeImages.indexOf(card);

        openPreview();

    });

});


function openPreview() {

    const currentCard =
        activeImages[selectedIndex];


    const image =
        currentCard.querySelector("img");


    const title =
        currentCard.querySelector("h2");


    previewImage.src =
        image.src;


    previewImage.alt =
        image.alt;


    previewTitle.textContent =
        title.textContent;


    lightbox.classList.add("show");

}


/* --------------------------------
   CLOSE LIGHTBOX
-------------------------------- */

function closePreview() {

    lightbox.classList.remove("show");

}


closeButton.addEventListener(
    "click",
    closePreview
);


/* --------------------------------
   NEXT IMAGE
-------------------------------- */

function showNext() {

    selectedIndex =
        (selectedIndex + 1)
        % activeImages.length;

    openPreview();

}


nextButton.addEventListener(
    "click",
    showNext
);


/* --------------------------------
   PREVIOUS IMAGE
-------------------------------- */

function showPrevious() {

    selectedIndex--;

    if (selectedIndex < 0) {

        selectedIndex =
            activeImages.length - 1;

    }

    openPreview();

}


previousButton.addEventListener(
    "click",
    showPrevious
);


/* --------------------------------
   CLICK OUTSIDE IMAGE
-------------------------------- */

lightbox.addEventListener(
    "click",
    (event) => {

        if (event.target === lightbox) {

            closePreview();

        }

    }
);


/* --------------------------------
   KEYBOARD CONTROLS
-------------------------------- */

document.addEventListener(
    "keydown",
    (event) => {

        if (!lightbox.classList.contains("show")) {

            return;

        }


        if (event.key === "ArrowRight") {

            showNext();

        }


        if (event.key === "ArrowLeft") {

            showPrevious();

        }


        if (event.key === "Escape") {

            closePreview();

        }

    }
);


/* Initial setup */

refreshImages();
