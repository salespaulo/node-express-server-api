/*
 * Para utilizar com arrays e funcoes async, o filter nao funciona no
 * contexto async.
 */
const asyncFilter = async (asyncPredicate, xs) => {
    return await xs.reduce(async (acc, x) => {
        const result = await asyncPredicate(x)
        if (result ) {
            (await acc).push(x)
        }
        return acc
    }, Promise.resolve([ ]))
}

module.exports = {
    asyncFilter
}