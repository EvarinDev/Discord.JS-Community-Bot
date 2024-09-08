import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember } from "discord.js";
import { CommandBuilder } from "../../Util/CommandBuilder";

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
    async run(client, interaction): Promise<void> {
        if (!(interaction.member as GuildMember).permissions.has("BanMembers")) {
            await interaction.reply("You do not have permission to use this command");
            return;
        }
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason provided";
        const member = interaction.guild?.members.cache.get(user?.id as string);
        if (member) {
            await member.ban({ reason });
            await interaction.reply({ content: `${user?.tag} has been banned!` });
        } else {
            await interaction.reply({ content: "That user is not in this guild!" });
        }
    }
})