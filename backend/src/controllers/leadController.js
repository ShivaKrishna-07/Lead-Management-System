import createError from "http-errors";
import Lead from "../models/Lead.js";
import { buildLeadFilter, getPageLimit } from "../utils/filters.js";
import {
  createLeadSchema,
  updateLeadSchema,
} from "../validators/leadSchemas.js";

export const createLead = async (req, res, next) => {
  try {
    const payload = createLeadSchema.parse(req.body);
    // Convert nullable date
    if (payload.last_activity_at === null) delete payload.last_activity_at;
    if (typeof payload.last_activity_at === "string")
      payload.last_activity_at = new Date(payload.last_activity_at);

    const lead = await Lead.create(payload);
    res.status(201).json(lead);
  } catch (err) {
    next(err);
  }
};

export const getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) throw createError(404, "Lead not found");
    res.status(200).json(lead);
  } catch (err) {
    next(err);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const payload = updateLeadSchema.parse(req.body);
    if ("last_activity_at" in payload) {
      payload.last_activity_at =
        payload.last_activity_at === null
          ? null
          : new Date(payload.last_activity_at);
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!lead) throw createError(404, "Lead not found");
    res.status(200).json(lead);
  } catch (err) {
    next(err);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) throw createError(404, "Lead not found");
    res.status(200).json({ message: "Deleted" });
    // If you prefer 204 No Content: res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const listLeads = async (req, res, next) => {
  try {
    const { page, limit } = getPageLimit(req.query);
    const filter = buildLeadFilter(req.query);

    const total = await Lead.countDocuments(filter);
    const data = await Lead.find(filter)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.status(200).json({
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};
