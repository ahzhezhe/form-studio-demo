import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'softwareDeveloper',
  type: 'choice',
  custom: {
    title: 'Are you a software developer?'
  },
  validators: ['notNullSingle'],
  choices: [
    { id: 'softwareDeveloper_true', value: 'true', custom: { title: 'Yes' } },
    { id: 'softwareDeveloper_false', value: 'false', custom: { title: 'No' } }
  ]
});

questions.push({
  id: 'jobProfession',
  defaultDisabled: true,
  enabledOnSelected: [['softwareDeveloper_false']],
  type: 'choice',
  custom: {
    title: 'What is your job profession?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'engineer', custom: { title: 'Engineer' } },
    { value: 'doctor', custom: { title: 'Doctor' } },
    { value: 'lawyer', custom: { title: 'Lawyer' } },
    { id: 'jobProfession_other', value: 'other', custom: { title: 'Other' } }
  ]
});

questions.push({
  id: 'jobProfessionOther',
  defaultDisabled: true,
  enabledOnSelected: [['jobProfession_other']],
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
