const Differentiators = ({ home }) => {
  return (
    <section className="differentiators">
      <div className="section-inner">
        <div className="section-heading">
          {home?.differentiatorsEyebrow && (
            <span className="eyebrow">{home.differentiatorsEyebrow}</span>
          )}
          <h2>{home?.differentiatorsTitle}</h2>
        </div>

        <div className="differentiators__grid">
          {(home?.differentiators || []).map((item) => (
            <div key={item.title} className="differentiator-card">
              {item.icon && <i className={`fal ${item.icon}`} aria-hidden="true"></i>}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Differentiators
