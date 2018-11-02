import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	coursesMutations,
	coursesQueries,
	coursesTypeDef
} from './courses/typeDefs';

import {
	studentsMutations,
	studentsQueries,
	studentsTypeDef
} from './students/typeDefs';

import coursesResolvers from './courses/resolvers';
import studentsResolvers from './students/resolvers';


// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		coursesTypeDef,
		studentsTypeDef
	],
	[
		coursesQueries,
		studentsQueries
	],
	[
		coursesMutations,
		studentsMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		coursesResolvers,
		studentsResolvers,
	)
});
