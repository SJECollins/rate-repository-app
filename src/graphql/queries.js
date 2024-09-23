import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories($searchKeyword: String, $first: Int, $after: String) {
    repositories(first: $first, after: $after, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          forksCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      name
      createdAt
      ownerName
      fullName
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            repository {
              id
              fullName
            }
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;
