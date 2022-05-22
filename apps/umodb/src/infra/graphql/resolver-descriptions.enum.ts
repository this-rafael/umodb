export enum ResolverDescriptions {
  REGISTER_OPERATOR = `
    Register operator on umodb.
    This mutation allow to asyncronous register a new operator on umodb.
    This mutation return a promise with the result of the operation MutationResultPromiseObjectType.
    MutationResultPromiseObjectType is a object type with the result of the operation.
    MutationResultPromiseObjectType has the following fields:
      - expectedResultAt: Date
      - createdAt: Date
  `,
}
