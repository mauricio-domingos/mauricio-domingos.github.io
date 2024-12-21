// Simulação de "banco de dados" local
let votos = [
    { candidato: "Candidato 1", votos: 150, imagem: "https://via.placeholder.com/100x100.png?text=C1" },
    { candidato: "Candidato 2", votos: 100, imagem: "https://via.placeholder.com/100x100.png?text=C2" },
    { candidato: "Candidato 3", votos: 75, imagem: "https://via.placeholder.com/100x100.png?text=C3" },
  ];
  
  export default function handler(req, res) {
    if (req.method === "POST") {
      const { candidato, novosVotos } = req.body;
  
      // Atualizar os votos do candidato
      votos = votos.map((entry) =>
        entry.candidato === candidato ? { ...entry, votos: entry.votos + novosVotos } : entry
      );
  
      return res.status(200).json({ message: "Votos atualizados com sucesso", votos });
    } else {
      return res.status(405).json({ message: "Método não permitido" });
    }
  }
  