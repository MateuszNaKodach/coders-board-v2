import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type Credential = {
  __typename?: 'Credential';
  id: Scalars['ID'];
  name: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  users?: Maybe<Array<User>>;
};

export type CredentialUsersArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<UserOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type CredentialCreateManyWithoutUsersInput = {
  create?: Maybe<Array<CredentialCreateWithoutUsersInput>>;
  connect?: Maybe<Array<CredentialWhereUniqueInput>>;
};

export type CredentialCreateWithoutUsersInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export enum CredentialOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  LoginAsc = 'login_ASC',
  LoginDesc = 'login_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type CredentialScalarWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  login_not?: Maybe<Scalars['String']>;
  login_in?: Maybe<Array<Scalars['String']>>;
  login_not_in?: Maybe<Array<Scalars['String']>>;
  login_lt?: Maybe<Scalars['String']>;
  login_lte?: Maybe<Scalars['String']>;
  login_gt?: Maybe<Scalars['String']>;
  login_gte?: Maybe<Scalars['String']>;
  login_contains?: Maybe<Scalars['String']>;
  login_not_contains?: Maybe<Scalars['String']>;
  login_starts_with?: Maybe<Scalars['String']>;
  login_not_starts_with?: Maybe<Scalars['String']>;
  login_ends_with?: Maybe<Scalars['String']>;
  login_not_ends_with?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  password_not?: Maybe<Scalars['String']>;
  password_in?: Maybe<Array<Scalars['String']>>;
  password_not_in?: Maybe<Array<Scalars['String']>>;
  password_lt?: Maybe<Scalars['String']>;
  password_lte?: Maybe<Scalars['String']>;
  password_gt?: Maybe<Scalars['String']>;
  password_gte?: Maybe<Scalars['String']>;
  password_contains?: Maybe<Scalars['String']>;
  password_not_contains?: Maybe<Scalars['String']>;
  password_starts_with?: Maybe<Scalars['String']>;
  password_not_starts_with?: Maybe<Scalars['String']>;
  password_ends_with?: Maybe<Scalars['String']>;
  password_not_ends_with?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Scalars['String']>>;
  url_not_in?: Maybe<Array<Scalars['String']>>;
  url_lt?: Maybe<Scalars['String']>;
  url_lte?: Maybe<Scalars['String']>;
  url_gt?: Maybe<Scalars['String']>;
  url_gte?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_starts_with?: Maybe<Scalars['String']>;
  url_not_starts_with?: Maybe<Scalars['String']>;
  url_ends_with?: Maybe<Scalars['String']>;
  url_not_ends_with?: Maybe<Scalars['String']>;
  AND?: Maybe<Array<CredentialScalarWhereInput>>;
  OR?: Maybe<Array<CredentialScalarWhereInput>>;
  NOT?: Maybe<Array<CredentialScalarWhereInput>>;
};

export type CredentialUpdateManyDataInput = {
  name?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type CredentialUpdateManyWithoutUsersInput = {
  create?: Maybe<Array<CredentialCreateWithoutUsersInput>>;
  delete?: Maybe<Array<CredentialWhereUniqueInput>>;
  connect?: Maybe<Array<CredentialWhereUniqueInput>>;
  set?: Maybe<Array<CredentialWhereUniqueInput>>;
  disconnect?: Maybe<Array<CredentialWhereUniqueInput>>;
  update?: Maybe<Array<CredentialUpdateWithWhereUniqueWithoutUsersInput>>;
  upsert?: Maybe<Array<CredentialUpsertWithWhereUniqueWithoutUsersInput>>;
  deleteMany?: Maybe<Array<CredentialScalarWhereInput>>;
  updateMany?: Maybe<Array<CredentialUpdateManyWithWhereNestedInput>>;
};

export type CredentialUpdateManyWithWhereNestedInput = {
  where: CredentialScalarWhereInput;
  data: CredentialUpdateManyDataInput;
};

export type CredentialUpdateWithoutUsersDataInput = {
  name?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type CredentialUpdateWithWhereUniqueWithoutUsersInput = {
  where: CredentialWhereUniqueInput;
  data: CredentialUpdateWithoutUsersDataInput;
};

export type CredentialUpsertWithWhereUniqueWithoutUsersInput = {
  where: CredentialWhereUniqueInput;
  update: CredentialUpdateWithoutUsersDataInput;
  create: CredentialCreateWithoutUsersInput;
};

export type CredentialWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  login_not?: Maybe<Scalars['String']>;
  login_in?: Maybe<Array<Scalars['String']>>;
  login_not_in?: Maybe<Array<Scalars['String']>>;
  login_lt?: Maybe<Scalars['String']>;
  login_lte?: Maybe<Scalars['String']>;
  login_gt?: Maybe<Scalars['String']>;
  login_gte?: Maybe<Scalars['String']>;
  login_contains?: Maybe<Scalars['String']>;
  login_not_contains?: Maybe<Scalars['String']>;
  login_starts_with?: Maybe<Scalars['String']>;
  login_not_starts_with?: Maybe<Scalars['String']>;
  login_ends_with?: Maybe<Scalars['String']>;
  login_not_ends_with?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  password_not?: Maybe<Scalars['String']>;
  password_in?: Maybe<Array<Scalars['String']>>;
  password_not_in?: Maybe<Array<Scalars['String']>>;
  password_lt?: Maybe<Scalars['String']>;
  password_lte?: Maybe<Scalars['String']>;
  password_gt?: Maybe<Scalars['String']>;
  password_gte?: Maybe<Scalars['String']>;
  password_contains?: Maybe<Scalars['String']>;
  password_not_contains?: Maybe<Scalars['String']>;
  password_starts_with?: Maybe<Scalars['String']>;
  password_not_starts_with?: Maybe<Scalars['String']>;
  password_ends_with?: Maybe<Scalars['String']>;
  password_not_ends_with?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Scalars['String']>>;
  url_not_in?: Maybe<Array<Scalars['String']>>;
  url_lt?: Maybe<Scalars['String']>;
  url_lte?: Maybe<Scalars['String']>;
  url_gt?: Maybe<Scalars['String']>;
  url_gte?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_starts_with?: Maybe<Scalars['String']>;
  url_not_starts_with?: Maybe<Scalars['String']>;
  url_ends_with?: Maybe<Scalars['String']>;
  url_not_ends_with?: Maybe<Scalars['String']>;
  users_every?: Maybe<UserWhereInput>;
  users_some?: Maybe<UserWhereInput>;
  users_none?: Maybe<UserWhereInput>;
  AND?: Maybe<Array<CredentialWhereInput>>;
  OR?: Maybe<Array<CredentialWhereInput>>;
  NOT?: Maybe<Array<CredentialWhereInput>>;
};

export type CredentialWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  users?: Maybe<Array<UserDepartment>>;
  roles?: Maybe<Array<Role>>;
  active: Scalars['Boolean'];
};

export type DepartmentUsersArgs = {
  where?: Maybe<UserDepartmentWhereInput>;
  orderBy?: Maybe<UserDepartmentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DepartmentRolesArgs = {
  where?: Maybe<RoleWhereInput>;
  orderBy?: Maybe<RoleOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DepartmentCreateInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  users?: Maybe<UserDepartmentCreateManyWithoutDepartmentInput>;
  roles?: Maybe<RoleCreateManyWithoutDepartmentInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export type DepartmentCreateOneWithoutRolesInput = {
  create?: Maybe<DepartmentCreateWithoutRolesInput>;
  connect?: Maybe<DepartmentWhereUniqueInput>;
};

export type DepartmentCreateOneWithoutUsersInput = {
  create?: Maybe<DepartmentCreateWithoutUsersInput>;
  connect?: Maybe<DepartmentWhereUniqueInput>;
};

export type DepartmentCreateWithoutRolesInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  users?: Maybe<UserDepartmentCreateManyWithoutDepartmentInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export type DepartmentCreateWithoutUsersInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  roles?: Maybe<RoleCreateManyWithoutDepartmentInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export enum DepartmentOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ImageAsc = 'image_ASC',
  ImageDesc = 'image_DESC',
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  ActiveAsc = 'active_ASC',
  ActiveDesc = 'active_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type DepartmentUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  users?: Maybe<UserDepartmentUpdateManyWithoutDepartmentInput>;
  roles?: Maybe<RoleUpdateManyWithoutDepartmentInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export type DepartmentUpdateOneRequiredWithoutUsersInput = {
  create?: Maybe<DepartmentCreateWithoutUsersInput>;
  update?: Maybe<DepartmentUpdateWithoutUsersDataInput>;
  upsert?: Maybe<DepartmentUpsertWithoutUsersInput>;
  connect?: Maybe<DepartmentWhereUniqueInput>;
};

export type DepartmentUpdateOneWithoutRolesInput = {
  create?: Maybe<DepartmentCreateWithoutRolesInput>;
  update?: Maybe<DepartmentUpdateWithoutRolesDataInput>;
  upsert?: Maybe<DepartmentUpsertWithoutRolesInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  connect?: Maybe<DepartmentWhereUniqueInput>;
};

export type DepartmentUpdateWithoutRolesDataInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  users?: Maybe<UserDepartmentUpdateManyWithoutDepartmentInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export type DepartmentUpdateWithoutUsersDataInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  roles?: Maybe<RoleUpdateManyWithoutDepartmentInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export type DepartmentUpsertWithoutRolesInput = {
  update: DepartmentUpdateWithoutRolesDataInput;
  create: DepartmentCreateWithoutRolesInput;
};

export type DepartmentUpsertWithoutUsersInput = {
  update: DepartmentUpdateWithoutUsersDataInput;
  create: DepartmentCreateWithoutUsersInput;
};

export type DepartmentWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_not_in?: Maybe<Array<Scalars['String']>>;
  description_lt?: Maybe<Scalars['String']>;
  description_lte?: Maybe<Scalars['String']>;
  description_gt?: Maybe<Scalars['String']>;
  description_gte?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_starts_with?: Maybe<Scalars['String']>;
  description_not_starts_with?: Maybe<Scalars['String']>;
  description_ends_with?: Maybe<Scalars['String']>;
  description_not_ends_with?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  image_not?: Maybe<Scalars['String']>;
  image_in?: Maybe<Array<Scalars['String']>>;
  image_not_in?: Maybe<Array<Scalars['String']>>;
  image_lt?: Maybe<Scalars['String']>;
  image_lte?: Maybe<Scalars['String']>;
  image_gt?: Maybe<Scalars['String']>;
  image_gte?: Maybe<Scalars['String']>;
  image_contains?: Maybe<Scalars['String']>;
  image_not_contains?: Maybe<Scalars['String']>;
  image_starts_with?: Maybe<Scalars['String']>;
  image_not_starts_with?: Maybe<Scalars['String']>;
  image_ends_with?: Maybe<Scalars['String']>;
  image_not_ends_with?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  color_not?: Maybe<Scalars['String']>;
  color_in?: Maybe<Array<Scalars['String']>>;
  color_not_in?: Maybe<Array<Scalars['String']>>;
  color_lt?: Maybe<Scalars['String']>;
  color_lte?: Maybe<Scalars['String']>;
  color_gt?: Maybe<Scalars['String']>;
  color_gte?: Maybe<Scalars['String']>;
  color_contains?: Maybe<Scalars['String']>;
  color_not_contains?: Maybe<Scalars['String']>;
  color_starts_with?: Maybe<Scalars['String']>;
  color_not_starts_with?: Maybe<Scalars['String']>;
  color_ends_with?: Maybe<Scalars['String']>;
  color_not_ends_with?: Maybe<Scalars['String']>;
  users_every?: Maybe<UserDepartmentWhereInput>;
  users_some?: Maybe<UserDepartmentWhereInput>;
  users_none?: Maybe<UserDepartmentWhereInput>;
  roles_every?: Maybe<RoleWhereInput>;
  roles_some?: Maybe<RoleWhereInput>;
  roles_none?: Maybe<RoleWhereInput>;
  active?: Maybe<Scalars['Boolean']>;
  active_not?: Maybe<Scalars['Boolean']>;
  AND?: Maybe<Array<DepartmentWhereInput>>;
  OR?: Maybe<Array<DepartmentWhereInput>>;
  NOT?: Maybe<Array<DepartmentWhereInput>>;
};

export type DepartmentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Material = {
  __typename?: 'Material';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  tags?: Maybe<Array<MaterialTag>>;
};

export type MaterialTagsArgs = {
  where?: Maybe<MaterialTagWhereInput>;
  orderBy?: Maybe<MaterialTagOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type MaterialCreateManyWithoutTagsInput = {
  create?: Maybe<Array<MaterialCreateWithoutTagsInput>>;
  connect?: Maybe<Array<MaterialWhereUniqueInput>>;
};

export type MaterialCreateWithoutTagsInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  url: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  owner?: Maybe<UserCreateOneInput>;
};

export enum MaterialOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  ImageAsc = 'image_ASC',
  ImageDesc = 'image_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type MaterialScalarWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Scalars['String']>>;
  url_not_in?: Maybe<Array<Scalars['String']>>;
  url_lt?: Maybe<Scalars['String']>;
  url_lte?: Maybe<Scalars['String']>;
  url_gt?: Maybe<Scalars['String']>;
  url_gte?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_starts_with?: Maybe<Scalars['String']>;
  url_not_starts_with?: Maybe<Scalars['String']>;
  url_ends_with?: Maybe<Scalars['String']>;
  url_not_ends_with?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  image_not?: Maybe<Scalars['String']>;
  image_in?: Maybe<Array<Scalars['String']>>;
  image_not_in?: Maybe<Array<Scalars['String']>>;
  image_lt?: Maybe<Scalars['String']>;
  image_lte?: Maybe<Scalars['String']>;
  image_gt?: Maybe<Scalars['String']>;
  image_gte?: Maybe<Scalars['String']>;
  image_contains?: Maybe<Scalars['String']>;
  image_not_contains?: Maybe<Scalars['String']>;
  image_starts_with?: Maybe<Scalars['String']>;
  image_not_starts_with?: Maybe<Scalars['String']>;
  image_ends_with?: Maybe<Scalars['String']>;
  image_not_ends_with?: Maybe<Scalars['String']>;
  AND?: Maybe<Array<MaterialScalarWhereInput>>;
  OR?: Maybe<Array<MaterialScalarWhereInput>>;
  NOT?: Maybe<Array<MaterialScalarWhereInput>>;
};

export type MaterialTag = {
  __typename?: 'MaterialTag';
  id: Scalars['ID'];
  name: Scalars['String'];
  materials?: Maybe<Array<Material>>;
};

export type MaterialTagMaterialsArgs = {
  where?: Maybe<MaterialWhereInput>;
  orderBy?: Maybe<MaterialOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type MaterialTagCreateInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  materials?: Maybe<MaterialCreateManyWithoutTagsInput>;
};

export enum MaterialTagOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type MaterialTagUpdateInput = {
  name?: Maybe<Scalars['String']>;
  materials?: Maybe<MaterialUpdateManyWithoutTagsInput>;
};

export type MaterialTagWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  materials_every?: Maybe<MaterialWhereInput>;
  materials_some?: Maybe<MaterialWhereInput>;
  materials_none?: Maybe<MaterialWhereInput>;
  AND?: Maybe<Array<MaterialTagWhereInput>>;
  OR?: Maybe<Array<MaterialTagWhereInput>>;
  NOT?: Maybe<Array<MaterialTagWhereInput>>;
};

export type MaterialTagWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type MaterialUpdateManyDataInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type MaterialUpdateManyWithoutTagsInput = {
  create?: Maybe<Array<MaterialCreateWithoutTagsInput>>;
  delete?: Maybe<Array<MaterialWhereUniqueInput>>;
  connect?: Maybe<Array<MaterialWhereUniqueInput>>;
  set?: Maybe<Array<MaterialWhereUniqueInput>>;
  disconnect?: Maybe<Array<MaterialWhereUniqueInput>>;
  update?: Maybe<Array<MaterialUpdateWithWhereUniqueWithoutTagsInput>>;
  upsert?: Maybe<Array<MaterialUpsertWithWhereUniqueWithoutTagsInput>>;
  deleteMany?: Maybe<Array<MaterialScalarWhereInput>>;
  updateMany?: Maybe<Array<MaterialUpdateManyWithWhereNestedInput>>;
};

export type MaterialUpdateManyWithWhereNestedInput = {
  where: MaterialScalarWhereInput;
  data: MaterialUpdateManyDataInput;
};

export type MaterialUpdateWithoutTagsDataInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneInput>;
};

export type MaterialUpdateWithWhereUniqueWithoutTagsInput = {
  where: MaterialWhereUniqueInput;
  data: MaterialUpdateWithoutTagsDataInput;
};

export type MaterialUpsertWithWhereUniqueWithoutTagsInput = {
  where: MaterialWhereUniqueInput;
  update: MaterialUpdateWithoutTagsDataInput;
  create: MaterialCreateWithoutTagsInput;
};

export type MaterialWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Scalars['String']>>;
  url_not_in?: Maybe<Array<Scalars['String']>>;
  url_lt?: Maybe<Scalars['String']>;
  url_lte?: Maybe<Scalars['String']>;
  url_gt?: Maybe<Scalars['String']>;
  url_gte?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_starts_with?: Maybe<Scalars['String']>;
  url_not_starts_with?: Maybe<Scalars['String']>;
  url_ends_with?: Maybe<Scalars['String']>;
  url_not_ends_with?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  image_not?: Maybe<Scalars['String']>;
  image_in?: Maybe<Array<Scalars['String']>>;
  image_not_in?: Maybe<Array<Scalars['String']>>;
  image_lt?: Maybe<Scalars['String']>;
  image_lte?: Maybe<Scalars['String']>;
  image_gt?: Maybe<Scalars['String']>;
  image_gte?: Maybe<Scalars['String']>;
  image_contains?: Maybe<Scalars['String']>;
  image_not_contains?: Maybe<Scalars['String']>;
  image_starts_with?: Maybe<Scalars['String']>;
  image_not_starts_with?: Maybe<Scalars['String']>;
  image_ends_with?: Maybe<Scalars['String']>;
  image_not_ends_with?: Maybe<Scalars['String']>;
  owner?: Maybe<UserWhereInput>;
  tags_every?: Maybe<MaterialTagWhereInput>;
  tags_some?: Maybe<MaterialTagWhereInput>;
  tags_none?: Maybe<MaterialTagWhereInput>;
  AND?: Maybe<Array<MaterialWhereInput>>;
  OR?: Maybe<Array<MaterialWhereInput>>;
  NOT?: Maybe<Array<MaterialWhereInput>>;
};

export type MaterialWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn?: Maybe<User>;
  signOut: Scalars['Boolean'];
  createCredential: Credential;
  updateCredential: Credential;
  deleteCredential: Credential;
  createMaterial: Material;
  updateMaterial: Material;
  deleteMaterial: Material;
  createRole: Role;
  updateRole?: Maybe<Role>;
  deleteRole?: Maybe<Role>;
  createDepartment: Department;
  updateDepartment?: Maybe<Department>;
  deleteDepartment?: Maybe<Department>;
  changePassword: User;
  updateUserMember: User;
  updateUserAdmin: User;
  deleteUser: User;
  createUser: User;
  deleteUserDepartment?: Maybe<UserDepartment>;
  addUserRole: User;
  updateUserRole: UserRole;
  deleteUserRole?: Maybe<UserRole>;
  createMaterialTag: MaterialTag;
  updateMaterialTag?: Maybe<MaterialTag>;
  deleteMaterialTag?: Maybe<MaterialTag>;
};

export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCreateCredentialArgs = {
  name: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type MutationUpdateCredentialArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
};

export type MutationDeleteCredentialArgs = {
  id: Scalars['ID'];
};

export type MutationCreateMaterialArgs = {
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type MutationUpdateMaterialArgs = {
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type MutationDeleteMaterialArgs = {
  id: Scalars['ID'];
};

export type MutationCreateRoleArgs = {
  data: RoleCreateInput;
};

export type MutationUpdateRoleArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};

export type MutationDeleteRoleArgs = {
  where: RoleWhereUniqueInput;
};

export type MutationCreateDepartmentArgs = {
  data: DepartmentCreateInput;
};

export type MutationUpdateDepartmentArgs = {
  data: DepartmentUpdateInput;
  where: DepartmentWhereUniqueInput;
};

export type MutationDeleteDepartmentArgs = {
  where: DepartmentWhereUniqueInput;
};

export type MutationChangePasswordArgs = {
  id: Scalars['ID'];
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type MutationUpdateUserMemberArgs = {
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
};

export type MutationUpdateUserAdminArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  departments?: Maybe<Array<Scalars['String']>>;
  credentials?: Maybe<Array<Scalars['String']>>;
  permissions?: Maybe<Scalars['String']>;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationCreateUserArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  departments?: Maybe<Array<Scalars['String']>>;
  permissions?: Maybe<Scalars['String']>;
  credentials?: Maybe<Array<Scalars['String']>>;
};

export type MutationDeleteUserDepartmentArgs = {
  where: UserDepartmentWhereUniqueInput;
};

export type MutationAddUserRoleArgs = {
  user: UserWhereUniqueInput;
  role: RoleWhereUniqueInput;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type MutationUpdateUserRoleArgs = {
  roleToBeUpdated: RoleWhereUniqueInput;
  newRole?: Maybe<RoleWhereUniqueInput>;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type MutationDeleteUserRoleArgs = {
  where: UserRoleWhereUniqueInput;
};

export type MutationCreateMaterialTagArgs = {
  data: MaterialTagCreateInput;
};

export type MutationUpdateMaterialTagArgs = {
  data: MaterialTagUpdateInput;
  where: MaterialTagWhereUniqueInput;
};

export type MutationDeleteMaterialTagArgs = {
  where: MaterialTagWhereUniqueInput;
};

export enum Permission {
  Owner = 'OWNER',
  Admin = 'ADMIN',
  Member = 'MEMBER',
}

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  credentials: Array<Credential>;
  materials: Array<Material>;
  roles: Array<Role>;
  departments: Array<Department>;
  users: Array<User>;
  user?: Maybe<User>;
  userDepartment?: Maybe<UserDepartment>;
  userRole?: Maybe<UserRole>;
  reSendWelcome?: Maybe<Scalars['Boolean']>;
  sendNotification?: Maybe<Scalars['Boolean']>;
  sendManyNotification?: Maybe<Scalars['Boolean']>;
  materialTags: Array<MaterialTag>;
};

export type QueryCredentialsArgs = {
  where?: Maybe<CredentialWhereInput>;
  orderBy?: Maybe<CredentialOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryMaterialsArgs = {
  where?: Maybe<MaterialWhereInput>;
  orderBy?: Maybe<MaterialOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryRolesArgs = {
  where?: Maybe<RoleWhereInput>;
  orderBy?: Maybe<RoleOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryDepartmentsArgs = {
  where?: Maybe<DepartmentWhereInput>;
  orderBy?: Maybe<DepartmentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<UserOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUserDepartmentArgs = {
  where: UserDepartmentWhereUniqueInput;
};

export type QueryUserRoleArgs = {
  where: UserRoleWhereUniqueInput;
};

export type QueryReSendWelcomeArgs = {
  subject?: Maybe<Scalars['String']>;
  recipient: Scalars['String'];
  user: Scalars['String'];
  password: Scalars['String'];
};

export type QuerySendNotificationArgs = {
  subject: Scalars['String'];
  recipient: Scalars['String'];
  user?: Maybe<Scalars['String']>;
  notificationText: Scalars['String'];
};

export type QuerySendManyNotificationArgs = {
  subject: Scalars['String'];
  recipients: Array<Scalars['String']>;
  notificationText: Scalars['String'];
};

export type QueryMaterialTagsArgs = {
  where?: Maybe<MaterialTagWhereInput>;
  orderBy?: Maybe<MaterialTagOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  users?: Maybe<Array<UserRole>>;
  active: Scalars['Boolean'];
  department?: Maybe<Department>;
};

export type RoleUsersArgs = {
  where?: Maybe<UserRoleWhereInput>;
  orderBy?: Maybe<UserRoleOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type RoleCreateInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  users?: Maybe<UserRoleCreateManyWithoutRoleInput>;
  active?: Maybe<Scalars['Boolean']>;
  department?: Maybe<DepartmentCreateOneWithoutRolesInput>;
};

export type RoleCreateManyWithoutDepartmentInput = {
  create?: Maybe<Array<RoleCreateWithoutDepartmentInput>>;
  connect?: Maybe<Array<RoleWhereUniqueInput>>;
};

export type RoleCreateOneWithoutUsersInput = {
  create?: Maybe<RoleCreateWithoutUsersInput>;
  connect?: Maybe<RoleWhereUniqueInput>;
};

export type RoleCreateWithoutDepartmentInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  users?: Maybe<UserRoleCreateManyWithoutRoleInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export type RoleCreateWithoutUsersInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  department?: Maybe<DepartmentCreateOneWithoutRolesInput>;
};

export enum RoleOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ActiveAsc = 'active_ASC',
  ActiveDesc = 'active_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type RoleScalarWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_not_in?: Maybe<Array<Scalars['String']>>;
  description_lt?: Maybe<Scalars['String']>;
  description_lte?: Maybe<Scalars['String']>;
  description_gt?: Maybe<Scalars['String']>;
  description_gte?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_starts_with?: Maybe<Scalars['String']>;
  description_not_starts_with?: Maybe<Scalars['String']>;
  description_ends_with?: Maybe<Scalars['String']>;
  description_not_ends_with?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  active_not?: Maybe<Scalars['Boolean']>;
  AND?: Maybe<Array<RoleScalarWhereInput>>;
  OR?: Maybe<Array<RoleScalarWhereInput>>;
  NOT?: Maybe<Array<RoleScalarWhereInput>>;
};

export type RoleUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  users?: Maybe<UserRoleUpdateManyWithoutRoleInput>;
  active?: Maybe<Scalars['Boolean']>;
  department?: Maybe<DepartmentUpdateOneWithoutRolesInput>;
};

export type RoleUpdateManyDataInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type RoleUpdateManyWithoutDepartmentInput = {
  create?: Maybe<Array<RoleCreateWithoutDepartmentInput>>;
  delete?: Maybe<Array<RoleWhereUniqueInput>>;
  connect?: Maybe<Array<RoleWhereUniqueInput>>;
  set?: Maybe<Array<RoleWhereUniqueInput>>;
  disconnect?: Maybe<Array<RoleWhereUniqueInput>>;
  update?: Maybe<Array<RoleUpdateWithWhereUniqueWithoutDepartmentInput>>;
  upsert?: Maybe<Array<RoleUpsertWithWhereUniqueWithoutDepartmentInput>>;
  deleteMany?: Maybe<Array<RoleScalarWhereInput>>;
  updateMany?: Maybe<Array<RoleUpdateManyWithWhereNestedInput>>;
};

export type RoleUpdateManyWithWhereNestedInput = {
  where: RoleScalarWhereInput;
  data: RoleUpdateManyDataInput;
};

export type RoleUpdateOneRequiredWithoutUsersInput = {
  create?: Maybe<RoleCreateWithoutUsersInput>;
  update?: Maybe<RoleUpdateWithoutUsersDataInput>;
  upsert?: Maybe<RoleUpsertWithoutUsersInput>;
  connect?: Maybe<RoleWhereUniqueInput>;
};

export type RoleUpdateWithoutDepartmentDataInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  users?: Maybe<UserRoleUpdateManyWithoutRoleInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export type RoleUpdateWithoutUsersDataInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  department?: Maybe<DepartmentUpdateOneWithoutRolesInput>;
};

export type RoleUpdateWithWhereUniqueWithoutDepartmentInput = {
  where: RoleWhereUniqueInput;
  data: RoleUpdateWithoutDepartmentDataInput;
};

export type RoleUpsertWithoutUsersInput = {
  update: RoleUpdateWithoutUsersDataInput;
  create: RoleCreateWithoutUsersInput;
};

export type RoleUpsertWithWhereUniqueWithoutDepartmentInput = {
  where: RoleWhereUniqueInput;
  update: RoleUpdateWithoutDepartmentDataInput;
  create: RoleCreateWithoutDepartmentInput;
};

export type RoleWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_not_in?: Maybe<Array<Scalars['String']>>;
  description_lt?: Maybe<Scalars['String']>;
  description_lte?: Maybe<Scalars['String']>;
  description_gt?: Maybe<Scalars['String']>;
  description_gte?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_starts_with?: Maybe<Scalars['String']>;
  description_not_starts_with?: Maybe<Scalars['String']>;
  description_ends_with?: Maybe<Scalars['String']>;
  description_not_ends_with?: Maybe<Scalars['String']>;
  users_every?: Maybe<UserRoleWhereInput>;
  users_some?: Maybe<UserRoleWhereInput>;
  users_none?: Maybe<UserRoleWhereInput>;
  active?: Maybe<Scalars['Boolean']>;
  active_not?: Maybe<Scalars['Boolean']>;
  department?: Maybe<DepartmentWhereInput>;
  AND?: Maybe<Array<RoleWhereInput>>;
  OR?: Maybe<Array<RoleWhereInput>>;
  NOT?: Maybe<Array<RoleWhereInput>>;
};

export type RoleWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  profileURL: Scalars['String'];
  roles?: Maybe<Array<UserRole>>;
  permissions: Array<Permission>;
  departments?: Maybe<Array<UserDepartment>>;
  credentials?: Maybe<Array<Credential>>;
};

export type UserRolesArgs = {
  where?: Maybe<UserRoleWhereInput>;
  orderBy?: Maybe<UserRoleOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserDepartmentsArgs = {
  where?: Maybe<UserDepartmentWhereInput>;
  orderBy?: Maybe<UserDepartmentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserCredentialsArgs = {
  where?: Maybe<CredentialWhereInput>;
  orderBy?: Maybe<CredentialOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserCreateInput = {
  id?: Maybe<Scalars['ID']>;
  image: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  profileURL: Scalars['String'];
  roles?: Maybe<UserRoleCreateManyWithoutUserInput>;
  permissions?: Maybe<UserCreatepermissionsInput>;
  departments?: Maybe<UserDepartmentCreateManyWithoutUserInput>;
  credentials?: Maybe<CredentialCreateManyWithoutUsersInput>;
};

export type UserCreateOneInput = {
  create?: Maybe<UserCreateInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateOneWithoutDepartmentsInput = {
  create?: Maybe<UserCreateWithoutDepartmentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateOneWithoutRolesInput = {
  create?: Maybe<UserCreateWithoutRolesInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreatepermissionsInput = {
  set?: Maybe<Array<Permission>>;
};

export type UserCreateWithoutDepartmentsInput = {
  id?: Maybe<Scalars['ID']>;
  image: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  profileURL: Scalars['String'];
  roles?: Maybe<UserRoleCreateManyWithoutUserInput>;
  permissions?: Maybe<UserCreatepermissionsInput>;
  credentials?: Maybe<CredentialCreateManyWithoutUsersInput>;
};

export type UserCreateWithoutRolesInput = {
  id?: Maybe<Scalars['ID']>;
  image: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  profileURL: Scalars['String'];
  permissions?: Maybe<UserCreatepermissionsInput>;
  departments?: Maybe<UserDepartmentCreateManyWithoutUserInput>;
  credentials?: Maybe<CredentialCreateManyWithoutUsersInput>;
};

export type UserDepartment = {
  __typename?: 'UserDepartment';
  id: Scalars['ID'];
  user: User;
  department: Department;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserDepartmentCreateManyWithoutDepartmentInput = {
  create?: Maybe<Array<UserDepartmentCreateWithoutDepartmentInput>>;
  connect?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
};

export type UserDepartmentCreateManyWithoutUserInput = {
  create?: Maybe<Array<UserDepartmentCreateWithoutUserInput>>;
  connect?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
};

export type UserDepartmentCreateWithoutDepartmentInput = {
  id?: Maybe<Scalars['ID']>;
  user: UserCreateOneWithoutDepartmentsInput;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserDepartmentCreateWithoutUserInput = {
  id?: Maybe<Scalars['ID']>;
  department: DepartmentCreateOneWithoutUsersInput;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export enum UserDepartmentOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FromAsc = 'from_ASC',
  FromDesc = 'from_DESC',
  ToAsc = 'to_ASC',
  ToDesc = 'to_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type UserDepartmentScalarWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  from?: Maybe<Scalars['DateTime']>;
  from_not?: Maybe<Scalars['DateTime']>;
  from_in?: Maybe<Array<Scalars['DateTime']>>;
  from_not_in?: Maybe<Array<Scalars['DateTime']>>;
  from_lt?: Maybe<Scalars['DateTime']>;
  from_lte?: Maybe<Scalars['DateTime']>;
  from_gt?: Maybe<Scalars['DateTime']>;
  from_gte?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  to_not?: Maybe<Scalars['DateTime']>;
  to_in?: Maybe<Array<Scalars['DateTime']>>;
  to_not_in?: Maybe<Array<Scalars['DateTime']>>;
  to_lt?: Maybe<Scalars['DateTime']>;
  to_lte?: Maybe<Scalars['DateTime']>;
  to_gt?: Maybe<Scalars['DateTime']>;
  to_gte?: Maybe<Scalars['DateTime']>;
  AND?: Maybe<Array<UserDepartmentScalarWhereInput>>;
  OR?: Maybe<Array<UserDepartmentScalarWhereInput>>;
  NOT?: Maybe<Array<UserDepartmentScalarWhereInput>>;
};

export type UserDepartmentUpdateManyDataInput = {
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserDepartmentUpdateManyWithoutDepartmentInput = {
  create?: Maybe<Array<UserDepartmentCreateWithoutDepartmentInput>>;
  delete?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
  connect?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
  set?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
  disconnect?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
  update?: Maybe<Array<UserDepartmentUpdateWithWhereUniqueWithoutDepartmentInput>>;
  upsert?: Maybe<Array<UserDepartmentUpsertWithWhereUniqueWithoutDepartmentInput>>;
  deleteMany?: Maybe<Array<UserDepartmentScalarWhereInput>>;
  updateMany?: Maybe<Array<UserDepartmentUpdateManyWithWhereNestedInput>>;
};

export type UserDepartmentUpdateManyWithoutUserInput = {
  create?: Maybe<Array<UserDepartmentCreateWithoutUserInput>>;
  delete?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
  connect?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
  set?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
  disconnect?: Maybe<Array<UserDepartmentWhereUniqueInput>>;
  update?: Maybe<Array<UserDepartmentUpdateWithWhereUniqueWithoutUserInput>>;
  upsert?: Maybe<Array<UserDepartmentUpsertWithWhereUniqueWithoutUserInput>>;
  deleteMany?: Maybe<Array<UserDepartmentScalarWhereInput>>;
  updateMany?: Maybe<Array<UserDepartmentUpdateManyWithWhereNestedInput>>;
};

export type UserDepartmentUpdateManyWithWhereNestedInput = {
  where: UserDepartmentScalarWhereInput;
  data: UserDepartmentUpdateManyDataInput;
};

export type UserDepartmentUpdateWithoutDepartmentDataInput = {
  user?: Maybe<UserUpdateOneRequiredWithoutDepartmentsInput>;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserDepartmentUpdateWithoutUserDataInput = {
  department?: Maybe<DepartmentUpdateOneRequiredWithoutUsersInput>;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserDepartmentUpdateWithWhereUniqueWithoutDepartmentInput = {
  where: UserDepartmentWhereUniqueInput;
  data: UserDepartmentUpdateWithoutDepartmentDataInput;
};

export type UserDepartmentUpdateWithWhereUniqueWithoutUserInput = {
  where: UserDepartmentWhereUniqueInput;
  data: UserDepartmentUpdateWithoutUserDataInput;
};

export type UserDepartmentUpsertWithWhereUniqueWithoutDepartmentInput = {
  where: UserDepartmentWhereUniqueInput;
  update: UserDepartmentUpdateWithoutDepartmentDataInput;
  create: UserDepartmentCreateWithoutDepartmentInput;
};

export type UserDepartmentUpsertWithWhereUniqueWithoutUserInput = {
  where: UserDepartmentWhereUniqueInput;
  update: UserDepartmentUpdateWithoutUserDataInput;
  create: UserDepartmentCreateWithoutUserInput;
};

export type UserDepartmentWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  user?: Maybe<UserWhereInput>;
  department?: Maybe<DepartmentWhereInput>;
  from?: Maybe<Scalars['DateTime']>;
  from_not?: Maybe<Scalars['DateTime']>;
  from_in?: Maybe<Array<Scalars['DateTime']>>;
  from_not_in?: Maybe<Array<Scalars['DateTime']>>;
  from_lt?: Maybe<Scalars['DateTime']>;
  from_lte?: Maybe<Scalars['DateTime']>;
  from_gt?: Maybe<Scalars['DateTime']>;
  from_gte?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  to_not?: Maybe<Scalars['DateTime']>;
  to_in?: Maybe<Array<Scalars['DateTime']>>;
  to_not_in?: Maybe<Array<Scalars['DateTime']>>;
  to_lt?: Maybe<Scalars['DateTime']>;
  to_lte?: Maybe<Scalars['DateTime']>;
  to_gt?: Maybe<Scalars['DateTime']>;
  to_gte?: Maybe<Scalars['DateTime']>;
  AND?: Maybe<Array<UserDepartmentWhereInput>>;
  OR?: Maybe<Array<UserDepartmentWhereInput>>;
  NOT?: Maybe<Array<UserDepartmentWhereInput>>;
};

export type UserDepartmentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export enum UserOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ImageAsc = 'image_ASC',
  ImageDesc = 'image_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  PhoneAsc = 'phone_ASC',
  PhoneDesc = 'phone_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  ProfileUrlAsc = 'profileURL_ASC',
  ProfileUrlDesc = 'profileURL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['ID'];
  role: Role;
  user: User;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserRoleCreateManyWithoutRoleInput = {
  create?: Maybe<Array<UserRoleCreateWithoutRoleInput>>;
  connect?: Maybe<Array<UserRoleWhereUniqueInput>>;
};

export type UserRoleCreateManyWithoutUserInput = {
  create?: Maybe<Array<UserRoleCreateWithoutUserInput>>;
  connect?: Maybe<Array<UserRoleWhereUniqueInput>>;
};

export type UserRoleCreateWithoutRoleInput = {
  id?: Maybe<Scalars['ID']>;
  user: UserCreateOneWithoutRolesInput;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserRoleCreateWithoutUserInput = {
  id?: Maybe<Scalars['ID']>;
  role: RoleCreateOneWithoutUsersInput;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export enum UserRoleOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FromAsc = 'from_ASC',
  FromDesc = 'from_DESC',
  ToAsc = 'to_ASC',
  ToDesc = 'to_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type UserRoleScalarWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  from?: Maybe<Scalars['DateTime']>;
  from_not?: Maybe<Scalars['DateTime']>;
  from_in?: Maybe<Array<Scalars['DateTime']>>;
  from_not_in?: Maybe<Array<Scalars['DateTime']>>;
  from_lt?: Maybe<Scalars['DateTime']>;
  from_lte?: Maybe<Scalars['DateTime']>;
  from_gt?: Maybe<Scalars['DateTime']>;
  from_gte?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  to_not?: Maybe<Scalars['DateTime']>;
  to_in?: Maybe<Array<Scalars['DateTime']>>;
  to_not_in?: Maybe<Array<Scalars['DateTime']>>;
  to_lt?: Maybe<Scalars['DateTime']>;
  to_lte?: Maybe<Scalars['DateTime']>;
  to_gt?: Maybe<Scalars['DateTime']>;
  to_gte?: Maybe<Scalars['DateTime']>;
  AND?: Maybe<Array<UserRoleScalarWhereInput>>;
  OR?: Maybe<Array<UserRoleScalarWhereInput>>;
  NOT?: Maybe<Array<UserRoleScalarWhereInput>>;
};

export type UserRoleUpdateManyDataInput = {
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserRoleUpdateManyWithoutRoleInput = {
  create?: Maybe<Array<UserRoleCreateWithoutRoleInput>>;
  delete?: Maybe<Array<UserRoleWhereUniqueInput>>;
  connect?: Maybe<Array<UserRoleWhereUniqueInput>>;
  set?: Maybe<Array<UserRoleWhereUniqueInput>>;
  disconnect?: Maybe<Array<UserRoleWhereUniqueInput>>;
  update?: Maybe<Array<UserRoleUpdateWithWhereUniqueWithoutRoleInput>>;
  upsert?: Maybe<Array<UserRoleUpsertWithWhereUniqueWithoutRoleInput>>;
  deleteMany?: Maybe<Array<UserRoleScalarWhereInput>>;
  updateMany?: Maybe<Array<UserRoleUpdateManyWithWhereNestedInput>>;
};

export type UserRoleUpdateManyWithoutUserInput = {
  create?: Maybe<Array<UserRoleCreateWithoutUserInput>>;
  delete?: Maybe<Array<UserRoleWhereUniqueInput>>;
  connect?: Maybe<Array<UserRoleWhereUniqueInput>>;
  set?: Maybe<Array<UserRoleWhereUniqueInput>>;
  disconnect?: Maybe<Array<UserRoleWhereUniqueInput>>;
  update?: Maybe<Array<UserRoleUpdateWithWhereUniqueWithoutUserInput>>;
  upsert?: Maybe<Array<UserRoleUpsertWithWhereUniqueWithoutUserInput>>;
  deleteMany?: Maybe<Array<UserRoleScalarWhereInput>>;
  updateMany?: Maybe<Array<UserRoleUpdateManyWithWhereNestedInput>>;
};

export type UserRoleUpdateManyWithWhereNestedInput = {
  where: UserRoleScalarWhereInput;
  data: UserRoleUpdateManyDataInput;
};

export type UserRoleUpdateWithoutRoleDataInput = {
  user?: Maybe<UserUpdateOneRequiredWithoutRolesInput>;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserRoleUpdateWithoutUserDataInput = {
  role?: Maybe<RoleUpdateOneRequiredWithoutUsersInput>;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type UserRoleUpdateWithWhereUniqueWithoutRoleInput = {
  where: UserRoleWhereUniqueInput;
  data: UserRoleUpdateWithoutRoleDataInput;
};

export type UserRoleUpdateWithWhereUniqueWithoutUserInput = {
  where: UserRoleWhereUniqueInput;
  data: UserRoleUpdateWithoutUserDataInput;
};

export type UserRoleUpsertWithWhereUniqueWithoutRoleInput = {
  where: UserRoleWhereUniqueInput;
  update: UserRoleUpdateWithoutRoleDataInput;
  create: UserRoleCreateWithoutRoleInput;
};

export type UserRoleUpsertWithWhereUniqueWithoutUserInput = {
  where: UserRoleWhereUniqueInput;
  update: UserRoleUpdateWithoutUserDataInput;
  create: UserRoleCreateWithoutUserInput;
};

export type UserRoleWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  role?: Maybe<RoleWhereInput>;
  user?: Maybe<UserWhereInput>;
  from?: Maybe<Scalars['DateTime']>;
  from_not?: Maybe<Scalars['DateTime']>;
  from_in?: Maybe<Array<Scalars['DateTime']>>;
  from_not_in?: Maybe<Array<Scalars['DateTime']>>;
  from_lt?: Maybe<Scalars['DateTime']>;
  from_lte?: Maybe<Scalars['DateTime']>;
  from_gt?: Maybe<Scalars['DateTime']>;
  from_gte?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  to_not?: Maybe<Scalars['DateTime']>;
  to_in?: Maybe<Array<Scalars['DateTime']>>;
  to_not_in?: Maybe<Array<Scalars['DateTime']>>;
  to_lt?: Maybe<Scalars['DateTime']>;
  to_lte?: Maybe<Scalars['DateTime']>;
  to_gt?: Maybe<Scalars['DateTime']>;
  to_gte?: Maybe<Scalars['DateTime']>;
  AND?: Maybe<Array<UserRoleWhereInput>>;
  OR?: Maybe<Array<UserRoleWhereInput>>;
  NOT?: Maybe<Array<UserRoleWhereInput>>;
};

export type UserRoleWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type UserUpdateDataInput = {
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
  roles?: Maybe<UserRoleUpdateManyWithoutUserInput>;
  permissions?: Maybe<UserUpdatepermissionsInput>;
  departments?: Maybe<UserDepartmentUpdateManyWithoutUserInput>;
  credentials?: Maybe<CredentialUpdateManyWithoutUsersInput>;
};

export type UserUpdateOneInput = {
  create?: Maybe<UserCreateInput>;
  update?: Maybe<UserUpdateDataInput>;
  upsert?: Maybe<UserUpsertNestedInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserUpdateOneRequiredWithoutDepartmentsInput = {
  create?: Maybe<UserCreateWithoutDepartmentsInput>;
  update?: Maybe<UserUpdateWithoutDepartmentsDataInput>;
  upsert?: Maybe<UserUpsertWithoutDepartmentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserUpdateOneRequiredWithoutRolesInput = {
  create?: Maybe<UserCreateWithoutRolesInput>;
  update?: Maybe<UserUpdateWithoutRolesDataInput>;
  upsert?: Maybe<UserUpsertWithoutRolesInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserUpdatepermissionsInput = {
  set?: Maybe<Array<Permission>>;
};

export type UserUpdateWithoutDepartmentsDataInput = {
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
  roles?: Maybe<UserRoleUpdateManyWithoutUserInput>;
  permissions?: Maybe<UserUpdatepermissionsInput>;
  credentials?: Maybe<CredentialUpdateManyWithoutUsersInput>;
};

export type UserUpdateWithoutRolesDataInput = {
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
  permissions?: Maybe<UserUpdatepermissionsInput>;
  departments?: Maybe<UserDepartmentUpdateManyWithoutUserInput>;
  credentials?: Maybe<CredentialUpdateManyWithoutUsersInput>;
};

export type UserUpsertNestedInput = {
  update: UserUpdateDataInput;
  create: UserCreateInput;
};

export type UserUpsertWithoutDepartmentsInput = {
  update: UserUpdateWithoutDepartmentsDataInput;
  create: UserCreateWithoutDepartmentsInput;
};

export type UserUpsertWithoutRolesInput = {
  update: UserUpdateWithoutRolesDataInput;
  create: UserCreateWithoutRolesInput;
};

export type UserWhereInput = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  image_not?: Maybe<Scalars['String']>;
  image_in?: Maybe<Array<Scalars['String']>>;
  image_not_in?: Maybe<Array<Scalars['String']>>;
  image_lt?: Maybe<Scalars['String']>;
  image_lte?: Maybe<Scalars['String']>;
  image_gt?: Maybe<Scalars['String']>;
  image_gte?: Maybe<Scalars['String']>;
  image_contains?: Maybe<Scalars['String']>;
  image_not_contains?: Maybe<Scalars['String']>;
  image_starts_with?: Maybe<Scalars['String']>;
  image_not_starts_with?: Maybe<Scalars['String']>;
  image_ends_with?: Maybe<Scalars['String']>;
  image_not_ends_with?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_not?: Maybe<Scalars['String']>;
  email_in?: Maybe<Array<Scalars['String']>>;
  email_not_in?: Maybe<Array<Scalars['String']>>;
  email_lt?: Maybe<Scalars['String']>;
  email_lte?: Maybe<Scalars['String']>;
  email_gt?: Maybe<Scalars['String']>;
  email_gte?: Maybe<Scalars['String']>;
  email_contains?: Maybe<Scalars['String']>;
  email_not_contains?: Maybe<Scalars['String']>;
  email_starts_with?: Maybe<Scalars['String']>;
  email_not_starts_with?: Maybe<Scalars['String']>;
  email_ends_with?: Maybe<Scalars['String']>;
  email_not_ends_with?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phone_not?: Maybe<Scalars['String']>;
  phone_in?: Maybe<Array<Scalars['String']>>;
  phone_not_in?: Maybe<Array<Scalars['String']>>;
  phone_lt?: Maybe<Scalars['String']>;
  phone_lte?: Maybe<Scalars['String']>;
  phone_gt?: Maybe<Scalars['String']>;
  phone_gte?: Maybe<Scalars['String']>;
  phone_contains?: Maybe<Scalars['String']>;
  phone_not_contains?: Maybe<Scalars['String']>;
  phone_starts_with?: Maybe<Scalars['String']>;
  phone_not_starts_with?: Maybe<Scalars['String']>;
  phone_ends_with?: Maybe<Scalars['String']>;
  phone_not_ends_with?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  password_not?: Maybe<Scalars['String']>;
  password_in?: Maybe<Array<Scalars['String']>>;
  password_not_in?: Maybe<Array<Scalars['String']>>;
  password_lt?: Maybe<Scalars['String']>;
  password_lte?: Maybe<Scalars['String']>;
  password_gt?: Maybe<Scalars['String']>;
  password_gte?: Maybe<Scalars['String']>;
  password_contains?: Maybe<Scalars['String']>;
  password_not_contains?: Maybe<Scalars['String']>;
  password_starts_with?: Maybe<Scalars['String']>;
  password_not_starts_with?: Maybe<Scalars['String']>;
  password_ends_with?: Maybe<Scalars['String']>;
  password_not_ends_with?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
  profileURL_not?: Maybe<Scalars['String']>;
  profileURL_in?: Maybe<Array<Scalars['String']>>;
  profileURL_not_in?: Maybe<Array<Scalars['String']>>;
  profileURL_lt?: Maybe<Scalars['String']>;
  profileURL_lte?: Maybe<Scalars['String']>;
  profileURL_gt?: Maybe<Scalars['String']>;
  profileURL_gte?: Maybe<Scalars['String']>;
  profileURL_contains?: Maybe<Scalars['String']>;
  profileURL_not_contains?: Maybe<Scalars['String']>;
  profileURL_starts_with?: Maybe<Scalars['String']>;
  profileURL_not_starts_with?: Maybe<Scalars['String']>;
  profileURL_ends_with?: Maybe<Scalars['String']>;
  profileURL_not_ends_with?: Maybe<Scalars['String']>;
  roles_every?: Maybe<UserRoleWhereInput>;
  roles_some?: Maybe<UserRoleWhereInput>;
  roles_none?: Maybe<UserRoleWhereInput>;
  departments_every?: Maybe<UserDepartmentWhereInput>;
  departments_some?: Maybe<UserDepartmentWhereInput>;
  departments_none?: Maybe<UserDepartmentWhereInput>;
  credentials_every?: Maybe<CredentialWhereInput>;
  credentials_some?: Maybe<CredentialWhereInput>;
  credentials_none?: Maybe<CredentialWhereInput>;
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
};
export type CredentialsQueryVariables = {};

export type CredentialsQuery = { __typename?: 'Query' } & {
  credentials: Array<{ __typename?: 'Credential' } & Pick<Credential, 'id' | 'name' | 'url' | 'login' | 'password'>>;
};

export type CreateCredentialMutationVariables = {
  name: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type CreateCredentialMutation = { __typename?: 'Mutation' } & {
  createCredential: { __typename?: 'Credential' } & Pick<Credential, 'id' | 'name' | 'url' | 'login' | 'password'>;
};

export type UpdateCredentialMutationVariables = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
};

export type UpdateCredentialMutation = { __typename?: 'Mutation' } & {
  updateCredential: { __typename?: 'Credential' } & Pick<Credential, 'id' | 'name' | 'url' | 'login' | 'password'>;
};

export type DeleteCredentialMutationVariables = {
  id: Scalars['ID'];
};

export type DeleteCredentialMutation = { __typename?: 'Mutation' } & {
  deleteCredential: { __typename?: 'Credential' } & Pick<Credential, 'id' | 'name' | 'url' | 'login' | 'password'>;
};

export type DepartmentsQueryVariables = {};

export type DepartmentsQuery = { __typename?: 'Query' } & {
  departments: Array<{ __typename?: 'Department' } & Pick<Department, 'id' | 'name' | 'description' | 'active'>>;
};

export type MaterialTagsQueryVariables = {};

export type MaterialTagsQuery = { __typename?: 'Query' } & {
  materialTags: Array<{ __typename?: 'MaterialTag' } & Pick<MaterialTag, 'id' | 'name'>>;
};

export type MaterialsQueryVariables = {};

export type MaterialsQuery = { __typename?: 'Query' } & {
  materials: Array<
    { __typename?: 'Material' } & Pick<Material, 'id' | 'name' | 'url' | 'image'> & {
        tags: Maybe<Array<{ __typename?: 'MaterialTag' } & Pick<MaterialTag, 'id' | 'name'>>>;
      }
  >;
};

export type CreateMaterialMutationVariables = {
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type CreateMaterialMutation = { __typename?: 'Mutation' } & {
  createMaterial: { __typename?: 'Material' } & Pick<Material, 'id' | 'name' | 'url' | 'image'>;
};

export type UpdateMaterialMutationVariables = {
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type UpdateMaterialMutation = { __typename?: 'Mutation' } & {
  updateMaterial: { __typename?: 'Material' } & Pick<Material, 'id' | 'name' | 'url' | 'image'>;
};

export type DeleteMaterialMutationVariables = {
  id: Scalars['ID'];
};

export type DeleteMaterialMutation = { __typename?: 'Mutation' } & {
  deleteMaterial: { __typename?: 'Material' } & Pick<Material, 'id' | 'name' | 'url' | 'image'>;
};

export type RolesQueryVariables = {};

export type RolesQuery = { __typename?: 'Query' } & {
  roles: Array<{ __typename?: 'Role' } & Pick<Role, 'id' | 'name' | 'description' | 'active'>>;
};

export type CreateRoleMutationVariables = {
  data: RoleCreateInput;
};

export type CreateRoleMutation = { __typename?: 'Mutation' } & {
  createRole: { __typename?: 'Role' } & Pick<Role, 'id' | 'name' | 'description'>;
};

export type UpdateRoleMutationVariables = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};

export type UpdateRoleMutation = { __typename?: 'Mutation' } & {
  updateRole: Maybe<{ __typename?: 'Role' } & Pick<Role, 'id' | 'name' | 'description'>>;
};

export type DeleteRoleMutationVariables = {
  where: RoleWhereUniqueInput;
};

export type DeleteRoleMutation = { __typename?: 'Mutation' } & {
  deleteRole: Maybe<{ __typename?: 'Role' } & Pick<Role, 'id' | 'name' | 'description'>>;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: 'Query' } & {
  me: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'image' | 'phone' | 'email' | 'permissions'>>;
};

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: 'Query' } & {
  users: Array<
    { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'image' | 'phone' | 'email' | 'profileURL' | 'permissions'> & {
        departments: Maybe<
          Array<
            { __typename?: 'UserDepartment' } & {
              department: { __typename?: 'Department' } & Pick<Department, 'name' | 'id'>;
            }
          >
        >;
        roles: Maybe<
          Array<{ __typename?: 'UserRole' } & { role: { __typename?: 'Role' } & Pick<Role, 'name' | 'id'> }>
        >;
      }
  >;
};

export type SignInMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInMutation = { __typename?: 'Mutation' } & {
  signIn: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'image' | 'phone' | 'email' | 'permissions'>>;
};

export type SignOutMutationVariables = {};

export type SignOutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'signOut'>;

export type DeleteUserMutationVariables = {
  id: Scalars['ID'];
};

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
  deleteUser: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'image' | 'phone' | 'email' | 'permissions'>;
};

export type UpdateUserAdminMutationVariables = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileURL?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  departments?: Maybe<Array<Scalars['String']>>;
  credentials?: Maybe<Array<Scalars['String']>>;
  permissions?: Maybe<Scalars['String']>;
};

export type UpdateUserAdminMutation = { __typename?: 'Mutation' } & {
  updateUserAdmin: { __typename?: 'User' } & Pick<
    User,
    'id' | 'name' | 'image' | 'phone' | 'profileURL' | 'email' | 'permissions'
  > & {
      roles: Maybe<Array<{ __typename?: 'UserRole' } & { role: { __typename?: 'Role' } & Pick<Role, 'name'> }>>;
      departments: Maybe<
        Array<
          { __typename?: 'UserDepartment' } & { department: { __typename?: 'Department' } & Pick<Department, 'name'> }
        >
      >;
    };
};

export type CreateUserMutationVariables = {
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  departments?: Maybe<Array<Scalars['String']>>;
  permissions?: Maybe<Scalars['String']>;
  credentials?: Maybe<Array<Scalars['String']>>;
};

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
};

export const CredentialsDocument = gql`
  query credentials {
    credentials {
      id
      name
      url
      login
      password
    }
  }
`;
export type CredentialsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<CredentialsQuery, CredentialsQueryVariables>,
  'query'
>;

export const CredentialsComponent = (props: CredentialsComponentProps) => (
  <ApolloReactComponents.Query<CredentialsQuery, CredentialsQueryVariables> query={CredentialsDocument} {...props} />
);

export type CredentialsProps<TChildProps = {}> = ApolloReactHoc.DataProps<CredentialsQuery, CredentialsQueryVariables> &
  TChildProps;
export function withCredentials<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CredentialsQuery,
    CredentialsQueryVariables,
    CredentialsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<TProps, CredentialsQuery, CredentialsQueryVariables, CredentialsProps<TChildProps>>(
    CredentialsDocument,
    {
      alias: 'withCredentials',
      ...operationOptions,
    },
  );
}

export function useCredentialsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<CredentialsQuery, CredentialsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<CredentialsQuery, CredentialsQueryVariables>(CredentialsDocument, baseOptions);
}
export function useCredentialsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CredentialsQuery, CredentialsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<CredentialsQuery, CredentialsQueryVariables>(CredentialsDocument, baseOptions);
}

export type CredentialsQueryHookResult = ReturnType<typeof useCredentialsQuery>;
export type CredentialsQueryResult = ApolloReactCommon.QueryResult<CredentialsQuery, CredentialsQueryVariables>;
export const CreateCredentialDocument = gql`
  mutation createCredential($name: String!, $login: String!, $password: String!, $url: String) {
    createCredential(name: $name, login: $login, password: $password, url: $url) {
      id
      name
      url
      login
      password
    }
  }
`;
export type CreateCredentialMutationFn = ApolloReactCommon.MutationFunction<
  CreateCredentialMutation,
  CreateCredentialMutationVariables
>;
export type CreateCredentialComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateCredentialMutation, CreateCredentialMutationVariables>,
  'mutation'
>;

export const CreateCredentialComponent = (props: CreateCredentialComponentProps) => (
  <ApolloReactComponents.Mutation<CreateCredentialMutation, CreateCredentialMutationVariables>
    mutation={CreateCredentialDocument}
    {...props}
  />
);

export type CreateCredentialProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  CreateCredentialMutation,
  CreateCredentialMutationVariables
> &
  TChildProps;
export function withCreateCredential<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateCredentialMutation,
    CreateCredentialMutationVariables,
    CreateCredentialProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateCredentialMutation,
    CreateCredentialMutationVariables,
    CreateCredentialProps<TChildProps>
  >(CreateCredentialDocument, {
    alias: 'withCreateCredential',
    ...operationOptions,
  });
}

export function useCreateCredentialMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCredentialMutation, CreateCredentialMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateCredentialMutation, CreateCredentialMutationVariables>(
    CreateCredentialDocument,
    baseOptions,
  );
}
export type CreateCredentialMutationHookResult = ReturnType<typeof useCreateCredentialMutation>;
export type CreateCredentialMutationResult = ApolloReactCommon.MutationResult<CreateCredentialMutation>;
export type CreateCredentialMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCredentialMutation,
  CreateCredentialMutationVariables
>;
export const UpdateCredentialDocument = gql`
  mutation updateCredential($id: ID!, $name: String, $login: String, $password: String, $url: String, $user: ID) {
    updateCredential(id: $id, name: $name, login: $login, password: $password, url: $url, user: $user) {
      id
      name
      url
      login
      password
    }
  }
`;
export type UpdateCredentialMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCredentialMutation,
  UpdateCredentialMutationVariables
>;
export type UpdateCredentialComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateCredentialMutation, UpdateCredentialMutationVariables>,
  'mutation'
>;

export const UpdateCredentialComponent = (props: UpdateCredentialComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateCredentialMutation, UpdateCredentialMutationVariables>
    mutation={UpdateCredentialDocument}
    {...props}
  />
);

export type UpdateCredentialProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UpdateCredentialMutation,
  UpdateCredentialMutationVariables
> &
  TChildProps;
export function withUpdateCredential<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCredentialMutation,
    UpdateCredentialMutationVariables,
    UpdateCredentialProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCredentialMutation,
    UpdateCredentialMutationVariables,
    UpdateCredentialProps<TChildProps>
  >(UpdateCredentialDocument, {
    alias: 'withUpdateCredential',
    ...operationOptions,
  });
}

export function useUpdateCredentialMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCredentialMutation, UpdateCredentialMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateCredentialMutation, UpdateCredentialMutationVariables>(
    UpdateCredentialDocument,
    baseOptions,
  );
}
export type UpdateCredentialMutationHookResult = ReturnType<typeof useUpdateCredentialMutation>;
export type UpdateCredentialMutationResult = ApolloReactCommon.MutationResult<UpdateCredentialMutation>;
export type UpdateCredentialMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCredentialMutation,
  UpdateCredentialMutationVariables
>;
export const DeleteCredentialDocument = gql`
  mutation deleteCredential($id: ID!) {
    deleteCredential(id: $id) {
      id
      name
      url
      login
      password
    }
  }
`;
export type DeleteCredentialMutationFn = ApolloReactCommon.MutationFunction<
  DeleteCredentialMutation,
  DeleteCredentialMutationVariables
>;
export type DeleteCredentialComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeleteCredentialMutation, DeleteCredentialMutationVariables>,
  'mutation'
>;

export const DeleteCredentialComponent = (props: DeleteCredentialComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteCredentialMutation, DeleteCredentialMutationVariables>
    mutation={DeleteCredentialDocument}
    {...props}
  />
);

export type DeleteCredentialProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  DeleteCredentialMutation,
  DeleteCredentialMutationVariables
> &
  TChildProps;
export function withDeleteCredential<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteCredentialMutation,
    DeleteCredentialMutationVariables,
    DeleteCredentialProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteCredentialMutation,
    DeleteCredentialMutationVariables,
    DeleteCredentialProps<TChildProps>
  >(DeleteCredentialDocument, {
    alias: 'withDeleteCredential',
    ...operationOptions,
  });
}

export function useDeleteCredentialMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCredentialMutation, DeleteCredentialMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteCredentialMutation, DeleteCredentialMutationVariables>(
    DeleteCredentialDocument,
    baseOptions,
  );
}
export type DeleteCredentialMutationHookResult = ReturnType<typeof useDeleteCredentialMutation>;
export type DeleteCredentialMutationResult = ApolloReactCommon.MutationResult<DeleteCredentialMutation>;
export type DeleteCredentialMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteCredentialMutation,
  DeleteCredentialMutationVariables
>;
export const DepartmentsDocument = gql`
  query departments {
    departments {
      id
      name
      description
      active
    }
  }
`;
export type DepartmentsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<DepartmentsQuery, DepartmentsQueryVariables>,
  'query'
>;

export const DepartmentsComponent = (props: DepartmentsComponentProps) => (
  <ApolloReactComponents.Query<DepartmentsQuery, DepartmentsQueryVariables> query={DepartmentsDocument} {...props} />
);

export type DepartmentsProps<TChildProps = {}> = ApolloReactHoc.DataProps<DepartmentsQuery, DepartmentsQueryVariables> &
  TChildProps;
export function withDepartments<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DepartmentsQuery,
    DepartmentsQueryVariables,
    DepartmentsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<TProps, DepartmentsQuery, DepartmentsQueryVariables, DepartmentsProps<TChildProps>>(
    DepartmentsDocument,
    {
      alias: 'withDepartments',
      ...operationOptions,
    },
  );
}

export function useDepartmentsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, baseOptions);
}
export function useDepartmentsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, baseOptions);
}

export type DepartmentsQueryHookResult = ReturnType<typeof useDepartmentsQuery>;
export type DepartmentsQueryResult = ApolloReactCommon.QueryResult<DepartmentsQuery, DepartmentsQueryVariables>;
export const MaterialTagsDocument = gql`
  query materialTags {
    materialTags {
      id
      name
    }
  }
`;
export type MaterialTagsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<MaterialTagsQuery, MaterialTagsQueryVariables>,
  'query'
>;

export const MaterialTagsComponent = (props: MaterialTagsComponentProps) => (
  <ApolloReactComponents.Query<MaterialTagsQuery, MaterialTagsQueryVariables> query={MaterialTagsDocument} {...props} />
);

export type MaterialTagsProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  MaterialTagsQuery,
  MaterialTagsQueryVariables
> &
  TChildProps;
export function withMaterialTags<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    MaterialTagsQuery,
    MaterialTagsQueryVariables,
    MaterialTagsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    MaterialTagsQuery,
    MaterialTagsQueryVariables,
    MaterialTagsProps<TChildProps>
  >(MaterialTagsDocument, {
    alias: 'withMaterialTags',
    ...operationOptions,
  });
}

export function useMaterialTagsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MaterialTagsQuery, MaterialTagsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MaterialTagsQuery, MaterialTagsQueryVariables>(MaterialTagsDocument, baseOptions);
}
export function useMaterialTagsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MaterialTagsQuery, MaterialTagsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MaterialTagsQuery, MaterialTagsQueryVariables>(
    MaterialTagsDocument,
    baseOptions,
  );
}

export type MaterialTagsQueryHookResult = ReturnType<typeof useMaterialTagsQuery>;
export type MaterialTagsQueryResult = ApolloReactCommon.QueryResult<MaterialTagsQuery, MaterialTagsQueryVariables>;
export const MaterialsDocument = gql`
  query materials {
    materials {
      id
      name
      url
      image
      tags {
        id
        name
      }
    }
  }
`;
export type MaterialsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<MaterialsQuery, MaterialsQueryVariables>,
  'query'
>;

export const MaterialsComponent = (props: MaterialsComponentProps) => (
  <ApolloReactComponents.Query<MaterialsQuery, MaterialsQueryVariables> query={MaterialsDocument} {...props} />
);

export type MaterialsProps<TChildProps = {}> = ApolloReactHoc.DataProps<MaterialsQuery, MaterialsQueryVariables> &
  TChildProps;
export function withMaterials<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    MaterialsQuery,
    MaterialsQueryVariables,
    MaterialsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<TProps, MaterialsQuery, MaterialsQueryVariables, MaterialsProps<TChildProps>>(
    MaterialsDocument,
    {
      alias: 'withMaterials',
      ...operationOptions,
    },
  );
}

export function useMaterialsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MaterialsQuery, MaterialsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MaterialsQuery, MaterialsQueryVariables>(MaterialsDocument, baseOptions);
}
export function useMaterialsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MaterialsQuery, MaterialsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MaterialsQuery, MaterialsQueryVariables>(MaterialsDocument, baseOptions);
}

export type MaterialsQueryHookResult = ReturnType<typeof useMaterialsQuery>;
export type MaterialsQueryResult = ApolloReactCommon.QueryResult<MaterialsQuery, MaterialsQueryVariables>;
export const CreateMaterialDocument = gql`
  mutation createMaterial($image: String, $name: String!, $url: String!, $tags: [String!]!) {
    createMaterial(image: $image, name: $name, url: $url, tags: $tags) {
      id
      name
      url
      image
    }
  }
`;
export type CreateMaterialMutationFn = ApolloReactCommon.MutationFunction<
  CreateMaterialMutation,
  CreateMaterialMutationVariables
>;
export type CreateMaterialComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateMaterialMutation, CreateMaterialMutationVariables>,
  'mutation'
>;

export const CreateMaterialComponent = (props: CreateMaterialComponentProps) => (
  <ApolloReactComponents.Mutation<CreateMaterialMutation, CreateMaterialMutationVariables>
    mutation={CreateMaterialDocument}
    {...props}
  />
);

export type CreateMaterialProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  CreateMaterialMutation,
  CreateMaterialMutationVariables
> &
  TChildProps;
export function withCreateMaterial<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateMaterialMutation,
    CreateMaterialMutationVariables,
    CreateMaterialProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateMaterialMutation,
    CreateMaterialMutationVariables,
    CreateMaterialProps<TChildProps>
  >(CreateMaterialDocument, {
    alias: 'withCreateMaterial',
    ...operationOptions,
  });
}

export function useCreateMaterialMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMaterialMutation, CreateMaterialMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateMaterialMutation, CreateMaterialMutationVariables>(
    CreateMaterialDocument,
    baseOptions,
  );
}
export type CreateMaterialMutationHookResult = ReturnType<typeof useCreateMaterialMutation>;
export type CreateMaterialMutationResult = ApolloReactCommon.MutationResult<CreateMaterialMutation>;
export type CreateMaterialMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateMaterialMutation,
  CreateMaterialMutationVariables
>;
export const UpdateMaterialDocument = gql`
  mutation updateMaterial($id: ID!, $image: String, $name: String!, $url: String!, $tags: [String!]!) {
    updateMaterial(id: $id, image: $image, name: $name, url: $url, tags: $tags) {
      id
      name
      url
      image
    }
  }
`;
export type UpdateMaterialMutationFn = ApolloReactCommon.MutationFunction<
  UpdateMaterialMutation,
  UpdateMaterialMutationVariables
>;
export type UpdateMaterialComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>,
  'mutation'
>;

export const UpdateMaterialComponent = (props: UpdateMaterialComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateMaterialMutation, UpdateMaterialMutationVariables>
    mutation={UpdateMaterialDocument}
    {...props}
  />
);

export type UpdateMaterialProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UpdateMaterialMutation,
  UpdateMaterialMutationVariables
> &
  TChildProps;
export function withUpdateMaterial<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateMaterialMutation,
    UpdateMaterialMutationVariables,
    UpdateMaterialProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateMaterialMutation,
    UpdateMaterialMutationVariables,
    UpdateMaterialProps<TChildProps>
  >(UpdateMaterialDocument, {
    alias: 'withUpdateMaterial',
    ...operationOptions,
  });
}

export function useUpdateMaterialMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateMaterialMutation, UpdateMaterialMutationVariables>(
    UpdateMaterialDocument,
    baseOptions,
  );
}
export type UpdateMaterialMutationHookResult = ReturnType<typeof useUpdateMaterialMutation>;
export type UpdateMaterialMutationResult = ApolloReactCommon.MutationResult<UpdateMaterialMutation>;
export type UpdateMaterialMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateMaterialMutation,
  UpdateMaterialMutationVariables
>;
export const DeleteMaterialDocument = gql`
  mutation deleteMaterial($id: ID!) {
    deleteMaterial(id: $id) {
      id
      name
      url
      image
    }
  }
`;
export type DeleteMaterialMutationFn = ApolloReactCommon.MutationFunction<
  DeleteMaterialMutation,
  DeleteMaterialMutationVariables
>;
export type DeleteMaterialComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeleteMaterialMutation, DeleteMaterialMutationVariables>,
  'mutation'
>;

export const DeleteMaterialComponent = (props: DeleteMaterialComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteMaterialMutation, DeleteMaterialMutationVariables>
    mutation={DeleteMaterialDocument}
    {...props}
  />
);

export type DeleteMaterialProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  DeleteMaterialMutation,
  DeleteMaterialMutationVariables
> &
  TChildProps;
export function withDeleteMaterial<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteMaterialMutation,
    DeleteMaterialMutationVariables,
    DeleteMaterialProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteMaterialMutation,
    DeleteMaterialMutationVariables,
    DeleteMaterialProps<TChildProps>
  >(DeleteMaterialDocument, {
    alias: 'withDeleteMaterial',
    ...operationOptions,
  });
}

export function useDeleteMaterialMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMaterialMutation, DeleteMaterialMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteMaterialMutation, DeleteMaterialMutationVariables>(
    DeleteMaterialDocument,
    baseOptions,
  );
}
export type DeleteMaterialMutationHookResult = ReturnType<typeof useDeleteMaterialMutation>;
export type DeleteMaterialMutationResult = ApolloReactCommon.MutationResult<DeleteMaterialMutation>;
export type DeleteMaterialMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteMaterialMutation,
  DeleteMaterialMutationVariables
>;
export const RolesDocument = gql`
  query roles {
    roles {
      id
      name
      description
      active
    }
  }
`;
export type RolesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<RolesQuery, RolesQueryVariables>,
  'query'
>;

export const RolesComponent = (props: RolesComponentProps) => (
  <ApolloReactComponents.Query<RolesQuery, RolesQueryVariables> query={RolesDocument} {...props} />
);

export type RolesProps<TChildProps = {}> = ApolloReactHoc.DataProps<RolesQuery, RolesQueryVariables> & TChildProps;
export function withRoles<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<TProps, RolesQuery, RolesQueryVariables, RolesProps<TChildProps>>,
) {
  return ApolloReactHoc.withQuery<TProps, RolesQuery, RolesQueryVariables, RolesProps<TChildProps>>(RolesDocument, {
    alias: 'withRoles',
    ...operationOptions,
  });
}

export function useRolesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
  return ApolloReactHooks.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, baseOptions);
}
export function useRolesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, baseOptions);
}

export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesQueryResult = ApolloReactCommon.QueryResult<RolesQuery, RolesQueryVariables>;
export const CreateRoleDocument = gql`
  mutation createRole($data: RoleCreateInput!) {
    createRole(data: $data) {
      id
      name
      description
    }
  }
`;
export type CreateRoleMutationFn = ApolloReactCommon.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;
export type CreateRoleComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateRoleMutation, CreateRoleMutationVariables>,
  'mutation'
>;

export const CreateRoleComponent = (props: CreateRoleComponentProps) => (
  <ApolloReactComponents.Mutation<CreateRoleMutation, CreateRoleMutationVariables>
    mutation={CreateRoleDocument}
    {...props}
  />
);

export type CreateRoleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  CreateRoleMutation,
  CreateRoleMutationVariables
> &
  TChildProps;
export function withCreateRole<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateRoleMutation,
    CreateRoleMutationVariables,
    CreateRoleProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateRoleMutation,
    CreateRoleMutationVariables,
    CreateRoleProps<TChildProps>
  >(CreateRoleDocument, {
    alias: 'withCreateRole',
    ...operationOptions,
  });
}

export function useCreateRoleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, baseOptions);
}
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = ApolloReactCommon.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRoleMutation,
  CreateRoleMutationVariables
>;
export const UpdateRoleDocument = gql`
  mutation updateRole($data: RoleUpdateInput!, $where: RoleWhereUniqueInput!) {
    updateRole(data: $data, where: $where) {
      id
      name
      description
    }
  }
`;
export type UpdateRoleMutationFn = ApolloReactCommon.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;
export type UpdateRoleComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateRoleMutation, UpdateRoleMutationVariables>,
  'mutation'
>;

export const UpdateRoleComponent = (props: UpdateRoleComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateRoleMutation, UpdateRoleMutationVariables>
    mutation={UpdateRoleDocument}
    {...props}
  />
);

export type UpdateRoleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
> &
  TChildProps;
export function withUpdateRole<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateRoleMutation,
    UpdateRoleMutationVariables,
    UpdateRoleProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateRoleMutation,
    UpdateRoleMutationVariables,
    UpdateRoleProps<TChildProps>
  >(UpdateRoleDocument, {
    alias: 'withUpdateRole',
    ...operationOptions,
  });
}

export function useUpdateRoleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, baseOptions);
}
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = ApolloReactCommon.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>;
export const DeleteRoleDocument = gql`
  mutation deleteRole($where: RoleWhereUniqueInput!) {
    deleteRole(where: $where) {
      id
      name
      description
    }
  }
`;
export type DeleteRoleMutationFn = ApolloReactCommon.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>;
export type DeleteRoleComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeleteRoleMutation, DeleteRoleMutationVariables>,
  'mutation'
>;

export const DeleteRoleComponent = (props: DeleteRoleComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteRoleMutation, DeleteRoleMutationVariables>
    mutation={DeleteRoleDocument}
    {...props}
  />
);

export type DeleteRoleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
> &
  TChildProps;
export function withDeleteRole<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteRoleMutation,
    DeleteRoleMutationVariables,
    DeleteRoleProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteRoleMutation,
    DeleteRoleMutationVariables,
    DeleteRoleProps<TChildProps>
  >(DeleteRoleDocument, {
    alias: 'withDeleteRole',
    ...operationOptions,
  });
}

export function useDeleteRoleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, baseOptions);
}
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>;
export type DeleteRoleMutationResult = ApolloReactCommon.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
>;
export const MeDocument = gql`
  query me {
    me {
      id
      name
      image
      phone
      email
      image
      permissions
    }
  }
`;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

export const MeComponent = (props: MeComponentProps) => (
  <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
);

export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>,
) {
  return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
    alias: 'withMe',
    ...operationOptions,
  });
}

export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}

export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
  query users {
    users {
      id
      name
      image
      phone
      email
      image
      profileURL
      permissions
      departments {
        department {
          name
          id
        }
      }
      roles {
        role {
          name
          id
        }
      }
    }
  }
`;
export type UsersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>,
  'query'
>;

export const UsersComponent = (props: UsersComponentProps) => (
  <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables> query={UsersDocument} {...props} />
);

export type UsersProps<TChildProps = {}> = ApolloReactHoc.DataProps<UsersQuery, UsersQueryVariables> & TChildProps;
export function withUsers<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<TProps, UsersQuery, UsersQueryVariables, UsersProps<TChildProps>>,
) {
  return ApolloReactHoc.withQuery<TProps, UsersQuery, UsersQueryVariables, UsersProps<TChildProps>>(UsersDocument, {
    alias: 'withUsers',
    ...operationOptions,
  });
}

export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}

export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const SignInDocument = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      name
      image
      phone
      email
      image
      permissions
    }
  }
`;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;
export type SignInComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<SignInMutation, SignInMutationVariables>,
  'mutation'
>;

export const SignInComponent = (props: SignInComponentProps) => (
  <ApolloReactComponents.Mutation<SignInMutation, SignInMutationVariables> mutation={SignInDocument} {...props} />
);

export type SignInProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SignInMutation, SignInMutationVariables> &
  TChildProps;
export function withSignIn<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignInMutation,
    SignInMutationVariables,
    SignInProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<TProps, SignInMutation, SignInMutationVariables, SignInProps<TChildProps>>(
    SignInDocument,
    {
      alias: 'withSignIn',
      ...operationOptions,
    },
  );
}

export function useSignInMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
  mutation signOut {
    signOut
  }
`;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;
export type SignOutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<SignOutMutation, SignOutMutationVariables>,
  'mutation'
>;

export const SignOutComponent = (props: SignOutComponentProps) => (
  <ApolloReactComponents.Mutation<SignOutMutation, SignOutMutationVariables> mutation={SignOutDocument} {...props} />
);

export type SignOutProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SignOutMutation, SignOutMutationVariables> &
  TChildProps;
export function withSignOut<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignOutMutation,
    SignOutMutationVariables,
    SignOutProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<TProps, SignOutMutation, SignOutMutationVariables, SignOutProps<TChildProps>>(
    SignOutDocument,
    {
      alias: 'withSignOut',
      ...operationOptions,
    },
  );
}

export function useSignOutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const DeleteUserDocument = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      image
      phone
      email
      image
      permissions
    }
  }
`;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;
export type DeleteUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeleteUserMutation, DeleteUserMutationVariables>,
  'mutation'
>;

export const DeleteUserComponent = (props: DeleteUserComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteUserMutation, DeleteUserMutationVariables>
    mutation={DeleteUserDocument}
    {...props}
  />
);

export type DeleteUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  DeleteUserMutation,
  DeleteUserMutationVariables
> &
  TChildProps;
export function withDeleteUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteUserMutation,
    DeleteUserMutationVariables,
    DeleteUserProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteUserMutation,
    DeleteUserMutationVariables,
    DeleteUserProps<TChildProps>
  >(DeleteUserDocument, {
    alias: 'withDeleteUser',
    ...operationOptions,
  });
}

export function useDeleteUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const UpdateUserAdminDocument = gql`
  mutation updateUserAdmin(
    $id: ID!
    $name: String
    $image: String
    $phone: String
    $profileURL: String
    $email: String
    $roles: [String!]
    $departments: [String!]
    $credentials: [String!]
    $permissions: String
  ) {
    updateUserAdmin(
      id: $id
      name: $name
      image: $image
      phone: $phone
      profileURL: $profileURL
      email: $email
      roles: $roles
      departments: $departments
      credentials: $credentials
      permissions: $permissions
    ) {
      id
      name
      image
      phone
      profileURL
      email
      roles {
        role {
          name
        }
      }
      departments {
        department {
          name
        }
      }
      permissions
    }
  }
`;
export type UpdateUserAdminMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserAdminMutation,
  UpdateUserAdminMutationVariables
>;
export type UpdateUserAdminComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateUserAdminMutation, UpdateUserAdminMutationVariables>,
  'mutation'
>;

export const UpdateUserAdminComponent = (props: UpdateUserAdminComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateUserAdminMutation, UpdateUserAdminMutationVariables>
    mutation={UpdateUserAdminDocument}
    {...props}
  />
);

export type UpdateUserAdminProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UpdateUserAdminMutation,
  UpdateUserAdminMutationVariables
> &
  TChildProps;
export function withUpdateUserAdmin<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateUserAdminMutation,
    UpdateUserAdminMutationVariables,
    UpdateUserAdminProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateUserAdminMutation,
    UpdateUserAdminMutationVariables,
    UpdateUserAdminProps<TChildProps>
  >(UpdateUserAdminDocument, {
    alias: 'withUpdateUserAdmin',
    ...operationOptions,
  });
}

export function useUpdateUserAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserAdminMutation, UpdateUserAdminMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateUserAdminMutation, UpdateUserAdminMutationVariables>(
    UpdateUserAdminDocument,
    baseOptions,
  );
}
export type UpdateUserAdminMutationHookResult = ReturnType<typeof useUpdateUserAdminMutation>;
export type UpdateUserAdminMutationResult = ApolloReactCommon.MutationResult<UpdateUserAdminMutation>;
export type UpdateUserAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserAdminMutation,
  UpdateUserAdminMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $phone: String
    $roles: [String!]
    $departments: [String!]
    $permissions: String
    $credentials: [String!]
  ) {
    createUser(
      name: $name
      email: $email
      phone: $phone
      roles: $roles
      departments: $departments
      permissions: $permissions
      credentials: $credentials
    ) {
      id
      name
    }
  }
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>,
  'mutation'
>;

export const CreateUserComponent = (props: CreateUserComponentProps) => (
  <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables>
    mutation={CreateUserDocument}
    {...props}
  />
);

export type CreateUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  CreateUserMutation,
  CreateUserMutationVariables
> &
  TChildProps;
export function withCreateUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateUserMutation,
    CreateUserMutationVariables,
    CreateUserProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateUserMutation,
    CreateUserMutationVariables,
    CreateUserProps<TChildProps>
  >(CreateUserDocument, {
    alias: 'withCreateUser',
    ...operationOptions,
  });
}

export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
