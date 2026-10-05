# 🏛️ C4 Architecture Model — Cirrus Platform

## Level 1: System Context Diagram

```mermaid
graph TD
    User[Software Engineer] -->|1. Runs 'cirrus init-service'| CLI[Cirrus CLI Engine]
    CLI -->|2. Generates Code & Manifests| App[Go Microservice]
    CLI -->|3. Provisions IaC| TF[Terraform K8s Module]
    TF -->|4. Deploys Resources| K8s[Kubernetes Cluster]