import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ExternalIdInputType {
  @Field()
  public readonly externalId!: string
}
