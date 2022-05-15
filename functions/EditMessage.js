module.exports = {
    //This is what will be shown inside Discord Bot Agent
    name: "Edit Message",

    //Place the mods authors here, you can add other authors like this: ["user", "user2"]
    author: ["koki1019"],

    //Place the description of this mod here
    description: "Example Mod",

    //Place the verison of this mod here
    version: "1.0.0",

    //Category the mod can be found in
    category: "Message",

    //Your outputs, leave it like this for default settings
    outputs: ["Next"],

    //Place the HTML to show inside of Discord Bot Agent
    html: function (insert) {
        return `
        <label>Message ID *</label>
        <input name="editMsg">
        ${insert}

        <label>Channel ID *</label>
        <input name="editChannelId">
        ${insert}

        <label>Message</label>
        <input name="editMsgMsg">
        ${insert}
        `;
    },

    //This will be executed when the bot is first started
    startup: function (DBT) {},

    //Place the mod here
    execute: async function (DBT, action, index, message, args, command) {
        const channelVar = DBT.parseVariables(action.editChannelId);
        const channel = message.guild.channels.cache.find(x => x.id === channelVar || x.name === channelVar);
        const msg = await channel.messages.fetch(DBT.parseVariables(action.editMsg));

        msg.edit({ content: DBT.parseVariables(action.editMsgMsg) });
        DBT.nextResponse(message, args, command, "Next");
    },
};
