class RecintosZoo {

    constructor() {
        this.recintos = [
          { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
          { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
          { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
          { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
          { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
        ];
    
        this.animais = {
          "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
          "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
          "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
          "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false, precisaCompanhia: true },
          "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
          "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false, toleraOutrasEspecies: true }
        };
      }

    analisaRecintos(animal, quantidade) {
        
    }

}

export { RecintosZoo as RecintosZoo };
