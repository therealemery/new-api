/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { About } from '../index'
import { getAboutContent } from '../api'

vi.mock('@/components/layout', () => ({
  PublicLayout: (props: { children: ReactNode }) => (
    <main className='container'>{props.children}</main>
  ),
}))

vi.mock('../api', () => ({
  getAboutContent: vi.fn(),
}))

const getAboutContentMock = vi.mocked(getAboutContent)

function renderAbout() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  })

  const view = render(
    <QueryClientProvider client={queryClient}>
      <About />
    </QueryClientProvider>
  )

  return { queryClient, ...view }
}

beforeEach(() => {
  getAboutContentMock.mockReset()
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('About content rendering', () => {
  it('renders admin HTML fragments with inline prose styling', async () => {
    getAboutContentMock.mockResolvedValue({
      success: true,
      message: '',
      data: '<p>About paragraph</p><ul><li>First item</li></ul>',
    })

    const { container } = renderAbout()

    await waitFor(() => {
      expect(screen.getByText('About paragraph')).toBeInTheDocument()
    })

    const paragraph = screen.getByText('About paragraph')
    const proseHost = paragraph.closest('.prose')
    expect(proseHost).not.toBeNull()
    expect(proseHost?.shadowRoot).toBeNull()

    expect(container.querySelector('main.container')).not.toBeNull()
    expect(container.querySelector('.max-w-6xl')).not.toBeNull()
  })

  it('renders markdown about content inside the public main container', async () => {
    getAboutContentMock.mockResolvedValue({
      success: true,
      message: '',
      data: '# About heading\n\nMarkdown paragraph.',
    })

    const { container } = renderAbout()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 1, name: 'About heading' })
      ).toBeInTheDocument()
    })

    expect(screen.getByText('Markdown paragraph.')).toBeInTheDocument()
    expect(container.querySelector('main.container')).not.toBeNull()
    expect(container.querySelector('.max-w-6xl')).not.toBeNull()
  })
})
