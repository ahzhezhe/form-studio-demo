import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'multiple',
  ui: {
    title: 'Appeals'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: 'None' }, onSelected: { disable: ['g7q1c2', 'g7q1c3', 'g7q1c4', 'g7q1c5'] } },
    { id: 'g7q1c2', ui: { title: 'MGP' } },
    { id: 'g7q1c3', ui: { title: 'PGP' } },
    { id: 'g7q1c4', ui: { title: 'SSS' } },
    { id: 'g7q1c5', ui: { title: 'GST-V' } }
  ]
});

export const group7: GroupConfigs = {
  ui: { title: 'Appeals' },
  questions
};
