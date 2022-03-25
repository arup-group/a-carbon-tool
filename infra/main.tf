provider "aws" {
    region = "eu-west-1"
}

terraform {
  backend "s3" {
    encrypt = true
  }
}

module "static_site" {
  source = "git::https://github.com/arup-group/tf-aws-internal-static-pages.git"
  domain = var.domain
  subdomain = "act"
  azure_app_client_secret = var.azure_app_client_secret
  azure_app_client_id = var.azure_app_client_id
  private_key = var.private_key
  public_key = var.public_key
  redirect_uri = var.redirect_uri
  environment = var.environment
  project_name = "a-carbon-tool"
  make_public_with_no_auth = var.make_public_with_no_auth
}
