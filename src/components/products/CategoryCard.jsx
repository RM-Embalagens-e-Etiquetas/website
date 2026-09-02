import Link from 'next/link'
import { getCategoryCover, getProductImages } from '@/lib/getProductImages'

const CategoryCard = ({ category }) => {
  const cover = getCategoryCover(category.slug)
  const count = getProductImages(category.slug).length

  return (
    <Link href={`/produtos/${category.slug}`} className="category-card">
      <div className="category-card__media">
        {cover && <img src={cover} alt={category.title} loading="lazy" />}
      </div>
      <div className="category-card__body">
        <h3>{category.title}</h3>
        <p>{category.description}</p>
        <span className="category-card__count">
          {count} {count === 1 ? 'foto' : 'fotos'}
        </span>
      </div>
    </Link>
  )
}

export default CategoryCard
