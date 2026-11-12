
(() => {
  // Prevent duplicate music players
  if (window.__birthdayMusicLoaded) return;
  window.__birthdayMusicLoaded = true;

  // Create audio player
  const birthdayMusic = new Audio("assets/birthday-song.mp3");
  birthdayMusic.loop = true;
  birthdayMusic.volume = 0.55;

  // Create floating music button
  const musicButton = document.createElement("button");
  musicButton.innerHTML = "♫ Play Music";
  musicButton.id = "birthdayMusicButton";

  Object.assign(musicButton.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "9999",
    padding: "12px 18px",
    border: "none",
    borderRadius: "30px",
    background: "#ff69b4",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  });

  document.body.appendChild(musicButton);

  let isPlaying = false;

  async function startMusic() {
    try {
      await birthdayMusic.play();
      isPlaying = true;
      musicButton.innerHTML = "♫ Pause Music";
    } catch (error) {
      console.log("Music playback could not start:", error);
    }
  }

  function pauseMusic() {
    birthdayMusic.pause();
    isPlaying = false;
    musicButton.innerHTML = "♫ Play Music";
  }

  // Play / Pause button
  musicButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  });

  // Start music after the first user interaction
  // Browsers usually block automatic audio playback.
  function firstInteraction() {
    if (!isPlaying) {
      startMusic();
    }

    document.removeEventListener("click", firstInteraction);
    document.removeEventListener("touchstart", firstInteraction);
    document.removeEventListener("keydown", firstInteraction);
  }

  document.addEventListener("click", firstInteraction);
  document.addEventListener("touchstart", firstInteraction);
  document.addEventListener("keydown", firstInteraction);

  // Keep existing sound-effect functions untouched.
  window.playTick = window.playTick || function () {};
  window.playKeyClick = window.playKeyClick || function () {};
  window.playMidnightChime = window.playMidnightChime || function () {};
})();
