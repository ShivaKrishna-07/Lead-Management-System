// Build mongoose filter from req.query, using AND logic
export const buildLeadFilter = (q) => {
  const filter = {};

  // String equals / contains
  const strOps = ["email", "company", "city"];
  strOps.forEach((f) => {
    if (q[`${f}`]) filter[f] = q[f]; // equals
    if (q[`${f}_contains`])
      filter[f] = { $regex: q[`${f}_contains`], $options: "i" };
  });

  // Enums equals / in
  ["status", "source"].forEach((f) => {
    if (q[f]) filter[f] = q[f];
    if (q[`${f}_in`]) {
      const vals = Array.isArray(q[`${f}_in`])
        ? q[`${f}_in`]
        : String(q[`${f}_in`]).split(",");
      filter[f] = { $in: vals };
    }
  });

  // Numbers equals / gt / lt / between
  const numOps = ["score", "lead_value"];
  numOps.forEach((f) => {
    const eq = q[f],
      gt = q[`${f}_gt`],
      lt = q[`${f}_lt`],
      between = q[`${f}_between`];
    if (between) {
      const [a, b] = String(between).split(",").map(Number);
      filter[f] = { $gte: a, $lte: b };
    } else {
      if (eq !== undefined) filter[f] = Number(eq);
      if (gt !== undefined || lt !== undefined) {
        filter[f] = { ...(filter[f] || {}) };
        if (gt !== undefined) filter[f].$gt = Number(gt);
        if (lt !== undefined) filter[f].$lt = Number(lt);
      }
    }
  });

  // Dates on / before / after / between
  const dateOps = ["created_at", "last_activity_at"];
  dateOps.forEach((f) => {
    const on = q[`${f}_on`];
    const before = q[`${f}_before`];
    const after = q[`${f}_after`];
    const between = q[`${f}_between`];

    if (between) {
      const [a, b] = String(between).split(",");
      filter[f] = { $gte: new Date(a), $lte: new Date(b) };
    } else if (on) {
      const d = new Date(on);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      filter[f] = { $gte: d, $lt: next }; // same day window
    } else {
      if (before) filter[f] = { ...(filter[f] || {}), $lt: new Date(before) };
      if (after) filter[f] = { ...(filter[f] || {}), $gt: new Date(after) };
    }
  });

  // Boolean equals
  if (q.is_qualified !== undefined) {
    const v = q.is_qualified;
    filter.is_qualified = v === "true" || v === true;
  }

  return filter;
};

// Pagination params
export const getPageLimit = (q) => {
  const page = Math.max(1, parseInt(q.page || "1", 10));
  let limit = Math.max(1, parseInt(q.limit || "20", 10));
  limit = Math.min(limit, 100);
  return { page, limit };
};
