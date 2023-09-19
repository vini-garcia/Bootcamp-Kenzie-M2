function invertValues (array) {
  const output = []

  for(let i = 0; i < array.length; i++) {
    if(typeof array[i] === 'number') {
      output.push(array[i] * -1)
    } else {
      output.push(array[i])
    }

    // output.push(array[i] * -1)
  }

  return output
}

export { invertValues }