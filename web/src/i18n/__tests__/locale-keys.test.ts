import { describe, expect, it } from 'vitest'

import en from '../locales/en.json'
import zh from '../locales/zh.json'

describe('zh locale keys', () => {
  it('aligns translation keys with en.json', () => {
    expect(Object.keys(zh.translation).sort()).toEqual(
      Object.keys(en.translation).sort(),
    )
  })

  it('provides Simplified Chinese for dashboard chrome strings', () => {
    expect(zh.translation.Overview).toBe('概览')
    expect(zh.translation['Build on your API gateway in minutes']).toBe(
      '几分钟内开始使用你的 API 网关',
    )
    expect(zh.translation['API Keys']).toBe('API 密钥')
    expect(zh.translation.Playground).toBe('游乐场')
  })
})
