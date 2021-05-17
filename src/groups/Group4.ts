import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'single',
  ui: {
    title: 'Is senior interested to take the Covid-19 vaccination?'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Yes' }, onSelected: { enable: ['g4q2'] } },
    { ui: { title: 'No' }, onSelected: { enable: ['g4q3', 'g4q4'] } }
  ]
});

questions.push({
  id: 'g4q2',
  defaultDisabled: true,
  type: 'multiple',
  ui: {
    title: 'If senior is interested, indicate why. Select all that apply.'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: "Due to higher risk of exposure or infection due to senior's work or lifestyle or living with healthcare/frontline workers" } },
    { ui: { title: 'Due to age and/or health conditions' } },
    { ui: { title: 'Senior wants to protect those whom he lives/interacts with, e.g. family, co-workers, friends, etc.' } },
    { ui: { title: 'Afraid of getting infected in the community' } },
    { ui: { title: 'Hopes for life to return to normal, e.g. wants to travel again, visit others freely, etc.' } },
    { ui: { title: 'Others' }, onSelected: { enable: ['g4q2other'] } }
  ]
});

questions.push({
  id: 'g4q2other',
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

questions.push({
  id: 'g4q3',
  defaultDisabled: true,
  type: 'multiple',
  ui: {
    title: 'If senior is not interested, indicate why. Select all that apply.'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: 'Wait and see approach' } },
    { ui: { title: 'Fear of vaccination' } },
    { ui: { title: 'Opposes vaccination' } },
    { ui: { title: 'Feels it is unnecessary as risk of infection is low' } },
    { ui: { title: 'Unsure of effectiveness in providing protection' } },
    { ui: { title: 'Unsure of side-effects or long-term safety of the vaccine' } },
    { ui: { title: 'Ineligible due to existing medical conditions' } },
    { ui: { title: 'Others' }, onSelected: { enable: ['g4q3other'] } }
  ]
});

questions.push({
  id: 'g4q3other',
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

questions.push({
  id: 'g4q4',
  defaultDisabled: true,
  type: 'multiple',
  ui: {
    title: 'If senior is not interested, indicate why. Select all that apply.'
  },
  validators: ['atLeast1'],
  choices: [
    { ui: { title: 'If doctor recommends it' } },
    { ui: { title: 'If family/friends recommend it' } },
    { ui: { title: 'If family/friends have taken it' } },
    { ui: { title: 'No reports of adverse effects' } },
    { ui: { title: 'Others' }, onSelected: { enable: ['g4q4other'] } }
  ]
});

questions.push({
  id: 'g4q4other',
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

export const group4: GroupConfigs = {
  id: 'grp4',
  defaultDisabled: true,
  ui: { title: 'COVID-19 Vaccination - Interest' },
  questions
};
