/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SysDeptSaveDto {
  /** 新增人 */
  createBy: string;
  /**
   * 新增时间
   * @format date-time
   */
  createAt: string;
  /** 修改人 */
  updateBy: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateAt: string;
  /** 删除人 */
  delBy: string;
  /**
   * 删除时间
   * @format date-time
   */
  delAt: string;
  /** 部门父id */
  deptParentId: number;
  /** 部门名 */
  deptName: string;
  [key: string]: any;
}

export interface SysDeptEditDto {
  /** 新增人 */
  createBy: string;
  /**
   * 新增时间
   * @format date-time
   */
  createAt: string;
  /** 修改人 */
  updateBy: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateAt: string;
  /** 删除人 */
  delBy: string;
  /**
   * 删除时间
   * @format date-time
   */
  delAt: string;
  /** 部门id */
  deptId: number;
  /** 部门父id */
  deptParentId: number;
  /** 部门名 */
  deptName: string;
  [key: string]: any;
}

export interface SysRolePaDto {
  /**
   * 相等查询-roleId角色id
   * @default null
   */
  "eq-roleId"?: number;
  /**
   * 模糊查询-roleName角色名
   * @default null
   */
  "like-roleName"?: string;
  [key: string]: any;
}

export interface SysRoleSaveDto {
  /** 新增人 */
  createBy: string;
  /**
   * 新增时间
   * @format date-time
   */
  createAt: string;
  /** 修改人 */
  updateBy: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateAt: string;
  /** 删除人 */
  delBy: string;
  /**
   * 删除时间
   * @format date-time
   */
  delAt: string;
  /** 父角色id */
  parentRoleId: number;
  /** 角色名 */
  roleName: string;
  /** 角色编码 */
  roleCode: string;
  [key: string]: any;
}

export interface SysRoleEditDto {
  /** 新增人 */
  createBy: string;
  /**
   * 新增时间
   * @format date-time
   */
  createAt: string;
  /** 修改人 */
  updateBy: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateAt: string;
  /** 删除人 */
  delBy: string;
  /**
   * 删除时间
   * @format date-time
   */
  delAt: string;
  /** 角色id */
  roleId: number;
  /** 父角色id */
  parentRoleId: number;
  /** 角色名 */
  roleName: string;
  /** 角色编码 */
  roleCode: string;
  [key: string]: any;
}

export interface SysUserEntity {
  /** 新增人 */
  createBy: string;
  /**
   * 新增时间
   * @format date-time
   */
  createAt: string;
  /** 修改人 */
  updateBy: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateAt: string;
  /** 删除人 */
  delBy: string;
  /**
   * 删除时间
   * @format date-time
   */
  delAt: string;
  /** 登录名 */
  userId: number;
  /** 登录名 */
  username: string;
  /** 用户昵称 */
  userNickname: string;
  /** 用户密码 */
  password: string;
  /** 用户手机号 */
  mobile: string;
  /** 是否启用 */
  enable: boolean;
  [key: string]: any;
}

export interface BasePageVo {
  /**
   * 当前页码
   * @default 1
   */
  page: number;
  /**
   * 分页大小
   * @default 10
   */
  pageSize: number;
  /**
   * 总页数
   * @default 0
   */
  totalPage: number;
  /**
   * 总记录数
   * @default 0
   */
  totalRecord: number;
  [key: string]: any;
}

export interface R {
  /** 状态码 */
  code: number;
  /** 状态描述 */
  msg: string;
  /** 数据 */
  data: object;
  [key: string]: any;
}

export type SysUserQueryDto = object;

export interface SysUserSaveDto {
  /** 登录名 */
  username: string;
  /** 用户昵称 */
  userNickname: string;
  /** 用户手机号 */
  mobile: string;
  [key: string]: any;
}

export interface SysUserEditDto {
  /** 登录名 */
  userId: number;
  /** 登录名 */
  username: string;
  /** 用户昵称 */
  userNickname: string;
  /** 用户手机号 */
  mobile: string;
  /** 是否启用 */
  enable: boolean;
  [key: string]: any;
}

export interface SysUserAdminLoginDto {
  /** 登录名 */
  username: string;
  /** 用户密码 */
  password: string;
  [key: string]: any;
}

export interface FrameDictSaveDto {
  /** 字典code */
  code: string;
  /** 字典摘要 */
  summary: string;
  [key: string]: any;
}

export interface FrameDictEditDto {
  /** 字典code */
  code: string;
  /** 字典摘要 */
  summary: string;
  [key: string]: any;
}

export type FrameDictItemSaveDto = object;

export type FrameDictItemEditDto = object;

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title aspen-nest后台服务文档
 * @version 1.0.0
 * @contact
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  sys = {
    /**
     * No description
     *
     * @tags 部门管理
     * @name SysDeptControllerPage
     * @summary 分页
     * @request GET:/sys/dept/page
     */
    sysDeptControllerPage: (data: SysDeptSaveDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/dept/page`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 没有权限控制
     *
     * @tags 部门管理
     * @name SysDeptControllerSelect
     * @summary 下拉
     * @request GET:/sys/dept/select
     */
    sysDeptControllerSelect: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/dept/select`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 部门管理
     * @name SysDeptControllerGetByRoleId
     * @summary 根据部门id查询部门(有缓存)
     * @request PATCH:/sys/dept/id/{deptId}
     */
    sysDeptControllerGetByRoleId: (
      deptId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/sys/dept/id/${deptId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 部门管理
     * @name SysDeptControllerSave
     * @summary 新增
     * @request POST:/sys/dept
     */
    sysDeptControllerSave: (data: SysDeptSaveDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/dept`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 部门管理
     * @name SysDeptControllerEdit
     * @summary 修改
     * @request PUT:/sys/dept
     */
    sysDeptControllerEdit: (data: SysDeptEditDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/dept`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 菜单管理
     * @name SysMenuControllerPage
     * @summary 分页
     * @request GET:/sys/menu/page
     */
    sysMenuControllerPage: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/menu/page`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 菜单管理
     * @name SysMenuControllerSelect
     * @summary 下拉(没有权限控制)
     * @request GET:/sys/menu/select
     */
    sysMenuControllerSelect: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/menu/select`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 菜单管理
     * @name SysMenuControllerGetByRoleId
     * @summary 根据部门id查询部门(有缓存)
     * @request PATCH:/sys/menu/id/{menuId}
     */
    sysMenuControllerGetByRoleId: (
      menuId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/sys/menu/id/${menuId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name SysRoleControllerPage
     * @summary 分页
     * @request POST:/sys/role/page
     */
    sysRoleControllerPage: (data: SysRolePaDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/role/page`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name SysRoleControllerSelect
     * @summary 下拉(没有权限控制)
     * @request POST:/sys/role/select
     */
    sysRoleControllerSelect: (data: SysRolePaDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/role/select`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name SysRoleControllerGetByRoleId
     * @summary 根据角色id查询角色(有缓存)
     * @request PATCH:/sys/role/id/{roleId}
     */
    sysRoleControllerGetByRoleId: (
      roleId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/sys/role/id/${roleId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name SysRoleControllerGetByRoleCode
     * @summary 根据角色code查询角色(有缓存)
     * @request PATCH:/sys/role/code/{roleCode}
     */
    sysRoleControllerGetByRoleCode: (
      roleCode: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/sys/role/code/${roleCode}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name SysRoleControllerSave
     * @summary 新增角色(限流、日志)
     * @request POST:/sys/role
     */
    sysRoleControllerSave: (data: SysRoleSaveDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/role`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name SysRoleControllerUpdate
     * @summary 修改角色(限流、日志)
     * @request PUT:/sys/role
     */
    sysRoleControllerUpdate: (
      data: SysRoleEditDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/sys/role`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name SysRoleControllerDelByIds
     * @summary 根据角色ids删除角色
     * @request DELETE:/sys/role/delete/{roleIds}
     */
    sysRoleControllerDelByIds: (
      roleIds: string[],
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/sys/role/delete/${roleIds}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户管理
     * @name SysUserControllerPage
     * @summary 分页
     * @request GET:/sys/user/page
     */
    sysUserControllerPage: (
      data: SysUserQueryDto,
      params: RequestParams = {},
    ) =>
      this.request<
        R & {
          data?: BasePageVo & {
            records?: SysUserEntity[];
            [key: string]: any;
          };
          [key: string]: any;
        },
        any
      >({
        path: `/sys/user/page`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 没有权限控制
     *
     * @tags 用户管理
     * @name SysUserControllerSelect
     * @summary 下拉
     * @request GET:/sys/user/select
     */
    sysUserControllerSelect: (
      data: SysUserQueryDto,
      params: RequestParams = {},
    ) =>
      this.request<
        R & {
          data?: BasePageVo & {
            records?: SysUserEntity[];
            [key: string]: any;
          };
          [key: string]: any;
        },
        any
      >({
        path: `/sys/user/select`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 有缓存
     *
     * @tags 用户管理
     * @name SysUserControllerGetByUserId
     * @summary 根据用户id查询用户
     * @request GET:/sys/user/id/{userId}
     */
    sysUserControllerGetByUserId: (
      userId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        R & {
          data?: SysUserEntity;
          [key: string]: any;
        },
        any
      >({
        path: `/sys/user/id/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description 有缓存
     *
     * @tags 用户管理
     * @name SysUserControllerSave
     * @summary 新增用户
     * @request POST:/sys/user
     */
    sysUserControllerSave: (data: SysUserSaveDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/user`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 有缓存
     *
     * @tags 用户管理
     * @name SysUserControllerEdit
     * @summary 修改用户
     * @request PUT:/sys/user
     */
    sysUserControllerEdit: (data: SysUserEditDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/user`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户管理
     * @name SysUserControllerDelete
     * @summary 根据用户ids删除用户
     * @request DELETE:/sys/user/{userIds}
     */
    sysUserControllerDelete: (userIds: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/user/${userIds}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description admin登录,会校验用户名、密码、用户是否启用、用户是否有权限登录管理后台
     *
     * @tags 用户管理
     * @name SysUserControllerAdminLogin
     * @summary admin登录
     * @request POST:/sys/user/admin/login
     */
    sysUserControllerAdminLogin: (
      data: SysUserAdminLoginDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/sys/user/admin/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 用户手动退出时调用,会清空redis中的token,用户下次需要重新登录
     *
     * @tags 用户管理
     * @name SysUserControllerAdminLogout
     * @summary admin登出
     * @request GET:/sys/user/admin/logout
     */
    sysUserControllerAdminLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/user/admin/logout`,
        method: "GET",
        ...params,
      }),
  };
  frame = {
    /**
     * No description
     *
     * @tags 字典管理
     * @name FrameDictControllerPage
     * @summary 字典分页
     * @request GET:/frame/page
     */
    frameDictControllerPage: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/frame/page`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name FrameDictControllerGetByDictId
     * @summary 根据dictId查询字典(有缓存)
     * @request PATCH:/frame/{dictId}
     */
    frameDictControllerGetByDictId: (
      dictId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame/${dictId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name FrameDictControllerSave
     * @summary 新增字典
     * @request POST:/frame
     */
    frameDictControllerSave: (
      data: FrameDictSaveDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name FrameDictControllerEdit
     * @summary 修改字典
     * @request PUT:/frame
     */
    frameDictControllerEdit: (
      data: FrameDictEditDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name FrameDictControllerDelete
     * @summary 删除字典
     * @request DELETE:/frame/{dictIds}
     */
    frameDictControllerDelete: (
      dictIds: string[],
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame/${dictIds}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典项管理
     * @name FrameDictItemControllerPage
     * @summary 字典项分页
     * @request GET:/frame/dict/page
     */
    frameDictItemControllerPage: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/frame/dict/page`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典项管理
     * @name FrameDictItemControllerGetByDictItemId
     * @summary 根据dictItemId查询字典项(有缓存)
     * @request PATCH:/frame/dict/id/{dictId}
     */
    frameDictItemControllerGetByDictItemId: (
      dictItemId: string,
      dictId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame/dict/id/${dictId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典项管理
     * @name FrameDictItemControllerGetByDictItemCode
     * @summary 根据dictItemCode查询字典项(有缓存)
     * @request PATCH:/frame/dict/code/{deptCode}
     */
    frameDictItemControllerGetByDictItemCode: (
      deptCode: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame/dict/code/${deptCode}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典项管理
     * @name FrameDictItemControllerSave
     * @summary 新增字典项
     * @request POST:/frame/dict
     */
    frameDictItemControllerSave: (
      data: FrameDictItemSaveDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame/dict`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典项管理
     * @name FrameDictItemControllerEdit
     * @summary 修改字典项
     * @request PUT:/frame/dict
     */
    frameDictItemControllerEdit: (
      data: FrameDictItemEditDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame/dict`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典项管理
     * @name FrameDictItemControllerDictItemDelete
     * @summary 删除字典项
     * @request DELETE:/frame/dict/{dictItemIds}
     */
    frameDictItemControllerDictItemDelete: (
      dictItemIds: string[],
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/frame/dict/${dictItemIds}`,
        method: "DELETE",
        ...params,
      }),
  };
  core = {
    /**
     * No description
     *
     * @tags api管理
     * @name CoreApiControllerPage
     * @summary 分页
     * @request GET:/core/api/page
     */
    coreApiControllerPage: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/core/api/page`,
        method: "GET",
        ...params,
      }),

    /**
     * @description 没有权限控制
     *
     * @tags api管理
     * @name CoreApiControllerSelect
     * @summary 下拉
     * @request GET:/core/api/select
     */
    coreApiControllerSelect: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/core/api/select`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api管理
     * @name CoreApiControllerGetByRoleId
     * @summary 根据接口id查询接口(有缓存)
     * @request PATCH:/core/api/id/{apiId}
     */
    coreApiControllerGetByRoleId: (apiId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/core/api/id/${apiId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 日志管理
     * @name CoreLogControllerPage
     * @summary 分页
     * @request GET:/core/log/page
     */
    coreLogControllerPage: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/core/log/page`,
        method: "GET",
        ...params,
      }),

    /**
     * @description 没有权限控制
     *
     * @tags 日志管理
     * @name CoreLogControllerSelect
     * @summary 下拉
     * @request GET:/core/log/select
     */
    coreLogControllerSelect: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/core/log/select`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 日志管理
     * @name CoreLogControllerGetByRoleId
     * @summary 根据接口id查询接口(有缓存)
     * @request PATCH:/core/log/id/{logId}
     */
    coreLogControllerGetByRoleId: (logId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/core/log/id/${logId}`,
        method: "PATCH",
        ...params,
      }),
  };
}
