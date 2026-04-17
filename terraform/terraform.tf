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

resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4" {

    security_group_id = aws_security_group.allow_tls.id

    from_port = 22
    to_port = 22
    ip_protocol = "tcp"
    cidr_ipv4 = "2.223.154.10/32"

}