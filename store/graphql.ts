export const fetchProductsQuery = /* GraphQL */ `
  query FetchProductSample($first: Int) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }
`;

export const fetchProducts = ` query MyQuery {
  products(first: 10) {
    edges {
      node {
        id
      }
    }
  }
}`;

export const fetchCollectionsQuery = `query collections(($first: Int)) {
  collections(first: 10) {
    edges {
      node {
        id
        image {
          url
          width
        }
        title
      }
    }
  }
}`;
