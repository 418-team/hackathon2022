const filter = (elements, value) => {
    const keys = Object.keys(elements[0] || [])
    return value.length > 0
        ? elements.filter((el) => keys.some((key) => {
            return el?.[key]?.toString()?.indexOf(value) !== -1
        }))
        : elements
}

export default filter