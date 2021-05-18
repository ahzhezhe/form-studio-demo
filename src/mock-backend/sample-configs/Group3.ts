import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'programmingLanguages',
  type: 'multiple',
  ui: {
    title: 'What programming languages have you used in the past?'
  },
  validators: ['notNullMultiple'],
  validation: { min: 1 },
  choices: [
    { id: 'programmingLanguagesJavascript', value: 'javascript', ui: { title: 'Javascript' }, onSelected: { enable: ['react'] } },
    { id: 'programmingLanguagesJava', value: 'java', ui: { title: 'Java' }, onSelected: { enable: ['spring'] } },
    { id: 'programmingLanguagesPython', value: 'python', ui: { title: 'Python' } },
    { id: 'programmingLanguagesC++', value: 'c++', ui: { title: 'C++' } },
    { id: 'programmingLanguagesC#', value: 'c#', ui: { title: 'C#' } },
    { id: 'programmingLanguagesVbnet', value: 'vbnet', ui: { title: 'VB.NET' } },
    { id: 'programmingLanguagesOthers', value: 'others', ui: { title: 'Others' }, onSelected: { enable: ['programmingLanguagesOthersDescription'] } }
  ]
});

questions.push({
  id: 'programmingLanguagesOthersDescription',
  defaultDisabled: true,
  type: 'any',
  ui: {
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
  type: 'single',
  ui: {
    title: 'Have you used React in the past?'
  },
  validators: ['notNullSingle'],
  choices: [
    { id: 'reactYes', value: true, ui: { title: 'Yes' }, onSelected: { enable: ['reactExperience'] } },
    { id: 'reactNo', value: false, ui: { title: 'No' } }
  ]
});

questions.push({
  id: 'reactExperience',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    title: 'What did you build with React?',
    maxLength: 100
  },
  validators: ['notNull']
});

questions.push({
  id: 'spring',
  defaultDisabled: true,
  type: 'single',
  ui: {
    title: 'Have you used Spring in the past?'
  },
  validators: ['notNullSingle'],
  choices: [
    { id: 'springYes', value: true, ui: { title: 'Yes' }, onSelected: { enable: ['springExperience'] } },
    { id: 'springNo', value: false, ui: { title: 'No' } }
  ]
});

questions.push({
  id: 'springExperience',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    title: 'What did you build with Spring?',
    maxLength: 100
  },
  validators: ['notNull']
});

export const group3: GroupConfigs = {
  id: 'grpSoftwareDevelopment',
  defaultDisabled: true,
  ui: { title: 'Software Development' },
  questions
};
