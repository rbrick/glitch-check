
const minted = 8888;

const metadata = {}; // a json object containing a cache of metadata <id>: data

async function getMetadata(id) {
    if (metadata[id]) {
        return metadata[id];
    }

    let resp = await fetch(`https://blootopia.org/nft/glitch/${id}`);
    let data = resp.json();

    data.then( (resp) => {
        metadata[id] = resp;
    });

    return await data;
}


const order = [0, // first
               7,  // second
               6,  // third
               5, // fourth
               4, // fifth
               3, // sixth,
               2, // seventh,
               1
            ];

async function App() {
    const rarityResponse = await fetch(`https://blootopia.org/nft/rarity/glitch`);
    const probabilityResponse = await fetch(`https://blootopia.org/nft/probability/glitch`);

    this.rarity = await rarityResponse.json();
    this.probability = await probabilityResponse.json();

    return {
        getInfo: async (id) => {
            if (typeof (id) !== "number") {
                return { "error": "Not a number" }
            } else if (id >= 8888 || id < 1) {
                return { "error": "invalid range" }
            }

             
            let promise = new Promise( (resolve, reject) => {
                let metaResponse = getMetadata(id);
                metaResponse.then((metadata) => {
                    let img = metadata.image;
                    let attr = metadata.attributes;
                    let numbers = [ attr[0].first,
                                    attr[1].second,
                                    attr[2].third,
                                    attr[3].fourth,
                                    attr[4].fifth,
                                    attr[5].sixth,
                                    attr[6].seventh,
                                    attr[7].eight
                    ];
                    let sum = attr[13];
                    

                    resolve({
                            "rarity": this.rarity.find((e) => e.id == id),
                            "probability": this.probability.find(e => e.id == id),
                            "image": img,
                            "numbers": numbers
                        }
                    );
                });
            });

            return promise;
        },
        
    };
}