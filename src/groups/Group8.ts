import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'multiple',
  ui: {
    title: 'CNS-related referrals'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: 'None' }, onSelected: { disable: ['g8q1c2', 'g8q1c3', 'g8q1c4', 'g8q1c5', 'g8q1c6', 'g8q1c7', 'g8q1c8', 'g8q1c9', 'g8q1c10'] } },
    { id: 'g8q1c2', ui: { title: 'FS' } },
    { id: 'g8q1c3', ui: { title: 'Exercises' } },
    { id: 'g8q1c4', ui: { title: 'Nutrition Classes' } },
    { id: 'g8q1c5', ui: { title: 'Health Talks' } },
    { id: 'g8q1c6', ui: { title: 'Excursions' } },
    { id: 'g8q1c7', ui: { title: 'Befriending' } },
    { id: 'g8q1c8', ui: { title: 'CareLine' } },
    { id: 'g8q1c9', ui: { title: 'Caregiver Support' } },
    { id: 'g8q1c10', ui: { title: 'Community Care & Support Services (including ad-hoc errands)' } }
  ]
});

export const group8: GroupConfigs = {
  ui: { title: 'CNS-related Referrals' },
  questions
};
