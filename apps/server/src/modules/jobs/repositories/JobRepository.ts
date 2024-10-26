import { IJobRepository } from '../interfaces/index.js'
import { JobsInjectableDependencies } from '../types/index.js'
import { SqlClient } from '@/types/index.js'
import { CREATE_JOB_SCHEMA_TYPE, Job } from '@skill-swap/shared'

export class JobRepository implements IJobRepository {
  private readonly sql: SqlClient

  constructor({ sql }: JobsInjectableDependencies) {
    this.sql = sql
  }

  async findMany(): Promise<Job[]> {
    return this.sql<Job[]>`
      with job_salaries AS (
        select
          j.id AS job_id,
          js.amount,
          js.currency
        from
          jobs j
        join
          job_salaries js ON j.id = js.job_id
      ),
      job_skills AS (
        select
          j.id AS job_id,
          s.name AS skill_name,
          sl.name AS skill_level
        from
          jobs j
        join
          job_skills js ON j.id = js.job_id
        join
          skills s ON js.skill_id = s.id
        join
          skill_levels sl ON js.skill_level_id = sl.id
      )
      select
        j.id AS id,
        j.name AS name,
        j.description,
        j.is_cv_required,
        j.is_fulltime,
        j.is_remote,
        j.is_active,
        j.is_hidden,
        j.are_students_allowed,
        json_build_object('amount', js.amount, 'currency', js.currency) AS salary,
        json_agg(json_build_object('name', jk.skill_name, 'level', jk.skill_level)) AS skills
      from
        jobs j
      left join
        job_salaries js ON j.id = js.job_id
      left join
        job_skills jk ON j.id = jk.job_id
      group by
        j.id, js.amount, js.currency;
    `
  }

  async findCompanyJobs(companyId: number): Promise<Job[]> {
    return this.sql<Job[]>`
      with job_salaries AS (
        select
          j.id AS job_id,
          js.amount,
          js.currency
        from
          jobs j
        join
          job_salaries js ON j.id = js.job_id
      ),
      job_skills AS (
        select
          j.id AS job_id,
          s.name AS skill_name,
          sl.name AS skill_level
        from
          jobs j
        join
          job_skills js ON j.id = js.job_id
        join
          skills s ON js.skill_id = s.id
        join
          skill_levels sl ON js.skill_level_id = sl.id
      )
      select
        j.id AS id,
        j.name AS name,
        j.description,
        j.is_cv_required,
        j.is_fulltime,
        j.is_active,
        j.is_hidden,
        j.is_remote,
        j.are_students_allowed,
        json_build_object('amount', js.amount, 'currency', js.currency) AS salary,
        json_agg(json_build_object('name', jk.skill_name, 'level', jk.skill_level)) AS skills
      from
        jobs j
      left join
        job_salaries js ON j.id = js.job_id
      left join
        job_skills jk ON j.id = jk.job_id
      where
        j.company_id = ${companyId}
      group by
        j.id, js.amount, js.currency
    `
  }

  async createOne(
    companyId: number,
    data: CREATE_JOB_SCHEMA_TYPE,
  ): Promise<void> {
    const {
      name,
      description,
      isCvRequired,
      isFulltime,
      isRemote,
      areStudentsAllowed,
      salary,
      categoryId,
      positionId,
      cityId,
    } = data

    const jobs = await this.sql<{ id: number }[]>`
      insert into jobs
        (
          name,
          description,
          is_cv_required,
          is_fulltime,
          is_remote,
          are_students_allowed,
          company_id,
          category_id,
          position_id,
          city_id,
          is_active,
          is_hidden
        )
      values
        (
          ${name},
          ${description},
          ${isCvRequired},
          ${isFulltime},
          ${isRemote},
          ${areStudentsAllowed},
          ${companyId},
          ${categoryId},
          ${positionId},
          ${cityId},
          true,
          false
        )
      returning id
    `

    const job = jobs.at(0) as { id: number }

    await this.sql`
      insert into job_salaries
        (job_id, amount, currency)
      values
        (${job.id}, ${salary.amount}, ${salary.currency})
    `
  }
}
