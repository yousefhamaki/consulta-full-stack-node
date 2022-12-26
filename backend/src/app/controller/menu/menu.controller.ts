import { Request, Response, NextFunction } from "express";
import JsonReurn from "../../interface/JsonReturn";
import ARequest from "../../interface/Request.interface";
import menuModel from "../../models/menu/menu.model";
import menuUserModel from "../../models/menu/menuUser.model";

class menuController {
  private readonly menuUser = new menuUserModel();
  private readonly models = new menuModel();

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async createController(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await this.models.create(req.body);

      return res.json({
        status: "success",
        message: "Menu item created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async getMenuController(
    _req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await this.menuUser.getMenu();

      return res.json({
        status: "success",
        message: "Getting Menu successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async getMenuItemsController(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await this.models.getMenuItems();

      return res.json({
        status: "success",
        message: "Get menu items successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async getMenuItemController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await this.models.getMenuItem(Number(req.params.id));

      return res.json({
        status: "success",
        message: "Get menu item successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async updateInfoController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await this.models.updateInfo(req.body);

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
