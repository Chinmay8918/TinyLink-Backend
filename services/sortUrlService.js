import fetch from "node-fetch";
import { LinkModel } from "../models/sortUrl.js";

//randomly generate the sort code
function generateShortCode(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function convertRow(row) {
  return {
    ...row,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
    last_clicked: row.last_clicked ? row.last_clicked.toISOString() : null,
  };
}

export const LinkService = {
  //create link
  async createLink({ original_url, label }) {
    try {
      let code = generateShortCode();
      while (await LinkModel.exists(code)) {
        code = generateShortCode();
      }
      const link = await LinkModel.create(original_url, code, label || null);
      return convertRow(link);
    } catch (error) {
      throw { status: 500, message: error.message || "Create failed" };
    }
  },

  // get all link
  async getAllLinks() {
    try {
      const links = await LinkModel.findAll();
      return links.map(convertRow);
    } catch (error) {
      throw { status: 500, message: error.message || "Get all failed" };
    }
  },

  //delete
  async deleteLink(short_url) {
    try {
      const link = await LinkModel.delete(short_url);
      if (!link) throw { status: 404, message: "Link not found" };
      return convertRow(link);
    } catch (error) {
      throw error;
    }
  },

  //for fetch
  async fetchOriginalUrl(short_url) {
    try {
      console.log("Fetching short_url:", short_url);

      const link = await LinkModel.getByShortUrl(short_url);
      console.log("Link from DB:", link);

      if (!link) {
        throw { status: 404, message: "Link not found" };
      }

      const updatedLink = await LinkModel.incrementClicks(short_url);
      const serviceLink = convertRow(updatedLink);

      const response = await fetch(serviceLink.original_url);

      if (!response.ok) {
        throw {
          status: response.status,
          message: "Failed to fetch original URL",
        };
      }

      const contentType = response.headers.get("content-type") || "text/html";
      const content = await response.text();

      return { content, contentType };
    } catch (error) {
      throw error;
    }
  },
};
