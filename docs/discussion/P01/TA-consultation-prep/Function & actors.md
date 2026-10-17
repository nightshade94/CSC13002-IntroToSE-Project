# Functional Groups and Actors

## Project Summary

The proposed application is a web or mobile fridge-management system that helps people manage household food, reduce food waste, find recipes, and plan meals. It also includes a recipe-sharing community and administrative functions.

## Functional Groups

The proposal contains **10 functional groups**, within the teacher's required range of 8 to 10. The AI groups provide practical value by helping users choose recipes that use their available food and organize meals with nutritional information.

| #   | Functional group                | Main capabilities                                                                                                                                 | Primary actor(s)                                  | AI feature |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------- |
| 1   | Authentication                  | Sign up, log in, and log out                                                                                                                      | Normal user; community participant; administrator | No         |
| 2   | Profile management              | Edit profile information, change password or avatar, and view personal activity statistics                                                        | Normal user; community participant; administrator | No         |
| 3   | Household management            | Invite or add household members, remove members, and manage member roles                                                                          | Household user                                    | No         |
| 4   | Food inventory management       | Add food by scanning a bill or image, or by manual input; record quantity and estimated expiration date; deduct food manually or through a recipe | Household user                                    | No         |
| 5   | Expiration and stock monitoring | Identify soon-to-expire and low-stock food; show related alerts and statistics                                                                    | Household user                                    | No         |
| 6   | Recipe catalog and search       | Browse a catalog of more than 200 available recipes and search for recipes, including recipes collected from short-video platforms                | Normal user; community participant                | No         |
| 7   | Recipe-sharing community        | Post, edit, or delete one's own recipes and comment on other users' recipes                                                                       | Community participant                             | No         |
| 8   | AI recipe recommendations       | Match existing recipes to food in the user's fridge and prioritize recipes that use food nearing its estimated expiration date                    | Household user                                    | **Yes**    |
| 9   | AI meal planning                | Create weekly or monthly food plans with nutritional details                                                                                      | Household user                                    | **Yes**    |
| 10  | Administration                  | Manage user accounts and view statistics or insights about user activities                                                                        | Administrator                                     | No         |

## Functional Group Details

### 1. Authentication

Authentication lets users create an account, log in, and log out. It gives each person access to their own profile and household information.

### 2. Profile Management

Profile management lets users update their personal information, password, and avatar, and view statistics about their activities. This helps users keep their account details current and review how they use the application.

### 3. Household Management

Household management lets users invite or add members, remove members, and assign or change household roles. It helps a household coordinate access to shared food inventory and related planning features.

### 4. Food Inventory Management

Food inventory management lets users add food by scanning a bill or image, or by entering it manually, and record its quantity and estimated expiration date. Users can deduct food manually or through a recipe, helping them keep the fridge inventory useful and up to date.

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

### Normal User / Household User

A registered user who manages food in a household fridge. Depending on their household role, they can manage household members and use inventory, expiration monitoring, recipe recommendations, and meal planning.

### Community Participant

A registered user who uses the recipe-sharing community to search for recipes, post or manage their own recipes, and comment on other users' recipes. A household user may also be a community participant; these labels describe the user's roles in the system and do not require separate accounts.

### Administrator

A user with administrative permissions who manages user accounts and reviews user activity statistics and insights.

## Discussion Notes

- The same normal user account may act as a household user and a community participant.
- The estimated expiration date is a prediction; the proposal should clarify how users can interpret it.
- The recipe catalog's data sources and the method for collecting recipes from short-video platforms need to be decided.
- The specific permissions included in household roles and administrator access need to be defined.
- The AI aspect of recipe recommendations and meal planning should be described in the proposal in terms of how it uses the user's food and nutritional details to produce useful results.
