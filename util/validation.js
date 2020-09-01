export const is_empty_obj = obj => {
    return Object.keys(obj).length == 0
}

export const object_contains_keys = (obj, keys) => {
    const key_set = new Set(keys)
    return Object.keys(obj).filter(key => key_set.has(key)).length === key_set.size
}

export const object_contains_other_keys = (obj, keys) => {
    const key_set = new Set(keys)
    return Object.keys(obj).filter(key => !key_set.has(key)).length > 0
}