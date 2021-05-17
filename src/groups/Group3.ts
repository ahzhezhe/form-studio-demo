import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'single',
  ui: {
    title: 'Has senior heard about the Covid-19 vaccination?'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Yes' } },
    { ui: { title: 'No' } }
  ]
});

questions.push({
  type: 'multiple',
  ui: {
    title: 'How did senior learn about Covid-19 vaccination? Select all that apply.'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: 'Mainstream media (TV/radio news, ads, etc.)' } },
    { ui: { title: 'Word of mouth' } },
    { ui: { title: 'Social media platforms' } },
    { ui: { title: 'Government sources, e.g. invitation letter' } },
    { ui: { title: 'Out-of-home platforms (e.g. lift display)' } },
    { ui: { title: 'Others' }, onSelected: { enable: ['g3q2others'] } }
  ]
});

questions.push({
  id: 'g3q2others',
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

export const group3: GroupConfigs = {
  id: 'grp3',
  defaultDisabled: true,
  ui: { title: 'COVID-19 Vaccination - Awareness' },
  questions
};
