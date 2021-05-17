import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'single',
  ui: {
    title: 'Is senior able to register for Covid-19 vaccination without assistance?'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Yes' } },
    { ui: { title: 'No' }, onSelected: { enable: ['g5q2'] } }
  ]
});

questions.push({
  id: 'g5q2',
  defaultDisabled: true,
  type: 'multiple',
  ui: {
    title: 'How did senior learn about Covid-19 vaccination? Select all that apply.'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: 'Online appointment booking' } },
    { ui: { title: 'Escort to vaccination location' } },
    { ui: { title: 'More information about vaccination' } },
    { ui: { title: 'Others' }, onSelected: { enable: ['g5q2others'] } }
  ]
});

questions.push({
  id: 'g5q2others',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    sub: true,
    title: 'Please specify',
    maxLength: 250
  },
  validators: ['notNull']
});

export const group5: GroupConfigs = {
  id: 'grp5',
  defaultDisabled: true,
  ui: { title: 'COVID-19 Vaccination - Assistance' },
  questions
};
