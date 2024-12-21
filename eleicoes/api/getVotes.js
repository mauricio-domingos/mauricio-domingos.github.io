// Simulação de um "banco de dados" local (pode ser substituído por um banco real)
const votos = [
    { candidato: "Candidato 1", votos: 150, imagem: "https://via.placeholder.com/100x100.png?text=C1" },
    { candidato: "Candidato 2", votos: 100, imagem: "https://via.placeholder.com/100x100.png?text=C2" },
    { candidato: "Candidato 3", votos: 75, imagem: "https://via.placeholder.com/100x100.png?text=C3" },
  ];
  
  export default function handler(req, res) {
    res.status(200).json(votos);
  }
  