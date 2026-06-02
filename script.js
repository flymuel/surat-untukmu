const audio = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
let isGiftOpened = false;

function createBurst() {
    const emojis = ['🌸', '🌺', '🌹', '✨', '💖'];
    const container = document.getElementById('cover-screen');
    for (let i = 0; i < 15; i++) {
        let flower = document.createElement('div');
        flower.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        flower.classList.add('burst-flower');
        flower.style.left = '50%'; flower.style.top = '50%';
        container.appendChild(flower);
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            flower.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random()*360}deg) scale(${0.5 + Math.random()})`;
            flower.style.opacity = '1';
        }, 10);
    }
}

function openGift() {
    if(isGiftOpened) return;
    isGiftOpened = true;

    // PINDAHKAN AUDIO KE SINI: Harus dieksekusi langsung saat kado diklik
    // Ini adalah kunci agar browser tidak memblokir autoplay-nya
    changeSong('assets/lagu/lagu1.mp3', 'Hanya Untuk-Mu', 'Ten2Five', 'assets/cover/cover1.jpg');

    document.getElementById('gift-icon').style.display = 'none';
    document.getElementById('tap-text').style.display = 'none';
    createBurst(); 
    
    let coverScreen = document.getElementById('cover-screen');
    setTimeout(() => {
        coverScreen.style.opacity = '0';
        setTimeout(() => {
            coverScreen.style.display = 'none';
            let mainContent = document.getElementById('main-content');
            mainContent.style.display = 'block';
            setTimeout(() => { mainContent.style.opacity = '1'; }, 50);
        }, 1000);
    }, 800);
}

function toggleMusic() {
    if(audio.paused) { audio.play(); playPauseBtn.innerText = '⏸'; } 
    else { audio.pause(); playPauseBtn.innerText = '▶'; }
}

function changeSong(songSrc, songTitle, songArtist, coverSrc) {
    audio.src = songSrc; 
    document.getElementById('player-title').innerText = songTitle;
    document.getElementById('player-artist').innerText = songArtist;
    document.getElementById('player-cover').src = coverSrc; 
    audio.play();
    playPauseBtn.innerText = '⏸';
}

audio.addEventListener('timeupdate', () => {
    if(audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});

audio.addEventListener('pause', () => playPauseBtn.innerText = '▶');
audio.addEventListener('play', () => playPauseBtn.innerText = '⏸');

const petalsContainer = document.getElementById('petals-container');
for (let i = 0; i < 35; i++) {
    let petal = document.createElement('div');
    petal.classList.add('petal');
    let size = Math.random() * 8 + 6; 
    petal.style.width = size + 'px'; petal.style.height = size + 'px';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = Math.random() * 6 + 6 + 's';
    petal.style.animationDelay = Math.random() * 7 + 's';
    petalsContainer.appendChild(petal);
}