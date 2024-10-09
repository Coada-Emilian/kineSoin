-- Set the encoding to UTF8
SET client_encoding = 'UTF8';

BEGIN;

DROP TABLE IF EXISTS "patients", "therapists", "medics", "prescriptions", "afflictions", "appointments", "patient_messages", "therapist_messages", "administrators";

CREATE TABLE therapists (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "old_password" VARCHAR(255),
    "new_password" VARCHAR(255),
    "repeated_password" VARCHAR(255),
    "picture_url" TEXT NOT NULL,
    "picture_id" TEXT,
    "licence_code" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE patients (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "therapist_id" INT REFERENCES "therapists"("id"), 
    "name" VARCHAR(50) NOT NULL,
    "birth_name" VARCHAR(50),
    "surname" VARCHAR(50) NOT NULL,
    "gender" VARCHAR(10) NOT NULL,
    "birth_date" DATE NOT NULL,
    "street_number" VARCHAR(10),
    "street_name" VARCHAR(50) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "city" VARCHAR(100) NOT NULL, 
    "phone_number" VARCHAR(15) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "old_password" VARCHAR(255),
    "new_password" VARCHAR(255),
    "repeated_password" VARCHAR(255),
    "status" VARCHAR(10) DEFAULT 'pending',
    "picture_url" TEXT NOT NULL,
    "picture_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE medics (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "street_number" VARCHAR(10),
    "street_name" VARCHAR(50) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "city" VARCHAR(100) NOT NULL, 
    "phone_number" VARCHAR(15) NOT NULL,
    "licence_code" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE afflictions (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "insurance_code" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE prescriptions (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "medic_id" INT REFERENCES "medics"("id"),
    "patient_id" INT REFERENCES "patients"("id"),
    "affliction_id" INT REFERENCES "afflictions"("id"),
    "appointment_quantity" INT NOT NULL,
    "at_home_care" BOOLEAN NOT NULL DEFAULT false,
    "prescription_date" DATE NOT NULL,
    "picture_url" TEXT NOT NULL,
    "picture_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE appointments (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "prescription_id" INT REFERENCES "prescriptions"("id"),
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE patient_messages (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "therapist_id" INT REFERENCES "therapists"("id"),
    "patient_id" INT REFERENCES "patients"("id"),
    "content" TEXT NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "time" TIME NOT NULL DEFAULT NOW(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE therapist_messages (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "therapist_id" INT REFERENCES "therapists"("id"),
    "patient_id" INT REFERENCES "patients"("id"),
    "content" TEXT NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "time" TIME NOT NULL DEFAULT NOW(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE administrators (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "old_password" VARCHAR(255),
    "new_password" VARCHAR(255),
    "repeated_password" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;