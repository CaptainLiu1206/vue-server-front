export const createError = (code, msg) => {
    const err = new Error(msg)
    // err.code = code
    // console.log(err)
    return err
}
