import type { Updater } from '@tanstack/vue-query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const valueUpdater = <T extends Updater<any, any>>(
  updaterOrValue: T,
  ref: Ref,
) => {
  ref.value =
    typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}
