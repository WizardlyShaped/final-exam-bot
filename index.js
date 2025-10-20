import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const requiredRoles = [
  "ROLE_ID_GKC",
  "ROLE_ID_GC",
  "ROLE_ID_SC",
  "ROLE_ID_PT",
  "ROLE_ID_FT",
  "ROLE_ID_CE",
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
