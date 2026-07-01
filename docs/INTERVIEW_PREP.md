# Interview Preparation - Alltech Niort

## Personal presentation

### Background

- Originally from Romania.
- Arrived in France 13 years ago.
- Learned French and adapted to a new country and professional environment.
- Previous studies: History degree in Romania.
- Professional experience in different fields before moving toward development.

### Previous professional experience

## Dental prosthetics

- Obtained BEP and Bac Pro in dental prosthetics.
- Worked several years in a dental laboratory.
- Developed:
  - precision
  - attention to detail
  - patience
  - ability to work on complex manual tasks

Reason for career change:

- Limited evolution opportunities.
- Wanted a field where continuous learning and problem solving were more present.

---

# Transition to web development

## Why development?

Main motivations:

- Enjoy solving problems.
- Like building things from an idea and seeing them become concrete.
- Appreciate the learning process.
- Prefer a field with continuous evolution.

First contact with programming:

- Discovered programming when younger, but it seemed inaccessible at the time.
- Rediscovered programming later during career transition and found a better connection with it.

---

# Training

## O'clock Web Development training

Completed professional web developer training.

Main technologies:

- JavaScript
- React
- Node.js
- PostgreSQL

Continued learning through personal projects.

Additional training:

- Opquast (web quality / best practices)

---

# Current situation

After training:

- Continued improving skills through personal projects.
- Looking for first professional experience as a developer.
- Interested in an internship to discover professional development workflow and continue progressing.

---

# KineSoin Project

## Objective

Personal project created to improve understanding of React, JavaScript and full-stack development.

Goal:

- Build a complete application.
- Understand frontend/backend communication.
- Practice architecture decisions.

Important:

- Present honestly as a learning project.
- Do not oversell it as a production application.

---

# KineSoin history

## Version 1

Purpose:

- Validate the initial idea.
- Learn React/JavaScript concepts.

Lessons learned:

- Some architecture choices became difficult to maintain as the project grew.
- Rebuilding allowed applying new knowledge and improving organisation.

## Version 2

Goals:

- Cleaner architecture.
- Better separation of responsibilities.
- Easier future evolution.

---

# KineSoin user flows

## Patient

Current / planned flow:

Register account
↓
Profile information submitted
↓
Admin validation
↓
Access application

Concepts demonstrated:

- authentication
- authorization
- user workflow
- validation process

## Admin

Capabilities:

- Review patient information.
- Validate patient account.
- Manage user data.

## Therapist

(Complete after reviewing existing features)

---

# Technical stack

## Frontend

Technologies:

- React
- JavaScript
- React Router
- Context API
- CSS / styling solution

Concepts:

- Component organisation
- State management
- Forms
- API communication

## Backend

Technologies:

- Node.js
- Express
- Sequelize
- PostgreSQL

Concepts:

- REST API
- Database communication
- Authentication
- Business logic separation

---

# Technical decisions

## Cloudinary

Reason:

- Avoid managing image storage directly on the server.
- Simplify image handling.
- Prepare application for easier deployment.

## Sequelize ORM

Reason:

- Simplify database interactions.
- Improve code readability.
- Reduce manual SQL queries.
- Help maintain safer database interactions.

Important:

- Do not claim Sequelize completely prevents SQL injection.

Better explanation:
"An ORM helps structure database access and provides safer abstractions compared with manually building every query."

---

# Problems encountered / examples

## Architecture evolution

Problem:

- Initial architecture became harder to maintain as features increased.

Solution:

- Reworked project organisation.
- Improved separation of responsibilities.

Lesson:

- Good architecture is something that evolves with understanding.

---

## Frontend/backend state synchronisation

Problem:

- Backend updates correctly but frontend does not always refresh displayed data.

Example:

- Patient status toggling.

Lesson:

- Need to understand state updates and data synchronisation.

---

## Navigation state issue

Problem:

- Opening patient modal → navigating to appointments → returning leaves modal open.

Lesson:

- Need better control of UI state during navigation.

---

# Current TODOs

See TODO.md

---

# Things to improve later

- Better separation between UI state and entity data.
- More tests.
- Improve documentation.
- Continue learning Java/Spring Boot.

---

# Questions to ask Alltech

- What kind of missions are usually given to interns?
- What technologies does the team use daily?
- How are interns accompanied?
- What would make an intern successful in your team?
