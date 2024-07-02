import { EmbedBuilder } from "discord.js";
import { CommandBuilder } from "../../util/CommandBuilder";

export default new CommandBuilder({
    data: {
        name: "ping",
        description: "Ping!",
    },
    async run(client, interaction) {
        let embed = new EmbedBuilder()
            .setTitle("Pong!")
            .setDescription(`API Latency: ${client.ws.ping}ms`);
        return await interaction.reply({ embeds: [embed] });
    },
})