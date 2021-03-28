import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
            mutation insert_tasks_one(
                $object: tasks_insert_input!
            )
            {
                insert_tasks_one(object: $object){
                created_at
                end_time
                id
                start_time
                title
                updated_at
                }
            }
`;

export const DELETE_TASK = gql`
        mutation delete_tasks_by_pk(
            $_id: Int!
        ){
            delete_tasks_by_pk(id: $_id){
            created_at
            end_time
            id
            start_time
            title
            updated_at
            }
        }
`;

export const UPDATE_TASK_BY_ID = gql`
        mutation update_tasks_by_pk(
            $_id: Int!,
            $_set : tasks_set_input
        ){
            update_tasks_by_pk(_set:$_set , pk_columns: {id: $_id})
                {
                    created_at
                    end_time
                    id
                    start_time
                    title
                    updated_at
            }
        }
`;