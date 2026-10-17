# Project Meeting Document

**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** None yet · **Edited by:** [None]

**Project:** Smart Food Management Web Application · **Group:** 07 - IntroSE 24C02

## Project Overview

The project is a proposed smart food management web app for individuals and households. Users would be able to keep a shared inventory of food at home, including item quantities, storage locations, and estimated expiration dates. The app would help them notice which ingredients should be used soon, suggest recipes based on what they have available, and organize meal plans around those ingredients. The goal is to make food easier to manage, reduce spoilage and waste, and save time spent tracking groceries or deciding what to cook. AI-powered suggestions are part of the planned experience; community features and business integrations are ideas for future exploration.

## Members and Their Roles

| Member                          | Lead focus / role               |
| ------------------------------- | ------------------------------- |
| Nguyễn Cao Thông (group leader) | Project Manager (PM)            |
| Ngô Huỳnh Thắm                  | Testing and Documentation       |
| Cao Tiến Thiên                  | Frontend and UI/UX Design       |
| Dư Hoài Phúc                    | Backend and Architecture Design |
| Phan Tuấn Phong                 | Research and Requirements       |

All members contribute to implementation, testing, documentation, review, and UI/UX design. A lead coordinates their area; the role does not make that member solely responsible for it.

### Actor Summary

- **Normal/household user:** A registered user who manages household food and uses inventory, monitoring, recommendations, and meal planning. Household permissions depend on the member's assigned role.
- **Community participant:** A registered user who searches, shares, and discusses recipes. The same account may also be a household user.
- **Administrator:** A user with administrative permissions to manage accounts and review user activity insights.

## Functional Groups, Actors, and AI Features

**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** None yet · **Edited by:** [None]

The current proposal has **10 functional groups**. The table summarizes their purpose, primary actors, and whether they include an AI feature.

| #   | Functional group                | What it does                                                                                                                                                                                             | Primary actor(s)                                  | AI feature |
| --- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------- |
| 1   | Authentication                  | Supports account sign-up, log-in, and log-out.                                                                                                                                                           | Normal user, community participant, administrator | No         |
| 2   | Profile management              | Lets users update profile details, password, and avatar, and view their activity statistics.                                                                                                             | Normal user, community participant, administrator | No         |
| 3   | Household management            | Lets household users invite or add members, remove members, and manage their roles.                                                                                                                      | Household user                                    | No         |
| 4   | Food inventory management       | Uses AI OCR on bills and image recognition on food photos to identify ingredients and suggest quantities and estimated expiration dates for faster entry; also supports manual entry and food deduction. | Household user                                    | **Yes**    |
| 5   | Expiration and stock monitoring | Identifies soon-to-expire and low-stock food and presents alerts and statistics.                                                                                                                         | Household user                                    | No         |
| 6   | Recipe catalog and search       | Provides a catalog of more than 200 recipes and lets users search for recipes, including recipes collected from short-video platforms.                                                                   | Normal user, community participant                | No         |
| 7   | Recipe-sharing community        | Lets users post, edit, and delete their own recipes and comment on other users' recipes.                                                                                                                 | Community participant                             | No         |
| 8   | AI recipe recommendations       | Matches recipes to food in a user's fridge and prioritizes recipes that use food nearing its estimated expiration date.                                                                                  | Household user                                    | **Yes**    |
| 9   | AI meal planning                | Creates weekly or monthly food plans with nutritional details.                                                                                                                                           | Household user                                    | **Yes**    |
| 10  | Administration                  | Lets administrators manage user accounts and view statistics or insights about user activities.                                                                                                          | Administrator                                     | No         |

### AI Features and User Value

- **AI-assisted food entry:** Uses OCR to read bills and image recognition to identify food in photos, then suggests a quantity and estimated expiration date for each identified item. This speeds up inventory entry by reducing the amount of information users need to type manually.
- **AI recipe recommendations:** Match available fridge food to existing recipes and give priority to food nearing its estimated expiration date, helping users decide what to cook and use food sooner.
- **AI meal planning:** Prepare weekly or monthly meal plans with nutritional details, helping users organize meals in advance.
