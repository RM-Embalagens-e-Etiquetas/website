import Link from 'next/link'

const CategoryCard = ({ category }) => {
  const count = category.photoCount || 0

  return (
    <Link href={`/produtos/${category.slug}`} className="category-card">
      <div className="category-card__media">
        {category.cover && <img src={category.cover} alt={category.title} loading="lazy" />}
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
