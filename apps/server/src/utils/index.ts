interface FieldsAndValues<T extends object> {
  fields: (keyof T)[]
  values: T[keyof T][]
}

export const getFieldsAndPairs = <T extends object>(
  data: T,
): FieldsAndValues<T> => {
  const fields: (keyof T)[] = []
  const values: T[keyof T][] = []

  for (const property in data) {
    if (data[property]) {
      fields.push(property)
      values.push(data[property])
    }
  }

  return { fields, values }
}
