'use client'

// Import necessary dependencies from 'react'
import { useEffect, useState } from 'react'
// Import necessary dependencies from '@fluentui/react-components'
import {
  createDOMRenderer,
  RendererProvider,
  FluentProvider,
  webLightTheme,
  SSRProvider,
} from '@fluentui/react-components'

// Create a DOM renderer for Fluent UI.
const renderer = createDOMRenderer()

/**
 * Providers component.
 *
 * This component wraps other components with a set of providers
 * for Fluent UI, SSR, and a custom renderer.
 *
 * @param {Object} props - The properties for the Providers component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the Providers.
 * @returns {React.Element} The Providers component with child components.
 */
export function Providers ({ children }:{ children: React.ReactNode | React.ReactNode[] | undefined }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
      <RendererProvider renderer={ renderer || createDOMRenderer() }>
        <SSRProvider>
          <FluentProvider theme={ webLightTheme }>
            { children }
          </FluentProvider>
        </SSRProvider>
      </RendererProvider>
  )
}
