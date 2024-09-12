export const animaisExistentes = {
    LEAO: { 
        tamanho: 3, 
        biomas: ["savana"], 
        carnivoro: true 
    },

    LEOPARDO: { 
        tamanho: 2, 
        biomas: ["savana"], 
        carnivoro: true 
    },

    CROCODILO: { 
        tamanho: 3, 
        biomas: ["rio"], 
        carnivoro: true 
    },

    MACACO: {
      tamanho: 1,
      biomas: ["savana", "floresta"],
      carnivoro: false,
      precisaCompanhia: true,
    },

    GAZELA: { 
        tamanho: 2, 
        biomas: ["savana"], 
        carnivoro: false 
    },
    
    HIPOPOTAMO: {
      tamanho: 4,
      biomas: ["savana", "rio"],
      carnivoro: false,
      toleraOutrasEspecies: true,
    },
  };
  