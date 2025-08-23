import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SOURCE, STATUS } from "../../utils/constants";
import dayjs from "dayjs";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string(),
  company: yup.string(),
  city: yup.string(),
  state: yup.string(),
  source: yup.string().oneOf(SOURCE).required("Source is required"),
  status: yup.string().oneOf(STATUS),
  score: yup.number().min(0).max(100),
  lead_value: yup.number(),
  last_activity_at: yup.date().nullable(),
  is_qualified: yup.boolean(),
});

const LeadForm = ({ initialValues = {}, onSubmit }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: "",
      city: "",
      state: "",
      source: "",
      status: "new",
      score: 0,
      lead_value: 0,
      last_activity_at: null,
      is_qualified: false,
      ...initialValues,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {[
        "first_name",
        "last_name",
        "email",
        "phone",
        "company",
        "city",
        "state",
      ].map((field) => (
        <Controller
          key={field}
          name={field}
          control={control}
          render={({ field: f, fieldState: { error } }) => (
            <div style={{ marginBottom: 10 }}>
              <label>{field.replace("_", " ").toUpperCase()}</label>
              <input {...f} />
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />
      ))}

      <Controller
        name="source"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div style={{ marginBottom: 10 }}>
            <label>Source</label>
            <select {...field}>
              <option value="">Select Source</option>
              {SOURCE.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <div style={{ marginBottom: 10 }}>
            <label>Status</label>
            <select {...field}>
              {STATUS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
      />

      <Controller
        name="score"
        control={control}
        render={({ field }) => (
          <div style={{ marginBottom: 10 }}>
            <label>Score</label>
            <input type="number" {...field} />
          </div>
        )}
      />

      <Controller
        name="lead_value"
        control={control}
        render={({ field }) => (
          <div style={{ marginBottom: 10 }}>
            <label>Lead Value</label>
            <input type="number" {...field} />
          </div>
        )}
      />

      <Controller
        name="last_activity_at"
        control={control}
        render={({ field }) => (
          <div style={{ marginBottom: 10 }}>
            <label>Last Activity</label>
            <input
              type="date"
              {...field}
              value={field.value ? dayjs(field.value).format("YYYY-MM-DD") : ""}
            />
          </div>
        )}
      />

      <Controller
        name="is_qualified"
        control={control}
        render={({ field }) => (
          <div style={{ marginBottom: 10 }}>
            <label>Qualified</label>
            <input type="checkbox" {...field} checked={field.value} />
          </div>
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default LeadForm;
