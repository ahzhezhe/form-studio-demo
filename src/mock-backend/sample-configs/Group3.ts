import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'programmingLanguages',
  type: 'choices',
  custom: {
    title: 'What programming languages have you used in the past?',
    min: 1
  },
  validators: ['notNullMultiple'],
  choices: [
    { value: 'javascript', custom: { title: 'Javascript' }, onSelected: { enable: ['react'] } },
    { value: 'java', custom: { title: 'Java' }, onSelected: { enable: ['spring'] } },
    { value: 'python', custom: { title: 'Python' } },
    { value: 'c++', custom: { title: 'C++' } },
    { value: 'c#', custom: { title: 'C#' } },
    { value: 'vbnet', custom: { title: 'VB.NET' } },
    { value: 'others', custom: { title: 'Others' }, onSelected: { enable: ['programmingLanguagesOthers'] } }
  ]
});

questions.push({
  id: 'programmingLanguagesOthers',
  defaultDisabled: true,
  type: 'any',
  custom: {
    inputType: 'string',
    sub: true,
    title: 'Please specify',
    placeholder: 'Programming Languages',
    maxLength: 100
  },
  validators: ['notNull']
});

questions.push({
  id: 'react',
  defaultDisabled: true,
  type: 'choice',
  custom: {
    title: 'Have you used React in the past?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'true', custom: { title: 'Yes' }, onSelected: { enable: ['reactExperience'] } },
    { value: 'false', custom: { title: 'No' } }
  ]
});

questions.push({
  id: 'reactExperience',
  defaultDisabled: true,
  type: 'any',
  custom: {
    inputType: 'string',
    title: 'What did you build with React?',
    maxLength: 100
  },
  validators: ['notNull']
});

questions.push({
  id: 'spring',
  defaultDisabled: true,
  type: 'choice',
  custom: {
    title: 'Have you used Spring in the past?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'true', custom: { title: 'Yes' }, onSelected: { enable: ['springExperience'] } },
    { value: 'false', custom: { title: 'No' } }
  ]
});

questions.push({
  id: 'springExperience',
  defaultDisabled: true,
  type: 'any',
  custom: {
    inputType: 'string',
    title: 'What did you build with Spring?',
    maxLength: 100
  },
  validators: ['notNull']
});

export const group3: GroupConfigs = {
  id: 'grpSoftwareDevelopment',
  defaultDisabled: true,
  custom: { title: 'Software Development' },
  questions
};
