import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { IStreams } from "../../interfaces/IStreams";
import StreamsService from "../../services/StreamsServices";

export default class StreamsController extends Controller<
  IStreams,
  StreamsService
> {
  public readonly path: string = "/streams";

  /* GET */
  public readonly pathGetStreams = "/";
  public readonly pathGetStreamsByModelId = "/model/:idModel";
  public readonly pathGetStreamsByModeratorId = "/moderator/:idModerator";
  public readonly pathGetStreamsByTagId = "/tag/:idTag";
  public readonly pathGetStreamsByGenderId = "/gender/:idGender";
  public readonly pathGetStreamsById = "/gender/:idGender";

  /* DELETE */
  public readonly pathDeleteStreams = "/delete/:idAdmin/:idStream";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetStreams,
      plrs: false,
      plur: "Get All Streamss required Param idAdmin",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetStreamsById,
      plrs: false,
      plur: "Get Streams by id required Param id of Streams in Db",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetStreamsByModelId,
      plrs: false,
      plur: "Get Streams of the models required Param id of Model",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetStreamsByModeratorId,
      plrs: false,
      plur: "Get Streams of the moderator required Param id of Moderator",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetStreamsByGenderId,
      plrs: false,
      plur: "Get Streams by Gender required Param Id of Gender",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetStreamsByTagId,
      plrs: false,
      plur: "Get Streams by Tag required Param Id of Tag",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteStreams,
      plrs: false,
      plur: "Need a Admin and Streams Id for Delete a Streams",
    },
  ];
  loggerController: Logger;
  service: StreamsService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgYellow, "Streams");
    this.service = new StreamsService();
    this.addInterceptor();
  }

  @HttpMethods(false)
  getStreams(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getStreamsById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getStreamsByModelId(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getStreamsByModeratorId(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getStreamsByTagId(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getStreamsByGenderId(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  deleteStreams(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  Interceptor(
    _req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    _res: Response<any, Record<string, any>>,
    next: Function,
    interceptorLogger: ILoggerChild,
    path: string
  ): void {
    interceptorLogger.LogChild(
      "Streams-Controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const streamsController: StreamsController = new StreamsController();
