//NADEEN-MD-V2





















































































































































const { cmd } = require('../command');
const config = require('../config');
let autoBioInterval;
cmd({
    pattern: "setbio",
    desc: "Enable or disable the AutoBIO feature.",
    category: "owner",
    react: "🍀",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    config.autoBioEnabled = !config.autoBioEnabled;

    if (config.autoBioEnabled) {
        reply("👨‍💻 AutoBIO feature has been *enabled*! 🔄");
        startAutoBio(conn);
    } else {
        reply("👨‍💻 AutoBIO feature has been *disabled*! 🚫");
        stopAutoBio();
    }
});

// 2. Start AutoBIO
function startAutoBio(conn) {
    // Clear any existing interval to avoid duplicates
    if (autoBioInterval) clearInterval(autoBioInterval);

    // Set a new interval to update the bio every minute (or any preferred time)
    autoBioInterval = setInterval(async () => {
        const time = new Date().toLocaleTimeString();  // Get the current time
        const bioText = `🤩 I am using NADEEN-MD [${time}] 👨‍💻`;  // Set the bio text with time
        await conn.updateProfileStatus(bioText);  // Update the bot's bio
    }, 60 * 1000);  // 1 minute interval
}

// 3. Stop AutoBIO
function stopAutoBio() {
    if (autoBioInterval) {
        clearInterval(autoBioInterval);  // Stop the interval
        autoBioInterval = null;
        console.log("👨‍💻 AutoBIO feature stopped.");  // Log the stopping of the feature
    }
          }
