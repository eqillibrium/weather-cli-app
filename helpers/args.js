const getArgs = (args) => {
    const res = {}
    const [executor, file, ...rest] = args
    rest.forEach((el, idx, arr) => {
        if(el.charAt(0) === '-') {
            if(idx === arr.length - 1) {
                res[el.substring(1)] = true
            }  else if(arr[idx + 1].charAt(0) !== '-') {
                res[el.substring(1)] = arr[idx + 1]
            } else {
                res[el.substring(1)] = true
            }
        }
    })
    return res
}

export { getArgs }
