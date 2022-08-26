import { describe, expect, it } from 'vitest'
import HelloWorld from './index.vue'

describe('Home Index.vue', () => {
  it('normal imports as expected', async () => {
    // Await import
    const cmp = await import('./index.vue')
    expect(cmp).toBeDefined()
    // Global import
    expect(HelloWorld).toBeTruthy()
  })
})
