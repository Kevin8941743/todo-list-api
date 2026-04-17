provider "aws" {
    region = "eu-north-1"
}

resource "aws_instance" "todo-blog" {
    tags = {
        Name = "roadmap-api"
    }

    key_name="roadmap-api-crud"

    vpc_security_group_ids = [aws_security_group.allow_tls.id]

    ami = "ami-080254318c2d8932f"
    instance_type = "t3.micro"
}

resource "aws_security_group" "allow_tls" {
    name = "roadmap-security"
}
