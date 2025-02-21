const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const songImage = document.getElementById("song-image");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");

const songs = [
    { title: 'Adhirudha-MassTamilan.mp3', src: './Adhirudha-MassTamilan.dev.mp3', image: 'markantony.png' },
    { title: 'Armadham-MassTamilan.mp3', src: './Armadham.mp3', image: 'aavesham.png' },
    { title: 'Jiloma-MassTamilan.mp3', src: './Jiloma.mp3', image: 'Boys.png' },
    { title: 'Illuminati Aavesham-MassTamilan.mp3', src: './Illuminati Aavesham-(PagalSongs.Com.IN).mp3', image: 'aavesham.png' },
    { title: 'Naa-Ready-MassTamilan.dev.mp3', src: './Naa-Ready-MassTamilan.dev.mp3', image: 'leo.png' }
];

let songIndex = 0;

function loadSong(index) {
    songTitle.innerText = songs[index].title;
    audio.src = songs[index].src;
    songImage.src = songs[index].image;
    progressBar.value = 0;
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause">⏸</i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play">▶</i>';
    }
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime % 60);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
    }
});

audio.addEventListener("loadedmetadata", () => {
    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.floor(audio.duration % 60);
    totalDurationEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
});

prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
});

loadSong(songIndex);
