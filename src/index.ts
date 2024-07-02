import { Discord } from "./Client/Discord";
import Config from "./Config";

export const client = new Discord();
client.init(Config.TOKEN);