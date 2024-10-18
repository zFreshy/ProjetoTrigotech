window.addEventListener('scroll', checkScrollPosition);
checkScrollPosition();

// Variável para armazenar a área atual
let areaAnterior = null;

// Função que verifica se a área mudou e executa código quando houver mudança
function verificarMudancaDeArea() {
    const areaAtual = document.getElementById("areaAtual").textContent; // Pega o valor atual da área

    if (areaAtual !== areaAnterior) { // Se a área mudou
        console.log(`A área mudou de ${areaAnterior} para ${areaAtual}`);
        
        // Executar o código específico dependendo da nova área
        if (areaAtual === 'P1') {
            setup()

            document.getElementById('desafio').innerHTML = ""
        } else if (areaAtual === 'P2') {
            document.getElementById('desafio').innerHTML = ""
            if (document.getElementById('desafio').innerHTML == "") {
                setup()
                draw()
            }
        } else if (areaAtual === 'P3') {
            document.getElementById('desafio').innerHTML = ""
            if (document.getElementById('desafio').innerHTML == "") {
                setup()
                draw()
            }
        }

        // Atualiza o valor de `areaAnterior` para a próxima verificação
        areaAnterior = areaAtual;
    }
}

// Exemplo de como monitorar mudanças na área
// Aqui estamos usando `setInterval` apenas como exemplo para verificar a mudança
// Em um projeto real, essa verificação pode ser feita em eventos específicos
setInterval(verificarMudancaDeArea, 500); // Verifica a cada 1 segundo (1000 ms)







  

let angle = 0;  // Armazenará o ângulo calculado
let radiano = 0;  // Armazenará o radiano calculado
let targetRadiano = 0;  // Armazena o valor alvo para animação

function setup() {
    let areaAtual = document.getElementById("areaAtual").innerText
    if (areaAtual == "P1") {
    // Canvas principal para o gráfico de ângulo e radiano
    let angleCanvas = createCanvas(400, 400);
    angleCanvas.parent('chart-container');  // Vincula o canvas ao div 'chart-container'

    // // Canvas para o relógio angular (pode ser um novo canvas ou o mesmo, dependendo do design)
    // let clockCanvas = createGraphics(400, 400); // Isso cria um gráfico off-screen
    // clockCanvas.parent('canvas-container');  // No entanto, `createGraphics` não funciona assim, então, mantenha no `setup`.

    // // Se você realmente precisa de dois canvases, você pode tentar uma abordagem como:
    // let secondCanvas = createCanvas(400, 400);
    // secondCanvas.parent('canvas-container');  // Vincula o segundo canvas ao div 'canvas-container'

    // Aqui você pode desenhar os elementos desejados em cada canvas

    } else if (areaAtual == "P2") {
        let canvas = createCanvas(400, 400);
        canvas.parent('canvas-container');
    } else if (areaAtual == "P3") {
        let desafioCanva = createCanvas(400, 400);
        desafioCanva.parent("#desafio")
        
        // Gerar ângulo aleatório para a seta (0° a 360°)
        angle = int(random(0, 360));
        
        // Criar inputs para o usuário inserir ângulo e radiano
        inputAngle = createInput('');
        inputAngle.size(100);
        inputAngle.attribute('placeholder', 'Ângulo (graus)');
        inputAngle.parent("#desafio")
        
        inputRadian = createInput('');
        inputRadian.size(100);
        inputRadian.attribute('placeholder', 'Radiano');
        inputRadian.parent("#desafio")
        
        // Botão para verificar resposta
        let button = createButton('Verificar');
        button.mousePressed(checkAnswer);
        button.parent("#desafio")
    }

}

        // Função para desenhar uma seta
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

function draw() {
    let areaAtual = document.getElementById("areaAtual").innerText
    if (areaAtual == "P1") {
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
    } else if (areaAtual == "P2") {
        background(255);

        // Desenhar círculo do relógio
        translate(width / 2, height / 2);
        stroke(0);
        noFill();
        ellipse(0, 0, 300, 300);  // Círculo

        // Calcular o ângulo com base no frameCount
        let angle = -frameCount * 0.01;  // Em radianos
        let angleDegrees = degrees(-angle) % 360;  // Converter para graus e limitar de 0 a 360
        let radianoEmPi = angle / PI * -1;  // Converter radianos para múltiplos de pi

        // Desenhar ponteiro rotativo
        let arrowBase = createVector(0, 0);
        let arrowDir = p5.Vector.fromAngle(angle).mult(150);  // Movimento anti-horário
        drawArrow(arrowBase, arrowDir, 'blue');

        // Desenhar valor do ângulo e radiano no centro do relógio
        noStroke();
        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(`${round(angleDegrees)}°`, 0, -20);  // Mostra o ângulo em graus
        text(`${nfc(radianoEmPi, 2)}π rad`, 0, 20);  // Mostra o valor em pi rad

        // Desenhar marcações do relógio
        stroke(0);
        strokeWeight(1);
        for (let i = 0; i < 360; i += 30) {
            let markAngle = radians(i);
            let x1 = 150 * cos(markAngle);
            let y1 = 150 * sin(markAngle);
            let x2 = 160 * cos(markAngle);
            let y2 = 160 * sin(markAngle);
            line(x1, y1, x2, y2);
        }
    } else if (areaAtual == "P3") {
        background(255);
    
        // Desenhar o círculo com os pontos notáveis
        translate(width / 2, height / 2);
        stroke(0);
        noFill();
        ellipse(0, 0, 300, 300);
        
        // Marcar os pontos notáveis
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text("0°", 150, 0);       // 0°
        text("90°", 0, -150);     // 90°
        text("180°", -150, 0);    // 180°
        text("270°", 0, 150);     // 270°
        
        // Desenhar a seta corretamente no ângulo (em sentido horário)
        stroke(0);
        let x = 150 * cos(radians(-angle)); // Usar -angle para garantir sentido horário
        let y = 150 * sin(radians(-angle));
        line(0, 0, x, y);
        
        // Mostrar mensagem de resultado
        textSize(16);
        fill(0);
        noStroke();
        // text(resultMessage, 0, 180);
    }
    
}

let areaAtual = document.getElementById("areaAtual").innerText
if (areaAtual == "P1") {
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
} else if (areaAtual == "P2") {
        // Função para desenhar uma seta
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
} else if (areaAtual == "P3") {
    function checkAnswer() {
        // Pegar valores do usuário
        let userAngle = int(inputAngle.value());
        let userRadian = float(inputRadian.value());
        
        // Converter o ângulo correto para radianos
        let correctRadian = radians(angle);
        
        // Verificar se o ângulo e radiano estão corretos
        let angleCorrect = (userAngle === angle);
        let radianCorrect = (abs(userRadian - correctRadian) < 0.01); // Tolerância para radiano
        let mensagemResultado = document.getElementById("mensagemResultado")
    
        // Verificar respostas e atualizar a mensagem
        if (angleCorrect && radianCorrect) {
          resultMessage = "Correto! Ângulo e radiano estão certos!";
          mensagemResultado.innerText = resultMessage
        } else if (angleCorrect && !radianCorrect) {
          resultMessage = `Ângulo correto! Mas o radiano correto é ${correctRadian.toFixed(2)} rad.`;
          mensagemResultado.innerText = resultMessage
        } else if (!angleCorrect && radianCorrect) {
          resultMessage = `Radiano correto! Mas o ângulo correto é ${angle}°.`;
          mensagemResultado.innerText = resultMessage
        } else {
          resultMessage = `Errado! O ângulo correto é ${angle}° e ${correctRadian.toFixed(2)} rad.`;
          mensagemResultado.innerText = resultMessage
        }
      }
}

function checkAnswer() {
    // Pegar valores do usuário
    let userAngle = int(inputAngle.value());
    let userRadian = float(inputRadian.value());
    
    // Converter o ângulo correto para radianos
    let correctRadian = radians(angle);
    
    // Verificar se o ângulo e radiano estão corretos
    let angleCorrect = (userAngle === angle);
    let radianCorrect = (abs(userRadian - correctRadian) < 0.01); // Tolerância para radiano
    let mensagemResultado = document.getElementById("mensagemResultado")

    // Verificar respostas e atualizar a mensagem
    if (angleCorrect && radianCorrect) {
      resultMessage = "Correto! Ângulo e radiano estão certos!";
      mensagemResultado.innerText = resultMessage
    } else if (angleCorrect && !radianCorrect) {
      resultMessage = `Ângulo correto! Mas o radiano correto é ${correctRadian.toFixed(2)} rad.`;
      mensagemResultado.innerText = resultMessage
    } else if (!angleCorrect && radianCorrect) {
      resultMessage = `Radiano correto! Mas o ângulo correto é ${angle}°.`;
      mensagemResultado.innerText = resultMessage
    } else {
      resultMessage = `Errado! O ângulo correto é ${angle}° e ${correctRadian.toFixed(2)} rad.`;
      mensagemResultado.innerText = resultMessage
    }
  }




function checkScrollPosition() {
    let scrollPosition = window.scrollY;
    let totalHeight = document.body.scrollHeight;
    let areaAtual = document.getElementById("areaAtual")

    // console.log(`Posição do scroll: ${scrollPosition}`);
    // console.log(`Altura total da página: ${totalHeight}`);

    if (scrollPosition < totalHeight / 3) {
        areaAtual.innerText = "P1"
    } else if (scrollPosition < 2 * totalHeight / 3) {
        areaAtual.innerText = "P2"
    } else {
        areaAtual.innerText = "P3"
    }
}

