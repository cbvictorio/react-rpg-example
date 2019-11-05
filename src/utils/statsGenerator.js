function randomStatGenerator(min = 1, max = 6) {
    const random = Math.floor(Math.random() * (+ max - + min) + +min)
    return random
}

function generateStatsArray() {
    const array = [];
    for (let i = 0; i < 4; i++) {
        const random = randomStatGenerator()
        array.push(random)
    }
    
    const repeated = array.find((x, i) => array.indexOf(x) !== i)
    return repeated ? generateStatsArray() : array
}

export { generateStatsArray, randomStatGenerator }