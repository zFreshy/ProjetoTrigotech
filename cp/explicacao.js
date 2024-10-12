// function setup() {
//     let desafioCanva = createCanvas(400, 400);
//     desafioCanva.parent("#desafio")
    
//     // Gerar ângulo aleatório para a seta (0° a 360°)
//     angle = int(random(0, 360));
    
//     // Criar inputs para o usuário inserir ângulo e radiano
//     inputAngle = createInput('');
//     inputAngle.size(100);
//     inputAngle.attribute('placeholder', 'Ângulo (graus)');
//     inputAngle.parent("#desafio")
    
//     inputRadian = createInput('');
//     inputRadian.size(100);
//     inputRadian.attribute('placeholder', 'Radiano');
//     inputRadian.parent("#desafio")
    
//     // Botão para verificar resposta
//     let button = createButton('Verificar');
//     button.mousePressed(checkAnswer);
//     button.parent("#desafio")
//   }

//   function draw() {
//     background(255);
    
//     // Desenhar o círculo com os pontos notáveis
//     translate(width / 2, height / 2);
//     stroke(0);
//     noFill();
//     ellipse(0, 0, 300, 300);
    
//     // Marcar os pontos notáveis
//     fill(0);
//     noStroke();
//     textAlign(CENTER, CENTER);
//     text("0°", 150, 0);       // 0°
//     text("90°", 0, -150);     // 90°
//     text("180°", -150, 0);    // 180°
//     text("270°", 0, 150);     // 270°
    
//     // Desenhar a seta corretamente no ângulo (em sentido horário)
//     stroke(0);
//     let x = 150 * cos(radians(-angle)); // Usar -angle para garantir sentido horário
//     let y = 150 * sin(radians(-angle));
//     line(0, 0, x, y);
    
//     // Mostrar mensagem de resultado
//     textSize(16);
//     fill(0);
//     noStroke();
//     // text(resultMessage, 0, 180);
//   }

//   function checkAnswer() {
//     // Pegar valores do usuário
//     let userAngle = int(inputAngle.value());
//     let userRadian = float(inputRadian.value());
    
//     // Converter o ângulo correto para radianos
//     let correctRadian = radians(angle);
    
//     // Verificar se o ângulo e radiano estão corretos
//     let angleCorrect = (userAngle === angle);
//     let radianCorrect = (abs(userRadian - correctRadian) < 0.01); // Tolerância para radiano
//     let mensagemResultado = document.getElementById("mensagemResultado")

//     // Verificar respostas e atualizar a mensagem
//     if (angleCorrect && radianCorrect) {
//       resultMessage = "Correto! Ângulo e radiano estão certos!";
//       mensagemResultado.innerText = resultMessage
//     } else if (angleCorrect && !radianCorrect) {
//       resultMessage = `Ângulo correto! Mas o radiano correto é ${correctRadian.toFixed(2)} rad.`;
//       mensagemResultado.innerText = resultMessage
//     } else if (!angleCorrect && radianCorrect) {
//       resultMessage = `Radiano correto! Mas o ângulo correto é ${angle}°.`;
//       mensagemResultado.innerText = resultMessage
//     } else {
//       resultMessage = `Errado! O ângulo correto é ${angle}° e ${correctRadian.toFixed(2)} rad.`;
//       mensagemResultado.innerText = resultMessage
//     }
//   }