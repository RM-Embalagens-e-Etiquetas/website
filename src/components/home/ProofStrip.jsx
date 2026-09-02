const ProofStrip = ({ label, images }) => {
  const items = images || []
  if (items.length === 0) return null

  return (
    <section className="proof-strip">
      <div className="section-inner">
        <div className="proof-strip__frame">
          <span className="proof-strip__label">{label || 'Prova fotográfica — 01'}</span>
          <div className="proof-strip__grid">
            {items.map((src, index) => (
              <div className="proof-strip__cell" key={`${src}-${index}`}>
                <img src={src} alt="Produto RM Embalagens" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProofStrip
