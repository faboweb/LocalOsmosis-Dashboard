## LocalOsmosis chain state developer explorer

LocalOsmosis is a very effective dev environment for developers, enthusiasts, and hobbyists alike.
Compared to traditional blockchain development it provides an un-heard of streamlined DX, with a tiny snag - the absence of an equally intuitive, easy-to-use UI.

This repository kicked off with the goal of providing such a UI.
For the developer, from the developer, of the developer. A chain state developer explorer.

Due to the nature of the task at hand, strongly typed & accurate representations of the blockchain was not the goal,
but an explorer that can display on-chain data in real-time effectively despite being connected to a node in a very versatile environment(during development).

Features that would normally be deemed crucial for traditional block explorers were decisively omitted.
Data that would be ignored for the average user but difficult to read due to a rapidly rising console yet crucial when developing were displayed with a high priority

Due to obvious time constraints and the absence of a backend, not all milestones that would be considered relatively crucial were omitted.

### Milestones

- IBC / fully indexed transactions
- account related visualizations
- Deep-coupling with the local development environment such that ie) interacting with smart contracts become more convenient
- Turn into PWA that automatically runs like a sidecar when you run a node
- With sufficient data, derive the api schemas for a given contract.

### Findings

- Tracking interactions with Smart Contracts are not trivial. 
- Without the schema getting information about the Smart Contract is almost impossible