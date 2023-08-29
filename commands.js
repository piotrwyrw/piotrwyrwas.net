
function registerHandlers() {
    registerHandler('help', (args) => {
        write(`There are ${handlers.length} registered commands:<br>`)
        handlers.forEach((handler, i) => {
            write(`- ${handler.commandName}`)
            if (i + 1 < handlers.length) {
                write('<br>')
            }
        })
    })

    registerHandler('whoami', (args) => {
        write('Piotr K. Wyewas -- An aspiring software engineer with an unreasonable addiction to C.')
    })

    registerHandler('whereami', (args) => {
        write('You are on <span class="yellow underline">piotrwyrwas.net</span>')
    })

}
