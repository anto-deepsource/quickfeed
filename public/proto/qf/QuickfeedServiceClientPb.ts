/**
 * @fileoverview gRPC-Web generated client stub for qf
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as qf_types_pb from '../qf/types_pb';
import * as qf_requests_pb from '../qf/requests_pb';


export class QuickFeedServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGetUser = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetUser',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.Void,
    qf_types_pb.User,
    (request: qf_requests_pb.Void) => {
      return request.serializeBinary();
    },
    qf_types_pb.User.deserializeBinary
  );

  getUser(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.User>;

  getUser(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.User) => void): grpcWeb.ClientReadableStream<qf_types_pb.User>;

  getUser(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetUser',
        request,
        metadata || {},
        this.methodDescriptorGetUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetUser',
    request,
    metadata || {},
    this.methodDescriptorGetUser);
  }

  methodDescriptorGetUsers = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetUsers',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.Void,
    qf_types_pb.Users,
    (request: qf_requests_pb.Void) => {
      return request.serializeBinary();
    },
    qf_types_pb.Users.deserializeBinary
  );

  getUsers(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Users>;

  getUsers(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Users) => void): grpcWeb.ClientReadableStream<qf_types_pb.Users>;

  getUsers(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Users) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetUsers',
        request,
        metadata || {},
        this.methodDescriptorGetUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetUsers',
    request,
    metadata || {},
    this.methodDescriptorGetUsers);
  }

  methodDescriptorGetUserByCourse = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetUserByCourse',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.CourseUserRequest,
    qf_types_pb.User,
    (request: qf_requests_pb.CourseUserRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.User.deserializeBinary
  );

  getUserByCourse(
    request: qf_requests_pb.CourseUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.User>;

  getUserByCourse(
    request: qf_requests_pb.CourseUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.User) => void): grpcWeb.ClientReadableStream<qf_types_pb.User>;

  getUserByCourse(
    request: qf_requests_pb.CourseUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetUserByCourse',
        request,
        metadata || {},
        this.methodDescriptorGetUserByCourse,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetUserByCourse',
    request,
    metadata || {},
    this.methodDescriptorGetUserByCourse);
  }

  methodDescriptorUpdateUser = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateUser',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.User,
    qf_requests_pb.Void,
    (request: qf_types_pb.User) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateUser(
    request: qf_types_pb.User,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateUser(
    request: qf_types_pb.User,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateUser(
    request: qf_types_pb.User,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateUser',
        request,
        metadata || {},
        this.methodDescriptorUpdateUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateUser',
    request,
    metadata || {},
    this.methodDescriptorUpdateUser);
  }

  methodDescriptorIsAuthorizedTeacher = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/IsAuthorizedTeacher',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.Void,
    qf_requests_pb.AuthorizationResponse,
    (request: qf_requests_pb.Void) => {
      return request.serializeBinary();
    },
    qf_requests_pb.AuthorizationResponse.deserializeBinary
  );

  isAuthorizedTeacher(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.AuthorizationResponse>;

  isAuthorizedTeacher(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.AuthorizationResponse) => void): grpcWeb.ClientReadableStream<qf_requests_pb.AuthorizationResponse>;

  isAuthorizedTeacher(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.AuthorizationResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/IsAuthorizedTeacher',
        request,
        metadata || {},
        this.methodDescriptorIsAuthorizedTeacher,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/IsAuthorizedTeacher',
    request,
    metadata || {},
    this.methodDescriptorIsAuthorizedTeacher);
  }

  methodDescriptorGetGroup = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetGroup',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.GetGroupRequest,
    qf_types_pb.Group,
    (request: qf_requests_pb.GetGroupRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Group.deserializeBinary
  );

  getGroup(
    request: qf_requests_pb.GetGroupRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Group>;

  getGroup(
    request: qf_requests_pb.GetGroupRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Group) => void): grpcWeb.ClientReadableStream<qf_types_pb.Group>;

  getGroup(
    request: qf_requests_pb.GetGroupRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Group) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetGroup',
        request,
        metadata || {},
        this.methodDescriptorGetGroup,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetGroup',
    request,
    metadata || {},
    this.methodDescriptorGetGroup);
  }

  methodDescriptorGetGroupByUserAndCourse = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetGroupByUserAndCourse',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.GroupRequest,
    qf_types_pb.Group,
    (request: qf_requests_pb.GroupRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Group.deserializeBinary
  );

  getGroupByUserAndCourse(
    request: qf_requests_pb.GroupRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Group>;

  getGroupByUserAndCourse(
    request: qf_requests_pb.GroupRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Group) => void): grpcWeb.ClientReadableStream<qf_types_pb.Group>;

  getGroupByUserAndCourse(
    request: qf_requests_pb.GroupRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Group) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetGroupByUserAndCourse',
        request,
        metadata || {},
        this.methodDescriptorGetGroupByUserAndCourse,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetGroupByUserAndCourse',
    request,
    metadata || {},
    this.methodDescriptorGetGroupByUserAndCourse);
  }

  methodDescriptorGetGroupsByCourse = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetGroupsByCourse',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.CourseRequest,
    qf_types_pb.Groups,
    (request: qf_requests_pb.CourseRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Groups.deserializeBinary
  );

  getGroupsByCourse(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Groups>;

  getGroupsByCourse(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Groups) => void): grpcWeb.ClientReadableStream<qf_types_pb.Groups>;

  getGroupsByCourse(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Groups) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetGroupsByCourse',
        request,
        metadata || {},
        this.methodDescriptorGetGroupsByCourse,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetGroupsByCourse',
    request,
    metadata || {},
    this.methodDescriptorGetGroupsByCourse);
  }

  methodDescriptorCreateGroup = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/CreateGroup',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.Group,
    qf_types_pb.Group,
    (request: qf_types_pb.Group) => {
      return request.serializeBinary();
    },
    qf_types_pb.Group.deserializeBinary
  );

  createGroup(
    request: qf_types_pb.Group,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Group>;

  createGroup(
    request: qf_types_pb.Group,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Group) => void): grpcWeb.ClientReadableStream<qf_types_pb.Group>;

  createGroup(
    request: qf_types_pb.Group,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Group) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/CreateGroup',
        request,
        metadata || {},
        this.methodDescriptorCreateGroup,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/CreateGroup',
    request,
    metadata || {},
    this.methodDescriptorCreateGroup);
  }

  methodDescriptorUpdateGroup = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateGroup',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.Group,
    qf_types_pb.Group,
    (request: qf_types_pb.Group) => {
      return request.serializeBinary();
    },
    qf_types_pb.Group.deserializeBinary
  );

  updateGroup(
    request: qf_types_pb.Group,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Group>;

  updateGroup(
    request: qf_types_pb.Group,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Group) => void): grpcWeb.ClientReadableStream<qf_types_pb.Group>;

  updateGroup(
    request: qf_types_pb.Group,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Group) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateGroup',
        request,
        metadata || {},
        this.methodDescriptorUpdateGroup,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateGroup',
    request,
    metadata || {},
    this.methodDescriptorUpdateGroup);
  }

  methodDescriptorDeleteGroup = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/DeleteGroup',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.GroupRequest,
    qf_requests_pb.Void,
    (request: qf_requests_pb.GroupRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  deleteGroup(
    request: qf_requests_pb.GroupRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  deleteGroup(
    request: qf_requests_pb.GroupRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  deleteGroup(
    request: qf_requests_pb.GroupRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/DeleteGroup',
        request,
        metadata || {},
        this.methodDescriptorDeleteGroup,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/DeleteGroup',
    request,
    metadata || {},
    this.methodDescriptorDeleteGroup);
  }

  methodDescriptorGetCourse = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetCourse',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.CourseRequest,
    qf_types_pb.Course,
    (request: qf_requests_pb.CourseRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Course.deserializeBinary
  );

  getCourse(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Course>;

  getCourse(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Course) => void): grpcWeb.ClientReadableStream<qf_types_pb.Course>;

  getCourse(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Course) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetCourse',
        request,
        metadata || {},
        this.methodDescriptorGetCourse,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetCourse',
    request,
    metadata || {},
    this.methodDescriptorGetCourse);
  }

  methodDescriptorGetCourses = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetCourses',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.Void,
    qf_types_pb.Courses,
    (request: qf_requests_pb.Void) => {
      return request.serializeBinary();
    },
    qf_types_pb.Courses.deserializeBinary
  );

  getCourses(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Courses>;

  getCourses(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Courses) => void): grpcWeb.ClientReadableStream<qf_types_pb.Courses>;

  getCourses(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Courses) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetCourses',
        request,
        metadata || {},
        this.methodDescriptorGetCourses,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetCourses',
    request,
    metadata || {},
    this.methodDescriptorGetCourses);
  }

  methodDescriptorGetCoursesByUser = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetCoursesByUser',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.EnrollmentStatusRequest,
    qf_types_pb.Courses,
    (request: qf_requests_pb.EnrollmentStatusRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Courses.deserializeBinary
  );

  getCoursesByUser(
    request: qf_requests_pb.EnrollmentStatusRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Courses>;

  getCoursesByUser(
    request: qf_requests_pb.EnrollmentStatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Courses) => void): grpcWeb.ClientReadableStream<qf_types_pb.Courses>;

  getCoursesByUser(
    request: qf_requests_pb.EnrollmentStatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Courses) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetCoursesByUser',
        request,
        metadata || {},
        this.methodDescriptorGetCoursesByUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetCoursesByUser',
    request,
    metadata || {},
    this.methodDescriptorGetCoursesByUser);
  }

  methodDescriptorCreateCourse = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/CreateCourse',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.Course,
    qf_types_pb.Course,
    (request: qf_types_pb.Course) => {
      return request.serializeBinary();
    },
    qf_types_pb.Course.deserializeBinary
  );

  createCourse(
    request: qf_types_pb.Course,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Course>;

  createCourse(
    request: qf_types_pb.Course,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Course) => void): grpcWeb.ClientReadableStream<qf_types_pb.Course>;

  createCourse(
    request: qf_types_pb.Course,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Course) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/CreateCourse',
        request,
        metadata || {},
        this.methodDescriptorCreateCourse,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/CreateCourse',
    request,
    metadata || {},
    this.methodDescriptorCreateCourse);
  }

  methodDescriptorUpdateCourse = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateCourse',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.Course,
    qf_requests_pb.Void,
    (request: qf_types_pb.Course) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateCourse(
    request: qf_types_pb.Course,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateCourse(
    request: qf_types_pb.Course,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateCourse(
    request: qf_types_pb.Course,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateCourse',
        request,
        metadata || {},
        this.methodDescriptorUpdateCourse,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateCourse',
    request,
    metadata || {},
    this.methodDescriptorUpdateCourse);
  }

  methodDescriptorUpdateCourseVisibility = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateCourseVisibility',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.Enrollment,
    qf_requests_pb.Void,
    (request: qf_types_pb.Enrollment) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateCourseVisibility(
    request: qf_types_pb.Enrollment,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateCourseVisibility(
    request: qf_types_pb.Enrollment,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateCourseVisibility(
    request: qf_types_pb.Enrollment,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateCourseVisibility',
        request,
        metadata || {},
        this.methodDescriptorUpdateCourseVisibility,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateCourseVisibility',
    request,
    metadata || {},
    this.methodDescriptorUpdateCourseVisibility);
  }

  methodDescriptorGetAssignments = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetAssignments',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.CourseRequest,
    qf_types_pb.Assignments,
    (request: qf_requests_pb.CourseRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Assignments.deserializeBinary
  );

  getAssignments(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Assignments>;

  getAssignments(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Assignments) => void): grpcWeb.ClientReadableStream<qf_types_pb.Assignments>;

  getAssignments(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Assignments) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetAssignments',
        request,
        metadata || {},
        this.methodDescriptorGetAssignments,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetAssignments',
    request,
    metadata || {},
    this.methodDescriptorGetAssignments);
  }

  methodDescriptorUpdateAssignments = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateAssignments',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.CourseRequest,
    qf_requests_pb.Void,
    (request: qf_requests_pb.CourseRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateAssignments(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateAssignments(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateAssignments(
    request: qf_requests_pb.CourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateAssignments',
        request,
        metadata || {},
        this.methodDescriptorUpdateAssignments,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateAssignments',
    request,
    metadata || {},
    this.methodDescriptorUpdateAssignments);
  }

  methodDescriptorGetEnrollmentsByUser = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetEnrollmentsByUser',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.EnrollmentStatusRequest,
    qf_types_pb.Enrollments,
    (request: qf_requests_pb.EnrollmentStatusRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Enrollments.deserializeBinary
  );

  getEnrollmentsByUser(
    request: qf_requests_pb.EnrollmentStatusRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Enrollments>;

  getEnrollmentsByUser(
    request: qf_requests_pb.EnrollmentStatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Enrollments) => void): grpcWeb.ClientReadableStream<qf_types_pb.Enrollments>;

  getEnrollmentsByUser(
    request: qf_requests_pb.EnrollmentStatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Enrollments) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetEnrollmentsByUser',
        request,
        metadata || {},
        this.methodDescriptorGetEnrollmentsByUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetEnrollmentsByUser',
    request,
    metadata || {},
    this.methodDescriptorGetEnrollmentsByUser);
  }

  methodDescriptorGetEnrollmentsByCourse = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetEnrollmentsByCourse',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.EnrollmentRequest,
    qf_types_pb.Enrollments,
    (request: qf_requests_pb.EnrollmentRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Enrollments.deserializeBinary
  );

  getEnrollmentsByCourse(
    request: qf_requests_pb.EnrollmentRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Enrollments>;

  getEnrollmentsByCourse(
    request: qf_requests_pb.EnrollmentRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Enrollments) => void): grpcWeb.ClientReadableStream<qf_types_pb.Enrollments>;

  getEnrollmentsByCourse(
    request: qf_requests_pb.EnrollmentRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Enrollments) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetEnrollmentsByCourse',
        request,
        metadata || {},
        this.methodDescriptorGetEnrollmentsByCourse,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetEnrollmentsByCourse',
    request,
    metadata || {},
    this.methodDescriptorGetEnrollmentsByCourse);
  }

  methodDescriptorCreateEnrollment = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/CreateEnrollment',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.Enrollment,
    qf_requests_pb.Void,
    (request: qf_types_pb.Enrollment) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  createEnrollment(
    request: qf_types_pb.Enrollment,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  createEnrollment(
    request: qf_types_pb.Enrollment,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  createEnrollment(
    request: qf_types_pb.Enrollment,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/CreateEnrollment',
        request,
        metadata || {},
        this.methodDescriptorCreateEnrollment,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/CreateEnrollment',
    request,
    metadata || {},
    this.methodDescriptorCreateEnrollment);
  }

  methodDescriptorUpdateEnrollments = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateEnrollments',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.Enrollments,
    qf_requests_pb.Void,
    (request: qf_types_pb.Enrollments) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateEnrollments(
    request: qf_types_pb.Enrollments,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateEnrollments(
    request: qf_types_pb.Enrollments,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateEnrollments(
    request: qf_types_pb.Enrollments,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateEnrollments',
        request,
        metadata || {},
        this.methodDescriptorUpdateEnrollments,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateEnrollments',
    request,
    metadata || {},
    this.methodDescriptorUpdateEnrollments);
  }

  methodDescriptorGetSubmissions = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetSubmissions',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.SubmissionRequest,
    qf_types_pb.Submissions,
    (request: qf_requests_pb.SubmissionRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Submissions.deserializeBinary
  );

  getSubmissions(
    request: qf_requests_pb.SubmissionRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Submissions>;

  getSubmissions(
    request: qf_requests_pb.SubmissionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Submissions) => void): grpcWeb.ClientReadableStream<qf_types_pb.Submissions>;

  getSubmissions(
    request: qf_requests_pb.SubmissionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Submissions) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetSubmissions',
        request,
        metadata || {},
        this.methodDescriptorGetSubmissions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetSubmissions',
    request,
    metadata || {},
    this.methodDescriptorGetSubmissions);
  }

  methodDescriptorGetSubmissionsByCourse = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetSubmissionsByCourse',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.SubmissionsForCourseRequest,
    qf_requests_pb.CourseSubmissions,
    (request: qf_requests_pb.SubmissionsForCourseRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.CourseSubmissions.deserializeBinary
  );

  getSubmissionsByCourse(
    request: qf_requests_pb.SubmissionsForCourseRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.CourseSubmissions>;

  getSubmissionsByCourse(
    request: qf_requests_pb.SubmissionsForCourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.CourseSubmissions) => void): grpcWeb.ClientReadableStream<qf_requests_pb.CourseSubmissions>;

  getSubmissionsByCourse(
    request: qf_requests_pb.SubmissionsForCourseRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.CourseSubmissions) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetSubmissionsByCourse',
        request,
        metadata || {},
        this.methodDescriptorGetSubmissionsByCourse,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetSubmissionsByCourse',
    request,
    metadata || {},
    this.methodDescriptorGetSubmissionsByCourse);
  }

  methodDescriptorUpdateSubmission = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateSubmission',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.UpdateSubmissionRequest,
    qf_requests_pb.Void,
    (request: qf_requests_pb.UpdateSubmissionRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateSubmission(
    request: qf_requests_pb.UpdateSubmissionRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateSubmission(
    request: qf_requests_pb.UpdateSubmissionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateSubmission(
    request: qf_requests_pb.UpdateSubmissionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateSubmission',
        request,
        metadata || {},
        this.methodDescriptorUpdateSubmission,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateSubmission',
    request,
    metadata || {},
    this.methodDescriptorUpdateSubmission);
  }

  methodDescriptorUpdateSubmissions = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateSubmissions',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.UpdateSubmissionsRequest,
    qf_requests_pb.Void,
    (request: qf_requests_pb.UpdateSubmissionsRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateSubmissions(
    request: qf_requests_pb.UpdateSubmissionsRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateSubmissions(
    request: qf_requests_pb.UpdateSubmissionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateSubmissions(
    request: qf_requests_pb.UpdateSubmissionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateSubmissions',
        request,
        metadata || {},
        this.methodDescriptorUpdateSubmissions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateSubmissions',
    request,
    metadata || {},
    this.methodDescriptorUpdateSubmissions);
  }

  methodDescriptorRebuildSubmissions = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/RebuildSubmissions',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.RebuildRequest,
    qf_requests_pb.Void,
    (request: qf_requests_pb.RebuildRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  rebuildSubmissions(
    request: qf_requests_pb.RebuildRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  rebuildSubmissions(
    request: qf_requests_pb.RebuildRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  rebuildSubmissions(
    request: qf_requests_pb.RebuildRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/RebuildSubmissions',
        request,
        metadata || {},
        this.methodDescriptorRebuildSubmissions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/RebuildSubmissions',
    request,
    metadata || {},
    this.methodDescriptorRebuildSubmissions);
  }

  methodDescriptorCreateBenchmark = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/CreateBenchmark',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.GradingBenchmark,
    qf_types_pb.GradingBenchmark,
    (request: qf_types_pb.GradingBenchmark) => {
      return request.serializeBinary();
    },
    qf_types_pb.GradingBenchmark.deserializeBinary
  );

  createBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.GradingBenchmark>;

  createBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.GradingBenchmark) => void): grpcWeb.ClientReadableStream<qf_types_pb.GradingBenchmark>;

  createBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.GradingBenchmark) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/CreateBenchmark',
        request,
        metadata || {},
        this.methodDescriptorCreateBenchmark,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/CreateBenchmark',
    request,
    metadata || {},
    this.methodDescriptorCreateBenchmark);
  }

  methodDescriptorUpdateBenchmark = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateBenchmark',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.GradingBenchmark,
    qf_requests_pb.Void,
    (request: qf_types_pb.GradingBenchmark) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateBenchmark',
        request,
        metadata || {},
        this.methodDescriptorUpdateBenchmark,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateBenchmark',
    request,
    metadata || {},
    this.methodDescriptorUpdateBenchmark);
  }

  methodDescriptorDeleteBenchmark = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/DeleteBenchmark',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.GradingBenchmark,
    qf_requests_pb.Void,
    (request: qf_types_pb.GradingBenchmark) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  deleteBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  deleteBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  deleteBenchmark(
    request: qf_types_pb.GradingBenchmark,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/DeleteBenchmark',
        request,
        metadata || {},
        this.methodDescriptorDeleteBenchmark,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/DeleteBenchmark',
    request,
    metadata || {},
    this.methodDescriptorDeleteBenchmark);
  }

  methodDescriptorCreateCriterion = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/CreateCriterion',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.GradingCriterion,
    qf_types_pb.GradingCriterion,
    (request: qf_types_pb.GradingCriterion) => {
      return request.serializeBinary();
    },
    qf_types_pb.GradingCriterion.deserializeBinary
  );

  createCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.GradingCriterion>;

  createCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.GradingCriterion) => void): grpcWeb.ClientReadableStream<qf_types_pb.GradingCriterion>;

  createCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.GradingCriterion) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/CreateCriterion',
        request,
        metadata || {},
        this.methodDescriptorCreateCriterion,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/CreateCriterion',
    request,
    metadata || {},
    this.methodDescriptorCreateCriterion);
  }

  methodDescriptorUpdateCriterion = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateCriterion',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.GradingCriterion,
    qf_requests_pb.Void,
    (request: qf_types_pb.GradingCriterion) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  updateCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  updateCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  updateCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateCriterion',
        request,
        metadata || {},
        this.methodDescriptorUpdateCriterion,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateCriterion',
    request,
    metadata || {},
    this.methodDescriptorUpdateCriterion);
  }

  methodDescriptorDeleteCriterion = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/DeleteCriterion',
    grpcWeb.MethodType.UNARY,
    qf_types_pb.GradingCriterion,
    qf_requests_pb.Void,
    (request: qf_types_pb.GradingCriterion) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  deleteCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  deleteCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  deleteCriterion(
    request: qf_types_pb.GradingCriterion,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/DeleteCriterion',
        request,
        metadata || {},
        this.methodDescriptorDeleteCriterion,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/DeleteCriterion',
    request,
    metadata || {},
    this.methodDescriptorDeleteCriterion);
  }

  methodDescriptorCreateReview = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/CreateReview',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.ReviewRequest,
    qf_types_pb.Review,
    (request: qf_requests_pb.ReviewRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Review.deserializeBinary
  );

  createReview(
    request: qf_requests_pb.ReviewRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Review>;

  createReview(
    request: qf_requests_pb.ReviewRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Review) => void): grpcWeb.ClientReadableStream<qf_types_pb.Review>;

  createReview(
    request: qf_requests_pb.ReviewRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Review) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/CreateReview',
        request,
        metadata || {},
        this.methodDescriptorCreateReview,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/CreateReview',
    request,
    metadata || {},
    this.methodDescriptorCreateReview);
  }

  methodDescriptorUpdateReview = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/UpdateReview',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.ReviewRequest,
    qf_types_pb.Review,
    (request: qf_requests_pb.ReviewRequest) => {
      return request.serializeBinary();
    },
    qf_types_pb.Review.deserializeBinary
  );

  updateReview(
    request: qf_requests_pb.ReviewRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_types_pb.Review>;

  updateReview(
    request: qf_requests_pb.ReviewRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_types_pb.Review) => void): grpcWeb.ClientReadableStream<qf_types_pb.Review>;

  updateReview(
    request: qf_requests_pb.ReviewRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_types_pb.Review) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/UpdateReview',
        request,
        metadata || {},
        this.methodDescriptorUpdateReview,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/UpdateReview',
    request,
    metadata || {},
    this.methodDescriptorUpdateReview);
  }

  methodDescriptorGetReviewers = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetReviewers',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.SubmissionReviewersRequest,
    qf_requests_pb.Reviewers,
    (request: qf_requests_pb.SubmissionReviewersRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Reviewers.deserializeBinary
  );

  getReviewers(
    request: qf_requests_pb.SubmissionReviewersRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Reviewers>;

  getReviewers(
    request: qf_requests_pb.SubmissionReviewersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Reviewers) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Reviewers>;

  getReviewers(
    request: qf_requests_pb.SubmissionReviewersRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Reviewers) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetReviewers',
        request,
        metadata || {},
        this.methodDescriptorGetReviewers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetReviewers',
    request,
    metadata || {},
    this.methodDescriptorGetReviewers);
  }

  methodDescriptorGetProviders = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetProviders',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.Void,
    qf_requests_pb.Providers,
    (request: qf_requests_pb.Void) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Providers.deserializeBinary
  );

  getProviders(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Providers>;

  getProviders(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Providers) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Providers>;

  getProviders(
    request: qf_requests_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Providers) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetProviders',
        request,
        metadata || {},
        this.methodDescriptorGetProviders,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetProviders',
    request,
    metadata || {},
    this.methodDescriptorGetProviders);
  }

  methodDescriptorGetOrganization = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetOrganization',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.OrgRequest,
    qf_requests_pb.Organization,
    (request: qf_requests_pb.OrgRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Organization.deserializeBinary
  );

  getOrganization(
    request: qf_requests_pb.OrgRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Organization>;

  getOrganization(
    request: qf_requests_pb.OrgRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Organization) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Organization>;

  getOrganization(
    request: qf_requests_pb.OrgRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Organization) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetOrganization',
        request,
        metadata || {},
        this.methodDescriptorGetOrganization,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetOrganization',
    request,
    metadata || {},
    this.methodDescriptorGetOrganization);
  }

  methodDescriptorGetRepositories = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/GetRepositories',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.URLRequest,
    qf_requests_pb.Repositories,
    (request: qf_requests_pb.URLRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Repositories.deserializeBinary
  );

  getRepositories(
    request: qf_requests_pb.URLRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Repositories>;

  getRepositories(
    request: qf_requests_pb.URLRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Repositories) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Repositories>;

  getRepositories(
    request: qf_requests_pb.URLRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Repositories) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/GetRepositories',
        request,
        metadata || {},
        this.methodDescriptorGetRepositories,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/GetRepositories',
    request,
    metadata || {},
    this.methodDescriptorGetRepositories);
  }

  methodDescriptorIsEmptyRepo = new grpcWeb.MethodDescriptor(
    '/qf.QuickFeedService/IsEmptyRepo',
    grpcWeb.MethodType.UNARY,
    qf_requests_pb.RepositoryRequest,
    qf_requests_pb.Void,
    (request: qf_requests_pb.RepositoryRequest) => {
      return request.serializeBinary();
    },
    qf_requests_pb.Void.deserializeBinary
  );

  isEmptyRepo(
    request: qf_requests_pb.RepositoryRequest,
    metadata: grpcWeb.Metadata | null): Promise<qf_requests_pb.Void>;

  isEmptyRepo(
    request: qf_requests_pb.RepositoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void): grpcWeb.ClientReadableStream<qf_requests_pb.Void>;

  isEmptyRepo(
    request: qf_requests_pb.RepositoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: qf_requests_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/qf.QuickFeedService/IsEmptyRepo',
        request,
        metadata || {},
        this.methodDescriptorIsEmptyRepo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/qf.QuickFeedService/IsEmptyRepo',
    request,
    metadata || {},
    this.methodDescriptorIsEmptyRepo);
  }

}

