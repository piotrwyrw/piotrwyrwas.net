const welcome = `Welcome to <span class="yellow">piotrwyrwas.net</span> !<br><br>`

const ps1_pc = '<span class="red">root</span><span class="yellow">@</span><span class="cyan">piotrwyrwas.net<span> <span class="yellow">~</span> <span class="pink">#</span> '
const ps1_phone = `<span class="yellow">~</span> <span class="pink">#</span> `
const width = window.screen.width

const ps1 = (width > 480) ? ps1_pc : ps1_phone

let view = null

let lineBuffer = ""

function registerHandler(name, lambda) {
    if (findHandlerFor(name) !== null) {
        throw `Failed to register handler: Overlapping handlers for command "${name}".`
    }

    console.log(`Registered handler for '${name}'.`)

    handlers.push(new CommandHandler(name, lambda))
}

function findHandlerFor(label) {
    var resultHandler = null;

    handlers.forEach((handler) => {
        if (handler.commandName === label) {
            resultHandler = handler
            return
        }
    })

    return resultHandler
}

function run() {
    if (lineBuffer.length === 0) {
        return
    }

    let args = lineBuffer.split(' ')

    if (args.length === 0) {
        return
    }

    let handler = findHandlerFor(args[0])

    if (handler === null) {
        write(`Unknown command: ${args[0]}.`)
        view.innerHTML = view.innerHTML + `<br>`
        return
    }

    handler.fun(args.slice(1))

    view.innerHTML = view.innerHTML + `<br>`
}

function write(line) {
    view.innerHTML = view.innerHTML + line
}

function initialize() {
    registerHandlers()

    view = document.getElementsByClassName("terminal-view")[0]

    view.innerHTML = welcome + ps1

    addEventListener("keydown", evt => {
        if (evt.key === "Backspace") {
            var char = view.innerHTML.charAt(view.innerHTML.length - 1);
            if (char === '>' || char === '<') {
                console.log(view.innerHTML.charAt(view.innerHTML.length - 1))
                return
            }
            view.innerHTML = view.innerHTML.substring(0, view.innerHTML.length - 1)
            if (lineBuffer.length >= 1) {
                lineBuffer = lineBuffer.substring(0, lineBuffer.length - 1)
            }
            return
        }

        if (evt.key === "Enter") {
            view.innerHTML = view.innerHTML + '<br>'

            run()

            view.innerHTML = view.innerHTML + `${ps1}`
            window.scrollTo(0, document.body.scrollHeight);
            lineBuffer = ""
            return
        }

        if (evt.key.length !== 1) {
            return
        }

        view.innerHTML = view.innerHTML + evt.key
        lineBuffer = lineBuffer + evt.key
    })
}