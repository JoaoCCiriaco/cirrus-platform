<p align="center">
  <img src="assets/hero-logo.png" alt="Cirrus Platform Logo" width="700">
</p>

# Cirrus Platform
> **Enterprise Internal Developer Platform (IDP)**

**Cirrus Platform** is an Internal Developer Platform designed to standardize the software delivery lifecycle, abstract cloud infrastructure complexity, and accelerate engineering team productivity in cloud-native environments.

---

## Overview and Goals

* **Cognitive Load Reduction:** Abstraction of complex Kubernetes and Terraform configurations for developers.
* **Infrastructure Self-Service:** Standardized resource provisioning through unified interfaces.
* **Governance and Compliance:** Ensuring architectural, security, and compliance best practices are applied by default.
* **Delivery Standardization:** Automation of build, validation, and deployment pipelines.

---

## Platform Components

The Cirrus Platform architecture is divided into three main pillars:

* **Cirrus CLI (`cli/`):**
  Command-line interface built with TypeScript / Node.js responsible for abstracting infrastructure interactions and standardizing the developer workflow.
* **Core API / Orchestrator (`payment-api/`):**
  High-performance microservice developed in Go (Golang) handling processing, validation, and orchestration of service requests.
* **IaC & Kubernetes Modules (`terraform/` and `k8s/`):**
  Structured Terraform declarations and Kubernetes manifests for automated environment provisioning.

---

## Execution Flow

1. The developer requests a resource via **Cirrus CLI**.
2. The CLI forwards the declarative definition to the **Core API**.
3. The Core API validates governance parameters and triggers provisioning via **Terraform** and **Kubernetes**.

---

## Quick Start Guide

### Prerequisites
* Node.js 20+
* Go 1.22+
* Terraform 1.6+

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/JoaoCCiriaco/cirrus-platform.git
cd cirrus-platform
```