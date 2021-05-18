import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransfer1620339968844 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'transfers',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: "sender_id",
          type: "uuid",
        },
        {
          name: "amount",
          type: "decimal",
          precision: 5,
          scale: 2,
        },
        {
          name: "description",
          type: "varchar",
        },
        {
          name: "type",
          type: "enum",
          enum: ["transfer"]
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()"
        }
      ],
      foreignKeys: [
        {
          name: "transfers",
          columnNames: ["sender_id"],
          referencedTableName: "users",
          referencedColumnNames: ["id"],
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase("transfers");
  }

}
