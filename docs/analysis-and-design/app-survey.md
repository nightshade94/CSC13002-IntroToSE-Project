# C - Existing App Survey: Well Stockd, SuperCook and KitchenPal

**Performed by:** Phan Tuấn Phong · **Reviewed by:** None yet · **Edited by:** None

**Draft status:** Updated draft · **Date:** 16 October 2026 · **Last updated:** 20 October 2026

This draft surveys **Well Stockd**, **SuperCook** and **KitchenPal** as existing applications related to the proposed shared fridge/pantry web app. It includes sampled features, user flows, 59 captioned first-hand screenshots, limitations, and a comparison of common features, possible project differences and UI/UX patterns to adopt. Well Stockd and SuperCook were surveyed on October 16, 2026; KitchenPal was surveyed on October 20, 2026.

## Contents

- [1. Well Stockd](#1-well-stockd)
- [2. SuperCook](#2-supercook)
- [3. KitchenPal](#3-kitchenpal)
- [4. Cross-App Comparison and Project Implications](#4-cross-app-comparison-and-project-implications)

## 1. Well Stockd

**Status:** Sampled hands-on survey completed.

**Project context:** A proposed shared fridge/pantry web app with food entry, household collaboration, recipe and nutrition planning, AI assistance, community features and possible business promotions.

### 1.1 Scope, Method and Evidence

Well Stockd is the product at [wellstockd.com](https://www.wellstockd.com/). It corresponds to the app called "Well Stocked" in the initial comparison image. A similarly named app should not be substituted without checking its identity.

The survey inspected the live public website and operated a signed-in account in a desktop browser. The student completed sign-in. Synthetic inventory, shopping and meal-plan data were then used to execute representative workflows. No real food was cooked, no groceries were bought, and no payment details or personal receipts were submitted.

Evidence categories:

- **Executed:** An action was performed and its result inspected in the survey account.
- **Interface inspected:** A screen or control was opened, but its full workflow was not executed.
- **Documented:** An official product description was read; behavior remains untested.
- **Proposed:** A possible feature of our project, not a delivered capability or proven advantage.

The numbered figures below are first-hand browser captures stored under `screenshot/Well-Stockd/`. Vendor-supplied images are not used as evidence of executed actions.

### 1.2 Product and Access Overview

Well Stockd connects food inventory, recipe selection, meal planning, cooking and shopping. Its public page advertised Free and Pro tiers, with Pro at USD 7.99/month or USD 79/year. The live page said the card-free seven-day trial starts when three fresh foods are entered or a Pro feature is first used. The survey account displayed seven trial days after onboarding; no paid subscription was purchased. [Pricing](https://www.wellstockd.com/pricing)

The public site describes receipt capture, voice entry, household sharing and inventory-aware AI planning. These overlap substantially with our proposed app; their existence must be acknowledged even where this survey did not test their accuracy or multi-user behavior. [Features](https://www.wellstockd.com/features)

The initial signed-in dashboard asked for three foods rather than requiring a complete inventory. Quantity, unit and storage edits were available afterward. A persistent five-destination bottom navigation was visible at the browser width used during the session.

### 1.3 Key Features and Executed User Flows

| Area                       | Actions and observed result                                                                                                                                             | Evidence level                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Onboarding and inventory   | Added Spinach, Milk and Eggs, selected dates, then edited stock to 200 g, 500 ml and 6 whole respectively. Saved values and success feedback were verified.             | Executed; Figures 1-3.                                                 |
| Recipe discovery           | Removed the default Everyday filter and searched for egg. The result count was 197; cards displayed missing-item badges, time and calories.                             | Executed; Figure 4.                                                    |
| Stock-aware ingredients    | Opened Bacon, Egg & Cheddar Flatbreads for two servings. Four eggs were shown as on hand; eight other ingredients were missing.                                         | Executed; Figures 5-6.                                                 |
| Shopping from a recipe     | The review preselected the eight missing items and left eggs unchecked. Confirming the selection created an eight-item categorized shopping list.                       | Executed; Figures 6-7.                                                 |
| AI meal planning           | Selected With AI, three dinners and the default two servings. Reviewed and saved three suggested catalog meals for October 16-18.                                       | Executed; Figures 8-10.                                                |
| Shopping from a plan       | Generate shopping list retained existing entries and increased the list from eight to twenty lines. Repeated ingredients were consolidated, including a Spinach top-up. | Executed; Figure 12.                                                   |
| Planned nutrition          | Friday showed 1,200 kcal for the two planned servings together, while protein, carbs, fat and fiber were marked Incomplete.                                             | Display inspected; Figure 11. Nutritional accuracy not validated.      |
| Cook mode and stock update | Opened the Friday recipe, inspected the step view and finish review, then recorded an explicitly annotated simulation. Spinach decreased from 200 g to 58.25 g.         | Executed UI simulation; Figures 13-16.                                 |
| Receipt/photo entry        | Opened the Photo/receipt dialog, which explains review before adding recognized items.                                                                                  | Interface inspected; Figure 17. No upload or recognition test.         |
| Household and diet rules   | Inspected create/join household fields and dietary-rule controls.                                                                                                       | Interface inspected; Figures 18-19. No invitations or rules submitted. |

**Flow A - Stock to shopping:** Enter three foods -> adjust quantities and units -> search recipes -> review on-hand versus missing ingredients -> confirm missing items -> inspect the shopping list. This verifies one stock-aware purchase-preparation journey without completing a retailer transaction.

**Flow B - AI planning:** Open Planner -> Pick for me -> With AI -> choose three dinners -> review suggestions -> Add 3 meals -> inspect the calendar -> Generate shopping list. The AI returned Herbed Chicken with Spinach & Mushrooms, Herbed Tilapia with Spinach & Cannellini Bake, and Chicken with Smoky Tomato Chickpea Stew. The review displayed an estimated USD 52.49 for priced items and identified one unpriced item instead of claiming a complete total.

**Flow C - Cooking simulation:** Open the Friday meal -> view the recipe -> enter Cook mode -> inspect the final-step review -> add the note "PA1 survey simulation only; no real meal was cooked." -> Update kitchen & log -> verify stock. The review proposed 141.75 g of Spinach usage and disclosed four ingredients not tracked in the kitchen. The completion screen offered an undo action; the final inventory confirmed 58.25 g of Spinach, 500 ml of Milk and 6 Eggs.

### 1.4 Screenshots with Captions

All figures in this section were captured during direct operation of the survey account. Times, dates and food values are part of the survey state; food entries are synthetic examples.

**Figure 1. Signed-in onboarding.** The initial dashboard asks for three foods and offers date shortcuts. This provides a small starting task before exploring recipes.

![Signed-in onboarding](screenshot/Well-Stockd/20-dashboard-onboarding.jpg)

**Figure 2. Editing a stored item.** The Eggs editor exposes quantity, unit, storage location and use-by date. The survey changes the quantity to six and then saves it.

![Editing Eggs](screenshot/Well-Stockd/22-edit-item.jpg)

**Figure 3. Saved inventory.** Kitchen displays 500 ml of Milk, 200 g of Spinach and six Eggs, with use-soon labels. The visible success message confirms an edit was saved.

![Saved sample inventory](screenshot/Well-Stockd/23-kitchen-stocked.jpg)

**Figure 4. Recipe search results.** Searching for egg after removing the default filter shows availability badges, cooking time and calories. Some results contain words such as veggie or eggplant; the query should not be interpreted as an exact ingredient-only filter.

![Recipe search results](screenshot/Well-Stockd/24-recipe-search.jpg)

**Figure 5. Ingredient comparison.** A catalog recipe shows its ingredient list and a button to add eight missing items. The existing Eggs stock is recognized as available for this recipe.

![Recipe ingredient comparison](screenshot/Well-Stockd/25-recipe-ingredients.jpg)

**Figure 6. Review before shopping changes.** Missing ingredients are preselected; Eggs is left unchecked because it is already in the kitchen. The user can change the selection before confirming.

![Shopping review](screenshot/Well-Stockd/26-shopping-review.jpg)

**Figure 7. Shopping list created from a recipe.** Eight entries are categorized and retain their connection to the source recipe. No retailer checkout was performed.

![Recipe shopping list](screenshot/Well-Stockd/27-shopping-list.jpg)

**Figure 8. AI planner setup.** With AI is selected for three dinners and the household's default two servings. The optional grocery budget was left blank; this was not a test of budget compliance.

![AI planner settings](screenshot/Well-Stockd/28-ai-plan-settings.jpg)

**Figure 9. AI review before saving.** The review provides estimated shopping cost and explicitly identifies a missing price. Suggestions are reviewed before the Add 3 meals action commits them to the plan.

![AI plan review](screenshot/Well-Stockd/29-ai-plan-review.jpg)

**Figure 10. Saved plan.** The planner reports three of twenty-one meals planned, with one meal on each of Friday, Saturday and Sunday. At the observed width it shows one selected day's details rather than the full desktop matrix.

![AI plan saved](screenshot/Well-Stockd/30-ai-planner-saved.jpg)

**Figure 11. Nutrition data limitation.** The selected day's total covers both planned servings, not one person's actual intake. Calories are shown, but protein, carbs, fat and fiber are marked Incomplete; this limits evaluation of fitness-related targets.

![Planned nutrition with incomplete values](screenshot/Well-Stockd/31-planned-nutrition.jpg)

**Figure 12. Shopping after plan generation.** The list now contains twenty entries, preserving the original recipe's items. Chicken Cutlets is marked as needed for two recipes, illustrating aggregation across the plan.

![Shopping from the plan](screenshot/Well-Stockd/32-shopping-from-plan.jpg)

**Figure 13. Cooking view.** Step-oriented navigation, large instructions and separate timer controls focus the interface on cooking. The survey navigated the interface without preparing a real meal or using microphone access.

![Cooking mode](screenshot/Well-Stockd/33-cook-mode.jpg)

**Figure 14. Review of proposed stock usage.** The finish dialog lets the user adjust or skip tracked amounts before updating stock. The note explicitly identifies this entry as a PA1 simulation.

![Cooking stock review](screenshot/Well-Stockd/34-cooking-stock-review.jpg)

**Figure 15. Update confirmation and recovery.** The completion dialog confirms the Spinach change and offers Undo kitchen update. This survey observed the undo option but did not execute it.

![Stock update confirmation](screenshot/Well-Stockd/35-stock-update-confirmation.jpg)

**Figure 16. Inventory after the simulation.** Spinach is now 58.25 g and marked low; the other two sample quantities remain unchanged. This confirms that the reviewed deduction reached the inventory view.

![Inventory after the cooking simulation](screenshot/Well-Stockd/36-kitchen-after-cook.jpg)

**Figure 17. Receipt/photo entry options.** Receipt reading and pantry-photo review have separate actions, and the dialog says recognized items are editable proposals. The survey stopped before selecting or uploading a file, so OCR quality is not established.

![Receipt entry interface](screenshot/Well-Stockd/37-receipt-entry.jpg)

**Figure 18. Household entry points.** Settings provides household creation and invite-code joining, alongside default serving controls. These controls were inspected without creating a household or inviting another user.

![Household configuration interface](screenshot/Well-Stockd/38-household-entry.jpg)

**Figure 19. Dietary-rule interface.** The screen distinguishes ingredient exclusions and eating style and explains uncertainty in ingredient classification. No personal diet or allergy data was entered, and enforcement was not tested.

![Dietary-rule configuration interface](screenshot/Well-Stockd/39-diet-rules.jpg)

### 1.5 Strengths, Limitations and UI/UX Lessons

| Finding                                               | Evidence and implication                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Connected workflows reduce repeated entry             | The recipe-to-shopping and planner-to-shopping actions reused existing inventory information. Our app should preserve this continuity rather than provide unrelated CRUD screens.                                                                                                                            |
| Automation remains reviewable                         | Both missing-item shopping and AI planning exposed a review before saving. Cooking also showed editable stock deductions. The same pattern is useful for OCR and AI output.                                                                                                                                  |
| Status is explained using text                        | Missing items, use-soon labels, incomplete nutrition and unpriced groceries were described explicitly. Our design should not rely only on color or assume missing values are zero.                                                                                                                           |
| Date suggestions can race with manual selection       | During initial entry, automatic shelf-life suggestions appeared after typing. Date shortcuts were then selected again and verified before saving. This is one observed interaction, not a repeated or diagnosed defect; our app should clearly preserve user overrides when asynchronous suggestions arrive. |
| Nutrition coverage was incomplete in the sampled plan | The Friday meal had calories but no complete macro totals. This is a concrete limit of this sample, not proof that the entire catalog lacks macro data.                                                                                                                                                      |
| General search can produce broad matches              | The egg query returned names including eggplant and veggie. Our app could separate exact ingredient selection from broad text search if users need that distinction.                                                                                                                                         |
| Context matters for competition                       | The inspected UI and retailer handoff reference an English-language, US-shopping context. Vietnamese receipts, units, recipes and stores need separate evaluation; regional absence was not exhaustively tested.                                                                                             |

Patterns to consider adopting are persistent task navigation, a small onboarding task, availability badges on recipe cards, editable automation previews, explicit success feedback, and separate planned-versus-consumed nutrition labels. These are design observations supported by screenshots, not accessibility certifications or measured usability improvements.

### 1.6 Comparison with the Proposed Application

| Aspect                      | Well Stockd evidence                                                                       | Proposed project implication                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fridge and pantry inventory | Manual quantities, units, dates and reviewed deductions were executed.                     | This is baseline scope, not a unique feature. Investigate local units and purchase-batch handling.                                                    |
| AI meal planning            | AI produced and saved three catalog meals with explanations and cost disclosure.           | Do not claim competitors only require manual planning. Validate a Vietnamese conversational planning flow instead.                                    |
| Receipt OCR                 | The entry and review explanation were inspected; no upload was tested.                     | Vietnamese bill recognition could be a focus, but receipt scanning itself is already offered.                                                         |
| Household collaboration     | Creation/joining controls were inspected; two-user synchronization was not tested.         | Shared fridges are an existing category feature. Research actual household ownership and permission needs.                                            |
| Nutrition and fitness       | Planned totals were visible, with missing macros disclosed in this sample.                 | A candidate focus is complete, sourced nutrition for a curated Vietnamese recipe set and user-defined planning targets. Superiority requires testing. |
| Shopping and promotions     | Missing-item lists and a retailer entry point exist; no order was placed.                  | Local-store deals may be relevant. A business promotion portal is a separate workflow that needs validation.                                          |
| Community                   | Recipe details included a review area; broad public community posting was not established. | Do not claim there is no interaction at all. Specify whether our community supports discussion, shared plans or other distinct needs.                 |

The strongest proposed positioning is not simply "a fridge app with AI." A more testable direction is a locally adapted planning workflow that understands selected Vietnamese foods, receipt formats and household priorities. Proposed improvements remain hypotheses until interviews and comparative tasks support them.

The comparison with SuperCook and KitchenPal appears in Section 4 of this document. Paprika remains outside the completed survey scope.

### 1.7 Coverage Limits and Account Changes

This survey demonstrates sampled workflows, not exhaustive quality assurance. OCR recognition, barcode scanning, microphone input, notification delivery, retailer checkout, multi-account household synchronization, dietary enforcement and AI repeatability were not tested. The initial three-food inventory was intentionally small, so the generated plan still required additional shopping; it does not prove optimal inventory use.

All in-app food dates and quantities were test data. No food-safety conclusion or real nutrition-consumption record is claimed. One cooking-history entry is explicitly annotated as a simulation.

At the end of the survey the account contains three sample inventory items, three planned dinners, twenty shopping lines, and one annotated cooking simulation. Spinach is 58.25 g, Milk 500 ml and Eggs six whole. The seven-day trial was activated by normal onboarding; no payment details were entered and no paid subscription was purchased. No personal receipt was uploaded, no household invitation was sent, and no account/privacy/security setting was changed.

The live browser showed 3,800+ recipes and trial activation after fresh-food entry or first Pro use. Search-indexed versions showed different catalog counts and trial wording. The captured live state takes precedence for this report, and pricing can change after the survey date.

### 1.8 Sources, Evidence Files and AI Disclosure

Public sources, accessed October 16, 2026:

1. [Well Stockd homepage](https://www.wellstockd.com/).
2. [Features and official product gallery](https://www.wellstockd.com/features).
3. [Pricing](https://www.wellstockd.com/pricing).
4. [Account registration](https://www.wellstockd.com/signup).

Authenticated evidence was captured from Dashboard, Kitchen, Recipes, Shopping, Planner, Cook mode and Settings. The nineteen selected captures are supplied under `screenshot/Well-Stockd/`. Reproducing the private account state requires authorization; no account credentials are included in the report.

The linked public homepage, features and pricing pages provide product and access context. Their descriptions are distinguished from the hands-on figures above.

Codex assisted with browser operation, screenshot collection, evidence organization and English drafting. The student completed sign-in. The original request and this conversation should be retained as part of the AI usage record. The cross-app synthesis is included in Section 4; no interviews or unperformed tests are claimed.

## 2. SuperCook

**Status:** Sampled guest-web survey completed. This is app 2 of the four requested surveys.

**Project context:** A shared fridge/pantry web application with food inventory, household collaboration, recipe and nutrition planning, AI assistance, community interactions and possible business promotions.

### 2.1 Scope, Method and Evidence

The survey operated the live [SuperCook web application](https://www.supercook.com/#/desktop) in a desktop browser without signing in. Seven ordinary ingredients were entered as synthetic test data. No mobile application was installed, no account was created, and no personal food, health or receipt data was submitted.

Evidence labels distinguish what was actually established:

- **Executed:** The action and its visible result were inspected.
- **Interface inspected:** Controls or information were viewed without validating the entire feature.
- **Partial:** An action was selected, but its intended final result was not independently confirmed.
- **Documented:** A developer description was read; the claim was not audited.
- **Proposed:** A possible improvement for our project, not an existing or proven advantage.

The sixteen SuperCook figures are first-hand browser captures. Figure 29 shows the external publisher reached from SuperCook and is explicitly identified as such. The selected captures are supplied under `screenshot/SuperCook/`.

### 2.2 Product and Access Overview

SuperCook focuses on finding existing recipes from ingredients the user already has. The tested web session allowed pantry selection, search, filtering, ingredient comparison and publisher navigation without payment or an account. Saving a favorite prompted registration, and the survey declined that prompt.

The developer's [Google Play listing](https://play.google.com/store/apps/details?hl=en_US&id=com.supercook.app) describes a catalog exceeding eleven million recipes collected from multiple websites, ingredient matching and voice entry. These are developer claims; neither catalog size, voice accuracy nor the internal AI implementation was verified. The [Apple listing](https://apps.apple.com/us/app/supercook-recipe-by-ingredient/id1477747816) identifies the mobile product as free. This survey does not establish that every feature or platform is unrestricted.

The web interface presents an ingredient pane beside recipe results. Pantry entries in the sampled workflow are presence selections, without an entered quantity, purchase batch, storage location or expiry date. Recipe quantities displayed later do not establish that the user actually owns enough food to cook the recipe.

### 2.3 Key Features and Executed User Flows

| Area                      | Action and observed result                                                                                                                                                                                | Evidence level                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Guest start               | Chose Get started and reached an empty pantry without credentials. The interface explicitly assumes salt, pepper and water are available.                                                                 | Executed; Figure 20.                                                        |
| Ingredient selection      | Selected egg, butter, milk, flour, olive oil and garlic from category chips. Searched spinach and chose the matching suggestion.                                                                          | Executed; Figures 21-23.                                                    |
| Inventory-aware discovery | Egg alone produced 574 cookable results. All seven selected ingredients produced 1,836. Counts belong to this session and can change with the catalog.                                                    | Executed; Figures 21 and 23.                                                |
| Required ingredient       | Applied spinach as a key ingredient. The cookable-result count became 40.                                                                                                                                 | Executed; Figure 24.                                                        |
| Keyword search            | Typed omelette and selected the corresponding autocomplete suggestion. The cookable-result count became 14.                                                                                               | Executed; Figure 25.                                                        |
| Recipe detail and source  | Opened Easy Creamy Spinach, inspected ingredient availability and selected View Full Recipe. A separate publisher page opened.                                                                            | Executed; Figures 26 and 29.                                                |
| Nutrition display         | Inspected calories and macro fields, then a sodium value with a questionable displayed unit. Serving interpretation and nutritional accuracy were not validated.                                          | Interface inspected; Figures 27-28.                                         |
| Diet filter               | With spinach required, applied vegan; the cookable-result count fell from 40 to 21. Cleared the filter afterward.                                                                                         | Executed; Figure 30. Diet classification accuracy was not audited.          |
| Missing ingredient        | Enabled Missing one ingredient, opened German Creamed Spinach and inspected the missing onion action.                                                                                                     | Executed through the action dialog; Figures 31-32.                          |
| Shopping action           | Selected +Add to shopping list for onion. The dialog closed, but a saved list or success confirmation was not established in this guest desktop session.                                                  | Partial; Figure 32. Do not describe this as a verified saved shopping list. |
| Favorites                 | Clicked the recipe heart. A dialog required an account to save recipes; selected No.                                                                                                                      | Access gate inspected; Figure 33. Nothing was saved as a favorite.          |
| Pantry maintenance        | Removed milk: six ingredients and 1,451 cookable results. Added milk back: seven ingredients and 1,836 results.                                                                                           | Executed; Figures 34-35.                                                    |
| Reload persistence        | Reloaded the page; the seven ingredient selections remained, while the tested recipe filters reset. This establishes persistence across one reload in the same browser, not cross-device synchronization. | Executed; same-browser reload.                                              |

**Flow A - Ingredients to a recipe:** Get started -> select pantry chips -> search and add spinach -> inspect cookable results -> require spinach -> open a recipe -> inspect its ingredient checklist -> open the publisher for the full instructions. This demonstrates selection and discovery, not physical cooking or stock deduction.

**Flow B - Refine a choice:** With spinach required, open Diet -> choose vegan -> Apply -> inspect 21 cookable results -> clear the diet filter. Separately, selecting the omelette search suggestion produced 14 cookable results from the seven-ingredient pantry. These are separate tasks, not one combined filter state.

**Flow C - Missing ingredient:** Enable Missing one ingredient -> open German Creamed Spinach -> select the plus control beside onion -> inspect the choices to add it to the pantry or shopping list -> choose the shopping-list action. The action was attempted, but its saved-list outcome remains unverified.

**Flow D - Update availability:** Remove milk -> inspect the six-ingredient state and reduced result count -> add milk back -> verify the restored count. This illustrates manual availability maintenance; no recipe consumption was logged.

### 2.4 Screenshots with Captions

The following captures show the actual test session. Result counts are snapshots of the live catalog, not measurements of recommendation quality. Additional recipes requiring missing ingredients can appear below the cookable section; the heading count must not be interpreted as the total number of every card displayed.

**Figure 20. Empty guest pantry.** The side-by-side layout starts with ingredient categories and an explanation of the assumed staples. The empty state directs the user toward adding ingredients before browsing recipes.

![Empty guest pantry](screenshot/SuperCook/02-empty-pantry.jpg)

**Figure 21. One ingredient unlocks results.** Selecting egg changes its chip state and produces 574 cookable results. Cards show the recipe name, source domain and ingredient-availability message, making the basis of the match visible.

![Egg-only recipe results](screenshot/SuperCook/03-egg-only-results.jpg)

**Figure 22. Ingredient autocomplete.** Typing spinach exposes specific alternatives, including water spinach and spinach wraps. Selecting a specific suggestion avoids treating every similar word as the same food.

![Ingredient search suggestions](screenshot/SuperCook/04-ingredient-search.jpg)

**Figure 23. Seven-ingredient discovery.** Adding spinach to the six previously selected ingredients raises the cookable-result count to 1,836. The suggested additional ingredients are discovery prompts, not a reviewed purchase recommendation or an existing shopping list.

![Seven selected ingredients](screenshot/SuperCook/05-seven-ingredients-results.jpg)

**Figure 24. Required-ingredient filter.** The active Spinach chip narrows the cookable count to 40. This gives the user direct control over using a particular food, but no expiry-based automatic priority was tested.

![Required spinach filter](screenshot/SuperCook/06-key-ingredient-filter.jpg)

**Figure 25. Keyword search result.** Choosing the omelette autocomplete suggestion returns 14 cookable matches. The pantry remains visible during search, preserving the connection between discovery and ingredient availability.

![Omelette keyword results](screenshot/SuperCook/22-keyword-results.jpg)

**Figure 26. Recipe detail panel.** Easy Creamy Spinach opens beside the results with time metadata, recipe quantities and availability checks. Generic spinach in the pantry is treated as available for a recipe specifying frozen spinach; quantity and preparation-form suitability still require user judgment.

![Recipe ingredient details](screenshot/SuperCook/07-recipe-details.jpg)

**Figure 27. Recipe nutrition display.** The detail panel exposes calories, fat, carbohydrates and protein. The sampled screen does not make the serving basis clear enough for this survey to validate a personal fitness target.

![Recipe nutrition display](screenshot/SuperCook/08-recipe-nutrition.jpg)

**Figure 28. A nutrition-unit quality concern.** This capture displays sodium as 262 grams. That is a concrete reason to validate units before using imported data in a nutrition planner; this survey did not determine where the value or formatting originated or audit the rest of the catalog.

![Displayed sodium unit](screenshot/SuperCook/09-nutrition-unit-display.jpg)

**Figure 29. External publisher handoff.** View Full Recipe opens The Bossy Kitchen, whose page title is Easy Creamed Spinach. This is the publisher's website, not an internal SuperCook cooking screen. The survey confirmed the handoff but did not cook the dish or complete the publisher's recipe workflow.

![External recipe publisher](screenshot/SuperCook/10-publisher-handoff.jpg)

**Figure 30. Combined pantry and diet filtering.** Spinach and Vegan are active together, producing 21 cookable matches. Filter selection is visible on the result screen. This demonstrates a dietary category filter, not calorie or macro optimization.

![Vegan spinach results](screenshot/SuperCook/13-vegan-results.jpg)

**Figure 31. Recipes missing one ingredient.** The active missing-ingredient mode presents cards that name the missing food. The header still shows the cookable count; it should not be quoted as the number of missing-ingredient cards.

![Missing one ingredient results](screenshot/SuperCook/14-missing-one-results.jpg)

**Figure 32. Keep availability and purchasing separate.** The onion action offers adding it to the pantry or to the shopping list. The survey selected the shopping-list action, but did not confirm the resulting list. The distinction is useful because intending to buy something does not mean it is already in stock.

![Missing ingredient action choices](screenshot/SuperCook/16-missing-ingredient-action.jpg)

**Figure 33. Account boundary for favorites.** Clicking the recipe heart opens a registration prompt. Selecting No allows the survey to continue without creating an account; authenticated favorites and synchronization remain untested.

![Favorite requires an account](screenshot/SuperCook/11-favorite-account-gate.jpg)

**Figure 34. Availability removal affects results.** Milk is no longer selected and the cookable count becomes 1,451. This is manual pantry maintenance, not an automatic deduction of a measured amount after cooking.

![Results after removing milk](screenshot/SuperCook/19-after-removing-milk.jpg)

**Figure 35. Restored pantry and organized inventory view.** Milk was added back. My Pantry groups the seven selected ingredients and exposes search/removal controls; the cookable count returns to 1,836. No expiry or quantity fields were used in this workflow.

![Restored guest pantry](screenshot/SuperCook/20-restored-pantry.jpg)

### 2.5 Strengths, Limitations and UI/UX Lessons

| Finding                                         | Evidence and project lesson                                                                                                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Low initial effort                              | One ingredient produced usable results without registration. Our app could let a user explore a small sample pantry before asking for a complete inventory or household setup.                                                                    |
| Matching is explained at the point of choice    | Recipe cards and details describe availability or name missing ingredients. Adopt explicit status text alongside visual checks.                                                                                                                   |
| A clear pantry overview helps maintenance       | My Pantry groups selected foods and exposes removal controls. Keep a compact overview even if our inventory model also contains batches, amounts and dates.                                                                                       |
| Filters provide understandable control          | Required-ingredient and diet filters changed the observed result set. Show active filters and provide a clear way to remove each.                                                                                                                 |
| Availability is simpler than inventory planning | Presence alone cannot demonstrate that two people have enough ingredients for dinner. Our plan should check recipe portions against stock quantities and present shortages before saving.                                                         |
| Source dependence adds another interface        | The full recipe opened an external publisher with its own privacy notice and page layout. Preserve source attribution and make the destination clear; do not assume external cooking flows are consistent.                                        |
| Nutrition needs provenance and validation       | A serving basis was unclear and a sodium unit looked questionable in the sample. Store units, portions and source information explicitly, and expose uncertainty rather than silently calculate a fitness plan.                                   |
| Count wording can be confusing                  | Missing-ingredient cards appeared while the heading retained the cookable count. Distinguish cookable recipes from recipes requiring purchases in our result labels.                                                                              |
| Icon actions need usable names                  | Pantry and recipe actions frequently appeared as unnamed icons in the browser accessibility representation. Our design should provide accessible names and visible help where the action is ambiguous. This was not a formal accessibility audit. |

### 2.6 Coverage Limits and Remaining Test State

This is a representative survey, not exhaustive quality assurance. The tested environment was the desktop web interface. Voice recognition, mobile-app behavior, account registration, authenticated favorites, cross-device synchronization, household sharing, OCR, notifications, multi-day meal planning and nutrition accuracy were not validated. No internal model or algorithm was inspected, and automatic recipe matching should not be described as a tested conversational LLM planner.

The shopping action is deliberately marked partial: selecting it and seeing the dialog close is insufficient evidence of a saved list. The survey did not establish a successful saved-list outcome in this guest desktop session. No product-wide conclusion about shopping-list availability is drawn.

After leaving a login screen, the left pane briefly appeared blank in this browser. Reloading restored it. The cause was not determined, so it is recorded as a session observation rather than a diagnosed product defect. Reloading also demonstrated ingredient persistence; filter selections reset. No browser storage mechanism or synchronization service was inspected.

At the end of the survey, the guest browser retains seven sample selections: egg, butter, milk, flour, olive oil, garlic and spinach. Milk was restored after the removal test. Onion was not added to the pantry; its shopping-list persistence is unknown. No account was created, no favorite was saved, no microphone permission was granted, no personal files were uploaded, no purchase was made and no software was installed. The publisher's optional cookies were rejected.

### 2.7 Sources, Evidence Files and AI Disclosure

Sources accessed October 16, 2026:

1. [SuperCook live web application](https://www.supercook.com/#/desktop): primary hands-on evidence for pantry selection, recipe search, filters, detail screens and access boundaries.
2. [Developer listing on Google Play](https://play.google.com/store/apps/details?hl=en_US&id=com.supercook.app): documented catalog, matching and voice-entry claims; not proof of measured quality.
3. [Apple App Store listing](https://apps.apple.com/us/app/supercook-recipe-by-ingredient/id1477747816): mobile product identity and advertised access model; the mobile app was not operated.
4. [The Bossy Kitchen recipe destination](https://www.thebossykitchen.com/easy-creamy-spinach/): external page reached through the tested full-recipe action.
5. [Well Stockd survey in this document](#1-well-stockd) supplies the previously executed observations used in the cross-app comparison in Section 4.

The sixteen SuperCook figures are supplied under `screenshot/SuperCook/`; the nineteen Well Stockd figures are under `screenshot/Well-Stockd/`. These 35 images remain part of the combined Markdown report. The additional 24 KitchenPal figures are documented in Section 3. No vendor screenshot is presented as a personally executed workflow.

Codex assisted with browser operation, screenshot capture, source checking and English drafting. The student authorized the survey and should retain this conversation as AI-use evidence. KitchenPal was subsequently surveyed in Section 3; Paprika remains pending. For the SuperCook session, no interviews, physical cooking, successful shopping-list persistence or unperformed tests are claimed.

## 3. KitchenPal

**Status:** Sampled hands-on survey completed for the desktop web beta in Guest/Basic mode on October 20, 2026. Mobile-only and Premium capabilities are distinguished from executed workflows.

### 3.1 Scope, Method and Product Identity

The surveyed product is **KitchenPal by iCuisto Pte Ltd**, reached through [kitchenpalapp.com](https://kitchenpalapp.com/en/). The website's **Launch the Web App** link opened [kitchenpalweb.vercel.app](https://kitchenpalweb.vercel.app/login?kp_from=website). The developer identifies this as its web beta. The similarly named `kitchenpal.ai` is not the product surveyed here; the official website explicitly distinguishes the two. [Official website](https://kitchenpalapp.com/en/)

The survey used **Continue as Guest**, without entering an email, password, payment details, personal health data or personal receipts. Only synthetic food data were entered. The shopping completion was a UI simulation, not a real purchase. Optional cookies were rejected. No native app or emulator was installed.

The evidence categories defined in Section 1.1 apply here. Screenshots are first-hand captures of the web beta under `screenshot/KitchenPal/`. A photographed mobile-app promotion is evidence of an access boundary, not evidence that its scanner or OCR was operated. The survey does not assume feature parity between the web beta and mobile applications.

### 3.2 Product and Access Overview

KitchenPal connects kitchen inventory, recipes, shopping and a meal calendar. Persistent navigation exposes Kitchen, Shopping, Recipes, Planner and Profile. Onboarding asks which goal to start with. The survey selected Organize Kitchen, encountered a scanner introduction and used Maybe Later to continue manually.

The official FAQ describes a Basic limit of 100 kitchen items, 50 barcode scans and 20 photo detections. It lists Premium at USD 3.99/month, USD 14.99/year, USD 29.99 lifetime, or USD 39.99 lifetime family, with regional and tax variation. Advanced recipe filters and unlimited meal planning are described as Premium. These are dated published terms, not prices verified through checkout. The web UI also displayed 0/50 scans and 0/20 photo detections. [Pricing and platform FAQ](https://kitchenpalapp.com/en/homepage-faqs.html)

Saving recipe filters opened **Get Premium in the app**, directing the user to the mobile app for purchase. No subscription was started. In contrast, adding one product to one day's dinner slot succeeded in the Basic session. This establishes that narrow planning action; it does not establish free unlimited planning or unrestricted recipe planning.

### 3.3 Key Features and Executed User Flows

| Area                             | Actions and observed result                                                                                                                                                                                                | Evidence level                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Access and onboarding            | Entered as Guest, dismissed the mobile-app promotion and selected a starting goal. The resulting profile identified the session as Guest/Basic.                                                                            | Executed; Figures 36-39 and 58.                                                                           |
| Inventory entry                  | Searched for spinach, selected the generic ingredient, reviewed quantity and saved it. It appeared as one 100 g item in Fridge with a 13-day badge.                                                                        | Executed; Figures 40-42.                                                                                  |
| Amount and product details       | Selected Half (50%), edited the base weight to 200 g and saved a PA1 simulation note. After refresh and a later page reload, the inventory showed 100 g remaining and the detail retained a 200 g base with 50% remaining. | Executed; Figures 43 and 47; later detail reinspection confirmed persistence.                             |
| Expiry control                   | Opened Storage and attempted to enter October 22, 2026. The field did not retain the attempted date in this session, while the 13-day badge remained.                                                                      | Partial; Figure 44. A successful manual expiry override was not established.                              |
| Product nutrition                | Opened read-only nutrition for generic spinach. The UI stated a 100 g/ml serving basis and explicit kcal, mg and g field labels.                                                                                           | Interface inspected; Figure 43. Accuracy not validated.                                                   |
| Shopping and stock               | Added onion to My List, simulated marking it bought, reviewed the stock-transfer confirmation and confirmed Add to kitchen. Refreshing Kitchen showed onion in Pantry alongside spinach in Fridge.                         | Executed UI simulation; Figures 45-47. No payment or real purchase.                                       |
| Recipe discovery                 | Opened kitchen-based recommendations, inspected missing-ingredient labels and opened Easy Spinach & Ramen. Spinach was available; ramen was missing.                                                                       | Executed discovery; Figures 51-52.                                                                        |
| Shopping from a recipe           | Selected only the missing ramen, chose My List and confirmed. Shopping displayed an additional 42 g to buy for Easy Spinach & Ramen.                                                                                       | Executed; Figures 53-54. The quantity is the app's displayed result, not independently validated.         |
| Nutrition and diet filters       | Opened the Premium-labelled filter dialog, expanded Special Diets and Nutrition (per serving), and attempted Save. The app opened the Premium purchase handoff.                                                            | Interface and access gate inspected; Figures 48-50. No filtered result was established.                   |
| Meal planning                    | Opened October 20, selected Dinner -> Add Product, searched for spinach, reviewed it and saved. Spinach appeared under Dinner.                                                                                             | Executed for one product on one day; Figures 55-57. No automatic AI plan or multi-day recipe plan tested. |
| Profile and alerts               | Inspected profile inputs, default alert controls, customization switches and capture quotas. No personal profile information was entered and no alert was delivered during testing.                                        | Interface inspected; Figures 58-59.                                                                       |
| Household sharing and AI capture | Official help describes shared kitchens, photo recognition and receipt review. These were not operated in the guest web session.                                                                                           | Documented only; sources in Section 3.8.                                                                  |

**Flow A - Enter and maintain food:** Continue as Guest -> choose Organize Kitchen -> Maybe Later -> Add Products -> search spinach -> select the generic ingredient -> Add selected items -> review -> Add to Kitchen -> open the item -> select Half -> edit the base weight to 200 g and save the simulation note. A later refreshed inventory displayed 100 g remaining. The detail page retained 200 g and 50% after a reload. Editing an amount is distinct from physically consuming food.

**Flow B - Shopping to stock:** Open Shopping -> select suggested onion -> Add to Shopping List -> inspect the saved row -> Start checkout -> mark onion bought -> Finished Shopping -> review Add to kitchen -> confirm -> refresh Kitchen. The resulting inventory contained two items: onion in Pantry and spinach in Fridge. This checkout is an internal list-completion workflow, not a retailer payment.

**Flow C - Recipe to shopping:** Open Recipes -> read the kitchen-based recommendation explanation -> open Easy Spinach & Ramen -> inspect available versus missing ingredients -> Add to Shopping List -> select ramen -> choose My List -> confirm -> inspect Shopping. The saved row named the source recipe and showed 42 g to buy. The survey did not cook this recipe or execute Update Kitchen from its recipe page.

**Flow D - Manual planning:** Open Planner -> select Dinner on Tuesday, October 20 -> Add Product -> find spinach -> review -> Add to Planner -> verify the saved dinner entry. This was a manual product allocation, not an AI-generated balanced meal or evidence of fitness-target optimization.

### 3.4 Screenshots with Captions

The following 24 figures were captured during direct operation on October 20, 2026. They continue the numbering of the earlier surveys. Food entries, purchase completion and the dinner entry are synthetic examples.

**Figure 36. Access without registration.** The web beta offers email sign-in, Google sign-in and Continue as Guest. The survey used Guest; optional cookies had been rejected before this capture.

![KitchenPal access options](screenshot/KitchenPal/01-access-options.jpg)

**Figure 37. Web and mobile boundary.** After guest entry, a promotion directs users to the mobile app for barcode scanning, photo recognition and receipt photos. Continue on the web allows the survey to proceed. The screen does not establish that capture features were tested.

![KitchenPal web and mobile boundary](screenshot/KitchenPal/02-web-mobile-boundary.jpg)

**Figure 38. Goal-based onboarding.** Organize Kitchen, Scan Products, Shopping List and Find Recipes provide different starting goals. The survey chose Organize Kitchen and then skipped the scanner introduction.

![KitchenPal goal onboarding](screenshot/KitchenPal/03-goal-onboarding.jpg)

**Figure 39. Empty kitchen and storage navigation.** The empty state offers Add Products and suggested ingredients. Tabs distinguish Fridge, Pantry, Freezer, Spices, Beverages and Other; the left navigation keeps the core workflows visible.

![KitchenPal empty kitchen](screenshot/KitchenPal/04-empty-kitchen.jpg)

**Figure 40. Ingredient selection.** Searching spinach exposes the generic ingredient and alternatives such as baby spinach, water spinach and frozen spinach. The survey selected generic spinach; the presence of these alternatives argues against assuming that competitors lack Asian ingredients.

![KitchenPal ingredient search](screenshot/KitchenPal/05-ingredient-search.jpg)

**Figure 41. Review before stock changes.** Add to Kitchen summarizes the selected ingredient and quantity before saving. This review pattern is also relevant to a proposed OCR workflow, although OCR itself was not tested.

![KitchenPal add inventory review](screenshot/KitchenPal/06-review-before-add.jpg)

**Figure 42. Saved default stock.** Spinach appears as 100 g in Fridge with a 13-day badge after entry using Add automatically. The survey did not explicitly choose this storage or date during the initial add flow; the badge is not a food-safety guarantee.

![KitchenPal automatically assigned storage and date badge](screenshot/KitchenPal/07-auto-storage-and-date.jpg)

**Figure 43. Product details and nutrition basis.** The saved base weight is 200 g and the note identifies a PA1 sample. The nutrition panel separately states a 100 g/ml serving size and marks generic-ingredient data read-only. Product base weight and nutrition serving size should not be conflated. Nutritional accuracy was not checked against a reference database.

![KitchenPal product details and nutrition](screenshot/KitchenPal/08-product-and-nutrition.jpg)

**Figure 44. Expiry edit remains unverified.** Storage exposes an Expiry Date field, but it is blank in this capture after the attempted October 22 entry. The attempt did not establish a saved override; its cause was not diagnosed. This is a session observation, not proof that expiry editing fails across all platforms.

![KitchenPal expiry control observation](screenshot/KitchenPal/09-expiry-control-observation.jpg)

**Figure 45. Saved shopping-list item.** Onion appears in My List with a quantity of one. A success message was also observed immediately after addition. This is a confirmed list entry, rather than an inferred result from closing a dialog.

![KitchenPal saved shopping list](screenshot/KitchenPal/10-saved-shopping-list.jpg)

**Figure 46. Review of shopping-to-stock transfer.** After a simulated bought-item check, Finished Shopping lists the onion that will be added to the kitchen and explains that the list will close. The survey confirmed this synthetic transfer without purchasing groceries.

![KitchenPal shopping to kitchen review](screenshot/KitchenPal/11-shopping-to-kitchen-review.jpg)

**Figure 47. Stock after the simulated shopping trip.** Refreshing Kitchen shows onion in Pantry and spinach in Fridge. Spinach displays 50% and 100 g remaining from the edited 200 g base. The refresh was necessary to inspect the latest combined state in this session.

![KitchenPal stock after shopping simulation](screenshot/KitchenPal/12-kitchen-after-shopping.jpg)

**Figure 48. Nutrition filtering already exists.** The Premium-labelled filter dialog exposes calorie, carbohydrate, fiber and fat ranges under Nutrition (per serving). These controls show that nutrition-based recipe filtering is an existing category feature; they do not demonstrate automatic meal-plan optimization.

![KitchenPal nutrition filter](screenshot/KitchenPal/13-nutrition-filter.jpg)

**Figure 49. A unit-label concern.** The same filter displays a sodium range of 0-2000 g, whereas the product nutrition editor labels sodium in mg. The inconsistent labels warrant validation before using the values for planning. The underlying unit and filtering calculation were not established because no filter was applied successfully.

![KitchenPal nutrition unit label](screenshot/KitchenPal/14-nutrition-unit-label.jpg)

**Figure 50. Premium access boundary.** Attempting to save the filter opens Get Premium in the app and says membership purchased in the mobile app will appear on the web. The survey chose Not now; no payment or subscription was initiated.

![KitchenPal Premium access gate](screenshot/KitchenPal/15-premium-access-gate.jpg)

**Figure 51. Kitchen-based recipe discovery.** Recipe sections include Main Courses and Quick Cooking, with missing-ingredient labels and cooking times on cards. The app advises adding more kitchen items to improve recommendations. These results were generated from a small sample inventory, not a recommendation-quality benchmark.

![KitchenPal recipe recommendations](screenshot/KitchenPal/16-recipe-recommendations.jpg)

**Figure 52. Availability and substitutions.** Easy Spinach & Ramen separates missing ramen from available spinach and identifies frozen spinach as the original recipe ingredient. A notice explains substitutions. Spinach is labelled available for a displayed 140 g requirement even though the refreshed inventory showed 100 g remaining; an availability label alone therefore does not establish sufficient stock for the selected portion. Personalized nutrition asks for a completed profile, which the survey did not provide.

![KitchenPal recipe ingredient matching](screenshot/KitchenPal/17-recipe-ingredient-matching.jpg)

**Figure 53. Choose the shopping destination.** The missing-ingredient action allows one selected ingredient to be added to My List. The survey selected ramen only, leaving available spinach unselected.

![KitchenPal missing ingredient review](screenshot/KitchenPal/18-missing-ingredient-review.jpg)

**Figure 54. Confirmed recipe-linked purchase requirement.** Shopping now shows ramen with an additional 42 g to buy for Easy Spinach & Ramen. This confirms a saved recipe-to-list outcome. Ingredient units changed between the detail, selection and shopping screens; their conversion accuracy was not validated.

![KitchenPal shopping list from recipe](screenshot/KitchenPal/19-shopping-from-recipe.jpg)

**Figure 55. Day-based meal planner.** The October 20 view divides the day into Breakfast, Lunch, Break and Dinner, with separate Add Recipe and Add Product controls. The screen supports a manual planning workflow; it is not an observed AI-generated calendar.

![KitchenPal meal planner](screenshot/KitchenPal/20-meal-planner.jpg)

**Figure 56. Review before planning.** Selecting spinach through Dinner -> Add Product opens Add to Planner with quantity review. This screen resembles stock entry but names a different destination, which is important for avoiding confusion between planned food and inventory.

![KitchenPal planner review](screenshot/KitchenPal/21-planner-add-review.jpg)

**Figure 57. Saved dinner entry.** Spinach appears under Dinner with quantity, delete and shopping actions. This verifies one product entry in the Basic session. It does not prove unlimited free planning, a nutritionally complete meal or automatic consumption deduction.

![KitchenPal saved dinner plan](screenshot/KitchenPal/22-saved-dinner-plan.jpg)

**Figure 58. Guest profile and alert settings.** The profile states that the user is browsing as a guest and should sign up to save data. It shows two inventory products and alert controls. Personal inputs were left at their defaults or blank; displayed zero waste and savings are initial counters, not measured benefits.

![KitchenPal guest profile and alerts](screenshot/KitchenPal/23-guest-profile-and-alerts.jpg)

**Figure 59. Visible capture quotas.** The profile shows 0/50 successful scans and 0/20 successful photo detections, alongside Premium messaging. The survey did not use either capture method; these counters document the interface rather than recognition accuracy.

![KitchenPal capture quotas](screenshot/KitchenPal/24-capture-quotas.jpg)

### 3.5 Strengths, Limitations and UI/UX Lessons

| Finding                                            | Evidence and project lesson                                                                                                                                                                                                             |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shopping is connected to inventory                 | Onion moved from a saved list into the kitchen through a reviewed completion flow. Our app should distinguish planned purchases, bought items and stored quantities.                                                                    |
| Recipe shortages preserve their source             | The saved ramen row retained the recipe name and required amount. Keep this provenance when consolidating purchases across meals.                                                                                                       |
| Remaining amount and base amount are different     | The test retained a 200 g base with 50% remaining and showed 100 g in inventory. Our design should explain the base, percentage and usable amount consistently.                                                                         |
| Automation needs an explicit review                | Stock addition, missing-ingredient shopping and planning each exposed a review or selection step. Apply the same principle to OCR and AI output.                                                                                        |
| Feature visibility does not imply access           | Nutrition controls were viewable, but Save opened a Premium handoff. Make access limits clear before users spend time configuring a feature.                                                                                            |
| Presence is not sufficient quantity                | The sampled recipe marked spinach available for 140 g while remaining stock was 100 g. Evaluate ingredient identity, form, quantity and portions separately in our app. This observation does not audit every matching rule.            |
| Units and nutrition need validation                | Sodium had different unit labels across two screens; recipe ingredient units also varied across detail and selection screens. Retain unit metadata and validate conversions before calculating healthy plans.                           |
| Saved results should be easy to verify             | Some changes were visible only after loading or refreshing the destination. Clear completion feedback and a refreshed destination view help users trust an update. No backend cause or general performance measurement was established. |
| Guest mode lowers the entry barrier but has limits | Core sample tasks worked without a named account, and inventory survived one reload. The profile still warned users to sign up to save data; durable, cross-device or post-logout persistence was not established.                      |

### 3.6 Comparison with the Proposed Application

| Aspect                       | KitchenPal evidence                                                                                                                                  | Proposed project implication                                                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inventory and expiry         | Storage, quantity, a remaining-amount control and expiry UI were inspected; the manual date override remained unverified.                            | These capabilities already exist in this category. Test clearer user-confirmed dates and quantity handling rather than claim an entirely new concept.             |
| Receipt and photo capture    | The web promotion and official help describe mobile capture. Recognition was not operated.                                                           | Receipt OCR is not a unique feature by itself. Vietnamese bill formats, units and review accuracy require a separate comparative test.                            |
| Healthy recipe discovery     | Nutrition fields and per-serving filter controls exist; filter saving was Premium-gated.                                                             | Differentiate through a validated planning task, such as combining expiry urgency, portions and user-selected targets, rather than merely adding calorie filters. |
| Meal planning                | One manual product entry was saved; broader planning is described by the developer.                                                                  | Do not describe KitchenPal as lacking a planner. A conversational multi-day plan would need an executed comparison before claiming an advantage.                  |
| Household collaboration      | Official help documents shared kitchens and lists; it was not tested with multiple accounts.                                                         | Household sharing is an existing feature. Research permissions, conflicting edits and practical ownership needs.                                                  |
| Purchase batches             | Official kitchen help says different dates or storage can retain separate entries for the same product. This was not executed here.                  | Batch handling should not be claimed as unique without comparison. Evaluate whether it is understandable and useful for local households.                         |
| Vietnamese household context | English web UI and international ingredient alternatives were observed; Vietnamese-language support and local receipt accuracy were not established. | Local food names, units, recipes and shopping habits remain candidate research areas, not proven competitor omissions.                                            |

### 3.7 Coverage Limits and Remaining Test State

The environment was the desktop web beta in Guest/Basic mode. Barcode scanning, voice entry, receipt OCR, photo recognition, native mobile behavior, registered-account synchronization, multi-user household sharing, notification delivery, paid features, recipe imports and a multi-day recipe plan were not tested. Nutrition values, food-safety estimates, recommendation relevance and ingredient conversions were not independently validated. No LLM conversation or automatic AI meal plan was executed.

The attempted October 22 expiry entry did not remain visible in the tested date field. The original 13-day badge persisted. This establishes an unverified override in this session; it does not establish the cause or a platform-wide defect. Similarly, reaching a loading or confirmation screen was not treated as proof of a saved change: the reported successful flows were checked in their destination views.

At the end of the survey, the guest state contained onion in Pantry (100 g) and spinach in Fridge (200 g base, 50% remaining, displayed as 100 g). The spinach note reads "PA1 survey sample only; no physical food tracked." A later reload retained the two-item inventory and the spinach detail values. My List contained the recipe-linked ramen purchase requirement, and Dinner on October 20 contained the single spinach planning entry. Long-term guest persistence is unknown. No personal health details were entered, no invitation was sent, no recipe was cooked, no groceries were purchased and no payment was made.

### 3.8 Sources, Evidence Files and AI Disclosure

Sources accessed October 20, 2026:

1. [KitchenPal official website](https://kitchenpalapp.com/en/): product identity and the link used to reach the web application.
2. [KitchenPal web beta](https://kitchenpalweb.vercel.app/login?kp_from=website): primary hands-on evidence for all 24 figures and the executed guest workflows.
3. [Pricing and platform FAQ](https://kitchenpalapp.com/en/homepage-faqs.html): documented prices, Basic quotas, Premium boundaries and web-beta status. Terms may change.
4. [Kitchen inventory FAQ](https://kitchenpalapp.com/en/faqs/kitchen.html): documented shared-kitchen workflow, separate entries by date/storage, photo recognition and receipt review. These additional capabilities were not executed.
5. [Recipe FAQ](https://kitchenpalapp.com/en/faqs/recipes.html): documented recipe import, Cookbook AI and post-cooking stock updates; not evidence of executed recognition or cooking.
6. [Shopping FAQ](https://kitchenpalapp.com/en/faqs/shopping.html): documented shopping completion and list management, alongside the first-hand simulation in this survey.
7. [Planner FAQ](https://kitchenpalapp.com/en/faqs/planner.html): documented recipe scheduling, serving counts and shared plans; the executed test was limited to one product entry.
8. [Developer listing on Google Play](https://play.google.com/store/apps/details?hl=en-US&id=fr.icuisto.icuisto): confirms iCuisto's mobile product identity; the Android application was not operated.

All 24 KitchenPal images are first-hand browser screenshots under `screenshot/KitchenPal/`, not downloaded vendor mockups. Codex assisted with browser operation, synthetic test-data entry, screenshot capture, official-source checks, English drafting and comparison updates. The student authorized this survey; retain this conversation as AI-use evidence. No interview, physical cooking, real purchase, paid subscription or unperformed test is claimed. Paprika remains outside the completed survey scope.

## 4. Cross-App Comparison and Project Implications

The comparison uses the sampled Well Stockd, SuperCook and KitchenPal surveys in Sections 1-3. Well Stockd was tested in a signed-in trial account; SuperCook and KitchenPal were tested as guests, and KitchenPal's desktop web interface was a beta. Access conditions and survey dates differ. An unobserved or gated capability is not proof of product-wide absence. Paprika has not yet been surveyed in this sequence.

| Aspect                         | SuperCook evidence                                                     | Well Stockd evidence                                        | KitchenPal evidence                                                                                                  | Proposed project implication                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Pantry representation          | Ingredient presence selected; no amounts or dates entered.             | Amounts, units and use-by dates edited.                     | Storage and base/remaining amounts maintained; expiry UI inspected, manual override unverified.                      | Quantity and expiry management are existing capabilities. Validate clear amounts, batches and user overrides.                               |
| Recipe discovery               | Pantry matching, search and required-ingredient filtering executed.    | Search and on-hand versus missing ingredients executed.     | Kitchen-based recommendations and available/missing ingredient detail inspected.                                     | Matching ingredients to recipes is a shared baseline. Check quantity and preparation form, not only presence.                               |
| Meal planning                  | No calendar or multi-day AI plan established in the sampled interface. | AI generated and saved three planned dinners.               | One manual product entry saved under Dinner; unlimited planning not established.                                     | Test an expiry-, portion- and nutrition-aware plan. AI planning is already present in a surveyed competitor.                                |
| Shopping                       | Missing-onion action attempted; saved outcome unverified.              | Recipe and plan lists created and inspected.                | Recipe-linked ramen list entry saved; simulated onion shopping completion transferred stock.                         | Preserve recipe provenance, review shortages and verify the result of each list/stock change.                                               |
| Nutrition and healthy planning | Recipe display inspected; unit and serving-basis concerns.             | Planned calories displayed; sampled macros incomplete.      | Product serving basis visible; per-serving filters inspected but Premium-gated; sodium label inconsistency observed. | Nutrition display and filtering already exist. Validate units, completeness, targets and the resulting plan before claiming an improvement. |
| Household collaboration        | Not established in the guest survey.                                   | Create/join controls inspected; multi-user sync not tested. | Shared kitchens/lists documented; no two-user test.                                                                  | Research permissions and conflicts; do not claim that household sharing itself is unique.                                                   |
| Receipt and photo capture      | Not tested or established in the sampled session.                      | Photo/receipt entry inspected; recognition not tested.      | Mobile capture promoted and documented; recognition not tested.                                                      | OCR is an existing category feature. Compare actual Vietnamese receipts and editable recognition results.                                   |
| Low-friction entry             | Guest recipe discovery.                                                | Onboarding started with three foods.                        | Guest access and goal-based onboarding; core synthetic tasks executed.                                               | Offer a small useful starting task and explain guest persistence and account boundaries.                                                    |
| Access limits                  | Favorites requested registration.                                      | Pro trial enabled sampled paid workflows.                   | Filter Save opened a mobile Premium handoff; Basic product planning succeeded.                                       | State access conditions before configuration, and separate visible controls from usable features.                                           |

**Common features:** All three sampled apps connect food availability with recipe discovery, expose missing ingredients and show nutrition-related information. Each has a recipe-to-shopping entry point; saved outcomes were verified in Well Stockd and KitchenPal, while SuperCook's shopping result remained unverified. Well Stockd and KitchenPal also connect richer inventory with planning and shopping. Their tested access conditions differ, so the survey does not establish which product is universally more capable or easier to use.

**What our project could do differently:** Investigate a focused Vietnamese household workflow that combines receipt review, quantities, confirmed expiry dates and portion-aware plans with sourced nutrition. KitchenPal already documents batches, household sharing and AI capture, and exposes nutrition filters; Well Stockd already demonstrated AI planning. None of those feature names alone establishes novelty. Candidate improvements require comparative tasks with Vietnamese receipts, recipes, units and household situations, including quantity shortages and unavailable nutrition data. Community and business promotions should solve validated needs rather than increase the functional-group count.

**UI/UX patterns to adopt:** Use a small or goal-based onboarding task; keep pantry context accessible during discovery; provide searchable ingredient suggestions and active filter chips; label available and missing ingredients in text; distinguish planned purchases, bought stock and planned meals; review automated suggestions before saving; preserve recipe provenance; and confirm refreshed results. Explain remaining amounts, unit conversions, guest persistence and Premium boundaries. Reuse the workflow principles rather than copying visual designs.
