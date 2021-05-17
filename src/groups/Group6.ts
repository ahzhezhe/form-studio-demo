import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'multiple',
  ui: {
    title: 'For assistance related to vaccine appointment booking, indicate FUA as Covid-19 Vaccination Booking. For medical escort service to vaccination centres, select Medical Escort & Transport.)'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: 'None' }, onSelected: { disable: ['g6q1c2', 'g6q1c3', 'g6q1c4', 'g6q1c5', 'g6q1c6', 'g6q1c7', 'g6q1c8', 'g6q1c9', 'g6q1c10', 'g6q1c11', 'g6q1c12', 'g6q1c13', 'g6q1c14', 'g6q1c15', 'g6q1c16', 'g6q1c17', 'g6q1c18', 'g6q1c19'] } },
    { id: 'g6q1c2', ui: { title: 'CHAS' } },
    { id: 'g6q1c3', ui: { title: 'EASE' } },
    { id: 'g6q1c4', ui: { title: 'SMF' } },
    { id: 'g6q1c5', ui: { title: 'DAS' } },
    { id: 'g6q1c6', ui: { title: 'ESHL' } },
    { id: 'g6q1c7', ui: { title: 'Financial Assistance' } },
    { id: 'g6q1c8', ui: { title: 'Employment' } },
    { id: 'g6q1c9', ui: { title: 'HCG' } },
    { id: 'g6q1c10', ui: { title: 'Food Ration' } },
    { id: 'g6q1c11', ui: { title: 'IDAPE' } },
    { id: 'g6q1c12', ui: { title: 'ElderFund' } },
    { id: 'g6q1c13', ui: { title: 'COVID-19 Support Schemes' } },
    { id: 'g6q1c14', ui: { title: 'COVID-19 Vaccination Booking' } },
    { id: 'g6q1c15', ui: { title: 'Medical Escort & Transport' } },
    { id: 'g6q1c16', ui: { title: 'Digital Access Schemes' } },
    { id: 'g6q1c17', ui: { title: 'Digital Assistance' } },
    { id: 'g6q1c18', ui: { title: 'Escort (To Vaccination Centres)' } },
    { id: 'g6q1c19', ui: { title: 'Others' }, onSelected: { enable: ['g6q1others'] } }
  ]
});

questions.push({
  id: 'g6q1others',
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

export const group6: GroupConfigs = {
  ui: { title: 'Follow-up Actions (FUAs)' },
  questions
};
