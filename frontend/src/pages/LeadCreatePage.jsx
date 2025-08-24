import React from "react";
import { useNavigate } from "react-router-dom";
import { createLead } from "../api/leads";
import {
  PlusCircle,
  User,
  Mail,
  Globe,
  Phone,
  Briefcase,
  MapPin,
  DollarSign,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const LeadCreatePage = () => {
  const navigate = useNavigate();

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
      lead_value: lead_value ? Number(lead_value) : 0, // number
      is_qualified: is_qualified === "on" ? true : false, // boolean
    };

    try {
      await createLead(payload);
      toast.success("Lead created successfully!");
      navigate("/leads");
    } catch (err) {
      console.error(err);
      toast.error("Error creating lead");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <PlusCircle className="text-blue-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">Create Lead</h2>
        </div>

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
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <User className="text-gray-400 mr-2 w-5 h-5" />
              <input
                type="text"
                name="first_name"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <User className="text-gray-400 mr-2 w-5 h-5" />
              <input
                type="text"
                name="last_name"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <Mail className="text-gray-400 mr-2 w-5 h-5" />
              <input
                type="email"
                name="email"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Source <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <Globe className="text-gray-400 mr-2 w-5 h-5" />
              <select
                name="source"
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
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <Phone className="text-gray-400 mr-2 w-5 h-5" />
              <input
                type="text"
                name="phone"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Company
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <Briefcase className="text-gray-400 mr-2 w-5 h-5" />
              <input
                type="text"
                name="company"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">City</label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <MapPin className="text-gray-400 mr-2 w-5 h-5" />
              <input
                type="text"
                name="city"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Lead Value
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <DollarSign className="text-gray-400 mr-2 w-5 h-5" />
              <input
                type="number"
                name="lead_value"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="is_qualified"
              className="w-5 h-5 accent-green-500"
            />
            <span className="text-gray-700 font-medium">Qualified</span>
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Create Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadCreatePage;
