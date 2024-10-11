let angle = 0;   // Ângulo calculado
let radiano = 0; // Radiano calculado
let targetRadiano = 0;  // Alvo da animação do radiano

function setup() {
    // Canvas principal para o gráfico de ângulo e radiano
    let canvas = createCanvas(400, 400);
    canvas.parent('chart-container');  // Vincula o canvas ao div 'chart-container'

    // Canvas para o relógio angular
    let clockCanvas = createCanvas(400, 400);
    clockCanvas.parent('canvas-container');  // Vincula o canvas ao div 'canvas-container'
}

function draw() {
    // Função principal de desenho
    drawVisualizationCanvas();
    drawClock();
}

// Função para desenhar a visualização principal (ângulo/radiano)
function drawVisualizationCanvas() {
    background(255);

    // Animação suave do radiano
    radiano += (targetRadiano - radiano) * 0.1;

    // Desenhar círculo central
    translate(width / 2, height / 2);
    stroke(0);
    noFill();
    ellipse(0, 0, 300, 300);  // Círculo com raio 150

    // Desenhar linha indicadora (anti-horário)
    let x = 150 * cos(-radiano);  // Correção do movimento anti-horário
    let y = 150 * sin(-radiano);

    stroke(255, 0, 0);
    strokeWeight(3);
    line(0, 0, x, y);

    // Mostrar ângulo e radiano
    noStroke();
    fill(0);
    textSize(16);
    text(`Ângulo: ${(degrees(radiano)).toFixed(2)}°`, -50, -170);
    text(`Radiano: ${(radiano / PI).toFixed(2)}π`, -50, -150);
}

// Função para desenhar o relógio angular
function drawClock() {
    translate(width / 2, height / 2);
    stroke(0);
    noFill();
    ellipse(0, 0, 300, 300);  // Desenhar o círculo do relógio

    // Desenhar a seta que move no sentido anti-horário
    let arrowBase = createVector(0, 0);
    let arrowDir = p5.Vector.fromAngle(-frameCount * 0.01).mult(150);  // Girar a seta
    drawArrow(arrowBase, arrowDir, 'blue');

    // Adicionar marcações do relógio (ângulos de 0° a 360°)
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < 360; i += 30) {
        let angle = radians(i);
        let x1 = 150 * cos(angle);
        let y1 = 150 * sin(angle);
        let x2 = 160 * cos(angle);
        let y2 = 160 * sin(angle);
        line(x1, y1, x2, y2);
    }
}

// Função para desenhar uma seta estilizada
function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

// Eventos de DOM - Converter Ângulo para Radiano e vice-versa
document.addEventListener('DOMContentLoaded', function () {
    // Converter para radiano ao clicar
    document.getElementById('radiano').addEventListener('click', () => {
        const angulo = parseFloat(document.getElementById('input').value);
        if (angulo >= 0 && angulo <= 360) {
            targetRadiano = angulo * (PI / 180);  // Converter ângulo para radiano
        } else {
            alert("O ângulo deve estar entre 0 e 360 graus.");
        }
    });

    // Converter para ângulo ao clicar
    document.getElementById('angulo').addEventListener('click', () => {
        const rad = parseFloat(document.getElementById('input').value);
        if (rad >= 0 && rad <= TWO_PI) {
            targetRadiano = rad;  // Manter o valor do radiano
        } else {
            alert("O valor do radiano deve estar entre 0 e 2π.");
        }
    });
});
