# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table buukmi_client (
  id                            bigserial not null,
  first_name                    varchar(255),
  last_name                     varchar(255),
  username                      varchar(255),
  constraint pk_buukmi_client primary key (id)
);

create table professional (
  id                            bigserial not null,
  username                      varchar(255),
  first_name                    varchar(255),
  last_name                     varchar(255),
  constraint pk_professional primary key (id)
);

create table provided_services (
  id                            uuid not null,
  provided_by                   uuid,
  name                          varchar(255),
  duration                      bigint,
  price_in_cents                integer not null,
  currency                      varchar(3),
  constraint pk_provided_services primary key (id)
);

create table role (
  id                            bigserial not null,
  name                          varchar(255),
  created_at                    timestamptz,
  created_by                    uuid,
  constraint pk_role primary key (id)
);

create table user (
  id                            bigserial not null,
  phone_nr                      varchar(255),
  password                      varchar(255),
  email                         varchar(255),
  client_profile_id             bigint,
  professional_profile_id       bigint,
  constraint uq_user_client_profile_id unique (client_profile_id),
  constraint uq_user_professional_profile_id unique (professional_profile_id),
  constraint pk_user primary key (id)
);

alter table user add constraint fk_user_client_profile_id foreign key (client_profile_id) references buukmi_client (id) on delete restrict on update restrict;

alter table user add constraint fk_user_professional_profile_id foreign key (professional_profile_id) references professional (id) on delete restrict on update restrict;


# --- !Downs

alter table if exists user drop constraint if exists fk_user_client_profile_id;

alter table if exists user drop constraint if exists fk_user_professional_profile_id;

drop table if exists buukmi_client cascade;

drop table if exists professional cascade;

drop table if exists provided_services cascade;

drop table if exists role cascade;

drop table if exists user cascade;

