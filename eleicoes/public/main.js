const BASE_URL = "https://mauricio-domingos-github-io.vercel.app/eleicoes/api"; // Substitua pelo link do seu projeto Vercel

// Função para buscar votos
async function fetchVotes() {
  const response = await fetch(`${BASE_URL}/getVotes`);
  const data = await response.json();
  return data;
}

// Atualizar os votos (Administração)
async function updateVotes(candidato, novosVotos) {
  const response = await fetch(`${BASE_URL}/updateVotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ candidato, novosVotos: parseInt(novosVotos) }),
  });

  const result = await response.json();
  console.log(result); // Verificar resultado no console
}
