# Effect Status Rules

Allowed statuses:
- `ready`: implementation and metadata verified
- `experimental`: implementation exists but behavior or support needs more review
- `needs-review`: metadata or references exist, but implementation/readiness is not verified
- `deprecated`: preserved for compatibility but should not be promoted

Never mark an effect `ready` when:
- it is metadata-only
- the CSS class does not exist
- the JS API does not exist
- the data attribute path cannot parse it
- fallback points to a missing effect
- reduced-motion behavior can leave content hidden
- playground metadata is incomplete

Future modules should start as `needs-review`, then promote to `ready` only after tests and reports verify the implementation.
