import {
    is_empty_obj,
    object_contains_keys,
    object_contains_other_keys
} from '../util/validation.js'
import assert from 'assert'

describe('#is_empty_obj', () => {
    it('should return true when the object is has no keys', () => {
        assert.equal(true, is_empty_obj({}))
    })
    it('should return false when the object is has any keys', () => {
        assert.equal(false, is_empty_obj({ x: 1 }))
    })
})

describe('#object_contains_keys', () => {
    const keys = ['x', 'y', 'z']
    it('should return true when the object contains all of a given set of keys', () => {
        assert.equal(true, object_contains_keys({ x: 1, y: 2, z: 3 }, keys))
    })
    it('should return false when the object contains none of the keys', () => {
        assert.equal(false, object_contains_keys({ a: 1, b: 2, c: 3 }, keys))
        assert.equal(false, object_contains_keys({}, keys))
    })
    it('should return false when the object contains some of the keys', () => {
        assert.equal(false, object_contains_keys({ x: 1, y: 2 }, keys))
        assert.equal(false, object_contains_keys({ x: 1, a: 1 }, keys))
    })
})

describe('#object_contains_other_keys', () => {
    const keys = ['x', 'y', 'z']
    it('should return true when the object contains other keys that do not exist in the given set of keys', () => {
        assert.equal(true, object_contains_other_keys({ x: 1, y: 2, z: 3, a: 1 }, keys))
        assert.equal(true, object_contains_other_keys({ x: 1, a: 1 }, keys))
        assert.equal(true, object_contains_other_keys({ a: 1 }, keys))
    })
    it('should return false when the object is empty', () => {
        assert.equal(false, object_contains_other_keys({}, keys))
    })
    it('should return false when the object contains only keys belonging to the given key set', () => {
        assert.equal(false, object_contains_other_keys({ x: 1, y: 2, z: 3 }, keys))
        assert.equal(false, object_contains_other_keys({ x: 1 }, keys))
    })
})