output "service_name" {
  value       = kubernetes_service_v1.app.metadata[0].name
  description = "The name of the Kubernetes service created"
}