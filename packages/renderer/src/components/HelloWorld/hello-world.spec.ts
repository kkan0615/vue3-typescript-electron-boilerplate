import { describe, expect, it, vi } from 'vitest'
import HelloWorld from './index.vue'

describe('Home Index.vue', () => {
  // const wrapper = shallowMount(HelloWorld, {
  //   global: {
  //     // plugins: [i18n, head],
  //   },
  // })
  it('normal imports as expected', async () => {
    // Await import
    const cmp = await import('./index.vue')
    expect(cmp).toBeDefined()
    // Global import
    expect(HelloWorld).toBeTruthy()
  })
  // it('it should render', () => {
  //   // Logo are defined
  //   const logoImgEl = wrapper.find('img[alt="logo"]')
  //   expect(logoImgEl).toBeDefined()
  // })
})
