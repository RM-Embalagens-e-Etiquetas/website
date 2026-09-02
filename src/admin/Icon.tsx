export function Icon({ name }) {
  const d = PATHS[name]
  if (!d) return null

  return (
    <svg className="rm-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {d}
    </svg>
  )
}

const PATHS = {
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </>
  ),
  about: (
    <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7 8.5v-1.2A4.8 4.8 0 0 0 14.2 15H9.8A4.8 4.8 0 0 0 5 19.3v1.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  ),
  contact: (
    <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H9l-4 3.2V7.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  ),
  phone: (
    <path d="M8 4.5h2.2l1 3.2-1.6 1.6a12 12 0 0 0 5.1 5.1l1.6-1.6 3.2 1V18a1.5 1.5 0 0 1-1.6 1.5A14.5 14.5 0 0 1 4 7.1 1.5 1.5 0 0 1 5.5 5.5H8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  ),
  bag: (
    <path d="M7 8.5h10l-.8 11H7.8L7 8.5Zm2.2 0V7.2A2.8 2.8 0 0 1 12 4.4a2.8 2.8 0 0 1 2.8 2.8v1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  ),
  tag: (
    <path d="M12.2 4.5h6.3v6.3L12 17.3 6.7 12 12.2 4.5Zm4.1 3.2a1 1 0 1 1-1.4-1.4 1 1 0 0 1 1.4 1.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  ),
  box: (
    <path d="M4.5 8 12 4.5 19.5 8 12 11.5 4.5 8Zm0 0v8L12 19.5l7.5-3.5v-8M12 11.5V19" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  ),
  spark: (
    <path d="M12 4v3M12 17v3M4 12h3M17 12h3M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  ),
  plus: (
    <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  ),
  check: (
    <path d="M5 12.5 9.5 17 19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  brand: (
    <path d="M4.5 19.5h15M6 19.5V8.8L12 4.6l6 4.2v10.7M10 19.5v-5h4v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  ),
  chevron: (
    <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
}
