import { DEFAULT_DIFFERENTIATORS, HOME } from '@/lib/copy'

const Differentiators = ({ config }) => {
  const items = config?.differentiators?.length ? config.differentiators : DEFAULT_DIFFERENTIATORS

  return (
    <section className="differentiators">
      <div className="section-inner">
        <div className="section-heading">
          {HOME.differentiatorsEyebrow && <span className="eyebrow">{HOME.differentiatorsEyebrow}</span>}
          <h2>{HOME.differentiatorsTitle}</h2>
        </div>

        <div className="differentiators__grid">
          {items.map((item) => (
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
