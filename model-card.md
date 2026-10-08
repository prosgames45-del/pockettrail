# PocketTrail model card

Multinomial Naive Bayes, additive smoothing=1, four English intent classes. Trainable weights are calculated entirely from the open examples in model.mjs: 16 developer-authored sentences, four per class. They are illustrative synthetic training material, not survey answers or personal histories. All code and training examples are MIT licensed. No remote model, API or downloaded weights.

Purpose: help someone make a small decision to go outside, then constrain that suggestion to grounded venue choices and a time budget. Not a general language model. Unknown vocabulary returns no inferred intent; the person can explicitly choose. Confidence is the normalised model posterior, not calibrated evidence of correctness. Mixed requests and languages other than English are likely to fail. Explicit activity choice always overrides inference.

Four independent authored holdout phrases are tested separately from training examples in test.mjs. These tests only verify expected behavior on those phrases; they do not estimate broad real-world accuracy. A public result log is saved after running the test suite. Planner tests also check travel accounting, impossible itineraries, invalid coordinates and empty venue data.

No user data leaves the browser when generating a plan. Clicking a venue source follows an ordinary external website link. No generated first-person outdoor experience or success claims. Model uncertainty is visible and all venue claims have a limited source. Future evaluation should use consented user testing and a larger, independent multilingual dataset.
