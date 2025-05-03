const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const distube = new DisTube(client, {
  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.guild || message.author.bot) return;

  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();

  if (command === '!play') {
    const query = args.join(' ');
    distube.play(message.member.voice.channel, query, {
      textChannel: message.channel,
      member: message.member
    });
  }
});

client.login('MTM2ODE4OTUzMDc3OTE2MDY1Nw.Gjxxvp.hqDOuR0uiFVZ9KibKeESu5zyx2jXslpjGuAFCA');
