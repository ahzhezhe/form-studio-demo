import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'name',
  type: 'any',
  ui: {
    inputType: 'name',
    title: 'What is your name?'
  },
  validators: ['name']
});

questions.push({
  id: 'gender',
  type: 'single',
  ui: {
    title: 'What is your gender?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'male', ui: { title: 'Male' } },
    { value: 'female', ui: { title: 'Female' } }
  ]
});

export const group1: GroupConfigs = {
  id: 'grpBasicInformation',
  ui: { title: 'Basic Information' },
  questions
};
