export const tryCatchFinally = async (
  fun: Function,
  finallyCallback: () => void,
  ...args: any
) => {
  try {
    const result = await fun(...args)
    return { isSuccess: true, data: result }
  } catch (error: any) {
    return { isSuccess: false, error }
  } finally {
    if (typeof finallyCallback === 'function') {
      try {
        finallyCallback()
      } catch (callbackError) {
        console.error('Finally callback error:', callbackError)
      }
    }
  }
}
