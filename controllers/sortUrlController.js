import { LinkService } from "../services/sortUrlService.js";

export const LinkController = {
  // Create a new short link
  async createLink(req, res) {
    try {
      const { original_url, label } = req.body;
      if (!original_url) {
        return res.status(400).json({ error: "Original URL is required" });
      }
      const link = await LinkService.createLink({ original_url, label });
      res.status(201).json(link);
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Server error" });
    }
  },

  // Get all links
  async getAllLinks(req, res) {
    try {
      const links = await LinkService.getAllLinks();
      res.json(links);
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Server error" });
    }
  },
  

  // Delete a short link
  async deleteLink(req, res) {
    try {
      const { code } = req.params;
      const link = await LinkService.deleteLink(code);
      res.json({ message: "Link deleted", link });
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Server error" });
    }
  },

  async fetchOriginal(req, res) {
    try {
      const code = req.params.code; 
      console.log("Received code:", code);

      const { content, contentType } = await LinkService.fetchOriginalUrl(code);

      res.setHeader("Content-Type", contentType);
      res.send(content);
    } catch (err) {
      res
        .status(err.status || 500)
        .send(err.message || "Failed to fetch original URL");
    }
  },

  // Health check endpoint
  healthCheck(req, res) {
    res.json({ ok: true, version: "1.0" });
  },
};
