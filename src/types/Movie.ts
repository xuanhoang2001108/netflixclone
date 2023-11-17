import { Company, Country, Language } from './Common';
import { Genre } from './Genre';

export type Appended_Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: Country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: { results: Appended_Video[] };
  vote_average: number;
  vote_count: number;
};

export type Movie = {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  results: any
};
export type UserRegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  roleIds: string[];
};
export type UserLoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
  accessToken: string
};

export type Token = {
  accessToken: string
}

export type UserData = {
  userName: string
  roleIds: string
  email: string;
  phoneNumber: string;
  id: string
  data: any;
  userRole: string;
}
export interface RoleData {
  data: any;
  id: string;
  userName: string;
  permissionSetIds: string[];
  userIds: string[];
  length: number
  name: string;
}
export interface PermissionData {
  id: string;
  name: string;
  description: string;
  sort: string;
  permissionIdList: [];
  roleIdList: [];
  data: any;
}
export interface PermissionSetData {

  name: string,
  description: string,
  sort: 0,
  permissionIdList: [string],
  roleIdList: [string]
}

export type ViewUserData = {
  userName: string
  roleIds: string
  email: string;
  phoneNumber: string;
  id: string
}

export type AddRoleData = {
  name: string,
  permissionSetIds: string[],
  userIds: string[]

}
export type ViewRoleData = {
  id: string,
  name: string,
  permissionSetIds: [],
  userIds: [],
  data: any
}