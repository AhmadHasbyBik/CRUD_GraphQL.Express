import { Cigarette } from "../entities/CigaretteEntity";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { IsString, IsInt, Min } from "class-validator";

@InputType()
class CigaretteCreateInput {
  @Field()
  @IsString()
  brand: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  size: number;
}

@InputType()
class CigaretteUpdateInput {
  @Field(() => String, { nullable: true })
  @IsString()
  brand?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  size?: number;
}

@Resolver()
export class CigaretteResolver {
  @Mutation(() => Cigarette)
  async createCigarette(
    @Arg("create", () => CigaretteCreateInput) create: CigaretteCreateInput
  ) {
    const cigarette = await Cigarette.create(create).save();
    return cigarette;
  }

  @Mutation(() => Boolean)
  async updateCigarette(
    @Arg("id", () => Int) id: number,
    @Arg("update", () => CigaretteUpdateInput) update: CigaretteUpdateInput
  ) {
    await Cigarette.update({ id }, update);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteCigarette(@Arg("id", () => Int) id: number) {
    await Cigarette.delete({ id });
    return true;
  }

  @Query(() => [Cigarette])
  cigarette() {
    return Cigarette.find();
  }
}
