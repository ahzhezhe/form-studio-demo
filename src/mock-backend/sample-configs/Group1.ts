import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'name',
  type: 'any',
  custom: {
    inputType: 'string',
    title: 'What is your name?',
    placeholder: 'Name',
    maxLength: 100
  },
  validators: ['notNull']
});

questions.push({
  id: 'gender',
  type: 'choice',
  custom: {
    title: 'What is your gender?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'male', custom: { title: 'Male' } },
    { value: 'female', custom: { title: 'Female' } }
  ]
});

export const group1: GroupConfigs = {
  custom: { title: 'Basic Information' },
  questions
};
