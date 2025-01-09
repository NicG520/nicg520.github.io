// Lista de músicas
const songs = [
    {
        title: "Enchanted",
        artist: "Taylor Swift",
        src: "Songs/1.mp3",
        cover: "Images/song1.png",
    },
    {
        title: "Um Amor Puro",
        artist: "Djavan",
        src: "Songs/2.mp3",
        cover: "Images/song2.png",
    },
    {
        title: "Friday I'm In Love",
        artist: "The Cure",
        src: "Songs/3.mp3",
        cover: "Images/song3.png",
    },
    {
        title: "Quando Bate Aquela Saudade",
        artist: "Rubel",
        src: "Songs/4.mp3",
        cover: "Images/song4.png",
    },
    {
        title: "Por Você",
        artist: "Barão Vermelho",
        src: "Songs/5.mp3",
        cover: "Images/song5.png",
    },
    {
        title: "Paper Rings",
        artist: "Taylor Swift",
        src: "Songs/6.mp3",
        cover: "Images/song6.png",
    },
    {
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        src: "Songs/7.mp3",
        cover: "Images/song7.png",
    },
    {
        title: "Sanctuary",
        artist: "Joji",
        src: "Songs/8.mp3",
        cover: "Images/song8.png",
    },
    {
        title: "Fico Assim Sem Você",
        artist: "Claudinho & Buchecha",
        src: "Songs/9.mp3",
        cover: "Images/song9.png",
    },
    {
        title: "Será Que É Amor",
        artist: "Arlindo Cruz",
        src: "Songs/10.mp3",
        cover: "Images/song10.png",
    }
];

  
  // Elementos DOM
  const audio = document.getElementById("audio");
  const title = document.querySelector(".song-title");
  const artist = document.querySelector(".song-artist");
  const cover = document.querySelector(".cover");
  const playPauseBtn = document.getElementById("play-pause");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progress = document.getElementById("progress");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  
  // Variáveis de estado
  let currentSongIndex = 0;
  let isPlaying = false;
  
  function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title; // Atualiza o título
    artist.textContent = song.artist; // Atualiza o artista

    // Atualiza a capa
    cover.src = song.cover;

    // Atualiza o áudio
    audio.src = song.src;
}

  // Função para tocar a música
  function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause" style="color: #ffffff;"></i>'; // Ícone de pausa
  }
  
  // Função para pausar a música
  function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play" style="color: #ffffff;"></i>'; // Ícone de play
  }
  
  // Alternar entre play/pause
  function togglePlayPause() {
    isPlaying ? pauseSong() : playSong();
  }
  
  // Função para ir para a música anterior
  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
  }
  
  // Função para ir para a próxima música
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
  }
  
  // Atualizar a barra de progresso e tempos
  function updateProgress() {
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    }
  }
  
  // Atualizar o tempo ao mover a barra de progresso
  function setProgress(e) {
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
  }

  
  // Formatar tempo em minutos e segundos
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  
  // Eventos
  playPauseBtn.addEventListener("click", togglePlayPause);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  audio.addEventListener("timeupdate", updateProgress);
  progress.addEventListener("input", setProgress);
  
  // **Inicializar com os dados da primeira música**
  loadSong(currentSongIndex);
  