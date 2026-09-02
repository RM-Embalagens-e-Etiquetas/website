import { PRODUCT_CATEGORIES } from '@/lib/productCategories'

const Marquee = () => {
  const items = PRODUCT_CATEGORIES.map((category) => category.title)
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
