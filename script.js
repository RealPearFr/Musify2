
const searchInput = document.getElementById("searchInput");
const musicCards = document.querySelectorAll(".music-card");
const genreButtons = document.querySelectorAll(".genre-btn");

let selectedGenre = "All";

// PRETRAŽIVANJE PJESAMA
searchInput.addEventListener("input", function () {
    filterMusic();
});

// ODABIR ŽANRA
genreButtons.forEach(button => {
    button.addEventListener("click", function () {
        genreButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        selectedGenre = this.dataset.genre;

        filterMusic();
    });
});

// FILTRIRANJE PJESAMA
function filterMusic() {
    const searchText = searchInput.value.toLowerCase();

    musicCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const artist = card.querySelector("p").textContent.toLowerCase();
        const genre = card.dataset.genre;

        const matchesSearch =
            title.includes(searchText) || artist.includes(searchText);

        const matchesGenre =
            selectedGenre === "All" || genre === selectedGenre;

        card.style.display =
            matchesSearch && matchesGenre ? "block" : "none";
    });
}

// SPREMANJE PJESAMA KOJE SE SVIĐAJU
document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("liked");

        const icon = this.querySelector("i");

        if (this.classList.contains("liked")) {
            icon.classList.replace("fa-regular", "fa-solid");
        } else {
            icon.classList.replace("fa-solid", "fa-regular");
        }
    });
});

// MUSIC PLAYER
const playButtons = document.querySelectorAll(".play-card");
const mainPlayButton = document.getElementById("playBtn");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

let isPlaying = false;

playButtons.forEach(button => {
    button.addEventListener("click", function () {
        songTitle.textContent = this.dataset.title;
        songArtist.textContent = this.dataset.artist;

        isPlaying = true;
        updatePlayer();
    });
});

mainPlayButton.addEventListener("click", function () {
    isPlaying = !isPlaying;
    updatePlayer();
});

function updatePlayer() {
    const icon = mainPlayButton.querySelector("i");

    if (isPlaying) {
        icon.classList.replace("fa-play", "fa-pause");
    } else {
        icon.classList.replace("fa-pause", "fa-play");
    }
}
