export function getStudentAnswers(questions: any): string[]{
    const answers: string[] = [];
    for(let i = 0; i< questions.length; i++){
      for(let j = 0; j< questions[i].answers.length; j++){
        answers.push(questions[i].answers[j]);
      }
    }
    return answers;
  }