import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const requiredRoles = [
  "1429726403842277441",
  "1429726423110914110",
  "1429726475535257621",
  "1429726504073564311",
  "1429726544506388651",
  "1429726577305976854",
];

const finalExamRole = "ROLE_ID_FINAL";

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    const hasAllRoles = requiredRoles.every(roleId =>
      newMember.roles.cache.has(roleId)
    );

    if (hasAllRoles && !newMember.roles.cache.has(finalExamRole)) {
      await newMember.roles.add(finalExamRole);
      console.log(`🎓 Gave Final Exam Access to ${newMember.user.tag}`);
    }
  } catch (err) {
    console.error("Error checking roles:", err);
  }
});

client.login(process.env.TOKEN);
