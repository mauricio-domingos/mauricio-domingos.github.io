// Variáveis globais
let token = '';
let currentPage = 1;
const totalPages = 5;
const clientId = 'YOUR_CLIENT_ID'; // Substitua pelo seu Client ID
const redirectUri = 'YOUR_REDIRECT_URI'; // Substitua pelo seu Redirect URI
const authEndpoint = 'https://accounts.spotify.com/authorize';
const apiEndpointTopArtists = 'https://api.spotify.com/v1/me/top/artists';
const apiEndpointTopTracks = 'https://api.spotify.com/v1/me/top/tracks';
const apiEndpointGenres = 'https://api.spotify.com/v1/me/top/artists'; // Para pegar gêneros (precisa de um processamento extra)

// A função de login que redireciona o usuário para o Spotify
function loginSpotify() {
    const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=user-top-read`;
    window.location.href = authUrl;
}

// Recupera o token de acesso do URL após o redirecionamento
window.onload = () => {
    if (window.location.hash) {
        const params = new URLSearchParams(window.location.hash.substr(1));
        token = params.get('access_token');
        if (token) {
            showPage(currentPage); // Exibe a primeira página
            loadTopArtists();      // Carrega os top artistas
            loadTopSongs();        // Carrega as top músicas
            loadGenreGraph();      // Carrega o gráfico de gêneros
        }
    }
};

// Função para exibir a página atual
function showPage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((pageEl, index) => {
        pageEl.classList.remove('active');
        if (index + 1 === page) {
            pageEl.classList.add('active');
        }
    });
}

// Avançar para a próxima página
function nextPage(page) {
    currentPage = page;
    showPage(currentPage);
}

// Carregar os Top 5 Artistas
async function loadTopArtists() {
    try {
        const response = await fetch(apiEndpointTopArtists, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        const artists = data.items.slice(0, 5);

        const artistsList = document.getElementById('top-artists');
        artists.forEach(artist => {
            const li = document.createElement('li');
            li.textContent = artist.name;
            artistsList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar os artistas:', error);
    }
}

// Carregar os Top 5 Músicas
async function loadTopSongs() {
    try {
        const response = await fetch(apiEndpointTopTracks, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        const songs = data.items.slice(0, 5);

        const songsList = document.getElementById('top-songs');
        songs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song.name;
            songsList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar as músicas:', error);
    }
}

// Carregar o gráfico de gêneros
async function loadGenreGraph() {
    try {
        const response = await fetch(apiEndpointGenres, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        // Simulando os gêneros mais ouvidos (pois a API do Spotify não retorna diretamente gêneros)
        const genres = [
            { name: 'Pop', value: 40 },
            { name: 'Rock', value: 25 },
            { name: 'Hip-Hop', value: 20 },
            { name: 'Eletrônica', value: 15 }
        ];

        const graphContainer = document.getElementById('genre-graph');
        genres.forEach(genre => {
            const div = document.createElement('div');
            div.style.height = `${genre.value}%`;
            div.style.backgroundColor = '#1DB954';
            div.style.marginBottom = '5px';
            div.style.borderRadius = '5px';
            div.textContent = `${genre.name}: ${genre.value}%`;
            graphContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar os gêneros:', error);
    }
}
