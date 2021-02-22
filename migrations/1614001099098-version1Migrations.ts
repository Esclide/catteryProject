import {MigrationInterface, QueryRunner} from "typeorm";

export class version1Migrations1614001099098 implements MigrationInterface {
    name = 'version1Migrations1614001099098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "firstName" character varying NOT NULL, "middleName" character varying, "lastName" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "registrationDate" TIMESTAMP NOT NULL DEFAULT '"2021-02-22T13:38:28.308Z"', "phone" character varying, "country" character varying, "city" character varying, "image" character varying NOT NULL DEFAULT '../media/default', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cat" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying, "gender" character varying NOT NULL, "color" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "abilityToReproduce" boolean NOT NULL DEFAULT true, "description" character varying, "isAlive" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "breederId" integer, "ownerId" integer, "breedId" integer, CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "female_cat" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying, "gender" character varying NOT NULL, "color" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "abilityToReproduce" boolean NOT NULL DEFAULT true, "description" character varying, "isAlive" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "breederId" integer, "ownerId" integer, "breedId" integer, "childrenId" integer, CONSTRAINT "PK_9cced8372a7cdbc1cac091fda5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "male_cat" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying, "gender" character varying NOT NULL, "color" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "abilityToReproduce" boolean NOT NULL DEFAULT true, "description" character varying, "isAlive" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "breederId" integer, "ownerId" integer, "breedId" integer, "childrenId" integer, CONSTRAINT "PK_0acba33135c7e9e32e5956a47e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "breed" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "image" character varying NOT NULL DEFAULT '../media/default', CONSTRAINT "UQ_114e1e2099cad7d73a7f0119604" UNIQUE ("name"), CONSTRAINT "PK_d1c857f060076296ce8a87b9043" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "level" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "color" character varying NOT NULL, "price" integer NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-02-22T13:38:28.313Z"', "isDeleted" boolean NOT NULL DEFAULT false, "deletionDate" TIMESTAMP, "creatorId" integer, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "FK_21b1cf1add74947269210abb1ae" FOREIGN KEY ("breederId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "FK_b75c4e5c0bc645d7d0b02258f8e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "FK_fa036c60e475405f988eea48486" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "female_cat" ADD CONSTRAINT "FK_f59bfc7aa0077be871d598817a0" FOREIGN KEY ("breederId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "female_cat" ADD CONSTRAINT "FK_f9674d25b86f913c0754e9eef57" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "female_cat" ADD CONSTRAINT "FK_649b77037e0fa23e1a748873541" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "female_cat" ADD CONSTRAINT "FK_d2dca3c00a42c2396194c82f23a" FOREIGN KEY ("childrenId") REFERENCES "female_cat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "male_cat" ADD CONSTRAINT "FK_0d020703b220d77e35025517ec6" FOREIGN KEY ("breederId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "male_cat" ADD CONSTRAINT "FK_40e10fe47b9abdf3725b740fd8c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "male_cat" ADD CONSTRAINT "FK_b13ee3c3a2ac0959e8fcf01e86a" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "male_cat" ADD CONSTRAINT "FK_f0b620350f1dc573d49974a5d34" FOREIGN KEY ("childrenId") REFERENCES "male_cat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_01b1aeb33474d927263e172cfe1" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_01b1aeb33474d927263e172cfe1"`);
        await queryRunner.query(`ALTER TABLE "male_cat" DROP CONSTRAINT "FK_f0b620350f1dc573d49974a5d34"`);
        await queryRunner.query(`ALTER TABLE "male_cat" DROP CONSTRAINT "FK_b13ee3c3a2ac0959e8fcf01e86a"`);
        await queryRunner.query(`ALTER TABLE "male_cat" DROP CONSTRAINT "FK_40e10fe47b9abdf3725b740fd8c"`);
        await queryRunner.query(`ALTER TABLE "male_cat" DROP CONSTRAINT "FK_0d020703b220d77e35025517ec6"`);
        await queryRunner.query(`ALTER TABLE "female_cat" DROP CONSTRAINT "FK_d2dca3c00a42c2396194c82f23a"`);
        await queryRunner.query(`ALTER TABLE "female_cat" DROP CONSTRAINT "FK_649b77037e0fa23e1a748873541"`);
        await queryRunner.query(`ALTER TABLE "female_cat" DROP CONSTRAINT "FK_f9674d25b86f913c0754e9eef57"`);
        await queryRunner.query(`ALTER TABLE "female_cat" DROP CONSTRAINT "FK_f59bfc7aa0077be871d598817a0"`);
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "FK_fa036c60e475405f988eea48486"`);
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "FK_b75c4e5c0bc645d7d0b02258f8e"`);
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "FK_21b1cf1add74947269210abb1ae"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
        await queryRunner.query(`DROP TABLE "breed"`);
        await queryRunner.query(`DROP TABLE "male_cat"`);
        await queryRunner.query(`DROP TABLE "female_cat"`);
        await queryRunner.query(`DROP TABLE "cat"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
