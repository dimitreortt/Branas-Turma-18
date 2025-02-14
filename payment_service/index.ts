class App {
    routes: Object = {}

    get(route, method) {
        this.routes[route] = method
    }

    post(route, method) {
        this.routes[route] = method
    }

    listen(port: number) {
        console.log('listening on port ', port)
    } 

    run(route, body) {
        if (this.routes[route]) {
            return this.routes[route]({body})
        }
    }
}

const server = new App()

server.post('payment', (req: any, res: any) => {
    const creditCardToken = req.body.card
    if (!creditCardToken) throw new Error('No card')
    return true
})

export default server