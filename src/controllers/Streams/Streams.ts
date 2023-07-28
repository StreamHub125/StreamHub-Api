import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import {
  InputHttpMethodsArgument,
  ROUTESLOG,
  ReturnMethod,
  WID,
} from "../../types";
import { Logger } from "../../utils/Logger";
import {
  EnumColorLogger,
  HTTP_RESPONSE,
  METHODS_HTTP,
  ROLES,
} from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { IStreams } from "../../interfaces/IStreams";
import StreamsService from "../../services/StreamsServices";
import {
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";

export default class StreamsController extends Controller<
  IStreams,
  StreamsService
> {
  public readonly path: string = "/streams";

  /* GET */
  public readonly pathGetStreams = "/";
  public readonly pathGetStreamsById = "/:id";
  public readonly pathGetStreamsByModelId = "/model/:idModel";
  public readonly pathGetStreamsByModeratorId = "/moderator/:idModerator";
  public readonly pathGetStreamsByGenderId = "/gender/:idGender";

  /* DELETE */
  public readonly pathDeleteStreams = "/:idAdmin/:idStream";

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

  @HttpMethods()
  async getStreams({
    body,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const { client, pathComplete, idUser } = body;
    const service = new StreamsService();

    if (
      client !== ROLES.MODEL &&
      client !== ROLES.MODERATOR &&
      client !== ROLES.VIEWER &&
      client !== ROLES.ADMIN
    ) {
      return {
        response: "Type not is acceptable",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    }

    if (idUser === undefined || idUser === null) {
      if (
        client === ROLES.ADMIN ||
        client === ROLES.MODERATOR ||
        client === ROLES.MODEL
      ) {
        return ErrorReturn("Streams", "It is necessary to send the user id");
      }
    }
    const streams = await service.Find({}, { limit, page });

    if (streams === null) {
      return ErrorReturn("Streams", "Error looking for streams");
    }

    const streamsHasNext = hasNextPaginate(
      streams,
      pathComplete,
      "/",
      limit,
      page
    );

    if (streamsHasNext === null) {
      return ErrorReturn("Streams", "Error looking for streams");
    }

    const inStresm = streamsHasNext.docs.filter((stream) => stream.isLive);

    if (client === ROLES.ADMIN) {
      return {
        response: streamsHasNext,
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    streamsHasNext.docs = inStresm.map((stream) => {
      return {
        _id: stream._id,
        urlStream: stream.urlStream,
        idGender: stream.idGender,
        hourInit: stream.hourInit,
        idTag: stream.idTag,
        idModel: stream.idModel,
        date: stream.date,
      };
    });

    if (client === ROLES.MODERATOR) {
      const streamModer = await service.Find(
        { idModerator: idUser },
        { limit: 10, page: 1 }
      );
      if (streamModer !== null) {
        streamModer.docs.forEach((e) => streamsHasNext.docs.push(e));
      }
    }

    if (client === ROLES.MODERATOR) {
      const streamMod = await service.Find(
        { idModel: idUser },
        { limit: 10, page: 1 }
      );
      if (streamMod !== null) {
        streamMod.docs.forEach((e) => streamsHasNext.docs.push(e));
      }
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: streamsHasNext,
    };
  }

  @HttpMethods()
  async getStreamsById({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = params;
    const { client, idUser } = body;
    let isClient = true;
    if (client === undefined || client === null) {
      isClient = false;
    }
    if (idUser === undefined || idUser === null) {
      isClient = false;
    }

    if (isClient) {
      if (
        client !== ROLES.MODEL &&
        client !== ROLES.MODERATOR &&
        client !== ROLES.ADMIN
      ) {
        return ErrorReturn("Stream", "Type not Accept");
      }
    }
    const service = new StreamsService();

    const stream = await service.FindById(id);

    if (stream === null) {
      return ErrorReturn("Streams", "Not stream whit this id");
    }

    if (isClient) {
      const user = await VerifyIDOFUser(idUser, client);
      if (user !== null) {
        return user;
      }
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: stream,
      };
    }

    const streamFf: WID<IStreams> = {
      ...stream,
      idModerator: "",
    };
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: streamFf,
    };
  }

  @HttpMethods()
  async getStreamsByModelId({
    body,
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel } = params;
    const { client, idUser } = body;
    let isClient = true;
    if (client === undefined || client === null) {
      isClient = false;
    }
    if (idUser === undefined || idUser === null) {
      isClient = false;
    }

    if (isClient) {
      if (
        client !== ROLES.MODEL &&
        client !== ROLES.MODERATOR &&
        client !== ROLES.ADMIN
      ) {
        return ErrorReturn("Stream", "Type not Accept");
      }
    }
    const service = new StreamsService();

    const stream = await service.Find({ idModel }, { page: 1, limit: 10 });

    if (stream === null) {
      return ErrorReturn("Streams", "Not stream whit this id");
    }

    if (isClient) {
      const user = await VerifyIDOFUser(idUser, client);
      if (user !== null) {
        return user;
      }
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: stream,
      };
    }

    stream.docs = stream.docs.map((e) => {
      return {
        ...e,
        idModerator: "",
      };
    });
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: stream,
    };
  }

  @HttpMethods()
  async getStreamsByModeratorId({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModerator } = params;
    const { client, idUser } = body;

    if (
      client !== ROLES.MODEL &&
      client !== ROLES.MODERATOR &&
      client !== ROLES.ADMIN
    ) {
      return ErrorReturn("Stream", "Type not Accept");
    }
    const service = new StreamsService();

    const stream = await service.Find({ idModerator }, { page: 1, limit: 10 });

    if (stream === null) {
      return ErrorReturn("Streams", "Not stream whit this id");
    }

    const user = await VerifyIDOFUser(idUser, client);
    if (user !== null) {
      return user;
    }
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: stream,
    };
  }

  @HttpMethods()
  async getStreamsByGenderId({
    params,
    body,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idGender } = params;
    const { client, idUser, pathComplete } = body;
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    let isClient = true;
    if (client === undefined || client === null) {
      isClient = false;
    }
    if (idUser === undefined || idUser === null) {
      isClient = false;
    }

    if (isClient) {
      if (
        client !== ROLES.MODEL &&
        client !== ROLES.MODERATOR &&
        client !== ROLES.ADMIN
      ) {
        return ErrorReturn("Stream", "Type not Accept");
      }
    }
    const service = new StreamsService();

    const stream = await service.Find({ idGender }, { page, limit });

    if (stream === null) {
      return ErrorReturn("Streams", "Not stream whit this id");
    }

    const streamWhitPageinate = hasNextPaginate(
      stream,
      pathComplete,
      `/gender/${idGender}`,
      limit,
      page
    );

    if (streamWhitPageinate === null) {
      return ErrorReturn("Streams", "Not stream whit this id");
    }

    if (isClient) {
      const user = await VerifyIDOFUser(idUser, client);
      if (user !== null) {
        return user;
      }
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: streamWhitPageinate,
      };
    }

    streamWhitPageinate.docs = streamWhitPageinate.docs.map((e) => {
      return {
        ...e,
        idModerator: "",
      };
    });
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: streamWhitPageinate,
    };
  }

  @HttpMethods()
  async deleteStreams({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    //"/:idAdmin/:idStream"
    const { idAdmin, idStream } = params;

    const admin = await VerifyIDOFUser(idAdmin, "admin");

    if (admin !== null) {
      return admin;
    }

    const service = new StreamsService();

    const stream = await service.FindById(idStream);

    if (stream === null) {
      return ErrorReturn("Stream", "Not Stream Whit this Id");
    }

    const deletStr = service.Delete(idStream);

    if (deletStr === null) {
      return ErrorReturn("Stream", "Not Stream Whit this Id");
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Stream Deleting",
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
