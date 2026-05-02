// ═══════════════════════════════════════════════════════════════
//  STRATEGY PATTERN — Sorting & Filtering
//  Each strategy is an independent object with an execute() method.
//  The catalogue component swaps strategies at runtime without
//  ever knowing what algorithm is running inside.
// ═══════════════════════════════════════════════════════════════

// ── Sort Strategies ─────────────────────────────────────────────

export class PriceAscStrategy {
  execute(products) {
    return [...products].sort((a, b) => a.price_55ml - b.price_55ml)
  }
}

export class PriceDescStrategy {
  execute(products) {
    return [...products].sort((a, b) => b.price_55ml - a.price_55ml)
  }
}

export class NameAscStrategy {
  execute(products) {
    return [...products].sort((a, b) => a.name.localeCompare(b.name))
  }
}

export class NewestFirstStrategy {
  execute(products) {
    return [...products].sort(
      (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
    )
  }
}

// ── Filter Strategies ───────────────────────────────────────────

export class AllCategoriesFilter {
  execute(products) {
    return products
  }
}

export class CategoryFilter {
  constructor(category) {
    this.category = category
  }
  execute(products) {
    return products.filter((p) => p.category === this.category)
  }
}

// ── Strategy Maps (for easy dropdown binding) ───────────────────

export const SORT_STRATEGIES = {
  newest:     { label: 'Newest First',       strategy: new NewestFirstStrategy() },
  price_asc:  { label: 'Price: Low to High', strategy: new PriceAscStrategy() },
  price_desc: { label: 'Price: High to Low', strategy: new PriceDescStrategy() },
  name_asc:   { label: 'Name: A to Z',       strategy: new NameAscStrategy() },
}

export const FILTER_STRATEGIES = {
  All:    { label: 'All',    strategy: new AllCategoriesFilter() },
  Homme:  { label: 'Homme',  strategy: new CategoryFilter('Homme') },
  Femme:  { label: 'Femme',  strategy: new CategoryFilter('Femme') },
  Unisex: { label: 'Unisex', strategy: new CategoryFilter('Unisex') },
}

// ── Catalogue Context (holds active strategies) ─────────────────

export class CatalogueContext {
  constructor(sortStrategy, filterStrategy) {
    this.sortStrategy   = sortStrategy
    this.filterStrategy = filterStrategy
  }

  setSortStrategy(strategy)   { this.sortStrategy   = strategy }
  setFilterStrategy(strategy) { this.filterStrategy = strategy }

  applyStrategies(products) {
    const filtered = this.filterStrategy.execute(products)
    const sorted   = this.sortStrategy.execute(filtered)
    return sorted
  }
}
