import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'softwareDeveloper',
  type: 'single',
  custom: {
    title: 'Are you a software developer?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'true', custom: { title: 'Yes' }, onSelected: { enable: ['grpSoftwareDevelopment'] } },
    { value: 'false', custom: { title: 'No' }, onSelected: { enable: ['jobProfession'] } }
  ]
});

questions.push({
  id: 'jobProfession',
  defaultDisabled: true,
  type: 'single',
  custom: {
    title: 'What is your job profession?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'engineer', custom: { title: 'Engineer' } },
    { value: 'doctor', custom: { title: 'Doctor' } },
    { value: 'lawyer', custom: { title: 'Lawyer' } },
    { value: 'other', custom: { title: 'Other' }, onSelected: { enable: ['jobProfessionOther'] } }
  ]
});

questions.push({
  id: 'jobProfessionOther',
  defaultDisabled: true,
  type: 'any',
  custom: {
    inputType: 'string',
    sub: true,
    title: 'Please specify',
    placeholder: 'Job Profession',
    maxLength: 100
  },
  validators: ['notNull']
});

export const group2: GroupConfigs = {
  custom: { title: 'Job Profession' },
  questions
};
