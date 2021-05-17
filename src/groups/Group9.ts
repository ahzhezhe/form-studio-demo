import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  type: 'single',
  ui: {
    title: 'Did the senior/caregiver (as the case may be) agree to the Government and its related organisations disclosing his/her information from the National Electronic Health Record to the Agency for Integrated Care Pte. Ltd. ("AIC") (which SGO is a department of) and agree to AIC collecting, using and disclosing his/her information (including information from the National Electronic Health Records) to other persons/organisations for the following purposes: (i) to facilitate the provision of services or assistance to the caregiver and the senior (including senior and health services, and financial background checks where necessary), and/or (ii) for data analysis and policy formulation?'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Yes' } },
    { ui: { title: 'No' } }
  ]
});

questions.push({
  type: 'single',
  ui: {
    title: 'Did the senior/caregiver (as the case may be) agree to being contacted or visited by AIC or other third parties for the following purposes: to (i) share updates, new benefits and announcments from the Government, (ii) make appointments, and/or (iii) facilitate the provision of services or assistance to the caregiver and the senior?'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Yes' }, onSelected: { enable: ['g9q3', 'g9q7', 'g9q8', 'g9q9', 'g9q10', 'g9q11'] } },
    { ui: { title: 'No' } }
  ]
});

questions.push({
  id: 'g9q3',
  defaultDisabled: true,
  type: 'single',
  ui: {
    title: 'If select Yes,'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'No contact number' } },
    { ui: { title: 'Email' }, onSelected: { enable: ['g9q4'] } },
    { ui: { title: 'Call first' }, onSelected: { enable: ['g9q5', 'g9q6'] } }
  ]
});

questions.push({
  id: 'g9q4',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    title: 'Email address',
    maxLength: 250
  },
  validators: ['email']
});

questions.push({
  id: 'g9q5',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    title: 'Phone number',
    maxLength: 8
  },
  validators: ['phone']
});

questions.push({
  id: 'g9q6',
  defaultDisabled: true,
  type: 'single',
  ui: {
    title: 'Prepaid card?'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Yes' } },
    { ui: { title: 'No' } }
  ]
});

questions.push({
  id: 'g9q7',
  defaultDisabled: true,
  type: 'single',
  ui: {
    title: 'Relationship'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Family member' } },
    { ui: { title: 'Senior him/herself' } },
    { ui: { title: 'Others' }, onSelected: { enable: ['g9q7others'] } }
  ]
});

questions.push({
  id: 'g9q7others',
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
  id: 'g9q8',
  defaultDisabled: true,
  type: 'single',
  ui: {
    title: 'Title'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Ms.' } },
    { ui: { title: 'Mrs.' } },
    { ui: { title: 'Mdm.' } },
    { ui: { title: 'Mr.' } }
  ]
});

questions.push({
  id: 'g9q9',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    title: 'Name',
    maxLength: 60
  },
  validators: ['notNull']
});

questions.push({
  id: 'g9q10',
  defaultDisabled: true,
  type: 'single',
  ui: {
    title: 'Preferred day'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Any' } },
    { ui: { title: 'Weekday' } },
    { ui: { title: 'Weekend' } }
  ]
});

questions.push({
  id: 'g9q11',
  defaultDisabled: true,
  type: 'single',
  ui: {
    title: 'Preferred time'
  },
  validators: ['notNullSingle'],
  choices: [
    { ui: { title: 'Any' } },
    { ui: { title: 'Morning' } },
    { ui: { title: 'Afternoon' } },
    { ui: { title: 'Night' } }
  ]
});

export const group9: GroupConfigs = {
  ui: { title: 'Consent Clause' },
  questions
};
