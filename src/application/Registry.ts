export class Registry {
    private dependencies: { [name: string]: any } = {}
    private static instance?: Registry

    private constructor() { }

    provide(name: string, dependency: any) {
        this.dependencies[name] = dependency
    }

    inject(name: string) {
        return this.dependencies[name]
    }

    static getInstance(): Registry {
        if (!Registry.instance) {
            Registry.instance = new Registry()
        }
        return Registry.instance
    }
}

export function inject(name: string) {
    return (target: any, propertyKey: string) => {
        target[propertyKey] = new Proxy({}, {
            get: (target, property) => {
                const dependency = Registry.getInstance().inject(name)
                return dependency[property]
            }
        })
    }
}