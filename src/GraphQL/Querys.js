import { gql } from '@apollo/client';

export const LOAD_TAGS = gql`
    query{
        tags(limit:10){
        name
        }
    }
`;

export const LOAD_TASKS = gql`
query{
    tasks(order_by:[{updated_at : desc} ]){
      end_time
      id
      tags(limit: 100) {
        id
        name
      }
      start_time
      title
    }
  }
`;