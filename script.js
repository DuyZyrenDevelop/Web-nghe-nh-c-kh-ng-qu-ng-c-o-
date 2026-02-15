let player;
let current = 0;
let isPlaying = false;

const songs = [
  { title: "Hẹn Hò Nhưng Không Yêu - Lofi", id: "Vhqwp2F9cM4" },
  { title: "See Tình - Lofi", id: "R8q8DtMoR9c" },
  { title: "Raining in Saigon", id: "_nUVog8yoGA" }
];

// Load lại bài đang phát khi F5
window.onload = () => {
  const saved = localStorage.getItem("currentSong");
  if (saved !== null) {
    current = parseInt(saved);
  }
};

// YouTube API Ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt', {
    height: '0',
    width: '0',
    videoId: songs[current].id,
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: songs[current].id
    }
  });

  document.getElementById("now").textContent =
    "Đang phát: " + songs[current].title;
}

// Load bài
function loadSong(index) {
  current = index;

  player.loadVideoById({
    videoId: songs[index].id
  });

  document.getElementById("now").textContent =
    "Đang phát: " + songs[index].title;

  localStorage.setItem("currentSong", index);

  isPlaying = true;
  document.getElementById("play").textContent = "⏸";
}

// Play / Pause
document.getElementById("play").onclick = () => {
  if (!player) return;

  if (!isPlaying) {
    player.playVideo();
    isPlaying = true;
    document.getElementById("play").textContent = "⏸";
  } else {
    player.pauseVideo();
    isPlaying = false;
    document.getElementById("play").textContent = "▶";
  }
};

// Next
document.getElementById("next").onclick = () => {
  current = (current + 1) % songs.length;
  loadSong(current);
};

// Prev
document.getElementById("prev").onclick = () => {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
};

// Mở modal
document.getElementById("open-modal").onclick = () => {
  document.getElementById("modal").classList.remove("hidden");
  renderList();
};

// Đóng modal
document.getElementById("close").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
};

// Render danh sách nhạc
function renderList() {
  const list = document.getElementById("song-list");
  list.innerHTML = "";

  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.textContent = song.title;
    div.style.cursor = "pointer";
    div.style.margin = "10px 0";

    div.onclick = () => {
      loadSong(index);
      document.getElementById("modal").classList.add("hidden");
    };

    list.appendChild(div);
  });
}

// Thêm nhạc từ link
document.getElementById("add-btn").onclick = () => {
  const input = document.getElementById("custom-link").value.trim();
  if (!input) return;

  let id = "";

  if (input.includes("youtu.be/")) {
    id = input.split("youtu.be/")[1].split("?")[0];
  } else if (input.includes("v=")) {
    id = input.split("v=")[1].split("&")[0];
  }

  if (id) {
    songs.push({ title: "Nhạc thêm", id });
    loadSong(songs.length - 1);
    document.getElementById("modal").classList.add("hidden");
  } else {
    alert("Link không hợp lệ!");
  }
};
