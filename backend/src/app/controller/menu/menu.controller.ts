import { Request, Response, NextFunction } from "express";
import JsonReurn from "../../interface/JsonReturn";
import ARequest from "../../interface/Request.interface";
import menuModel from "../../models/menu/menu.model";
import menuUserModel from "../../models/menu/menuUser.model";

const model = new menuModel();

const menuUser = new menuUserModel();

class menuController {
  async create(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.create(req.body);

      return res.json({
        status: "success",
        message: "Menu item created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getMenu(
    _req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await menuUser.getMenu();

      return res.json({
        status: "success",
        message: "Getting Menu successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getMenuItems(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.getMenuItems();

      return res.json({
        status: "success",
        message: "Get menu items successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getMenuItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.getMenuItem(Number(req.params.id));

      return res.json({
        status: "success",
        message: "Get menu item successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.updateInfo(req.body);

      return res.json({
        status: "success",
        message: "Menu item updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default menuController;
