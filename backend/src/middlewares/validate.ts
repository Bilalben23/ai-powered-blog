import { Request, Response, NextFunction } from "express-serve-static-core";
import { AnyZodObject } from "zod";


type ValidateOptions = {
    body?: AnyZodObject,
    query?: AnyZodObject,
    params?: AnyZodObject
}

/**
 * Middleware to validate request body, query, and params using Zod schemas.
 * 
 * @param schema - An abject containing optional Zod schemas for body, query, and params.
 * @returns Express middleware function
 * 
 * If validation fails, it responds with a 400 status and validation errors.
 */
export const validate = (schema: ValidateOptions) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.body) {
                const result = schema.body.safeParse(req.body);
                if (!result.success) {
                    res.status(400).json({
                        success: false,
                        message: "Validation error",
                        errors: result.error.errors.map(err => ({
                            field: err.path.join("."),
                            msg: err.message
                        }))
                    })
                    return;
                }

                req.body = result.data;
            }

            if (schema.query) {
                const result = schema.query.safeParse(req.query);
                if (!result.success) {
                    res.status(400).json({
                        success: false,
                        errors: result.error.errors.map(err => ({
                            field: err.path.join("."),
                            msg: err.message
                        }))
                    })
                    return;
                }

                req.query = result.data;
            }

            if (schema.params) {
                const result = schema.params.safeParse(req.params);
                if (!result.success) {
                    res.status(400).json({
                        success: false,
                        errors: result.error.errors.map(err => ({
                            field: err.path.join("."),
                            msg: err.message
                        }))
                    })
                    return;
                }

                req.params = result.data;
            }
            next()
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Validation middleware failed unexpectedly",
            });
            return;
        }
    }