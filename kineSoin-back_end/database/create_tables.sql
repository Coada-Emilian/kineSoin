-- Set the encoding to UTF8
SET client_encoding = 'UTF8';

BEGIN;

-- Drop all existing tables
DROP TABLE IF EXISTS "patients", "therapists", "medics", "prescriptions", "body_regions", "afflictions", "appointments", "patient_messages", "therapist_messages", "administrators";

-- Create administrators table
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

-- Create therapists table
CREATE TABLE therapists (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "admin_id" INT REFERENCES "administrators"("id") ON DELETE CASCADE,
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "old_password" VARCHAR(255),
    "new_password" VARCHAR(255),
    "repeated_password" VARCHAR(255),
    "picture_url" TEXT NOT NULL,
    "picture_id" TEXT,
    "licence_code" VARCHAR(255) UNIQUE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Create patients table
CREATE TABLE patients (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "therapist_id" INT REFERENCES "therapists"("id") ON DELETE CASCADE, 
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
    "status" VARCHAR(10) NOT NULL DEFAULT 'pending',
    "picture_url" TEXT NOT NULL,
    "picture_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Create medics table
CREATE TABLE medics (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "admin_id" INT REFERENCES "administrators"("id") ON DELETE CASCADE,
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "street_number" VARCHAR(10),
    "street_name" VARCHAR(50) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "city" VARCHAR(100) NOT NULL, 
    "phone_number" VARCHAR(15) NOT NULL,
    "licence_code" VARCHAR(255) UNIQUE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Create body_regions table
CREATE TABLE body_regions (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "admin_id" INT REFERENCES "administrators"("id") ON DELETE CASCADE,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Create afflictions table
CREATE TABLE afflictions (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "admin_id" INT REFERENCES "administrators"("id") ON DELETE CASCADE,
    "body_region_id" INT REFERENCES "body_regions"("id") ON DELETE CASCADE,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "insurance_code" VARCHAR(255) NOT NULL,
    "is_operated" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Create prescriptions table
CREATE TABLE prescriptions (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "medic_id" INT REFERENCES "medics"("id") ON DELETE CASCADE,
    "patient_id" INT REFERENCES "patients"("id") ON DELETE CASCADE,
    "affliction_id" INT REFERENCES "afflictions"("id") ON DELETE CASCADE,
    "appointment_quantity" INT,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "at_home_care" BOOLEAN NOT NULL DEFAULT false,
    "date" DATE NOT NULL,
    "picture_url" TEXT NOT NULL,
    "picture_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Create appointments table
CREATE TABLE appointments (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "therapist_id" INT REFERENCES "therapists"("id") ON DELETE CASCADE,
    "patient_id" INT REFERENCES "patients"("id") ON DELETE CASCADE,
    "prescription_id" INT REFERENCES "prescriptions"("id") ON DELETE CASCADE,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Create patient_messages table
CREATE TABLE patient_messages (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "receiver_id" INT REFERENCES "therapists"("id") ON DELETE CASCADE,
    "sender_id" INT REFERENCES "patients"("id") ON DELETE CASCADE,
    "content" TEXT NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "time" TIME NOT NULL DEFAULT NOW(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Create therapist_messages table
CREATE TABLE therapist_messages (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "sender_id" INT REFERENCES "therapists"("id") ON DELETE CASCADE,
    "receiver_id" INT REFERENCES "patients"("id") ON DELETE CASCADE,
    "content" TEXT NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "time" TIME NOT NULL DEFAULT NOW(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
