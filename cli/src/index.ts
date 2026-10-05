#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

console.log(chalk.cyan.bold('\n☁️  Cirrus Platform — Internal Developer Platform (IDP)\n'));

program
  .name('cirrus')
  .description('Enterprise CLI to scaffold and deploy microservices on Kubernetes')
  .version('1.0.0');

program
  .command('init-service')
  .description('Scaffold a new production-ready microservice with CI/CD and K8s manifests')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'serviceName',
        message: 'Enter the microservice name:',
        default: 'payment-api',
      },
      {
        type: 'select',
        name: 'template',
        message: 'Select the tech stack template:',
        choices: [
          { name: 'Go (Golang)', value: 'go' },
          { name: 'Node.js (TypeScript)', value: 'nodejs' },
          { name: 'Python (FastAPI)', value: 'python' },
        ],
      },
      {
        type: 'confirm',
        name: 'includeK8s',
        message: 'Generate Kubernetes Helm charts & Terraform IaC?',
        default: true,
      },
    ]);

    const targetDir = path.join(process.cwd(), answers.serviceName);

    if (fs.existsSync(targetDir)) {
      console.log(chalk.red(`\n❌ Directory "${answers.serviceName}" already exists.`));
      return;
    }

    console.log(chalk.green(`\n🚀 Scaffolding Go microservice "${answers.serviceName}"...`));

    // Criar pasta do serviço
    fs.mkdirSync(targetDir, { recursive: true });

    // 1. Criar main.go
    const goCode = `package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(\`{"status": "UP", "service": "${answers.serviceName}"}\`))
	})

	fmt.Println("🚀 ${answers.serviceName} running on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
`;
    fs.writeFileSync(path.join(targetDir, 'main.go'), goCode);

    // 2. Criar Dockerfile otimizado para Go (Multi-stage build)
    const dockerfileContent = `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY main.go .
RUN go mod init ${answers.serviceName} && CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
`;
    fs.writeFileSync(path.join(targetDir, 'Dockerfile'), dockerfileContent);

    // 3. Criar Kubernetes Deployment Manifest
    if (answers.includeK8s) {
      const k8sDir = path.join(targetDir, 'k8s');
      fs.mkdirSync(k8sDir, { recursive: true });

      const k8sManifest = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${answers.serviceName}
  labels:
    app: ${answers.serviceName}
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ${answers.serviceName}
  template:
    metadata:
      labels:
        app: ${answers.serviceName}
    spec:
      containers:
      - name: ${answers.serviceName}
        image: cirrus-registry/${answers.serviceName}:latest
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: ${answers.serviceName}-service
spec:
  type: ClusterIP
  selector:
    app: ${answers.serviceName}
  ports:
    - port: 80
      targetPort: 8080
`;
      fs.writeFileSync(path.join(k8sDir, 'deployment.yaml'), k8sManifest);
    }

    console.log(chalk.blue.bold(`\n✅ Service "${answers.serviceName}" successfully generated at ./${answers.serviceName}!`));
    console.log(chalk.gray(`Next steps:\n  cd ${answers.serviceName}\n  docker build -t ${answers.serviceName} .\n`));
  });

program.parse(process.argv);
