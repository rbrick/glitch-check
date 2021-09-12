
const minted = 8888;


async function App() {
    const rarityResponse = await fetch(`https://blootopia.org/nft/rarity/glitch`);
    const probabilityResponse = await fetch(`https://blootopia.org/nft/probability/glitch`);

    this.rarity = await rarityResponse.json();
    this.probability = await probabilityResponse.json();

    return {
        getInfo: (id) => {
            if (typeof (id) !== "number") {
                return { "error": "Not a number" }
            } else if (id >= 8888 || id < 1) {
                return { "error": "invalid range" }
            }
            return {
                "rarity": this.rarity.find((e) => e.id == id),
                "probability": this.probability.find(e => e.id == id)
            }

        }
    };
}