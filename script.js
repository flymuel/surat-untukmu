const audio = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');

const playlist = [
    { src: 'assets/lagu/lagu1.mp3', title: 'Hanya Untuk-Mu', artist: 'Ten2Five', cover: 'assets/cover/cover1.jpg' },
    { src: 'assets/lagu/lagu2.mp3', title: 'Aku Milikmu', artist: 'Dewa19', cover: 'assets/cover/cover2.jpg' },
    { src: 'assets/lagu/lagu3.mp3', title: 'Kangen', artist: 'Dewa19', cover: 'assets/cover/cover3.jpg' },
    { src: 'assets/lagu/lagu4.mp3', title: 'Keabadian', artist: 'Reza Artamevia', cover: 'assets/cover/cover4.jpg' },
    { src: 'assets/lagu/lagu5.mp3', title: 'Sempurna', artist: 'Andra & The Backbone', cover: 'assets/cover/cover5.jpg' }
];

let currentSongIndex = 0; 

function toggleMusic() {
    if(audio.paused) { 
        audio.play(); 
        playPauseBtn.innerText = '⏸'; 
    } else { 
        audio.pause(); 
        playPauseBtn.innerText = '▶'; 
    }
}

function changeSong(songSrc, songTitle, songArtist, coverSrc) {
    audio.src = songSrc; 
    document.getElementById('player-title').innerText = songTitle;
    document.getElementById('player-artist').innerText = songArtist;
    document.getElementById('player-cover').src = coverSrc; 
    audio.play();
    playPauseBtn.innerText = '⏸';

    const foundIndex = playlist.findIndex(song => song.src === songSrc);
    if(foundIndex !== -1) {
        currentSongIndex = foundIndex;
    }
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0; 
    }
    let next = playlist[currentSongIndex];
    changeSong(next.src, next.title, next.artist, next.cover);
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1; 
    }
    let prev = playlist[currentSongIndex];
    changeSong(prev.src, prev.title, prev.artist, prev.cover);
}

audio.addEventListener('timeupdate', () => {
    if(audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});

audio.addEventListener('pause', () => playPauseBtn.innerText = '▶');
audio.addEventListener('play', () => playPauseBtn.innerText = '⏸');

audio.addEventListener('ended', nextSong);
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

function executeOpenGift() {
    if(isGiftOpened) return;
    isGiftOpened = true;

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

const popupOverlay = document.getElementById('popup-overlay');
const popupBox = document.getElementById('popup-box');
const btnNo = document.getElementById('btn-no');

function showPopup() {
    if(isGiftOpened) return;
    popupOverlay.classList.add('show');
    
    document.getElementById('cover-screen').onclick = null;
}

function confirmOpenGift() {
    popupOverlay.classList.remove('show');
    
    executeOpenGift();
}

function moveButton(e) {
    btnNo.style.position = 'absolute';

    const boxWidth = popupBox.clientWidth;
    const boxHeight = popupBox.clientHeight;
    const btnWidth = btnNo.clientWidth;
    const btnHeight = btnNo.clientHeight;

    const maxX = boxWidth - btnWidth - 20;
    const maxY = boxHeight - btnHeight - 20;

    const randomX = Math.floor(Math.random() * maxX) + 10;
    const randomY = Math.floor(Math.random() * maxY) + 10;

    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}

btnNo.addEventListener('mouseover', moveButton);

btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveButton();
});

function nextSection(btn) {
    const currentSection = btn.closest('section');
    const nextSection = currentSection.nextElementSibling;
   
    if (nextSection && nextSection.tagName === 'SECTION') {
        nextSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}