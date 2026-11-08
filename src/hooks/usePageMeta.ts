import { useEffect } from 'react'
import { SITE } from '../config/site'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'

interface PageMeta {
  title: string
  description?: string
  path?: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function upsertMeta(attr: 'name' | 'property', key: string, content?: string) {
  if (!content) return
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href?: string) {
  if (!href) return
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageMeta({ title, description, path, image, jsonLd }: PageMeta) {
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`
  const url = `${SITE.url}${path ?? ''}`
  const ogImage = image ?? DEFAULT_IMAGE
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:card', 'summary_large_image')

    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    }

    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('name', 'twitter:image', ogImage)

    upsertMeta('property', 'og:url', url)
    upsertLink('canonical', url)
  }, [fullTitle, description, ogImage, url])

  useEffect(() => {
    if (!jsonLdString) return
    const id = 'domus-page-jsonld'
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = jsonLdString
    return () => {
      el?.remove()
    }
  }, [jsonLdString])
}
