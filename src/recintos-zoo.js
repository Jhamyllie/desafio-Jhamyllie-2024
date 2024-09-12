class RecintosZoo {
    constructor() {
      // recintos existentes
        this.recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] }
        ];

        // animaisExistentes e suas propriedades
        this.animaisExistentes = {
            "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false, precisaCompanhia: true },
            "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false, toleraOutrasEspecies: true }
        };
    }
  
    // calcula os recintos viáveis
    analisaRecintos(animal, quantidade) {
        if (!this.animaisExistentes[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const animalInfo = this.animaisExistentes[animal];
        let espacoNecessario = animalInfo.tamanho * quantidade;

        let recintosViaveis = [];

        for (let recinto of this.recintos) {
        // Verifica os espaços ocupados por outros animaisExistentes no recinto
            let espacoOcupado = recinto.animaisExistentes.reduce((acc, animalRecinto) => 
            acc + (this.animaisExistentes[animalRecinto.especie].tamanho * animalRecinto.quantidade), 0);
            let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;

        // Verifica biomas e espaços disponíveis
            if (animalInfo.biomas.includes(recinto.bioma) && espacoDisponivel >= espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
  }
  
// testes com as entradas
// const zoo = new RecintosZoo();
// console.log(zoo.analisaRecintos("CROCODILO", 1));
// console.log(zoo.analisaRecintos("MACACO", 2));
// console.log(zoo.analisaRecintos("LEAO", 6));
// console.log(zoo.analisaRecintos("HIPOPOTAMO", 3));
// console.log(zoo.analisaRecintos("CROCODILO", 5));
// console.log(zoo.analisaRecintos("UNICORNIO", 5));
  
export { RecintosZoo as RecintosZoo };
