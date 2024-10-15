import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmptyDatabaseSetup1727860052548 implements MigrationInterface {
  name = 'EmptyDatabaseSetup1727860052548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."rating_type_enum" AS ENUM('up', 'down')`,
    );
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" SERIAL NOT NULL, "type" "public"."rating_type_enum" NOT NULL, "raterId" integer, "ratedPostId" integer, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."post_type_enum" AS ENUM('topic', 'question', 'comment', 'answer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying(255), "creation_date" date NOT NULL DEFAULT now(), "content" text NOT NULL, "type" "public"."post_type_enum" NOT NULL, "emergency" integer, "is_opened" boolean NOT NULL DEFAULT true, "modification_date" date DEFAULT now(), "is_readable" boolean NOT NULL DEFAULT true, "authorId" integer, "modificationAuthorId" integer, "replyToId" integer, CONSTRAINT "UQ_e28aa0c4114146bfb1567bfa9ac" UNIQUE ("title"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."member_role_enum" AS ENUM('member', 'moderator', 'administrator')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."member_theme_enum" AS ENUM('light', 'dark')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."member_language_enum" AS ENUM('french', 'english')`,
    );
    await queryRunner.query(
      `CREATE TABLE "member" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "hashed_password" character varying(255) NOT NULL, "email" character varying(100) NOT NULL, "is_email_displayed" boolean NOT NULL, "inscription_date" date NOT NULL DEFAULT now(), "profile_picture" character varying(255) NOT NULL DEFAULT '/images/profile-picture-default.png', "pronouns" character varying(50), "description" text, "role" "public"."member_role_enum" NOT NULL DEFAULT 'member', "is_banned" boolean NOT NULL DEFAULT false, "displayed_name" character varying(100), "theme" "public"."member_theme_enum" NOT NULL DEFAULT 'light', "language" "public"."member_language_enum" NOT NULL DEFAULT 'french', CONSTRAINT "UQ_8174d0498e41d6e7c108b657e79" UNIQUE ("name"), CONSTRAINT "UQ_4678079964ab375b2b31849456c" UNIQUE ("email"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tag_family_enum" AS ENUM('language', 'environment', 'technology')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "icon" character varying(255) NOT NULL, "family" "public"."tag_family_enum" NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3" PRIMARY KEY ("postId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_444c1b4f6cd7b632277f557935" ON "post_tag" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_346168a19727fca1b1835790a1" ON "post_tag" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favourite" ("memberId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_a11a0e5f5d5bd1edcc896615da4" PRIMARY KEY ("memberId", "postId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_47e663ace025ea8201fb86ad54" ON "favourite" ("memberId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3ff1d91657fae6dc289a3ad9ff" ON "favourite" ("postId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "member_tag" ("memberId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_fc76f198d804ef5bdbab04b214a" PRIMARY KEY ("memberId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2bbff1cdbf37934c7bc4d5f709" ON "member_tag" ("memberId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3a5245ee9d273cb925ae03130f" ON "member_tag" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_bdaa3b3a06d30c0ea2613409cb8" FOREIGN KEY ("raterId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_e13df318f0ea6d0351a2a83dcf5" FOREIGN KEY ("ratedPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_bcb645519b41fe61c619ad64d19" FOREIGN KEY ("modificationAuthorId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_343ffc7266f858cc02c8397035e" FOREIGN KEY ("replyToId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tag" ADD CONSTRAINT "FK_444c1b4f6cd7b632277f5579354" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tag" ADD CONSTRAINT "FK_346168a19727fca1b1835790a14" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite" ADD CONSTRAINT "FK_47e663ace025ea8201fb86ad54b" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite" ADD CONSTRAINT "FK_3ff1d91657fae6dc289a3ad9ff4" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_tag" ADD CONSTRAINT "FK_2bbff1cdbf37934c7bc4d5f709b" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_tag" ADD CONSTRAINT "FK_3a5245ee9d273cb925ae03130f7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_tag" DROP CONSTRAINT "FK_3a5245ee9d273cb925ae03130f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_tag" DROP CONSTRAINT "FK_2bbff1cdbf37934c7bc4d5f709b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite" DROP CONSTRAINT "FK_3ff1d91657fae6dc289a3ad9ff4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite" DROP CONSTRAINT "FK_47e663ace025ea8201fb86ad54b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tag" DROP CONSTRAINT "FK_346168a19727fca1b1835790a14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tag" DROP CONSTRAINT "FK_444c1b4f6cd7b632277f5579354"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_343ffc7266f858cc02c8397035e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_bcb645519b41fe61c619ad64d19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_e13df318f0ea6d0351a2a83dcf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_bdaa3b3a06d30c0ea2613409cb8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3a5245ee9d273cb925ae03130f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2bbff1cdbf37934c7bc4d5f709"`,
    );
    await queryRunner.query(`DROP TABLE "member_tag"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3ff1d91657fae6dc289a3ad9ff"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_47e663ace025ea8201fb86ad54"`,
    );
    await queryRunner.query(`DROP TABLE "favourite"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_346168a19727fca1b1835790a1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_444c1b4f6cd7b632277f557935"`,
    );
    await queryRunner.query(`DROP TABLE "post_tag"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TYPE "public"."tag_family_enum"`);
    await queryRunner.query(`DROP TABLE "member"`);
    await queryRunner.query(`DROP TYPE "public"."member_language_enum"`);
    await queryRunner.query(`DROP TYPE "public"."member_theme_enum"`);
    await queryRunner.query(`DROP TYPE "public"."member_role_enum"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TYPE "public"."post_type_enum"`);
    await queryRunner.query(`DROP TABLE "rating"`);
    await queryRunner.query(`DROP TYPE "public"."rating_type_enum"`);
  }
}
