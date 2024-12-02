const EMPLOYMENT_TYPES = [
  {
    id: 'full-time',
    label: 'Full-time',
  },
  {
    id: 'part-time',
    label: 'Part-time',
  },
] as const

const SUITABLE_FOR = [
  {
    id: 'students',
    label: 'Students',
  },
  {
    id: 'remote',
    label: 'Remote workers',
  },
  {
    id: 'without-cv',
    label: 'People without CV',
  },
] as const

const SALARY_PERIODS = [
  {
    id: 'one-time',
    label: 'One time',
  },
  {
    id: 'weekly',
    label: 'Weekly',
  },
  {
    id: 'monthly',
    label: 'Monthly',
  },
  {
    id: 'yearly',
    label: 'Yearly',
  },
] as const

const SALARY_CURRENCIES = ['USD', 'EUR', 'UAH'] as const

export { EMPLOYMENT_TYPES, SUITABLE_FOR, SALARY_PERIODS, SALARY_CURRENCIES }
