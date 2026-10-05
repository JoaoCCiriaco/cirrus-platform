variable "app_name" {
  description = "Name of the microservice application"
  type        = string
}

variable "app_image" {
  description = "Docker image repository and tag"
  type        = string
}

variable "replicas" {
  description = "Number of pod replicas"
  type        = number
  default     = 2
}

variable "container_port" {
  description = "Target port inside the container"
  type        = number
  default     = 8080
}