import { ExampleBot } from "./bots/ExampleBot/ExampleBot"

class Index {
    async run() {
        // replace ExampleBot and create new ones to run here

        await new ExampleBot().run();
    }
}
new Index().run();