import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { NextFunction, Request, Response } from "express";

export const arcjetProtection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // Number of tokens to consume (default: 1)
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Too Many Requests. Please try again later.",
          }),
        );
      } else if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No bots allowed" }));
      } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
      }
    }

    // check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No spoofed bots allowed" }));
    }

    next();
  } catch (error) {
    console.log("Arcjet protection error:", error.message);
    next();
  }
};
