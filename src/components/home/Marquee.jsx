const Marquee = ({ titles }) => {
  const items = titles || []
  const track = [...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((title, index) => (
          <span className="marquee__item" key={`${title}-${index}`}>
            {title}
            <span className="marquee__dot">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
