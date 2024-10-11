let angle = 0;  // Armazenará o ângulo calculado
let radiano = 0;  // Armazenará o radiano calculado
let targetRadiano = 0;  // Armazena o valor alvo para animação

function setup() {
    // Canvas principal para o gráfico de ângulo e radiano
    let angleCanvas = createCanvas(400, 400);
    angleCanvas.parent('chart-container');  // Vincula o canvas ao div 'chart-container'

    // Canvas para o relógio angular (pode ser um novo canvas ou o mesmo, dependendo do design)
    let clockCanvas = createGraphics(400, 400); // Isso cria um gráfico off-screen
    clockCanvas.parent('canvas-container');  // No entanto, `createGraphics` não funciona assim, então, mantenha no `setup`.

    // Se você realmente precisa de dois canvases, você pode tentar uma abordagem como:
    let secondCanvas = createCanvas(400, 400);
    secondCanvas.parent('canvas-container');  // Vincula o segundo canvas ao div 'canvas-container'

    // Aqui você pode desenhar os elementos desejados em cada canvas
}

function draw() {
    background(255);

    // Animação suave do radiano
    radiano += (targetRadiano - radiano) * 0.1;

    // Desenhar o círculo
    translate(width / 2, height / 2);  // Mover a origem para o centro da tela
    stroke(0);
    noFill();
    ellipse(0, 0, 300, 300);  // Desenhar o círculo com raio de 150

    // Desenhar linha indicadora no sentido anti-horário
    let x = 150 * cos(-radiano);  // Usando radianos corretamente
    let y = 150 * sin(-radiano);

    stroke(255, 0, 0);
    strokeWeight(3);
    line(0, 0, x, y);

    // Converter radiano para ângulo para exibição
    let currentAngle = round(degrees(radiano));  // Converte de radianos para graus e arredonda

    // Calcular o valor do radiano em termos de π
    let radianoEmPi = radiano / PI;
    let radianoSimplificado = decimalParaFracao(radianoEmPi.toFixed(2));  // Converter o valor para fração

    // Desenhar o valor do ângulo sobre a linha indicadora
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(currentAngle + "°", x * 1.1, y * 1.1);  // Exibir o ângulo um pouco além da ponta da linha

    // Desenhar o valor do radiano em π sobre a linha indicadora
    textSize(14);
    text(radianoSimplificado + "π", x * 1.3, y * 1.3);  // Exibir o radiano em termos de π abaixo do ângulo
}

document.addEventListener('DOMContentLoaded', function () {
    // Função para converter ângulo em radiano e desenhar
    document.getElementById('radiano').addEventListener('click', () => {
        const angulo = parseFloat(document.getElementById('input').value);

        // Verificar se o valor do ângulo está entre 0 e 360
        if (angulo >= 0 && angulo <= 360) {
            targetRadiano = angulo * (PI / 180);  // Converter ângulo para radiano (0 a 2π)
        } else {
            alert("O ângulo deve estar entre 0 e 360 graus.");
        }
    });

    // Função para converter radiano em ângulo e desenhar
    document.getElementById('angulo').addEventListener('click', () => {
        const rad = parseFloat(document.getElementById('input').value);

        // Verificar se o valor do radiano está entre 0 e 2π
        if (rad >= 0 && rad <= TWO_PI) {
            targetRadiano = rad;  // Manter o valor do radiano para desenhar
        } else {
            alert("O valor do radiano deve estar entre 0 e 2π.");
        }
    });
});

// Função para simplificar frações (exemplo: 1.57 radianos será simplificado para "1/2π")
function mdc(a, b) {
    return b === 0 ? a : mdc(b, a % b);
}

function simplificarFracao(numerador, denominador) {
    const divisorComum = mdc(numerador, denominador);
    const numeradorSimplificado = numerador / divisorComum;
    const denominadorSimplificado = denominador / divisorComum;

    return `${numeradorSimplificado}/${denominadorSimplificado}`;
}

function decimalParaFracao(decimal) {
    const decimalStr = decimal.toString();
    const partes = decimalStr.split('.');
    const parteInteira = partes[0] ? parseInt(partes[0]) : 0;
    const parteDecimal = partes[1] ? partes[1] : '';

    if (parteDecimal.length === 0) {
        return `${parteInteira}/1`;
    }

    const numerador = parteInteira * Math.pow(10, parteDecimal.length) + parseInt(parteDecimal);
    const denominador = Math.pow(10, parteDecimal.length);

    return simplificarFracao(numerador, denominador);
}


