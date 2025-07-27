// /api/telegram.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end("Method Not Allowed");

  const data = req.body;

  // Contoh handle command /menu
  if (data?.message?.text === "/menu") {
    const chatId = data.message.chat.id;
    const menuText = `📜 *DAFTAR FITUR BY R-Xploit:*

📁 *File & Folder*
🔹 /ambil <folder> — Kirim isi folder
🔹 /ambilfile <path> — Kirim 1 file
🔹 /zip <folder> — Zip & kirim folder

📱 *Device*
🔹 /info — Info perangkat
🔹 /deviceid — ID unik
🔹 /targetDevice <id> <cmd> — Eksekusi ke device tertentu
🔹 /allDevice <cmd> — Eksekusi ke semua
🔹 /aliasdev <nama> <id> — Alias ke ID
🔹 /aliasdevlist — Daftar alias
🔹 /aliasdevdel <nama> — Hapus alias

🔧 *Kontrol*
🔹 /update <url> — Install APK
🔹 /mati — Matikan bot
🔹 /shell <cmd> — Perintah shell
🔹 /hide — Sembunyikan ikon
🔹 /show — Tampilkan ikon

📍 *Lokasi & Jaringan*
🔹 /lokasi — Ambil lokasi
🔹 /wifi — Scan WiFi
🔹 /alihkan <url> — Buka URL di browser

🗂 *Data Pribadi*
🔹 /getgmail — Akun Gmail
🔹 /smshack — SMS
🔹 /CallLogs — Panggilan
🔹 /kontak — Kontak

📸 *Kamera & Media*
🔹 /cam — Ambil foto
🔹 /rec — Rekam suara
🔹 /setwallpaper <path>
🔹 /playAudio <path>
🔹 /playVideo <path>

🔔 *WA & Notifikasi*
🔹 /wa <nomor> <pesan>
🔹 /balas <pesan>
🔹 /bantaiToxic <lvl>,<jml>
🔹 /dialog

🛡️ *Keylogger & Senter*
🔹 /keylogON
🔹 /keylogOFF
🔹 /senterON
🔹 /senterOFF

📦 *Aplikasi*
🔹 /getapps

⚙️ *Custom Fitur*
🔹 /addfitur ...
🔹 /delfitur ...
🔹 /fiturinfo ...

👤 *User*
🔹 /adduser ...
🔹 /listuser
🔹 /broadcast ...
`;

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: menuText,
        parse_mode: "Markdown"
      })
    });

    return res.status(200).end("Menu sent");
  }

  // Default: do nothing
  res.status(200).end("OK");
}
