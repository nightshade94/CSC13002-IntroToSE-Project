# Froodge — Project Proposal

<!-- @import "project-proposal.css" -->

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

| Item         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| Course       | CSC13002 Introduction to Software Engineering – PA1-2026 |
| Group        | Group 07 – IntroSE 24C02                                 |
| Product type | Responsive web application (working name: Froodge)       |

---

## 1. Introduction

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

### 1.1 Problem

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

Food waste starts at home. The UNEP Food Waste Index Report 2024 estimates that households wasted about 631 million tonnes of food in 2022, or 79 kg per person. In Vietnamese cities, families and students usually shop once or twice a week, put everything into one shared fridge, and soon lose track of it.

| #   | Problem                                                        | Result                                                            |
| --- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| P1  | Nobody knows exactly what is in the fridge or when it expires. | Food spoils unnoticed and money is wasted.                        |
| P2  | "What should we cook today?" has to be answered every day.     | People repeat dishes or buy more instead of using what they have. |
| P3  | Recording groceries by hand takes too long.                    | Users stop updating their inventory after a few days.             |
| P4  | Household members do not share one view of the food at home.   | Duplicate purchases and missing ingredients.                      |

### 1.2 Our Solution

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

Our web app turns the household fridge into a **shared, always up-to-date food inventory**. Users add groceries quickly by **photographing a bill or the food itself**: AI identifies each item and suggests its quantity and estimated expiration date, and the user confirms before saving. The app then warns the household about food that should be used soon, **recommends recipes that use those items first**, and **creates meal plans** with nutritional information.

**Household users and community participants** work in one loop: household users keep the fridge up to date and cook from it, while community participants share and discuss recipes that feed back into the recommendations.

```mermaid
%%{init: {"theme": "base", "themeVariables": {"fontSize": "14px"}, "flowchart": {"useMaxWidth": false}}}%%
flowchart TB
A["Add food from receipts<br/>or food photos"] --> B["Track shared inventory"]
B --> C["Check expiry and<br/>low-stock alerts"]
C --> D["Get recipe ideas<br/>and plan meals"]
D --> E["Cook and update<br/>food quantities"]
E -. "next shopping trip" .-> A
F["Community members search,<br/>share, and discuss recipes"] -. "new recipe ideas" .-> D
E -. "share a dish" .-> F
```

<p align="center"><em>Figure 1. Household food and recipe workflow.</em></p>

**Administrators** manage user accounts and review activity statistics to keep the app safe and understand how it is used.

### 1.3 Value

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

| For                        | Value delivered                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Households**             | Less food and money wasted; a quick answer to "what to cook today"; one shared view of the fridge and meal plan. |
| **Community participants** | A place to find, share and discuss home-style recipes.                                                           |
| **Administrators**         | Tools to manage accounts and understand how the app is used.                                                     |

### 1.4 What Makes It Different

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

Compared with the apps in our survey (Well-Stockd and SuperCook):

1. **Fast input:** one bill or food photo can add many items, and every AI suggestion is reviewed by the user before it is saved.

2. **Alerts that lead to action:** soon-to-expire food is linked directly to recipes that use it.

3. **Local focus:** the workflow is designed around Vietnamese foods, units, recipes and bill formats. We will check this with real users before claiming it as an advantage.

4. **Household-first:** members share one inventory and meal plan, with roles managed by the household.

---

## 2. Target Users and Environments

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

### 2.1 Target User Segments

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

| Segment                                       | Characteristics                                                     | Why the app fits                                         | Priority  |
| --------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------- | --------- |
| **Urban families**                            | Parents aged 28–45; weekly supermarket trips; one main meal planner | Largest food volume; need shared planning                | Primary   |
| **Students and young workers sharing a flat** | Aged 18–27; tight budget; 2–5 people share one fridge               | Need to know what is at home; cheap meals from leftovers | Primary   |
| **Busy singles and couples**                  | Shop irregularly; cook a few times a week                           | Forget food easily; benefit most from alerts             | Secondary |

### 2.2 Actors

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

| Actor                       | Description                                                                                                            | Main goals                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Normal / Household User** | A registered user who manages the food of one household. Their household role decides whether they can manage members. | Know what is in the fridge, use food in time, plan meals.    |
| **Community Participant**   | A registered user who searches, posts and comments on recipes. The same account can also be a household user.          | Find and share recipes.                                      |
| **Administrator**           | A user with administrative permissions.                                                                                | Manage user accounts; view activity statistics and insights. |

**Secondary (system) actors:** the AI services (bill OCR, food image recognition, recommendations, meal planning) and the e-mail service.

```mermaid
%%{init: {"theme": "base", "themeVariables": {"fontSize": "12px"}, "flowchart": {"useMaxWidth": false}}}%%
flowchart LR
H(["Household User"]) --> W["Responsive web app"]
C(["Community Participant"]) --> W
A(["Administrator"]) --> W
W --> API["Back end (REST API)"]
API --> AI[("AI services")]
API --> M[("E-mail service")]
```

<p align="center"><em>Figure 2. Application actors and supporting services.</em></p>

### 2.3 Usage Context

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

| When / where                 | Who                   | Typical task                          | Design implication                                       |
| ---------------------------- | --------------------- | ------------------------------------- | -------------------------------------------------------- |
| At home after shopping       | Household User        | Photograph the bill, confirm items    | Camera upload and a review screen usable on a phone      |
| Before cooking               | Household User        | Check "use soon" items, pick a recipe | Recommendations reachable in two taps from the home page |
| Weekend evening              | Household User        | Plan next week's meals                | Clear weekly view; edit before saving                    |
| Any time, on phone or laptop | Community Participant | Search, post or comment on recipes    | Fast search; simple post form with photos                |
| At a desk                    | Administrator         | Manage accounts, read statistics      | Desktop tables, filters and dashboards                   |

### 2.4 Environments

**Performed by:** Cao Tiến Thiên · **Reviewed by:** Phan Tuấn Phong · **Edited by:** [None]

| Aspect             | All actors                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| Application        | One responsive web application over HTTPS; no native mobile app this semester                    |
| Devices            | Smartphones (mobile browser), laptops, desktop computers and tablets; layouts from 360 px wide   |
| Browsers / OS      | Latest two versions of Chrome, Edge, Firefox and Safari on Android, iOS, Windows, macOS or Linux |
| Device permissions | Camera or photo library, used through the browser's standard upload, for bills and food photos   |
| Connectivity       | Internet connection required (4G or Wi-Fi)                                                       |
| Notifications      | In-app notifications and e-mail for soon-to-expire and low-stock food                            |
| Languages          | Vietnamese (default) and English                                                                 |
| Accessibility      | Text contrast ≥ 4.5:1; status shown by colour **and** text; keyboard-navigable forms             |
| Server side        | Back end planned as Node.js + Express with TypeScript; database and AI provider to be decided    |

## 3. Key Features

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** Cao Tiến Thiên · **Edited by:** [None]

### 3.1 Accounts and Households

Users can register, sign in and out, and manage their personal information, password, and avatar. They can view activity statistics to understand how they use the app. Household members can be invited or removed, and their roles determine who can manage shared food information and meal plans.

### 3.2 Food Inventory and Shopping

Users can record each food item's quantity, storage location, and estimated expiration date, then update the quantity after shopping, cooking, or discarding food. Receipt OCR and food photo recognition can suggest entries that users review before saving, reducing the time needed to maintain the inventory. The app highlights food nearing expiration or running low and suggests purchases for low-stock items or planned meals, helping households use food in time and prepare shopping lists.

### 3.3 Recipes and Community

Users can browse and search recipes by name or ingredient and check the required ingredients before deciding what to cook. Community participants can publish recipes, edit or delete their own posts, and comment on other people's recipes. This gives households a wider range of meal ideas and lets members exchange cooking tips and feedback.

### 3.4 AI Cooking Assistance

The app compares recipe ingredients with the household inventory and recommends meals users can make or nearly make. It prioritizes food nearing its estimated expiration date and identifies missing ingredients, helping users choose meals that make better use of what they have. Users can request and adjust weekly or monthly meal plans with basic nutritional information where reliable recipe data is available, making it easier to plan meals and identify what to buy.

### 3.5 Administration

Administrators can manage user accounts to address account-related issues. They can review platform activity statistics to see how people use the application. Together, these tools help administrators oversee the service and identify areas that may need attention.

## 4. Key AI-Powered Features

**Performed by:** Nguyễn Cao Thông · **Reviewed by:** Cao Tiến Thiên · **Edited by:** [None]

### 4.1 AI-Assisted Food Entry

Users can upload a receipt or food photo instead of entering every item manually. OCR reads receipt text to identify possible food items, while image recognition identifies food in photos. The app suggests quantities and estimated expiration dates, and users review and correct these suggestions before saving them to the household inventory.

```mermaid
%%{init: {"theme": "base", "themeVariables": {"fontSize": "12px"}, "flowchart": {"useMaxWidth": false}}}%%
flowchart TD
A["Upload receipt<br/>or food photo"] --> B{"Input type"}
B -->|Receipt| C["Read receipt with OCR<br/>Identify food items"]
B -->|Food photo| D["Recognize food<br/>in the photo"]
C --> E["Suggest food items<br/>quantities and expiration dates"]
D --> E
E --> F["Review and correct<br/>suggested entries"]
F --> G["Save to household<br/>inventory"]
```

<p align="center"><em>Figure 3. AI-assisted food entry workflow.</em></p>

### 4.2 Inventory-Aware Recipe Recommendations

The app compares recipe requirements with the household’s recorded food and quantities. It prioritizes recipes that use ingredients nearing their estimated expiration dates, identifies missing ingredients, and explains each suggestion. Users decide which recipe to make; choosing one does not automatically change their inventory or shopping list.

```mermaid
%%{init: {"theme": "base", "themeVariables": {"fontSize": "12px"}, "flowchart": {"useMaxWidth": false}}}%%
flowchart TD
A["Household inventory<br/>and quantities"] --> C["Compare with<br/>recipe ingredients"]
B["Recipe catalog"] --> C
C --> D["Prioritize food<br/>nearing expiration"]
D --> E["Show recipes, reasons<br/>and missing ingredients"]
E --> F["Choose a recipe"]
```

<p align="center"><em>Figure 4. Inventory-aware recipe recommendation workflow.</em></p>
