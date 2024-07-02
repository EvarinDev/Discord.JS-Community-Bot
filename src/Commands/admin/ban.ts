import { ApplicationCommandOptionType } from "discord.js";
import { CommandBuilder } from "../../util/CommandBuilder";

export default new CommandBuilder({
    data: {
        name: "ban",
        description: "Ban a member",
        options: [
            {
                name: "user",
                type: ApplicationCommandOptionType.User,
                description: "The user to ban",
                required: true,
            },
            {
                name: "reason",
                type: ApplicationCommandOptionType.String,
                description: "The reason for the ban",
                required: false,
            },
        ],
    },
    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason provided";
        const member = interaction.guild?.members.cache.get(user?.id as string);
        if (member) {
            member.ban({ reason });
            return await interaction.reply({ content: `${user?.tag} has been banned!` });
        } else {
            return await interaction.reply({ content: "That user is not in this guild!" });
        }
    },
})