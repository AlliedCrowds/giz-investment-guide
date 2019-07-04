export const isProduction = process.env.NODE_ENV === 'production'

/**
 * Returns undefined if no arguments are passed, the single argument is one is
 * passed or the argument array if several are passed. If `NODE_ENV` is not
 * production, the values are printed to the console for debugging.
 */
export const debug = isProduction
  ? (...values) =>
      values.length === 0 ? undefined : values.length === 1 ? values[0] : values
  : (...values) => {
      // eslint-disable-next-line no-console
      console.debug(...values)
      return values.length === 0
        ? undefined
        : values.length === 1
        ? values[0]
        : values
    }
