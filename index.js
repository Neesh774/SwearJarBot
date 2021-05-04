const Discord = require('discord.js');
const client = new Discord.Client();
const swears = ['fuck', 'bitch', 'cunt', 'ass', 'dick', 'penis']
const swearjar = require("/Users/kkanc/Swear Jar/swearjar.json")
let fs = require('fs')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
let cost = swearjar["jar"];
if(!swearjar["jar"]) swearjar["jar"] = {
    jar: 0
};
client.on('message', msg => {
    if(msg.author.bot){
        return;
    }
    let words = msg.content.trim().split(/\s+/);
    let messageCost = 0; 
    for(wordi in words){
        for(sweari in swears){
            let swear = swears[sweari]
            let word = words[wordi]
            if(word === swear){
                messageCost = messageCost + 2;
            }
        } 
    }
    
    if(messageCost > 0){
        msg.delete();
        msg.reply(`Added ${messageCost}.00 to the swear jar. SHAME!`)
        cost += messageCost;
        let jar = {"jar":cost};
        fs.writeFile("./swearjar.json", JSON.stringify(jar), err =>{
            if(err) console.log(err);
        })
    }
    if(msg.content === "sjcount"){
        msg.reply(`The swear jar currently has $${cost}.00 in it.`)
    }
});

client.login('PUT_TOKEN_HERE');