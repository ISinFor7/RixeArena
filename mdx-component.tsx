import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
 
export function useMDXComponents(components: MDXComponents) : MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className='text-4xl'>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className='text-3xl'>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className='text-2xl'>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className='text-xl'>{children}</h4>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}