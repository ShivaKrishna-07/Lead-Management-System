import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Pencil,
  User,
  Mail,
  Globe,
  Phone,
  Briefcase,
  MapPin,
  DollarSign,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { getLead, updateLead } from "../api/leads";

const LeadEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch lead data
  useEffect(() => {
    setLoading(true);
    getLead(id)
      .then((res) => setLead(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch lead data");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    const { first_name, last_name, email, source, phone, company, city, lead_value, is_qualified } = data;
    if (!first_name || !last_name || !email || !source) {
      toast.error("Please fill all required fields (*)");
      return;
    }
    const payload = {
      first_name,
      last_name,
      email,
      source,
      phone: phone || undefined,
      company: company || undefined,
      city: city || undefined,
      lead_value: lead_value ? Number(lead_value) : 0,
      is_qualified: is_qualified === "on" ? true : false,
    };
    setSubmitting(true);
    try {
      await updateLead(id, payload);
      toast.success("Lead updated successfully!");
      navigate("/leads");
    } catch (err) {
      console.error(err);
      toast.error("Error updating lead");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Loading lead data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <Pencil className="text-yellow-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">Edit Lead</h2>
        </div>
        {lead ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = Object.fromEntries(new FormData(e.target));
              handleSubmit(formData);
            }}
            className="space-y-4"
          >
            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <User className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="text"
                  name="first_name"
                  defaultValue={lead.first_name}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <User className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="text"
                  name="last_name"
                  defaultValue={lead.last_name}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <Mail className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  defaultValue={lead.email}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Source <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <Globe className="text-gray-400 mr-2 w-5 h-5" />
                <select
                  name="source"
                  defaultValue={lead.source}
                  className="w-full outline-none text-gray-700 bg-transparent"
                >
                  <option value="">Select Source</option>
                  <option value="website">Website</option>
                  <option value="facebook_ads">Facebook Ads</option>
                  <option value="google_ads">Google Ads</option>
                  <option value="referral">Referral</option>
                  <option value="events">Events</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Optional Fields */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <Phone className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="text"
                  name="phone"
                  defaultValue={lead.phone}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Company</label>
              <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <Briefcase className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="text"
                  name="company"
                  defaultValue={lead.company}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">City</label>
              <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <MapPin className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="text"
                  name="city"
                  defaultValue={lead.city}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Lead Value</label>
              <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <DollarSign className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="number"
                  name="lead_value"
                  defaultValue={lead.lead_value}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="is_qualified"
                defaultChecked={lead.is_qualified}
                className="w-5 h-5 accent-green-500"
              />
              <span className="text-gray-700 font-medium">Qualified</span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition mt-4"
            >
              {submitting ? "Updating..." : "Update Lead"}
            </button>
          </form>
        ) : (
          <p className="text-gray-500">Lead not found.</p>
        )}
      </div>
    </div>
  );
};

export default LeadEditPage;
