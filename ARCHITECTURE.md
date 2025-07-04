# Architecture

```mermaid
flowchart TD
  A[Frontend React Components] --> B[Web3 Integration Layer]
  B --> C[Smart Contracts]
  C --> D[Blockchain Network]
```

## Components

- **Frontend**: React + Tailwind UI for user interface.
- **Web3 Layer**: Interacts with smart contracts via ethers.js or web3.js.
- **Smart Contracts**: Deployed on REChain Network.
- **Backend Services (optional)**: API services for indexing or notifications.
