import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'single',
  ui: {
    title: "Has senior's health, social or financial situation changed since the last engagement?"
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Yes' }, onSelected: { enable: ['g1q2'] } },
    { ui: { title: 'No' } }
  ]
});

questions.push({
  id: 'g1q2',
  defaultDisabled: true,
  type: 'multiple',
  ui: {
    title: 'If yes, in what area(s)? Select all that apply.'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: "Senior's health has deteriorated" } },
    { ui: { title: 'Senior is at risk of social isolation' } },
    { ui: { title: 'Senior needs financial assistance' } },
    { ui: { title: 'Others' }, onSelected: { enable: ['g1q2others'] } }
  ]
});

questions.push({
  id: 'g1q2others',
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

export const group1: GroupConfigs = {
  ui: { title: 'Check-in' },
  questions
};
