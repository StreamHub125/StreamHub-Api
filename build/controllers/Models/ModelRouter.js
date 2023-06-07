"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Model_1 = require("./Model");
const ModelRouter = (0, express_1.Router)();
ModelRouter.get(Model_1.modelController.pathGetModels, Model_1.modelController.getModels);
exports.default = ModelRouter;
