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
    { id: 'programmingLanguages_javascript', value: 'javascript', custom: { title: 'Javascript' } },
    { id: 'programmingLanguages_java', value: 'java', custom: { title: 'Java' } },
    { id: 'programmingLanguages_python', value: 'python', custom: { title: 'Python' } },
    { id: 'programmingLanguages_c++', value: 'c++', custom: { title: 'C++' } },
    { id: 'programmingLanguages_c#', value: 'c#', custom: { title: 'C#' } },
    { id: 'programmingLanguages_vbnet', value: 'vbnet', custom: { title: 'VB.NET' } },
    { id: 'programmingLanguages_others', value: 'others', custom: { title: 'Others' } }
  ]
});

questions.push({
  id: 'programmingLanguagesOthers',
  defaultDisabled: true,
  enabledOnSelected: [['programmingLanguages_others']],
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
  enabledOnSelected: [['programmingLanguages_javascript']],
  type: 'choice',
  custom: {
    title: 'Have you used React in the past?'
  },
  validators: ['notNullSingle'],
  choices: [
    { id: 'react_true', value: 'true', custom: { title: 'Yes' } },
    { id: 'react_false', value: 'false', custom: { title: 'No' } }
  ]
});

questions.push({
  id: 'reactExperience',
  defaultDisabled: true,
  enabledOnSelected: [['react_true']],
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
  enabledOnSelected: [['programmingLanguages_java']],
  type: 'choice',
  custom: {
    title: 'Have you used Spring in the past?'
  },
  validators: ['notNullSingle'],
  choices: [
    { id: 'spring_true', value: 'true', custom: { title: 'Yes' } },
    { id: 'spring_false', value: 'false', custom: { title: 'No' } }
  ]
});

questions.push({
  id: 'springExperience',
  defaultDisabled: true,
  enabledOnSelected: [['spring_true']],
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
  enabledOnSelected: [['softwareDeveloper_true']],
  custom: { title: 'Software Development' },
  questions
};
