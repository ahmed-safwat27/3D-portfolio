import { useState, useEffect } from "react";
import { useForm } from "@formspree/react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [state, handleSubmit] = useForm("mpqgwvzn");

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Message sent successfully!");
    }
  }, [state.succeeded]);

  const onSubmit = async (e) => {
    await handleSubmit(e);
  };

  return (
    <section className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're looking to build a new website or improve your platform,
            I'm here to help.
          </p>
        </div>

        <form className="w-full" onSubmit={onSubmit}>
          <div className="mb-5">
            <label className="feild-label">Full Name</label>
            <input
              name="name"
              type="text"
              className="field-input field-input-focus"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label className="feild-label">Email</label>
            <input
              name="email"
              type="email"
              className="field-input field-input-focus"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label className="feild-label">Message</label>
            <textarea
              name="message"
              rows="4"
              className="field-input field-input-focus"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full px-1 py-3 text-lg rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation disabled:opacity-50"
          >
            {state.submitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;