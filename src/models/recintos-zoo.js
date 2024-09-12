import { recintos } from "../data/recintos.js";
import { animaisExistentes } from "../data/animaisExistentes.js";

class RecintosZoo {
  constructor() {
    this.recintos = recintos;
    this.animaisExistentes = animaisExistentes;
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

        if (!biomaCompativel) {
          return false;
        }

        const possuiCarnivoro = recinto.animaisExistentes.some((a) => {
          const infoAnimal = this.animaisExistentes[a.especie];
          return infoAnimal.carnivoro;
        });

        if (possuiCarnivoro && !dadosAnimal.carnivoro) {
          return false;
        }

        if (
          dadosAnimal.carnivoro &&
          recinto.animaisExistentes.some((a) => a.especie !== animal)
        ) {
          return false;
        }

        if (animal === "MACACO" && recinto.animaisExistentes.length === 0 && quantidade < 2) {
          return false;
        }

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

export { RecintosZoo };
