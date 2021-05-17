import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'single',
  ui: {
    title: 'Has senior taken the COVID-19 vaccination?'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Yes' } },
    { ui: { title: 'No' }, onSelected: { enable: ['grp3', 'grp4', 'grp5'] } }
  ]
});

questions.push({
  type: 'single',
  ui: {
    title: 'How confident is senior that the Covid-19 vaccines have been thoroughly tested for safety and effectiveness?'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Not confident at all' } },
    { ui: { title: 'Confident' } },
    { ui: { title: 'Very Confident' } }
  ]
});

export const group2: GroupConfigs = {
  ui: { title: 'COVID-19 Vaccination - General' },
  questions
};
