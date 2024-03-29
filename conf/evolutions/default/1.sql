

# --- !Ups

create table if not exists buukmi_client (
  id                            bigserial not null,
  first_name                    varchar(255),
  last_name                     varchar(255),
  username                      varchar(255),
  constraint pk_buukmi_client primary key (id)
);

create table if not exists professional (
  id                            bigserial not null,
  username                      varchar(255),
  first_name                    varchar(255),
  last_name                     varchar(255),
  constraint pk_professional primary key (id)
);

create table if not exists provided_services (
  id                            uuid not null,
  provided_by                   uuid,
  name                          varchar(255),
  duration                      bigint,
  price_in_cents                integer not null,
  currency                      varchar(3),
  constraint pk_provided_services primary key (id)
);

create table if not exists role (
  id                            bigserial not null,
  name                          varchar(255),
  created_at                    timestamptz,
  created_by                    bigint,
  constraint pk_role primary key (id)
);

create table buukmi_user (
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

 alter table buukmi_user add constraint fk_user_client_profile_id foreign key (client_profile_id) references buukmi_client (id) on delete restrict on update restrict;

 alter table buukmi_user add constraint fk_user_professional_profile_id foreign key (professional_profile_id) references professional (id) on delete restrict on update restrict;
 insert into buukmi_client(id, first_name, last_name, username) values ( 0,'dude','lastname','usernamedude');

insert into buukmi_user(id, phone_nr, password, email, client_profile_id, professional_profile_id) values (0,'124234324','fsfdsdfsfd','234234234s',0,null);
insert into role(id, name, created_at, created_by) values (0,'Client',now(),0);
insert into role(id, name, created_at, created_by) values (1,'Professional',now(),0);
insert into role(id, name, created_at, created_by) values (2,'Admin',now(),0);


# --- !Downs

alter table if exists "buukmiUser" drop constraint if exists fk_user_client_profile_id;

alter table if exists "buukmiUser" drop constraint if exists fk_user_professional_profile_id;

drop table if exists buukmi_client cascade;

drop table if exists professional cascade;

drop table if exists provided_services cascade;

drop table if exists role cascade;

drop table if exists "buukmiUser" cascade;

