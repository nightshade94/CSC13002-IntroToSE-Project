# Functional Groups and Actors

**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** Cao Tiến Thiên · **Edited by:** [None]

## Project Summary

**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** Cao Tiến Thiên · **Edited by:** [None]

The proposed application is a responsive web-based fridge-management system that helps people manage household food, reduce food waste, find recipes, and plan meals. It also includes a recipe-sharing community and administrative functions.

## Functional Groups

**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** Cao Tiến Thiên · **Edited by:** [None]

The proposal contains **10 functional groups**, within the teacher's required range of 8 to 10. The AI-enabled groups help users enter purchased food faster, choose recipes that use food nearing expiration, and organize meals with nutritional information.

| #   | Functional group                | Main capabilities                                                                                                                                                                    | Primary actor(s)                                  | AI feature |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | ---------- |
| 1   | Authentication                  | Sign up, log in, and log out                                                                                                                                                         | Normal user; community participant; administrator | No         |
| 2   | Profile management              | Edit profile information, change password or avatar, and view personal activity statistics                                                                                           | Normal user; community participant; administrator | No         |
| 3   | Household management            | Invite or add household members, remove members, and manage member roles                                                                                                             | Household user                                    | No         |
| 4   | Food inventory management       | Use AI OCR on bills and image recognition on food photos to identify ingredients and suggest quantities and estimated expiration dates; also support manual entry and food deduction | Household user                                    | **Yes**    |
| 5   | Expiration and stock monitoring | Identify soon-to-expire and low-stock food; show related alerts and statistics                                                                                                       | Household user                                    | No         |
| 6   | Recipe catalog and search       | Browse a catalog of more than 200 available recipes and search for recipes, including recipes collected from short-video platforms                                                   | Normal user; community participant                | No         |
| 7   | Recipe-sharing community        | Post, edit, or delete one's own recipes and comment on other users' recipes                                                                                                          | Community participant                             | No         |
| 8   | AI recipe recommendations       | Match existing recipes to food in the user's fridge and prioritize recipes that use food nearing its estimated expiration date                                                       | Household user                                    | **Yes**    |
| 9   | AI meal planning                | Create weekly or monthly food plans with nutritional details                                                                                                                         | Household user                                    | **Yes**    |
| 10  | Administration                  | Manage user accounts and view statistics or insights about user activities                                                                                                           | Administrator                                     | No         |

## Functional Group Details

**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** Cao Tiến Thiên · **Edited by:** [None]

### 1. Authentication

Authentication lets users create an account, log in, and log out. It gives each person access to their own profile and household information.

### 2. Profile Management

Profile management lets users update their personal information, password, and avatar, and view statistics about their activities. This helps users keep their account details current and review how they use the application.

### 3. Household Management

Household management lets users invite or add members, remove members, and assign or change household roles. It helps a household coordinate access to shared food inventory and related planning features.

### 4. Food Inventory Management

AI-assisted food entry uses OCR to read bills and image recognition to identify food in photos, then suggests a quantity and estimated expiration date for each identified item. Users can also enter food manually or deduct it manually or through recipes; automating initial entry reduces typing and helps them build an inventory faster.

### 5. Expiration and Stock Monitoring

Expiration and stock monitoring identifies food that is nearing its estimated expiration date or has low stock, and presents related alerts and statistics. This helps users notice food that may need attention and make timely use of what they have.

### 6. Recipe Catalog and Search

The recipe catalog provides access to more than 200 recipes, including recipes collected from short-video platforms, and lets users search for recipes. It gives users a broad set of meal ideas they can find when deciding what to cook.

### 7. Recipe-Sharing Community

The recipe-sharing community lets users post recipes, edit or delete their own posts, and comment on other users' recipes. It gives community members a place to share their cooking ideas and discuss recipes with one another.

### 8. AI Recipe Recommendations

AI recipe recommendations match existing recipes with the food recorded in a user's fridge and prioritize food nearing its estimated expiration date. This helps users find relevant meals and use food sooner, which can reduce waste.

### 9. AI Meal Planning

AI meal planning creates food plans for a week or month and includes nutritional details. It helps users organize meals ahead of time while considering the nutritional information available for the plan.

### 10. Administration

Administration lets authorized administrators manage user accounts and review statistics or insights about user activity. These tools help administrators oversee account use and understand how people are using the application.

## Actors

**Performed by:** Ngô Huỳnh Thắm · **Reviewed by:** Cao Tiến Thiên · **Edited by:** [None]

### Normal User / Household User

A registered user who manages food in a household fridge. Depending on their household role, they can manage household members and use inventory, expiration monitoring, recipe recommendations, and meal planning.

### Community Participant

A registered user who uses the recipe-sharing community to search for recipes, post or manage their own recipes, and comment on other users' recipes. A household user may also be a community participant; these labels describe the user's roles in the system and do not require separate accounts.

### Administrator

A user with administrative permissions who manages user accounts and reviews user activity statistics and insights.
