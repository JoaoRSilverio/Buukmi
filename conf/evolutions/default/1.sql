# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table client (
  id                            uuid not null,
  first_name                    varchar(255),
  last_name                     varchar(255),
  username                      varchar(255),
  email                         varchar(255),
  constraint pk_client primary key (id)
);

create table professional (
  id                            uuid,
  display_name                  varchar(255)
);

create table provided_services (
  id                            uuid,
  provided_by                   uuid,
  name                          varchar(255),
  duration                      bigint,
  price_in_cents                integer not null,
  currency                      varchar(3)
);

create table role (
  id                            uuid,
  name                          varchar(255),
  created_at                    timestamptz,
  created_by                    uuid
);

create table user (
  id                            uuid not null,
  username                      varchar(255),
  name                          varchar(255),
  phone_nr                      varchar(255),
  password                      varchar(255),
  client_id                     uuid,
  constraint pk_user primary key (id)
);


# --- !Downs

drop table if exists client cascade;

drop table if exists professional cascade;

drop table if exists provided_services cascade;

drop table if exists role cascade;

drop table if exists user cascade;

