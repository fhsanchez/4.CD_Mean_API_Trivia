// Procedimiento que llama a la API obteniendo
// las preguntas y respuestas de la Trivia
function callApi(id_categoria){

    let url = "https://opentdb.com/api.php?amount=3&category=" + id_categoria;
  
    const fetchPromise = fetch(url);
    let questions;
    fetchPromise
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {   
        let textHTML = generateHTML(id_categoria, data);
        showQuestions(id_categoria, textHTML);
        
      })
      .catch((error) => {    
        console.error(`No se puede ejecutar la API: ${error}`);
      });
    }

// Funcion que construye el HTML dinámico con preguntas y respuestas
// de la trivia
function generateHTML(id_categoria, questions){

  let textHTML = '';
  let incorrect_answers = [];  
  
  for(let i=0;i<=2;i++){
    // Genera opciones o alterantivas
    incorrect_answers = questions.results[i].incorrect_answers;
    let options = '';

    for(let j=0;j<=incorrect_answers.length-1;j++){  
      options = options + '<br><input type="radio" name="question_' + i 
      + '" value="' + incorrect_answers[j]   + '">'
      + '<span class="incorr_answ">' + incorrect_answers[j] + '</span>';
    }

    let question = questions.results[i].question;
    let correct_answer = questions.results[i].correct_answer;

    // ATENCION: La respuesta correcta siempre va al Final, se debe mejorar para
    // que sea en forma aleatoria, en primer, segundo, tercer o cuarto lugar
    options = options + '<label for="question_"' + i + '></label>'
    options = options + '<br><input type="radio" name="question_' + i 
      + '" value="' + correct_answer   + '">'
      + '<span class="incorr_answ">' + correct_answer + '</span>';
       

    textHTML = textHTML + '<div class="questions">' 
           +'<article class="points"></article>' 
           + '<article class="question">' 
           + question 
           + '<div class="options">' + options + '</div>'
           + '</article>'
           + '<article class="answer" onclick="showAnswer(' + i  + ')">Comprobación</article>'           
           + '<input type="hidden" id="answer_' + i + '" value="' + correct_answer + '">'; 
          + '</div>'
}

    return textHTML;      
}


// Imprime en pantalla el código HTML resultante    
function showQuestions(id_categoria, textHTML){  

  switch (id_categoria){
      case 21:          
        document.querySelector('#category_1_questions').innerHTML = textHTML;
        break;
      case 22:
        document.querySelector('#category_2_questions').innerHTML = textHTML;
        break;
      case 23:
        document.querySelector('#category_3_questions').innerHTML = textHTML;
          break;
    }
}

// Funcion que muestra la respuesta correcta dependiendo del # pregunta
function showAnswer(question_number){    
    let answer_correct = '';
    answer_correct = document.querySelector('#answer_' + question_number).value; 
    alert('Respuesta Seleccionada: ' + document.querySelector('input[name=question_' + question_number + ']:checked').value);
    alert('Respuesta Correcta: ' + answer_correct);
    

    // Ejemplo obtener check seleccionado
    // console.log(document.querySelector('input[name=gender]:checked').value)
}


// // Agrega en tiempo real el numero de pregunta
// // para luego el sistema muestre la respuesta

// let tags = document.querySelectorAll('.answer'); 
//   for(let i=0;i<=8;i++){        
//       tags[i].addEventListener("click", function() {
//         showAnswer(i);
//       });        
//   } 
