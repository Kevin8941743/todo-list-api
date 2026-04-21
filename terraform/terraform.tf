terraform {
    required_version = ">= 1.5.0"

    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
    }
}

provider "aws" {
    region = "eu-north-1"
}

resource "aws_instance" "todo-blog" {
    tags = {
        Name = "roadmap-api"
    }

    key_name="testing-final"

    vpc_security_group_ids = [aws_security_group.allow_tls.id]

    ami = "ami-080254318c2d8932f"
    instance_type = "t3.micro"
}

resource "aws_security_group" "allow_tls" {
    name = "roadmap-security"
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {

    security_group_id = aws_security_group.allow_tls.id

    from_port = 22
    to_port = 22
    ip_protocol = "tcp"
    cidr_ipv4 = "2.223.154.10/32"


}

resource "aws_vpc_security_group_ingress_rule" "allow_tls_ingress_ipv4" {

    security_group_id = aws_security_group.allow_tls.id

    from_port = 3001
    to_port = 3001
    ip_protocol = "tcp"
    cidr_ipv4 = "0.0.0.0/0"


}

resource "aws_vpc_security_group_egress_rule" "allow_tls_egress_ipv4" {

    security_group_id = aws_security_group.allow_tls.id


    ip_protocol = "-1"
    cidr_ipv4 = "0.0.0.0/0"

}
