import { merge } from "lodash";
import gql from "graphql-tag";
import { emptyResolver } from "@webiny/commodo-graphql";
import { GraphQLSchemaPlugin } from "@webiny/api/types";
import { hasScope } from "@webiny/api-security";

import role from "./graphql/Role";
import group from "./graphql/Group";
import user from "./graphql/User";
import install from "./graphql/Install";

const plugin: GraphQLSchemaPlugin = {
    type: "graphql-schema",
    name: "graphql-schema-security",
    schema: {
        typeDefs: gql`
            extend type File @key(fields: "id") {
                id: ID @external
            }

            type SecurityQuery {
                _empty: String
            }

            type SecurityMutation {
                _empty: String
            }

            extend type Query {
                security: SecurityQuery
            }

            extend type Mutation {
                security: SecurityMutation
            }

            type SecurityError {
                code: String
                message: String
                data: JSON
            }

            type SecurityBooleanResponse {
                data: Boolean
                error: SecurityError
            }

            ${install.typeDefs}
            ${role.typeDefs}
            ${group.typeDefs}
            ${user.typeDefs}
        `,
        resolvers: merge(
            {
                Query: {
                    security: emptyResolver
                },
                Mutation: {
                    security: emptyResolver
                },
            },
            install.resolvers,
            role.resolvers,
            group.resolvers,
            user.resolvers
        )
    },
    security: {
        shield: {
            SecurityQuery: {
                getGroup: hasScope("security:group:crud"),
                listGroups: hasScope("security:group:crud"),
                getRole: hasScope("security:role:crud"),
                listRoles: hasScope("security:role:crud"),
                getUser: hasScope("security:user:crud"),
                listUsers: hasScope("security:user:crud")
            },
            SecurityMutation: {
                createGroup: hasScope("security:group:crud"),
                updateGroup: hasScope("security:group:crud"),
                deleteGroup: hasScope("security:group:crud"),
                createRole: hasScope("security:role:crud"),
                updateRole: hasScope("security:role:crud"),
                deleteRole: hasScope("security:role:crud"),
                createUser: hasScope("security:user:crud"),
                updateUser: hasScope("security:user:crud"),
                deleteUser: hasScope("security:user:crud")
            }
        }
    }
};

export default plugin;
