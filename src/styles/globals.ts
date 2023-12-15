// Here are declared the common styles for all buttons
const common = {
    button: 'text-xl tracking-wide py-1 px-6 m-2 rounded',
}

// Here are declared the specific styles for each type of button
const specific = {
    button: {
        info: 'bg-blue-500 hover:bg-blue-700 border-2 border-blue-800',
        success: 'bg-green-500 hover:bg-green-700 border-2 border-green-800',
        warning: 'bg-yellow-500 hover:bg-yellow-700 border-2 border-yellow-800',
        danger: 'bg-red-500 hover:bg-red-700 border-2 border-red-800',
    },
}

// Exported variable, appends the common styles to the specific ones
// So `styles.button.info` will return `common.button` + `specific.button.info`
export const styles = new Proxy(specific, {
    get: (target, prop: string) => {
        if (prop in target) {
            const element = target[prop as keyof typeof target]

            for (const key in element) {
                element[key as keyof typeof element] = `${common[prop as keyof typeof target]} ${element[key as keyof typeof element]}`
            }

            return element
        }
    },
})
