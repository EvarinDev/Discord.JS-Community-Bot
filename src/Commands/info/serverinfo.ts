import { EmbedBuilder } from "discord.js";
import { CommandBuilder } from "../../util/CommandBuilder";

export default new CommandBuilder({
    data: {
        name: "serverinfo",
        description: "Get server information",
    },
    async run(client, interaction) {
        return await interaction.reply({ embeds: [
            new EmbedBuilder()
                .setAuthor({
                    name: interaction.guild?.name as string,
                    iconURL: interaction.guild?.iconURL() as string,
                })
                .addFields([
                    {
                        name: "Owner",
                        value: `<@${interaction.guild?.ownerId}>`,
                        inline: true,
                    },
                    {
                        name: "Members",
                        value: interaction.guild?.memberCount.toString() as string,
                        inline: true,
                    },
                    {
                        name: "Roles",
                        value: interaction.guild?.roles.cache.size.toString() as string,
                        inline: true,
                    },
                    {
                        name: "Channels",
                        value: interaction.guild?.channels.cache.size.toString() as string,
                        inline: true,
                    },
                    {
                        name: "Created",
                        value: interaction.guild?.createdAt.toDateString() as string,
                        inline: true,   
                    },
                    {
                        name: "Boosts",
                        value: interaction.guild?.premiumSubscriptionCount?.toString() as string,
                        inline: true,
                    }
                ])
        ] });
    },
})