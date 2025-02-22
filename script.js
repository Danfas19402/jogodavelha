// Selecionando elementos do DOM
const tabuleiro = document.getElementById('tabuleiro');
const celulas = document.querySelectorAll('[data-celula]');
const status = document.getElementById('status');
const botaoReiniciar = document.getElementById('reiniciar');

// Variáveis de controle do jogo
let jogadorAtual = 'X';
let jogoAtivo = true;

// Combinações vencedoras possíveis
const combinacoesVencedoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
];

// Função para lidar com o clique em uma célula
function lidarComCliqueCelula(e) {
    const celula = e.target;
    const indiceCelula = Array.from(celulas).indexOf(celula);

    // Verifica se a célula já está preenchida ou se o jogo acabou
    if (celula.textContent !== '' || !jogoAtivo) return;

    // Preenche a célula com o símbolo do jogador atual
    celula.textContent = jogadorAtual;

    if (verificarVitoria()) {
        const comboVencedor = obterComboVencedor();
        destacarCelulasVencedoras(comboVencedor);
        status.textContent = `Jogador ${jogadorAtual} venceu!`;
        jogoAtivo = false;
    } else if (verificarEmpate()) {
        status.textContent = 'Empate!';
        jogoAtivo = false;
    } else {
        // Troca o jogador atual
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
        status.textContent = `Vez do jogador ${jogadorAtual}`;
    }
}

// Função para verificar se houve vitória
function verificarVitoria() {
    return combinacoesVencedoras.some(combinacao => {
        return combinacao.every(indice => {
            return celulas[indice].textContent === jogadorAtual;
        });
    });
}

// Função para obter a combinação vencedora
function obterComboVencedor() {
    return combinacoesVencedoras.find(combinacao => {
        return combinacao.every(indice => {
            return celulas[indice].textContent === jogadorAtual;
        });
    });
}

// Função para destacar as células vencedoras
function destacarCelulasVencedoras(combo) {
    combo.forEach(indice => {
        celulas[indice].classList.add('vencedor');
    });
}

// Função para verificar se houve empate
function verificarEmpate() {
    return Array.from(celulas).every(celula => celula.textContent !== '');
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    jogadorAtual = 'X';
    jogoAtivo = true;
    celulas.forEach(celula => {
        celula.textContent = '';
        celula.classList.remove('vencedor');
    });
    status.textContent = `Vez do jogador ${jogadorAtual}`;
}

// Adicionando event listeners
celulas.forEach(celula => celula.addEventListener('click', lidarComCliqueCelula));
botaoReiniciar.addEventListener('click', reiniciarJogo);

// Inicialização do status do jogo
status.textContent = `Vez do jogador ${jogadorAtual}`;