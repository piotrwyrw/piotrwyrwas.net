class CommandHandler {

    commandName
    fun

    constructor(label, fn) {
        this.commandName = label
        this.fun = fn
    }

    run(args) {
        this.fun(args)
    }

}

let handlers = []