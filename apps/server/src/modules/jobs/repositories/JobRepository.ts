import { SqlClient } from 'types/index.js'
import { IJobRepository } from '../interfaces/index.js'
import { JobsInjectableDependencies } from '../types/index.js'
import { Job } from 'schemas/models/job.js'
import { CreateJob } from '../schemas/index.js'

export class JobRepository implements IJobRepository {
  private readonly sql: SqlClient

  constructor({ sql }: JobsInjectableDependencies) {
    this.sql = sql
  }

  async findMany(): Promise<Job[]> {
    return this.sql`
      with job_salaries AS (
        select
          j.id AS job_id,
          js.salary,
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
        j.are_students_allowed,
        j.are_retirees_allowed,
        j.are_disabled_allowed,
        json_build_object('amount', js.salary, 'currency', js.currency) AS salary,
        json_agg(json_build_object('name', jk.skill_name, 'level', jk.skill_level)) AS skills
      from
        jobs j
      LEFT JOIN
        job_salaries js ON j.id = js.job_id
      left join
        job_skills jk ON j.id = jk.job_id
      group by
        j.id, js.salary, js.currency;
    `
  }

  async createOne(data: CreateJob): Promise<void> {
    const {
      name,
      description,
      isCvRequired,
      isFulltime,
      areDisabledAllowed,
      areRetireesAllowed,
      areStudentsAllowed,
      salary,
      employerId,
      categoryId,
      positionId,
    } = data

    const query = `
      insert into jobs
        (
          name,
          description,
          is_cv_required,
          is_fulltime,
          are_disabled_allowed,
          are_retirees_allowed,
          are_students_allowed,
          employer_id,
          category_id,
          position_id,
          city_id
        )
      values
        (
          ${name},
          ${description},
          ${isCvRequired},
          ${isFulltime},
          ${areDisabledAllowed}
          ${areRetireesAllowed}
          ${areStudentsAllowed}
          ${employerId},
          ${categoryId},
          ${positionId}
        )
      returning id
    `

    console.log(query)

    const jobs = await this.sql<{ id: number }[]>`
      insert into jobs
        (
          name,
          description,
          is_cv_required,
          is_fulltime,
          are_disabled_allowed,
          are_retirees_allowed,
          are_students_allowed,
          employer_id,
          category_id,
          position_id,
          city_id
        )
      values
        (
          ${name},
          ${description},
          ${isCvRequired},
          ${isFulltime},
          ${areDisabledAllowed}
          ${areRetireesAllowed}
          ${areStudentsAllowed}
          ${employerId},
          ${categoryId},
          ${positionId}
        )
      returning id
    `

    const job = jobs.at(0) as { id: number }

    await this.sql`
      insert into job_salaries
        (job_id, salary, currency)
      values
        (${job.id}, ${salary.amount}, ${salary.currency})
    `
  }
}
