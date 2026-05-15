// 1. 주요 클래스 가져오기
require('dotenv').config();

const {Client, GatewayIntentBits, Events, EmbedBuilder} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
const token = process.env.DISCORD_TOKEN;

// 2. 클라이언트 객체 생성 (Guilds관련, 메시지관련 인텐트 추가)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, //서버 정보 접근
        GatewayIntentBits.GuildMessages, //서버 메시지 이벤트 수신
        GatewayIntentBits.MessageContent, //메시지 내용 읽기 (가장 중요!)
        GatewayIntentBits.GuildMembers, //새로운 멤버 정보 받기
    ]
});

// 3. 봇이 준비됐을때 한번만(once) 표시할 메시지
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//새로운 멤버가 서버에 들어왔을 때 실행되는 이벤트 (인사하기)
client.on(Events.GuildMemberAdd, (member) => {
    const welcomeChannel = member.guild.channels.cache.get('1187375829932585095'); // 실제 채널 ID 입력

    if (!welcomeChannel) {
        console.log("채널을 찾을 수 없습니다.");
        return;
    }

    //환영 메시지 전송
    const welcomeEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(' ! 새 칭구 등장 ! ')
        .setDescription(`두둥, 새 칭구 ${member.displayName} 등장! 환영환영~합니다`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

    welcomeChannel.send({ embeds: [welcomeEmbed]});
})

// 4. 누군가 ping을 작성하면 pong으로 답장한다.
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if(message.content === '핑'){
        message.reply('pong');
    }
})

// 5. 시크릿키(토큰)을 통해 봇 로그인 실행
client.login(token);
