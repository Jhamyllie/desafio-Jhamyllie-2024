class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
        { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
        { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] },
      ];
       this.animaisExistentes = {
        LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
        MACACO: {
          tamanho: 1,
          biomas: ["savana", "floresta"],
          carnivoro: false,
          precisaCompanhia: true,
        },
        GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
        HIPOPOTAMO: {
          tamanho: 4,
          biomas: ["savana", "rio"],
          carnivoro: false,
          toleraOutrasEspecies: true,
        },
      };
    }
     // Função para analisar recintos viáveis
    analisaRecintos(animal, quantidade) {
      const dadosAnimal = this.animaisExistentes[animal];
       if (!dadosAnimal) {
        return { erro: "Animal inválido", recintosViaveis: null };
      }
       if (quantidade <= 0) {
        return { erro: "Quantidade inválida", recintosViaveis: null };
      }
       let recintosViaveis = this.recintos
        .filter((recinto) => {
          const biomasDoRecinto = recinto.bioma.split(" e ");
          const biomaCompativel = biomasDoRecinto.some((bioma) =>
            dadosAnimal.biomas.includes(bioma)
          );
           // Verifica bioma compatível
          if (!biomaCompativel) {
            return false;
          }
           // Se o recinto já tem carnívoros, verificar se são da mesma espécie
          const possuiCarnivoro = recinto.animaisExistentes.some((a) => {
            const infoAnimal = this.animaisExistentes[a.especie];
            return infoAnimal.carnivoro;
          });
           if (possuiCarnivoro && !dadosAnimal.carnivoro) {
            // Se o animal atual não é carnívoro e o recinto contém carnívoros, não é viável
            return false;
          }
           if (
            dadosAnimal.carnivoro &&
            recinto.animaisExistentes.some((a) => a.especie !== animal)
          ) {
            // Carnívoros só podem ficar com sua própria espécie
            return false;
          }
           // Macacos precisam de companhia
          if (animal === "MACACO" && recinto.animaisExistentes.length === 0 && quantidade < 2) {
            return false; // Macacos sozinhos não podem ficar em recintos vazios
          }
           // Calcular espaço disponível no recinto
          const animaisPresentes = recinto.animaisExistentes.reduce((soma, a) => {
            const infoAnimal = this.animaisExistentes[a.especie];
            return soma + infoAnimal.tamanho * a.quantidade;
          }, 0);
           const espacoLivre = recinto.tamanhoTotal - animaisPresentes;
           return espacoLivre >= dadosAnimal.tamanho * quantidade;
        })
        .map((recinto) => {
          const animaisPresentes = recinto.animaisExistentes.reduce((soma, a) => {
            const infoAnimal = this.animaisExistentes[a.especie];
            return soma + infoAnimal.tamanho * a.quantidade;
          }, 0);
           let espacoExtra = 0;
           // Se houver mais de uma espécie no recinto, adicionar 1 de espaço extra
          if (
            recinto.animaisExistentes.length > 0 &&
            !recinto.animaisExistentes.some((a) => a.especie === animal)
          ) {
            espacoExtra = 1;
          }
           const espacoLivre =
            recinto.tamanhoTotal -
            (animaisPresentes + dadosAnimal.tamanho * quantidade + espacoExtra);
           return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        });
       if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável", recintosViaveis: null };
      }
       return { erro: null, recintosViaveis };
    }
  }
   // testes com as entradas
  const zoo = new RecintosZoo();
  console.log(zoo.analisaRecintos("CROCODILO", 1));
  console.log(zoo.analisaRecintos("MACACO", 2));
  console.log(zoo.analisaRecintos("LEAO", 6));
  console.log(zoo.analisaRecintos("HIPOPOTAMO", 3));
  console.log(zoo.analisaRecintos("CROCODILO", 5));
  console.log(zoo.analisaRecintos("UNICORNIO", 5));
   export { RecintosZoo as RecintosZoo };
  
 