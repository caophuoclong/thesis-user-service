CREATE TYPE "gender" AS ENUM ('male', 'female');

CREATE TABLE "user" (
    "id" uuid PRIMARY KEY NOT NULL,
    "first_name" varchar(255) NOT NULL,
    "last_name" varchar(255),
    "email" varchar(255) NOT NULL,
    "username" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "createdAt" bigint NOT NULL,
    "updatedAt" bigint NOT NULL,
    "dob" bigint NOT NULL DEFAULT 0,
    "avatar" text,
    "cover" text,
    "gender" gender
);

create extension if not exists "uuid-ossp";

select
    uuid_generate_v4();

alter table
    "user"
alter column
    "id"
set
    default uuid_generate_v4();

alter table
    "user"
alter COLUMN
    "createdAt"
set
    default round(
        EXTRACT(
            epoch
            FROM
                CURRENT_TIMESTAMP
        )
    );

alter table
    "user"
alter COLUMN
    "updatedAt"
set
    default round(
        EXTRACT(
            epoch
            FROM
                CURRENT_TIMESTAMP
        )
    );

alter table
    "user"
add
    UNIQUE ("username", "email");