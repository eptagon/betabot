const Discord = require('discord.js');
const client = new Discord.Client();
const token = '';process.env.token;
const welcomeChannelName = "인사하기";
const byeChannelName = "인사하기";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('베타봇 온');
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '-주의사항') {
    return message.reply('베타봇은 오프라인일때는 작동하지 않습니다.');
  }

  if(message.content == '-핑') {
    return message.reply('퐁!');
  }

  if(message.content == '-핑') {
    return message.reply('퐁!');
  }

  if(message.content == '-qwertyuiopasdfghjklzxcvbnm1234567890dlrjsgmlrjsgmlsmssjanrnldudnj') {
    return message.reply('건희 귀여워');
  }

if(message.content == '-도움') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '-핑', desc: '퐁!'},
      {name: '-도움', desc: '명령어 도움말 출력'},
      {name: '-전체공지', desc: '봇 관리자만 사용 가능합니다'},
      {name: '-팬아트', desc: '진짜요? 팬아트?! 이예에ㅔ!!'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('커맨드 도뭄말', helpImg)
      .setColor('#186de6')
      .setFooter(`앱타곤`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('-전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('-전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지 않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);