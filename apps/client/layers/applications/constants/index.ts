import { APPLICATION_STAGES_SCHEMA } from '@skill-swap/shared'

export const APPLICATION_STAGES = APPLICATION_STAGES_SCHEMA.exclude([
  'All',
]).options
