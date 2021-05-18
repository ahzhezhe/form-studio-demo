import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'softwareDeveloper',
  type: 'single',
  ui: {
    title: 'Are you a software developer?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: true, ui: { title: 'Yes' }, onSelected: { enable: ['softwareDevelopment'] } },
    { value: false, ui: { title: 'No' }, onSelected: { enable: ['jobProfession'] } }
  ]
});

questions.push({
  id: 'jobProfession',
  defaultDisabled: true,
  type: 'single',
  ui: {
    title: 'What is your job profession?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'engineer', ui: { title: 'Engineer' } },
    { value: 'doctor', ui: { title: 'Doctor' } },
    { value: 'lawyer', ui: { title: 'Lawyer' } },
    { value: 'other', ui: { title: 'Other' }, onSelected: { enable: ['jobProfessionOther'] } }
  ]
});

questions.push({
  id: 'jobProfessionOther',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    sub: true,
    title: 'Please specify',
    placeholder: 'Job Profession',
    maxLength: 100
  },
  validators: ['notNull']
});

export const group2: GroupConfigs = {
  ui: { title: 'Job Profession' },
  questions
};
