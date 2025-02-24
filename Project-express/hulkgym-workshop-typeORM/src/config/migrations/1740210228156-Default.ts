import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740210228156 implements MigrationInterface {
    name = 'Default1740210228156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers" ("teacher_id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "fullName" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(20), CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "PK_8554ca4826231daa07720e5e0d5" PRIMARY KEY ("teacher_id"))`);
        await queryRunner.query(`CREATE TABLE "classes" ("class_id" SERIAL NOT NULL, "class_name" character varying(100) NOT NULL, "subject" character varying(100) NOT NULL, "teacher_id" integer, CONSTRAINT "PK_1c29abc497051d41c2d6e276a05" PRIMARY KEY ("class_id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("student_id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "fullName" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(20), "birth_date" date, "gender" character varying(10) NOT NULL, "address" text, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_ba36f3e3743f80d1cdc51020103" PRIMARY KEY ("student_id"))`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_b34c92e413c4debb6e0f23fed46" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("teacher_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_b34c92e413c4debb6e0f23fed46"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
    }

}
