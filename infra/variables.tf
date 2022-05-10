variable "azure_app_client_secret" {
  type = string
  description = "Secret for Azure App Registration"
}

variable "azure_app_client_id" {
  type = string
  description = "Unique ID for Azure App Registration"
}

variable "private_key" {
  type = string
  description = "Private RSA key"
}

variable "public_key" {
  type = string
  description = "Public RSA key"
}

variable "redirect_uri" {
  type = string
  description = "Where to redirect traffic after authentication"
}

variable "project_name" {
  type = string
  description = "Identifier for this project"
}

variable "environment" {
  type = string
  description = "dev, staging, prod etc"
  default = "staging"
}

variable "domain" {
  type = string
  description = "base domain already configured in route 53"
}

variable "make_public_with_no_auth" {
  type = string
  description = "make this site open to the internet"
  default = false
}
