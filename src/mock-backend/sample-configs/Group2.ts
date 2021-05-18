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
    { id: 'softwareDeveloperYes', value: true, ui: { title: 'Yes' }, onSelected: { enable: ['grpSoftwareDevelopment'] } },
    { id: 'softwareDeveloperNo', value: false, ui: { title: 'No' }, onSelected: { enable: ['jobProfession'] } }
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
    { id: 'jobProfessionEngineer', value: 'engineer', ui: { title: 'Engineer' } },
    { id: 'jobProfessionDoctor', value: 'doctor', ui: { title: 'Doctor' } },
    { id: 'jobProfessionLawyer', value: 'lawyer', ui: { title: 'Lawyer' } },
    { id: 'jobProfessionOther', value: 'other', ui: { title: 'Other' }, onSelected: { enable: ['jobProfessionOtherDescription'] } }
  ]
});

questions.push({
  id: 'jobProfessionOtherDescription',
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
  id: 'grpJobProfession',
  ui: { title: 'Job Profession' },
  questions
};
